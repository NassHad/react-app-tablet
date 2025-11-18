const fs = require('fs');
const path = require('path');

/**
 * Convert ILV FULMEN ENDURANCE CSV to JSON for Strapi BatteryProduct entity
 * Groups by unique models and consolidates motorisations
 */

// Function to create slug from text
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Function to clean model name (remove parentheses and content)
function cleanModelName(modelName) {
  return modelName
    .replace(/\s*\([^)]*\)/g, '') // Remove parentheses and content
    .replace(/\s+/g, ' ') // Replace multiple spaces with single
    .trim();
}

// Function to parse CSV and convert to JSON
function csvToJsonBatteryProducts(csvFilePath) {
  const content = fs.readFileSync(csvFilePath, 'utf8');
  const lines = content.split('\n');
  
  console.log('🔋 Converting ILV FULMEN ENDURANCE CSV to JSON for Strapi\n');
  console.log(`📄 File: ${csvFilePath}`);
  console.log(`📊 Total lines: ${lines.length}`);
  
  // Skip header line
  const dataLines = lines.slice(1).filter(line => line.trim());
  
  const modelsMap = new Map();
  
  // Process each line
  dataLines.forEach((line, index) => {
    const parts = line.split(';');
    
    if (parts.length < 9) {
      console.log(`⚠️ Skipping line ${index + 2}: insufficient columns`);
      return;
    }
    
    const [
      brand,
      vehicle,
      motorisation,
      fuel,
      startDate,
      endDate,
      batteryAGM,
      batteryEFB,
      batteryConventional
    ] = parts.map(part => part.trim());
    
    // Skip empty lines
    if (!brand || !vehicle || !motorisation || !fuel) {
      return;
    }
    
    // Clean model name
    const cleanedModelName = cleanModelName(vehicle);
    const modelKey = `${brand}|${cleanedModelName}`;
    
    // Create motorisation object
    const motorisationObj = {
      motorisation: motorisation,
      fuel: fuel,
      startDate: startDate || '',
      endDate: endDate || '',
      batteryAGM: batteryAGM || '',
      batteryEFB: batteryEFB || '',
      batteryConventional: batteryConventional || ''
    };
    
    // Add to models map
    if (!modelsMap.has(modelKey)) {
      modelsMap.set(modelKey, {
        brand: brand,
        brandSlug: createSlug(brand),
        modelName: cleanedModelName,
        modelSlug: createSlug(cleanedModelName),
        motorisations: []
      });
    }
    
    // Add motorisation to the model
    modelsMap.get(modelKey).motorisations.push(motorisationObj);
  });
  
  // Convert map to array
  const batteryProducts = Array.from(modelsMap.values());
  
  return batteryProducts;
}

// Function to generate statistics
function generateStatistics(batteryProducts) {
  const stats = {
    totalModels: batteryProducts.length,
    totalMotorisations: 0,
    brands: new Set(),
    fuelTypes: new Set(),
    batteryTypes: {
      AGM: 0,
      EFB: 0,
      Conventional: 0,
      Multiple: 0
    }
  };
  
  batteryProducts.forEach(model => {
    stats.brands.add(model.brand);
    stats.totalMotorisations += model.motorisations.length;
    
    model.motorisations.forEach(motorisation => {
      stats.fuelTypes.add(motorisation.fuel);
      
      const batteryCount = [
        motorisation.batteryAGM,
        motorisation.batteryEFB,
        motorisation.batteryConventional
      ].filter(b => b && b.trim() !== '').length;
      
      if (batteryCount > 1) {
        stats.batteryTypes.Multiple++;
      } else if (motorisation.batteryAGM && motorisation.batteryAGM.trim() !== '') {
        stats.batteryTypes.AGM++;
      } else if (motorisation.batteryEFB && motorisation.batteryEFB.trim() !== '') {
        stats.batteryTypes.EFB++;
      } else if (motorisation.batteryConventional && motorisation.batteryConventional.trim() !== '') {
        stats.batteryTypes.Conventional++;
      }
    });
  });
  
  return {
    ...stats,
    brands: Array.from(stats.brands).sort(),
    fuelTypes: Array.from(stats.fuelTypes).sort()
  };
}

