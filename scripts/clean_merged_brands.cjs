const fs = require('fs');
const path = require('path');

// Read the merged brands file
const mergedPath = path.join(__dirname, 'merged_brands.json');
const mergedContent = fs.readFileSync(mergedPath, 'utf8');
const mergedBrands = JSON.parse(mergedContent);

// Clean the brands by removing the source field
const cleanBrands = mergedBrands.map(brand => ({
  id: brand.id,
  name: brand.name,
  slug: brand.slug,
  isActive: brand.isActive
}));

// Write clean merged brands file
const outputPath = path.join(__dirname, 'final_brands.json');
fs.writeFileSync(outputPath, JSON.stringify(cleanBrands, null, 2));

console.log(`Clean merged brands file created!`);
console.log(`Total brands: ${cleanBrands.length}`);
console.log(`Output file: ${outputPath}`);

// Show sample
console.log(`\nSample clean brands:`);
console.log(JSON.stringify(cleanBrands.slice(0, 5), null, 2));
