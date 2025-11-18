const fs = require('fs');

// Read the processed data
const data = JSON.parse(fs.readFileSync('osram_bulbs_from_csv.json', 'utf8'));

console.log('🚗 OSRAM Light Data Summary');
console.log('='.repeat(50));

// Total entries
console.log(`📊 Total entries: ${data.length}`);

// Brands
const brands = [...new Set(data.map(item => item.brand).filter(b => b))];
console.log(`\n🏷️  Brands found: ${brands.length}`);
brands.forEach(brand => console.log(`   - ${brand}`));

// Models
const models = [...new Set(data.map(item => item.model).filter(m => m))];
console.log(`\n🚙 Models found: ${models.length}`);
console.log('First 15 models:');
models.slice(0, 15).forEach(model => console.log(`   - ${model}`));
if (models.length > 15) {
  console.log(`   ... and ${models.length - 15} more`);
}

// Light positions
const positions = [...new Set(data.map(item => item.position))];
console.log(`\n💡 Light positions: ${positions.length}`);
positions.forEach(position => console.log(`   - ${position}`));

// Light types
const lightTypes = [...new Set(data.map(item => item.lightType).filter(t => t))];
console.log(`\n🔧 Light types: ${lightTypes.length}`);
console.log('Light types:');
lightTypes.forEach(type => console.log(`   - ${type}`));

// Categories
const categories = [...new Set(data.map(item => item.category))];
console.log(`\n📂 Categories: ${categories.length}`);
categories.forEach(category => console.log(`   - ${category}`));

// Entries by brand
console.log('\n📈 Entries by brand:');
const brandCounts = {};
data.forEach(item => {
  if (item.brand) {
    brandCounts[item.brand] = (brandCounts[item.brand] || 0) + 1;
  }
});
Object.entries(brandCounts).forEach(([brand, count]) => {
  console.log(`   ${brand}: ${count} entries`);
});

// Entries by position
console.log('\n💡 Entries by position:');
const positionCounts = {};
data.forEach(item => {
  positionCounts[item.position] = (positionCounts[item.position] || 0) + 1;
});
Object.entries(positionCounts).forEach(([position, count]) => {
  console.log(`   ${position}: ${count} entries`);
});

// Sample entries
console.log('\n📋 Sample entries:');
console.log('-'.repeat(80));
data.slice(0, 5).forEach((item, index) => {
  console.log(`${index + 1}. ${item.brand} ${item.model} (${item.constructionYear.start}-${item.constructionYear.end})`);
  console.log(`   ${item.position}: ${item.lightType} [${item.category}]`);
  console.log(`   Type: ${item.typeConception}`);
  console.log('');
});

console.log('✅ Data processing complete!');
