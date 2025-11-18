import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the PDF extraction file
const inputFile = path.join(__dirname, 'ILV-FULMEN-ENDURANCE.csv');
const outputFile = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_complete.csv');

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
  
  // Process each line
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
    
    // Check if this is a brand line (all caps, standalone, not a vehicle model)
    if (cleanLine.match(/^[A-Z\s\-]+$/) && cleanLine.length > 2 && 
        !cleanLine.includes('Diesel') && !cleanLine.includes('Petrole') && 
        !cleanLine.includes('Electric') && !cleanLine.includes('Petroleum') &&
        !cleanLine.includes('(') && !cleanLine.includes(')') &&
        !cleanLine.match(/\d+\.\d+/) && !cleanLine.match(/F\d+/)) {
      currentBrand = cleanLine;
      continue;
    }
    
    // Check if this is a vehicle model line (contains parentheses and model codes)
    if (cleanLine.includes('(') && cleanLine.includes(')') && 
        (cleanLine.includes('_') || cleanLine.match(/\d+[A-Z_]+/))) {
      
      // Extract vehicle name (everything before the first parenthesis)
      const vehicleMatch = cleanLine.match(/^([^(]+)\s*\(/);
      if (vehicleMatch) {
        currentVehicle = vehicleMatch[1].trim();
      }
      
      // Look for engine specifications in the same line
      const engineMatch = cleanLine.match(/(\d+\.\d+\s+[A-Z0-9\s\.,\/\-]+)/);
      if (engineMatch) {
        currentMotorisation = engineMatch[1].trim();
      }
      
      // Look for fuel type
      if (cleanLine.includes('Diesel')) {
        currentFuel = 'Diesel';
      } else if (cleanLine.includes('Petrole')) {
        currentFuel = 'Petrole';
      } else if (cleanLine.includes('Electric')) {
        currentFuel = 'Electric';
      } else if (cleanLine.includes('Petroleum Gas (LPG)')) {
        currentFuel = 'Petroleum Gas (LPG)';
      }
      
      // Look for year range
      const yearMatch = cleanLine.match(/(\d{4}-\d{2})/);
      if (yearMatch) {
        const yearParts = yearMatch[1].split('-');
        currentStart = yearParts[0] + '-01-01';
        currentEnd = yearParts[1] + '-01-01';
      }
      
      // Look for battery types
      const batteryMatch = cleanLine.match(/(F\d+)/g);
      if (batteryMatch) {
        for (const battery of batteryMatch) {
          if (battery.startsWith('F3') || battery.startsWith('F4') || 
              battery.startsWith('F6') || battery.startsWith('F7') || 
              battery.startsWith('F8') || battery.startsWith('F10') || 
              battery.startsWith('F12') || battery.startsWith('F1')) {
            currentConventional = battery;
          } else if (battery.startsWith('F3') || battery.startsWith('F4')) {
            currentEFB = battery;
          } else {
            currentAGM = battery;
          }
        }
      }
      
      // If we have enough data, create a row
      if (currentBrand && currentVehicle && currentMotorisation && currentFuel && 
          currentStart && (currentAGM || currentEFB || currentConventional)) {
        const row = [
          currentBrand,
          currentVehicle,
          currentMotorisation,
          currentFuel,
          currentStart,
          currentEnd || '',
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
    
    // Check if this is a continuation line with engine specs
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
          if (type.startsWith('F3') || type.startsWith('F4') || 
              type.startsWith('F6') || type.startsWith('F7') || 
              type.startsWith('F8') || type.startsWith('F10') || 
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
          currentStart && (currentAGM || currentEFB || currentConventional)) {
        const row = [
          currentBrand,
          currentVehicle,
          currentMotorisation,
          currentFuel,
          currentStart,
          currentEnd || '',
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
  
  console.log(`✅ Complete cleaned data written to: ${outputFile}`);
  console.log(`📊 Total rows: ${cleanedData.length - 1} (excluding header)`);
  
} catch (error) {
  console.error('❌ Error processing file:', error.message);
}
