const fs = require('fs');
const path = require('path');

/**
 * Merge duplicate model slugs by combining their motorisations
 * When the same modelSlug appears multiple times, merge all motorisations into one entry
 */

// Function to merge duplicate model slugs
function mergeDuplicateModelSlugs(batteryProducts) {
  console.log('🔧 Merging duplicate model slugs...\n');
  
  const modelMap = new Map();
  let totalMerges = 0;
  
  batteryProducts.forEach((product, index) => {
    const key = `${product.brandSlug}-${product.modelSlug}`;
    
    if (modelMap.has(key)) {
      // Merge motorisations
      const existingProduct = modelMap.get(key);
      console.log(`📝 Merging: ${product.brand} ${product.modelName} (${product.modelSlug})`);
      console.log(`   → Into: ${existingProduct.brand} ${existingProduct.modelName} (${existingProduct.modelSlug})`);
      console.log(`   → Adding ${product.motorisations.length} motorisations to existing ${existingProduct.motorisations.length}`);
      
      // Combine motorisations arrays
      existingProduct.motorisations = [...existingProduct.motorisations, ...product.motorisations];
      totalMerges++;
    } else {
      // First occurrence, store as is
      modelMap.set(key, {
        brand: product.brand,
        brandSlug: product.brandSlug,
        modelName: product.modelName,
        modelSlug: product.modelSlug,
        motorisations: [...product.motorisations]
      });
    }
  });
  
  const mergedProducts = Array.from(modelMap.values());
  
  console.log(`\n✅ Total merges: ${totalMerges}`);
  console.log(`📊 Original products: ${batteryProducts.length}`);
  console.log(`📊 Merged products: ${mergedProducts.length}`);
  
  return mergedProducts;
}

// Function to find and display duplicates
function findDuplicates(batteryProducts) {
  console.log('🔍 Finding duplicate model slugs...\n');
  
  const modelMap = new Map();
  const duplicates = [];
  
  batteryProducts.forEach((product, index) => {
    const key = `${product.brandSlug}-${product.modelSlug}`;
    
    if (modelMap.has(key)) {
      duplicates.push({
        key,
        brand: product.brand,
        modelName: product.modelName,
        modelSlug: product.modelSlug,
        motorisationsCount: product.motorisations.length,
        index
      });
    } else {
      modelMap.set(key, {
        brand: product.brand,
        modelName: product.modelName,
        modelSlug: product.modelSlug,
        motorisationsCount: product.motorisations.length,
        index
      });
    }
  });
  
  if (duplicates.length > 0) {
    console.log('📋 Duplicate model slugs found:');
    duplicates.forEach((dup, index) => {
      console.log(`\n${index + 1}. ${dup.brand} ${dup.modelName} (${dup.modelSlug})`);
      console.log(`   Motorisations: ${dup.motorisationsCount}`);
      console.log(`   Index: ${dup.index}`);
    });
  } else {
    console.log('✅ No duplicate model slugs found!');
  }
  
  return duplicates;
}

// Function to generate statistics
function generateStatistics(batteryProducts) {
  const stats = {
    totalProducts: batteryProducts.length,
    totalMotorisations: 0,
    brands: new Set(),
    modelSlugs: new Set(),
    batteryTypes: {
      AGM: 0,
      EFB: 0,
      Conventional: 0,
      Multiple: 0
    }
  };
  
  batteryProducts.forEach(product => {
    stats.brands.add(product.brand);
    stats.modelSlugs.add(product.modelSlug);
    stats.totalMotorisations += product.motorisations.length;
    
    product.motorisations.forEach(motorisation => {
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
    modelSlugs: Array.from(stats.modelSlugs).sort()
  };
}

// Function to show examples
function showExamples(batteryProducts, count = 5) {
  console.log('\n📋 Sample Battery Products (after merging):');
  batteryProducts.slice(0, count).forEach((product, index) => {
    console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
    console.log(`   Brand Slug: ${product.brandSlug}`);
    console.log(`   Model Slug: ${product.modelSlug}`);
    console.log(`   Motorisations: ${product.motorisations.length}`);
    
    // Show first few motorisations
    const sampleMotors = product.motorisations.slice(0, 2);
    sampleMotors.forEach((motor, motorIndex) => {
      console.log(`     ${motorIndex + 1}. ${motor.motorisation} (${motor.fuel})`);
      console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
    });
    
    if (product.motorisations.length > 2) {
      console.log(`     ... and ${product.motorisations.length - 2} more motorisations`);
    }
  });
}

// Function to find specific examples
function findExamples(batteryProducts, searchTerm) {
  return batteryProducts.filter(product => 
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.modelSlug.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Main function
function main() {
  const inputFile = 'battery-products-split.json';
  const inputPath = path.join(__dirname, inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputFile}`);
    return;
  }
  
  console.log('🔋 Merging Duplicate Model Slugs in Battery Products\n');
  console.log(`📄 File: ${inputFile}`);
  
  // Read the JSON file
  const batteryProducts = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  console.log(`📊 Original products: ${batteryProducts.length}`);
  
  // Find duplicates first
  const duplicates = findDuplicates(batteryProducts);
  
  // Merge duplicate model slugs
  const mergedProducts = mergeDuplicateModelSlugs(batteryProducts);
  
  // Generate statistics
  const stats = generateStatistics(mergedProducts);
  console.log('\n📊 Statistics (after merging):');
  console.log(`  Total products: ${stats.totalProducts}`);
  console.log(`  Total motorisations: ${stats.totalMotorisations}`);
  console.log(`  Unique brands: ${stats.brands.length}`);
  console.log(`  Unique model slugs: ${stats.modelSlugs.length}`);
  console.log(`  Battery types: AGM=${stats.batteryTypes.AGM}, EFB=${stats.batteryTypes.EFB}, Conventional=${stats.batteryTypes.Conventional}, Multiple=${stats.batteryTypes.Multiple}`);
  
  // Show examples
  showExamples(mergedProducts, 8);
  
  // Look for specific examples
  console.log('\n🔍 AUDI A1 examples (after merging):');
  const audiA1Examples = findExamples(mergedProducts, 'a1');
  audiA1Examples.forEach((product, index) => {
    console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
    console.log(`   Model Slug: ${product.modelSlug}`);
    console.log(`   Motorisations: ${product.motorisations.length}`);
  });
  
  // Save merged JSON file
  const outputPath = path.join(__dirname, 'battery-products-merged.json');
  fs.writeFileSync(outputPath, JSON.stringify(mergedProducts, null, 2), 'utf8');
  console.log(`\n✅ Merged JSON file saved to: ${outputPath}`);
  
  console.log('\n✅ Duplicate model slug merging complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the merged JSON file: battery-products-merged.json');
  console.log('2. Verify that duplicates are properly merged');
  console.log('3. Import the merged data into Strapi');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  mergeDuplicateModelSlugs,
  findDuplicates,
  generateStatistics,
  showExamples,
  findExamples
};
