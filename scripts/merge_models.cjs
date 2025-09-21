const fs = require('fs');
const path = require('path');

// Read existing models.json
const modelsPath = path.join(__dirname, 'models.json');
const modelsContent = fs.readFileSync(modelsPath, 'utf8');
const existingModels = JSON.parse(modelsContent);

// Read OSRAM models
const osramModelsPath = path.join(__dirname, 'osram_models.json');
const osramModelsContent = fs.readFileSync(osramModelsPath, 'utf8');
const osramModels = JSON.parse(osramModelsContent);

console.log(`Existing models: ${existingModels.length}`);
console.log(`OSRAM models: ${osramModels.length}`);

// Create a map to track unique models by brandSlug + modelSlug
const modelMap = new Map();

// Add existing models first
existingModels.forEach((model, index) => {
  const key = `${model.brandSlug}-${model.name.toLowerCase()}`;
  modelMap.set(key, {
    id: index + 1,
    name: model.name,
    brandSlug: model.brandSlug,
    modelSlug: model.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'),
    source: 'existing'
  });
});

// Add OSRAM models, avoiding duplicates
let nextId = existingModels.length + 1;
let addedCount = 0;
let duplicateCount = 0;

osramModels.forEach(osramModel => {
  const key = `${osramModel.brandSlug}-${osramModel.name.toLowerCase()}`;
  
  if (modelMap.has(key)) {
    // Check if names are different but keys are same
    const existing = modelMap.get(key);
    if (existing.name !== osramModel.name) {
      console.log(`Name conflict for key "${key}": "${existing.name}" vs "${osramModel.name}"`);
    }
    duplicateCount++;
  } else {
    modelMap.set(key, {
      id: nextId++,
      name: osramModel.name,
      brandSlug: osramModel.brandSlug,
      modelSlug: osramModel.modelSlug,
      source: 'osram'
    });
    addedCount++;
  }
});

// Convert map to array and sort by brand, then model
const mergedModels = Array.from(modelMap.values()).sort((a, b) => {
  if (a.brandSlug === b.brandSlug) {
    return a.name.localeCompare(b.name);
  }
  return a.brandSlug.localeCompare(b.brandSlug);
});

// Reassign IDs sequentially
mergedModels.forEach((model, index) => {
  model.id = index + 1;
});

// Write merged models file
const outputPath = path.join(__dirname, 'merged_models.json');
fs.writeFileSync(outputPath, JSON.stringify(mergedModels, null, 2));

console.log(`\nMerging complete!`);
console.log(`Total merged models: ${mergedModels.length}`);
console.log(`Added from OSRAM: ${addedCount}`);
console.log(`Duplicates found: ${duplicateCount}`);
console.log(`Output file: ${outputPath}`);

// Show statistics by source
const existingCount = mergedModels.filter(m => m.source === 'existing').length;
const osramCount = mergedModels.filter(m => m.source === 'osram').length;

console.log(`\nFinal breakdown:`);
console.log(`- From existing models.json: ${existingCount}`);
console.log(`- From OSRAM data: ${osramCount}`);

// Show sample of merged models
console.log(`\nSample merged models:`);
console.log(JSON.stringify(mergedModels.slice(0, 10), null, 2));

// Show models by brand
const brandStats = {};
mergedModels.forEach(model => {
  if (!brandStats[model.brandSlug]) {
    brandStats[model.brandSlug] = 0;
  }
  brandStats[model.brandSlug]++;
});

console.log(`\nModels per brand (top 10):`);
Object.entries(brandStats)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([brand, count]) => {
    console.log(`${brand}: ${count} models`);
  });
