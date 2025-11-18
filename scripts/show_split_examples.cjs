const fs = require('fs');
const path = require('path');

// Read the split JSON file
const jsonPath = path.join(__dirname, 'battery-products-split.json');
const batteryProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('🔋 Model Splitting Examples:\n');

// Find ALFA ROMEO 159 examples
console.log('📋 ALFA ROMEO 159 Examples:');
const alfa159Examples = batteryProducts.filter(product => 
  product.brand === 'ALFA ROMEO' && product.modelName.includes('159')
);

alfa159Examples.forEach((product, index) => {
  console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
  console.log(`   Model Slug: ${product.modelSlug}`);
  console.log(`   Motorisations: ${product.motorisations.length}`);
  if (product.motorisations.length > 0) {
    const motor = product.motorisations[0];
    console.log(`   Sample: ${motor.motorisation} (${motor.fuel})`);
  }
});

// Find AUDI A6 examples
console.log('\n📋 AUDI A6 Examples:');
const audiA6Examples = batteryProducts.filter(product => 
  product.brand === 'AUDI' && product.modelName.includes('A6')
);

audiA6Examples.forEach((product, index) => {
  console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
  console.log(`   Model Slug: ${product.modelSlug}`);
  console.log(`   Motorisations: ${product.motorisations.length}`);
  if (product.motorisations.length > 0) {
    const motor = product.motorisations[0];
    console.log(`   Sample: ${motor.motorisation} (${motor.fuel})`);
  }
});

// Find AUDI A1 examples
console.log('\n📋 AUDI A1 Examples:');
const audiA1Examples = batteryProducts.filter(product => 
  product.brand === 'AUDI' && product.modelName.includes('A1')
);

audiA1Examples.forEach((product, index) => {
  console.log(`\n${index + 1}. ${product.brand} ${product.modelName}`);
  console.log(`   Model Slug: ${product.modelSlug}`);
  console.log(`   Motorisations: ${product.motorisations.length}`);
  if (product.motorisations.length > 0) {
    const motor = product.motorisations[0];
    console.log(`   Sample: ${motor.motorisation} (${motor.fuel})`);
  }
});
