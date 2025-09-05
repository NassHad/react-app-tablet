import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the PDF extraction file
const inputFile = path.join(__dirname, 'ILV-FULMEN-ENDURANCE.csv');
const outputFile = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_cleaned.csv');

try {
  const fileContent = fs.readFileSync(inputFile, 'utf8');
  const lines = fileContent.split('\n');
  
  const cleanedData = [];
  
  // Add header
  cleanedData.push('Brand;Vehicle;Motorisation;Fuel;Start;End;Battery_AGM;Battery_EFB;Battery_Conventional');
  
  let currentBrand = '';
  let currentVehicle = '';
  let currentMotorisation = '';
  let currentFuel = '';
  let currentStart = '';
  let currentEnd = '';
  let currentAGM = '';
  let currentEFB = '';
  let currentConventional = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('"TROUVEZ') || line.startsWith('"CONSEILLA') || 
        line.startsWith('"D\'EXPERT') || line.startsWith('"POUR VOTRE') || 
        line.startsWith('"BATTERIES AUTO') || line.startsWith('"Modèle') ||
        line.startsWith('"SI VOTRE') || line.startsWith('"LES') || 
        line.startsWith('"BATTERIES AGMEST') || line.startsWith('"DOIVENT') ||
        line.startsWith('"SYSTÈME') || line.startsWith('"UNIQUEMENT') ||
        line.startsWith('"STOP&START') || line.startsWith('"REMPLACEZ') ||
        line.startsWith('"OBLIGATOIREMENT') || line.startsWith('"VOTRE BATTERIE') ||
        line.startsWith('"PAR UNE') || line.startsWith('"CONSEIL D\'EXPERT') ||
        line.startsWith('"EMEA HEADQUARTERS') || line.startsWith('"5 ALLÉE DES') ||
        line.startsWith('"TEL.') || line.startsWith('"FAX.') || 
        line.startsWith('"FRANCE') || line.startsWith('"CONSEIL D\'EXPERT.indd') ||
        line === '""' || line === '') {
      continue;
    }
    
    // Remove quotes and clean the line
    let cleanLine = line.replace(/"/g, '').trim();
    
    // Skip empty lines
    if (!cleanLine) continue;
    
    // Check if this is a brand line (all caps, no numbers)
    if (cleanLine.match(/^[A-Z\s\-]+$/) && cleanLine.length > 2 && 
        !cleanLine.includes('Diesel') && !cleanLine.includes('Petrole') && 
        !cleanLine.includes('Electric') && !cleanLine.includes('Petroleum')) {
      currentBrand = cleanLine;
      continue;
    }
    
    // Check if this is a vehicle model line (contains parentheses or specific patterns)
    if (cleanLine.includes('(') && cleanLine.includes(')') && 
        (cleanLine.includes('_') || cleanLine.match(/\d+[A-Z_]+/))) {
      currentVehicle = cleanLine;
      continue;
    }
    
    // Check if this is a motorisation line (contains engine specs)
    if (cleanLine.match(/\d+\.\d+/) && 
        (cleanLine.includes('TDI') || cleanLine.includes('HDi') || 
         cleanLine.includes('CDI') || cleanLine.includes('dCi') ||
         cleanLine.includes('TFSI') || cleanLine.includes('VTi') ||
         cleanLine.includes('16V') || cleanLine.includes('8V') ||
         cleanLine.includes('TDCi') || cleanLine.includes('CRDi'))) {
      currentMotorisation = cleanLine;
      continue;
    }
    
    // Check if this is a fuel type line
    if (cleanLine === 'Diesel' || cleanLine === 'Petrole' || 
        cleanLine === 'Electric' || cleanLine === 'Petroleum Gas (LPG)') {
      currentFuel = cleanLine;
      continue;
    }
    
    // Check if this is a year range line
    if (cleanLine.match(/\d{4}-\d{2}/) || cleanLine.match(/\d{4}-\d{4}/)) {
      const yearParts = cleanLine.split('-');
      if (yearParts.length === 2) {
        currentStart = yearParts[0] + '-01-01';
        currentEnd = yearParts[1] + '-01-01';
      }
      continue;
    }
    
    // Check if this is a battery type line
    if (cleanLine.match(/F\d+/)) {
      const batteryTypes = cleanLine.split(/\s+/);
      for (const type of batteryTypes) {
        if (type.match(/^F\d+$/)) {
          if (type.startsWith('F3') || type.startsWith('F4') || type.startsWith('F6') || 
              type.startsWith('F7') || type.startsWith('F8') || type.startsWith('F10') || 
              type.startsWith('F12') || type.startsWith('F1')) {
            currentConventional = type;
          } else if (type.startsWith('F3') || type.startsWith('F4')) {
            currentEFB = type;
          } else {
            currentAGM = type;
          }
        }
      }
      
      // If we have all the data, create a row
      if (currentBrand && currentVehicle && currentMotorisation && currentFuel && 
          currentStart && currentEnd && (currentAGM || currentEFB || currentConventional)) {
        const row = [
          currentBrand,
          currentVehicle,
          currentMotorisation,
          currentFuel,
          currentStart,
          currentEnd,
          currentAGM || '',
          currentEFB || '',
          currentConventional || ''
        ].join(';');
        
        cleanedData.push(row);
        
        // Reset for next entry
        currentVehicle = '';
        currentMotorisation = '';
        currentFuel = '';
        currentStart = '';
        currentEnd = '';
        currentAGM = '';
        currentEFB = '';
        currentConventional = '';
      }
    }
  }
  
  // Write the cleaned data
  fs.writeFileSync(outputFile, cleanedData.join('\n'), 'utf8');
  
  console.log(`✅ Cleaned data written to: ${outputFile}`);
  console.log(`📊 Total rows: ${cleanedData.length - 1} (excluding header)`);
  
} catch (error) {
  console.error('❌ Error processing file:', error.message);
}
