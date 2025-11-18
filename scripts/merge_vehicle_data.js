import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read both CSV files
const csvDbFile = path.join(__dirname, 'csv_db_brand_model_date.csv');
const manualCompleteFile = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_manual_complete.csv');
const outputFile = path.join(__dirname, 'merged_vehicles.json');

try {
  // Read csv_db_brand_model_date.csv
  const csvDbData = fs.readFileSync(csvDbFile, 'utf8');
  const csvDbLines = csvDbData.split('\n');
  
  // Read ILV-FULMEN-ENDURANCE_manual_complete.csv
  const manualData = fs.readFileSync(manualCompleteFile, 'utf8');
  const manualLines = manualData.split('\n');
  
  // Set to store unique brand-model combinations
  const uniqueVehicles = new Set();
  const vehicles = [];
  
  // Helper function to split combined models and remove parentheses content
  function splitModels(modelString) {
    // First, remove everything in parentheses
    const cleanedString = modelString.replace(/\([^)]*\)/g, '').trim();
    
    // Then split by comma and clean up each model
    return cleanedString.split(',')
      .map(model => model.trim())
      .filter(model => model);
  }
  
  // Process csv_db_brand_model_date.csv (skip header lines)
  for (let i = 2; i < csvDbLines.length; i++) {
    const line = csvDbLines[i].trim();
    if (!line) continue;
    
    const columns = line.split(';');
    if (columns.length >= 2) {
      const brand = columns[0].trim();
      const modelString = columns[1].trim();
      
      if (brand && modelString) {
        // Split combined models into individual models
        const models = splitModels(modelString);
        
        models.forEach(model => {
          if (model) {
            const key = `${brand}|${model}`;
            if (!uniqueVehicles.has(key)) {
              uniqueVehicles.add(key);
              vehicles.push({
                brand: brand,
                model: model
              });
            }
          }
        });
      }
    }
  }
  
  // Process ILV-FULMEN-ENDURANCE_manual_complete.csv (skip header)
  for (let i = 1; i < manualLines.length; i++) {
    const line = manualLines[i].trim();
    if (!line) continue;
    
    const columns = line.split(';');
    if (columns.length >= 2) {
      const brand = columns[0].trim();
      const modelString = columns[1].trim();
      
      if (brand && modelString) {
        // Split combined models into individual models
        const models = splitModels(modelString);
        
        models.forEach(model => {
          if (model) {
            const key = `${brand}|${model}`;
            if (!uniqueVehicles.has(key)) {
              uniqueVehicles.add(key);
              vehicles.push({
                brand: brand,
                model: model
              });
            }
          }
        });
      }
    }
  }
  
  // Sort vehicles by brand, then by model
  vehicles.sort((a, b) => {
    if (a.brand !== b.brand) {
      return a.brand.localeCompare(b.brand);
    }
    return a.model.localeCompare(b.model);
  });
  
  // Create the JSON structure
  const result = {
    vehicles: vehicles,
    totalCount: vehicles.length,
    generatedAt: new Date().toISOString(),
    sourceFiles: [
      'csv_db_brand_model_date.csv',
      'ILV-FULMEN-ENDURANCE_manual_complete.csv'
    ]
  };
  
  // Write to JSON file
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
  
  console.log(`✅ Merge complete!`);
  console.log(`📊 Total unique vehicles: ${vehicles.length}`);
  console.log(`📁 Output file: ${outputFile}`);
  console.log(`📋 Sample entries:`);
  
  // Show first 10 entries as sample
  vehicles.slice(0, 10).forEach((vehicle, index) => {
    console.log(`   ${index + 1}. ${vehicle.brand} - ${vehicle.model}`);
  });
  
  if (vehicles.length > 10) {
    console.log(`   ... and ${vehicles.length - 10} more entries`);
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
