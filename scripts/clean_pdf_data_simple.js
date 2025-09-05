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
  
  // Manual extraction of key data patterns
  const vehicleEntries = [];
  
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
    
    // Extract vehicle data patterns
    // Pattern 1: Brand lines (all caps, standalone)
    if (cleanLine.match(/^[A-Z\s\-]+$/) && cleanLine.length > 2 && 
        !cleanLine.includes('Diesel') && !cleanLine.includes('Petrole') && 
        !cleanLine.includes('Electric') && !cleanLine.includes('Petroleum')) {
      vehicleEntries.push({ brand: cleanLine });
      continue;
    }
    
    // Pattern 2: Vehicle model with engine and battery info
    if (cleanLine.includes('(') && cleanLine.includes(')') && 
        (cleanLine.includes('_') || cleanLine.match(/\d+[A-Z_]+/))) {
      
      // Extract vehicle name
      const vehicleMatch = cleanLine.match(/^([^(]+)\s*\([^)]+\)/);
      if (vehicleMatch && vehicleEntries.length > 0) {
        vehicleEntries[vehicleEntries.length - 1].vehicle = vehicleMatch[1].trim();
      }
      
      // Look for engine and battery info in the same line or following lines
      const engineMatch = cleanLine.match(/(\d+\.\d+\s+[A-Z0-9\s]+)/);
      if (engineMatch && vehicleEntries.length > 0) {
        vehicleEntries[vehicleEntries.length - 1].motorisation = engineMatch[1].trim();
      }
      
      // Look for fuel type
      if (cleanLine.includes('Diesel') && vehicleEntries.length > 0) {
        vehicleEntries[vehicleEntries.length - 1].fuel = 'Diesel';
      } else if (cleanLine.includes('Petrole') && vehicleEntries.length > 0) {
        vehicleEntries[vehicleEntries.length - 1].fuel = 'Petrole';
      } else if (cleanLine.includes('Electric') && vehicleEntries.length > 0) {
        vehicleEntries[vehicleEntries.length - 1].fuel = 'Electric';
      }
      
      // Look for year range
      const yearMatch = cleanLine.match(/(\d{4}-\d{2})/);
      if (yearMatch && vehicleEntries.length > 0) {
        const yearParts = yearMatch[1].split('-');
        vehicleEntries[vehicleEntries.length - 1].start = yearParts[0] + '-01-01';
        vehicleEntries[vehicleEntries.length - 1].end = yearParts[1] + '-01-01';
      }
      
      // Look for battery types
      const batteryMatch = cleanLine.match(/(F\d+)/g);
      if (batteryMatch && vehicleEntries.length > 0) {
        const entry = vehicleEntries[vehicleEntries.length - 1];
        for (const battery of batteryMatch) {
          if (battery.startsWith('F3') || battery.startsWith('F4') || 
              battery.startsWith('F6') || battery.startsWith('F7') || 
              battery.startsWith('F8') || battery.startsWith('F10') || 
              battery.startsWith('F12') || battery.startsWith('F1')) {
            entry.conventional = battery;
          } else if (battery.startsWith('F3') || battery.startsWith('F4')) {
            entry.efb = battery;
          } else {
            entry.agm = battery;
          }
        }
      }
    }
  }
  
  // Convert entries to CSV format
  for (const entry of vehicleEntries) {
    if (entry.brand && entry.vehicle && entry.motorisation && entry.fuel && 
        entry.start && entry.end && (entry.agm || entry.efb || entry.conventional)) {
      const row = [
        entry.brand || '',
        entry.vehicle || '',
        entry.motorisation || '',
        entry.fuel || '',
        entry.start || '',
        entry.end || '',
        entry.agm || '',
        entry.efb || '',
        entry.conventional || ''
      ].join(';');
      
      cleanedData.push(row);
    }
  }
  
  // Write the cleaned data
  fs.writeFileSync(outputFile, cleanedData.join('\n'), 'utf8');
  
  console.log(`✅ Cleaned data written to: ${outputFile}`);
  console.log(`📊 Total rows: ${cleanedData.length - 1} (excluding header)`);
  
} catch (error) {
  console.error('❌ Error processing file:', error.message);
}
