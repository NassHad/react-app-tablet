const fs = require('fs');
const path = require('path');

// Read the fixed JSON file
const jsonPath = path.join(__dirname, 'battery-products-fixed.json');
const batteryProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Find VOLVO XC90
const volvoXC90 = batteryProducts.find(product => 
  product.brand === 'VOLVO' && product.modelName === 'XC90 I'
);

if (volvoXC90) {
  console.log('🔋 VOLVO XC90 Example Structure (AFTER FIXES):\n');
  console.log(JSON.stringify(volvoXC90, null, 2));
} else {
  console.log('VOLVO XC90 not found');
}
