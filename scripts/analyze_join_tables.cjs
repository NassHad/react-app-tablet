const fs = require('fs');

// Read the join tables CSV file
const csvContent = fs.readFileSync('join_tables_osram_file_csv.csv', 'utf8');
const lines = csvContent.split('\n');

console.log('🔍 Analyzing join_tables_osram_file_csv.csv');
console.log('='.repeat(60));

// Parse CSV structure
const brands = [];
const models = [];
const brandModels = {};
let currentBrand = '';
let entryCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  const columns = line.split(';');
  
  // Check if this is a brand header (has many empty columns)
  const emptyColumns = columns.slice(3).filter(col => col === '').length;
  
  if (emptyColumns >= 10 && columns[0] && columns[0].trim() !== '') {
    // This is likely a brand header
    const brandName = columns[0].trim();
    if (brandName && !brands.includes(brandName)) {
      brands.push(brandName);
      currentBrand = brandName;
      brandModels[brandName] = [];
      console.log(`\n🏷️  Brand: ${brandName}`);
    }
  } else if (columns[0] && columns[0].trim() !== '' && columns[1] && columns[1].trim() !== '') {
    // This is a model entry
    const modelName = columns[0].trim();
    const constructionYear = columns[1] ? columns[1].trim() : '';
    const typeConception = columns[2] ? columns[2].trim() : '';
    
    if (currentBrand && modelName && modelName !== currentBrand) {
      models.push(modelName);
      brandModels[currentBrand].push({
        model: modelName,
        year: constructionYear,
        type: typeConception
      });
      entryCount++;
    }
  }
}

console.log('\n📊 Summary:');
console.log(`Total brands: ${brands.length}`);
console.log(`Total models: ${models.length}`);
console.log(`Total entries: ${entryCount}`);

console.log('\n🏷️  All Brands:');
brands.forEach((brand, index) => {
  const modelCount = brandModels[brand] ? brandModels[brand].length : 0;
  console.log(`${index + 1}. ${brand} (${modelCount} models)`);
});

console.log('\n📋 Sample Models by Brand:');
Object.entries(brandModels).slice(0, 10).forEach(([brand, models]) => {
  console.log(`\n${brand}:`);
  models.slice(0, 5).forEach(model => {
    console.log(`  - ${model.model} (${model.year}) - ${model.type}`);
  });
  if (models.length > 5) {
    console.log(`  ... and ${models.length - 5} more models`);
  }
});

// Analyze the structure
console.log('\n🔧 File Structure Analysis:');
console.log(`Total lines: ${lines.length}`);
console.log(`Brand headers: ${brands.length}`);
console.log(`Model entries: ${entryCount}`);

// Check for light data columns
const sampleLine = lines.find(line => line.includes('H11') || line.includes('H7'));
if (sampleLine) {
  const sampleColumns = sampleLine.split(';');
  console.log(`\n💡 Light data columns detected: ${sampleColumns.length} total columns`);
  console.log('Sample light data structure:');
  console.log(`  Model: ${sampleColumns[0]}`);
  console.log(`  Year: ${sampleColumns[1]}`);
  console.log(`  Type: ${sampleColumns[2]}`);
  console.log(`  Light data starts at column 3: ${sampleColumns.slice(3, 8).join(', ')}...`);
}

console.log('\n✅ Analysis complete!');