// Function to save JSON file
function saveJsonFile(data, outputPath) {
  const jsonContent = JSON.stringify(data, null, 2);
  fs.writeFileSync(outputPath, jsonContent, 'utf8');
  console.log(`✅ JSON file saved to: ${outputPath}`);
}

// Function to show examples
function showExamples(batteryProducts, count = 3) {
  console.log('\n📋 Sample Battery Products:');
  batteryProducts.slice(0, count).forEach((model, index) => {
    console.log(`\n${index + 1}. ${model.brand} ${model.modelName}`);
    console.log(`   Brand Slug: ${model.brandSlug}`);
    console.log(`   Model Slug: ${model.modelSlug}`);
    console.log(`   Motorisations: ${model.motorisations.length}`);
    
    // Show first few motorisations
    model.motorisations.slice(0, 2).forEach((motor, motorIndex) => {
      console.log(`     ${motorIndex + 1}. ${motor.motorisation} (${motor.fuel})`);
      console.log(`        Dates: ${motor.startDate} - ${motor.endDate}`);
      console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
    });
    
    if (model.motorisations.length > 2) {
      console.log(`     ... and ${model.motorisations.length - 2} more motorisations`);
    }
  });
}

// Function to find specific examples
function findExamples(batteryProducts, searchTerm) {
  return batteryProducts.filter(model => 
    model.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.modelName.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Main function
function main() {
  const inputFile = process.argv[2] || 'ILV-FULMEN-ENDURANCE_manual_complete_accurate_fixed.csv';
  const inputPath = path.join(__dirname, inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputFile}`);
    return;
  }
  
  // Convert CSV to JSON
  const batteryProducts = csvToJsonBatteryProducts(inputPath);
  console.log(`✅ Converted ${batteryProducts.length} unique models`);
  
  // Generate statistics
  const stats = generateStatistics(batteryProducts);
  console.log('\n📊 Statistics:');
  console.log(`  Total models: ${stats.totalModels}`);
  console.log(`  Total motorisations: ${stats.totalMotorisations}`);
  console.log(`  Unique brands: ${stats.brands.length}`);
  console.log(`  Fuel types: ${stats.fuelTypes.join(', ')}`);
  console.log(`  Battery types: AGM=${stats.batteryTypes.AGM}, EFB=${stats.batteryTypes.EFB}, Conventional=${stats.batteryTypes.Conventional}, Multiple=${stats.batteryTypes.Multiple}`);
  
  // Show examples
  showExamples(batteryProducts, 5);
  
  // Look for VOLVO XC90 example
  console.log('\n🔍 Searching for VOLVO XC90 example...');
  const volvoExamples = findExamples(batteryProducts, 'VOLVO');
  const xc90Examples = findExamples(batteryProducts, 'XC90');
  
  console.log(`Found ${volvoExamples.length} VOLVO models`);
  console.log(`Found ${xc90Examples.length} XC90 models`);
  
  if (volvoExamples.length > 0) {
    console.log('\n📋 VOLVO examples:');
    volvoExamples.forEach((model, index) => {
      console.log(`${index + 1}. ${model.brand} ${model.modelName}`);
      console.log(`   Motorisations: ${model.motorisations.length}`);
      model.motorisations.slice(0, 2).forEach((motor, motorIndex) => {
        console.log(`     ${motorIndex + 1}. ${motor.motorisation} (${motor.fuel})`);
        console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
      });
    });
  }
  
  if (xc90Examples.length > 0) {
    console.log('\n📋 XC90 examples:');
    xc90Examples.forEach((model, index) => {
      console.log(`${index + 1}. ${model.brand} ${model.modelName}`);
      console.log(`   Motorisations: ${model.motorisations.length}`);
      model.motorisations.forEach((motor, motorIndex) => {
        console.log(`     ${motorIndex + 1}. ${motor.motorisation} (${motor.fuel})`);
        console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
      });
    });
  }
  
  // Save JSON file
  const outputPath = path.join(__dirname, 'battery-products.json');
  saveJsonFile(batteryProducts, outputPath);
  
  console.log('\n✅ CSV to JSON conversion complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the JSON file: battery-products.json');
  console.log('2. Import into Strapi BatteryProduct entity');
  console.log('3. Verify the data structure matches your requirements');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  csvToJsonBatteryProducts,
  createSlug,
  cleanModelName,
  generateStatistics,
  saveJsonFile,
  showExamples,
  findExamples
};
