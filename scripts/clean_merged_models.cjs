const fs = require('fs');
const path = require('path');

// Read the merged models file
const mergedPath = path.join(__dirname, 'merged_models.json');
const mergedContent = fs.readFileSync(mergedPath, 'utf8');
const mergedModels = JSON.parse(mergedContent);

// Clean the models by removing the source field
const cleanModels = mergedModels.map(model => ({
  id: model.id,
  name: model.name,
  brandSlug: model.brandSlug,
  modelSlug: model.modelSlug
}));

// Write clean merged models file
const outputPath = path.join(__dirname, 'final_models.json');
fs.writeFileSync(outputPath, JSON.stringify(cleanModels, null, 2));

console.log(`Clean merged models file created!`);
console.log(`Total models: ${cleanModels.length}`);
console.log(`Output file: ${outputPath}`);

// Show sample
console.log(`\nSample clean models:`);
console.log(JSON.stringify(cleanModels.slice(0, 10), null, 2));

// Show statistics by brand
const brandStats = {};
cleanModels.forEach(model => {
  if (!brandStats[model.brandSlug]) {
    brandStats[model.brandSlug] = 0;
  }
  brandStats[model.brandSlug]++;
});

console.log(`\nModels per brand (top 15):`);
Object.entries(brandStats)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([brand, count]) => {
    console.log(`${brand}: ${count} models`);
  });
