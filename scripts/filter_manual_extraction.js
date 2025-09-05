import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the manual extraction CSV file
const inputFile = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_manual_complete.csv');
const outputFile = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_manual_filtered.csv');

try {
  const data = fs.readFileSync(inputFile, 'utf8');
  const lines = data.split('\n');
  
  // Get header
  const header = lines[0];
  
  // Target battery types
  const targetBatteryTypes = ['F1', 'F3', 'F4', 'F6', 'F7', 'F8', 'F10', 'F12', 'F41'];
  
  // Filter lines
  const filteredLines = [header]; // Start with header
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    // Split by semicolon
    const columns = line.split(';');
    if (columns.length < 9) continue; // Skip malformed lines
    
    // Check battery columns (AGM, EFB, Conventional)
    const agmBattery = columns[6] || '';
    const efbBattery = columns[7] || '';
    const conventionalBattery = columns[8] || '';
    
    // Check if any battery type exactly matches one of our target types
    const hasTargetBattery = targetBatteryTypes.some(targetType => {
      // Split battery strings by common delimiters and check for exact matches
      const agmTypes = agmBattery.split(/[,;\s]+/).filter(t => t.trim());
      const efbTypes = efbBattery.split(/[,;\s]+/).filter(t => t.trim());
      const conventionalTypes = conventionalBattery.split(/[,;\s]+/).filter(t => t.trim());
      
      return agmTypes.includes(targetType) || 
             efbTypes.includes(targetType) || 
             conventionalTypes.includes(targetType);
    });
    
    if (hasTargetBattery) {
      filteredLines.push(line);
    }
  }
  
  // Write filtered data
  const filteredData = filteredLines.join('\n');
  fs.writeFileSync(outputFile, filteredData, 'utf8');
  
  console.log(`✅ Filtering complete!`);
  console.log(`📊 Original lines: ${lines.length - 1} (excluding header)`);
  console.log(`📊 Filtered lines: ${filteredLines.length - 1} (excluding header)`);
  console.log(`📁 Output file: ${outputFile}`);
  console.log(`🎯 Target battery types: ${targetBatteryTypes.join(', ')}`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
