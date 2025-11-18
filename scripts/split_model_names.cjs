const fs = require('fs');
const path = require('path');

/**
 * Split model names that contain " / " or "," into separate models
 * Each split model gets the same motorisations but different modelSlug
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

// Function to split model names
function splitModelNames(batteryProducts) {
  console.log('🔧 Splitting model names with " / " and "," separators...\n');
  
  const newBatteryProducts = [];
  let totalSplits = 0;
  
  batteryProducts.forEach((product, productIndex) => {
    const modelName = product.modelName;
    
    // Check if model name contains " / " or ","
    if (modelName.includes(' / ') || modelName.includes(',')) {
      console.log(`📝 Splitting: ${product.brand} "${modelName}"`);
      
      // Split by " / " first, then by ","
      let modelNames = modelName.split(' / ');
      let allModelNames = [];
      
      modelNames.forEach(name => {
        if (name.includes(',')) {
          allModelNames.push(...name.split(',').map(n => n.trim()));
        } else {
          allModelNames.push(name.trim());
        }
      });
      
      // Create separate product for each model name
      allModelNames.forEach((splitModelName, index) => {
        const newProduct = {
          brand: product.brand,
          brandSlug: product.brandSlug,
          modelName: splitModelName,
          modelSlug: createSlug(splitModelName),
          motorisations: [...product.motorisations] // Copy motorisations array
        };
        
        newBatteryProducts.push(newProduct);
        console.log(`   → Created: ${newProduct.brand} ${newProduct.modelName} (slug: ${newProduct.modelSlug})`);
      });
      
      totalSplits += allModelNames.length - 1; // -1 because original counts as 1
    } else {
      // No splitting needed, keep original
      newBatteryProducts.push(product);
    }
  });
  
  console.log(`\n✅ Total model splits: ${totalSplits}`);
  console.log(`📊 Original models: ${batteryProducts.length}`);
  console.log(`📊 New models: ${newBatteryProducts.length}`);
  
  return newBatteryProducts;
}

// Function to generate statistics
function generateStatistics(batteryProducts) {
  const stats = {
    totalModels: batteryProducts.length,
    totalMotorisations: 0,
    brands: new Set(),
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
    brands: Array.from(stats.brands).sort()
  };
}

// Function to show examples
function showExamples(batteryProducts, count = 5) {
  console.log('\n📋 Sample Battery Products (after splitting):');
  batteryProducts.slice(0, count).forEach((model, index) => {
    console.log(`\n${index + 1}. ${model.brand} ${model.modelName}`);
    console.log(`   Brand Slug: ${model.brandSlug}`);
    console.log(`   Model Slug: ${model.modelSlug}`);
    console.log(`   Motorisations: ${model.motorisations.length}`);
    
    // Show first motorisation
    if (model.motorisations.length > 0) {
      const motor = model.motorisations[0];
      console.log(`     1. ${motor.motorisation} (${motor.fuel})`);
      console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
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
  const inputFile = 'battery-products.json';
  const inputPath = path.join(__dirname, inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputFile}`);
    return;
  }
  
  console.log('🔋 Splitting Model Names in Battery Products\n');
  console.log(`📄 File: ${inputFile}`);
  
  // Read the JSON file
  const batteryProducts = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  console.log(`📊 Original models: ${batteryProducts.length}`);
  
  // Split model names
  const splitBatteryProducts = splitModelNames(batteryProducts);
  
  // Generate statistics
  const stats = generateStatistics(splitBatteryProducts);
  console.log('\n📊 Statistics (after splitting):');
  console.log(`  Total models: ${stats.totalModels}`);
  console.log(`  Total motorisations: ${stats.totalMotorisations}`);
  console.log(`  Unique brands: ${stats.brands.length}`);
  console.log(`  Battery types: AGM=${stats.batteryTypes.AGM}, EFB=${stats.batteryTypes.EFB}, Conventional=${stats.batteryTypes.Conventional}, Multiple=${stats.batteryTypes.Multiple}`);
  
  // Show examples
  showExamples(splitBatteryProducts, 8);
  
  // Look for specific examples
  console.log('\n🔍 ALFA ROMEO 159 examples (after splitting):');
  const alfa159Examples = findExamples(splitBatteryProducts, '159');
  alfa159Examples.forEach((model, index) => {
    console.log(`\n${index + 1}. ${model.brand} ${model.modelName}`);
    console.log(`   Model Slug: ${model.modelSlug}`);
    console.log(`   Motorisations: ${model.motorisations.length}`);
  });
  
  console.log('\n🔍 AUDI A6 examples (after splitting):');
  const audiA6Examples = findExamples(splitBatteryProducts, 'A6');
  audiA6Examples.forEach((model, index) => {
    console.log(`\n${index + 1}. ${model.brand} ${model.modelName}`);
    console.log(`   Model Slug: ${model.modelSlug}`);
    console.log(`   Motorisations: ${model.motorisations.length}`);
  });
  
  // Save split JSON file
  const outputPath = path.join(__dirname, 'battery-products-split.json');
  fs.writeFileSync(outputPath, JSON.stringify(splitBatteryProducts, null, 2), 'utf8');
  console.log(`\n✅ Split JSON file saved to: ${outputPath}`);
  
  console.log('\n✅ Model name splitting complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the split JSON file: battery-products-split.json');
  console.log('2. Verify that models are properly separated');
  console.log('3. Import the split data into Strapi');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  splitModelNames,
  createSlug,
  generateStatistics,
  showExamples,
  findExamples
};
