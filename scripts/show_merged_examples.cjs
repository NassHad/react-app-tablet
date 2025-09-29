const fs = require('fs');
const path = require('path');

// Read the merged JSON file
const jsonPath = path.join(__dirname, 'battery-products-merged.json');
const batteryProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('🔋 Merged Model Slugs Examples:\n');

// Find AUDI A1 examples
console.log('📋 AUDI A1 Examples (after merging):');
const audiA1Examples = batteryProducts.filter(product => 
  product.brand === 'AUDI' && product.modelName.includes('A1')
);

audiA1Examples.forEach((product, index) => {
  console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
  console.log(`   Model Slug: ${product.modelSlug}`);
  console.log(`   Motorisations: ${product.motorisations.length}`);
  
  product.motorisations.forEach((motor, motorIndex) => {
    console.log(`     ${motorIndex + 1}. ${motor.motorisation} (${motor.fuel})`);
    console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
  });
});

// Find CITROËN BERLINGO examples
console.log('\n📋 CITROËN BERLINGO Examples (after merging):');
const berlingoExamples = batteryProducts.filter(product => 
  product.brand === 'CITROËN' && product.modelName.includes('BERLINGO')
);

berlingoExamples.forEach((product, index) => {
  console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
  console.log(`   Model Slug: ${product.modelSlug}`);
  console.log(`   Motorisations: ${product.motorisations.length}`);
  
  product.motorisations.forEach((motor, motorIndex) => {
    console.log(`     ${motorIndex + 1}. ${motor.motorisation} (${motor.fuel})`);
    console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
  });
});

// Find RENAULT KANGOO examples
console.log('\n📋 RENAULT KANGOO Examples (after merging):');
const kangooExamples = batteryProducts.filter(product => 
  product.brand === 'RENAULT' && product.modelName.includes('KANGOO')
);

kangooExamples.forEach((product, index) => {
  console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
  console.log(`   Model Slug: ${product.modelSlug}`);
  console.log(`   Motorisations: ${product.motorisations.length}`);
  
  product.motorisations.forEach((motor, motorIndex) => {
    console.log(`     ${motorIndex + 1}. ${motor.motorisation} (${motor.fuel})`);
    console.log(`        Batteries: AGM=${motor.batteryAGM}, EFB=${motor.batteryEFB}, Conventional=${motor.batteryConventional}`);
  });
});

// Check for any remaining duplicates
console.log('\n🔍 Checking for remaining duplicates...');
const modelSlugCounts = {};
batteryProducts.forEach(product => {
  const key = `${product.brandSlug}-${product.modelSlug}`;
  modelSlugCounts[key] = (modelSlugCounts[key] || 0) + 1;
});

const remainingDuplicates = Object.entries(modelSlugCounts).filter(([key, count]) => count > 1);
if (remainingDuplicates.length > 0) {
  console.log('❌ Remaining duplicates found:');
  remainingDuplicates.forEach(([key, count]) => {
    console.log(`   ${key}: ${count} occurrences`);
  });
} else {
  console.log('✅ No remaining duplicates found!');
}
