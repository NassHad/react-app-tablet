const fs = require('fs');
const path = require('path');

/**
 * Fix battery type assignments based on actual battery codes
 * - F40, F41, F42, F43 should be in batteryAGM (not EFB or Conventional)
 * - F30, F31, F32, FL954, FL1000, FL1050, FL652, FL955, FL752 should be in batteryEFB
 */

// Function to fix battery type assignments
function fixBatteryTypes(batteryProducts) {
  console.log('🔧 Fixing battery type assignments...\n');
  
  let totalFixes = 0;
  
  batteryProducts.forEach((product, productIndex) => {
    product.motorisations.forEach((motorisation, motorIndex) => {
      let fixed = false;
      
      // Check if F40, F41, F42, F43 are in batteryEFB or batteryConventional
      const agmCodes = ['F40', 'F41', 'F42', 'F43'];
      const efbCodes = ['F30', 'F31', 'F32', 'FL954', 'FL1000', 'FL1050', 'FL652', 'FL955', 'FL752'];
      
      // Move F40-F43 from EFB to AGM
      if (agmCodes.includes(motorisation.batteryEFB)) {
        console.log(`📝 Moving ${motorisation.batteryEFB} from EFB to AGM for ${product.brand} ${product.modelName}`);
        motorisation.batteryAGM = motorisation.batteryEFB;
        motorisation.batteryEFB = '';
        fixed = true;
        totalFixes++;
      }
      
      // Move F40-F43 from Conventional to AGM
      if (agmCodes.includes(motorisation.batteryConventional)) {
        console.log(`📝 Moving ${motorisation.batteryConventional} from Conventional to AGM for ${product.brand} ${product.modelName}`);
        motorisation.batteryAGM = motorisation.batteryConventional;
        motorisation.batteryConventional = '';
        fixed = true;
        totalFixes++;
      }
      
      // Move F30, F31, F32, FL-series from AGM to EFB
      if (efbCodes.includes(motorisation.batteryAGM)) {
        console.log(`📝 Moving ${motorisation.batteryAGM} from AGM to EFB for ${product.brand} ${product.modelName}`);
        motorisation.batteryEFB = motorisation.batteryAGM;
        motorisation.batteryAGM = '';
        fixed = true;
        totalFixes++;
      }
      
      // Move F30, F31, F32, FL-series from Conventional to EFB
      if (efbCodes.includes(motorisation.batteryConventional)) {
        console.log(`📝 Moving ${motorisation.batteryConventional} from Conventional to EFB for ${product.brand} ${product.modelName}`);
        motorisation.batteryEFB = motorisation.batteryConventional;
        motorisation.batteryConventional = '';
        fixed = true;
        totalFixes++;
      }
    });
  });
  
  console.log(`\n✅ Total fixes applied: ${totalFixes}`);
  return batteryProducts;
}

// Function to generate statistics after fixes
function generateStatistics(batteryProducts) {
  const stats = {
    totalModels: batteryProducts.length,
    totalMotorisations: 0,
    batteryTypes: {
      AGM: 0,
      EFB: 0,
      Conventional: 0,
      Multiple: 0
    }
  };
  
  batteryProducts.forEach(model => {
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
  
  return stats;
}

// Function to show examples
function showExamples(batteryProducts, count = 5) {
  console.log('\n📋 Sample Battery Products (after fixes):');
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
  const inputFile = 'battery-products.json';
  const inputPath = path.join(__dirname, inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputFile}`);
    return;
  }
  
  console.log('🔋 Fixing Battery Type Assignments\n');
  console.log(`📄 File: ${inputFile}`);
  
  // Read the JSON file
  const batteryProducts = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  console.log(`📊 Total models: ${batteryProducts.length}`);
  
  // Apply fixes
  const fixedBatteryProducts = fixBatteryTypes(batteryProducts);
  
  // Generate statistics
  const stats = generateStatistics(fixedBatteryProducts);
  console.log('\n📊 Statistics (after fixes):');
  console.log(`  Total models: ${stats.totalModels}`);
  console.log(`  Total motorisations: ${stats.totalMotorisations}`);
  console.log(`  Battery types: AGM=${stats.batteryTypes.AGM}, EFB=${stats.batteryTypes.EFB}, Conventional=${stats.batteryTypes.Conventional}, Multiple=${stats.batteryTypes.Multiple}`);
  
  // Show examples
  showExamples(fixedBatteryProducts, 5);
  
  // Look for VOLVO XC90 example
  console.log('\n🔍 VOLVO XC90 example (after fixes):');
  const volvoExamples = findExamples(fixedBatteryProducts, 'VOLVO');
  const xc90Examples = findExamples(fixedBatteryProducts, 'XC90');
  
  if (xc90Examples.length > 0) {
    const xc90 = xc90Examples[0];
    console.log(`\n📋 ${xc90.brand} ${xc90.modelName}`);
    console.log(`   Brand Slug: ${xc90.brandSlug}`);
    console.log(`   Model Slug: ${xc90.modelSlug}`);
    console.log(`   Motorisations: ${xc90.motorisations.length}`);
    
    xc90.motorisations.forEach((motor, motorIndex) => {
      console.log(`     ${motorIndex + 1}. ${motor.motorisation} (${motor.fuel})`);
      console.log(`        Dates: ${motor.startDate} - ${motor.endDate}`);
      console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
    });
  }
  
  // Save fixed JSON file
  const outputPath = path.join(__dirname, 'battery-products-fixed.json');
  fs.writeFileSync(outputPath, JSON.stringify(fixedBatteryProducts, null, 2), 'utf8');
  console.log(`\n✅ Fixed JSON file saved to: ${outputPath}`);
  
  console.log('\n✅ Battery type fixes complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the fixed JSON file: battery-products-fixed.json');
  console.log('2. Compare with the original to see the changes');
  console.log('3. Import the fixed data into Strapi');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  fixBatteryTypes,
  generateStatistics,
  showExamples,
  findExamples
};
