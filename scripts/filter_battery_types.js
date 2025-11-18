import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the original CSV file
const inputFile = path.join(__dirname, 'Liste_affectation_Fulmen_ok.csv');
const outputFile = path.join(__dirname, 'Liste_affectation_Fulmen_filtered.csv');

// Target battery types to keep - exact matches only
const targetBatteryTypes = ['F1', 'F3', 'F4', 'F6', 'F7', 'F8', 'F10', 'F12', 'F41'];

try {
  // Read the file content
  const fileContent = fs.readFileSync(inputFile, 'utf8');
  const lines = fileContent.split('\n');
  
  // Keep the header
  const header = lines[0];
  const filteredLines = [header];
  
  // Process each data line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    const columns = line.split(';');
    if (columns.length < 9) continue; // Skip malformed lines
    
    // Check battery type columns (indices 6, 7, 8 for Battery_AGM, Battery_EFB, Battery_Conventional)
    const batteryAGM = columns[6] || '';
    const batteryEFB = columns[7] || '';
    const batteryConventional = columns[8] || '';
    
    // Check if any of the battery columns contains exactly one of our target types
    const hasTargetBattery = targetBatteryTypes.some(targetType => {
      // Split by common separators and check for exact matches
      const agmTypes = batteryAGM.split(/[,;\s]+/).filter(t => t.trim());
      const efbTypes = batteryEFB.split(/[,;\s]+/).filter(t => t.trim());
      const conventionalTypes = batteryConventional.split(/[,;\s]+/).filter(t => t.trim());
      
      return agmTypes.includes(targetType) || 
             efbTypes.includes(targetType) || 
             conventionalTypes.includes(targetType);
    });
    
    if (hasTargetBattery) {
      filteredLines.push(line);
    }
  }
  
  // Write the filtered data to new file
  const filteredContent = filteredLines.join('\n');
  fs.writeFileSync(outputFile, filteredContent, 'utf8');
  
  console.log(`✅ Filtered CSV created successfully!`);
  console.log(`📊 Original lines: ${lines.length - 1} (excluding header)`);
  console.log(`📊 Filtered lines: ${filteredLines.length - 1} (excluding header)`);
  console.log(`📁 Output file: ${outputFile}`);
  
} catch (error) {
  console.error('❌ Error processing CSV file:', error.message);
}
