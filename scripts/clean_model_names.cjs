const fs = require('fs');
const path = require('path');

// Read the final models file
const modelsPath = path.join(__dirname, 'final_models.json');
const modelsContent = fs.readFileSync(modelsPath, 'utf8');
const models = JSON.parse(modelsContent);

console.log(`Processing ${models.length} models...`);

// Function to clean model name by removing parenthetical information
function cleanModelName(name) {
  // Remove everything in parentheses and brackets
  return name.replace(/\s*\([^)]*\)/g, '').replace(/\s*\[[^\]]*\]/g, '').trim();
}

// Function to create a clean model slug
function createModelSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Create a map to track unique models by brandSlug + cleaned name
const modelMap = new Map();
const duplicates = [];
const cleaned = [];

models.forEach(model => {
  const cleanedName = cleanModelName(model.name);
  const key = `${model.brandSlug}-${cleanedName.toLowerCase()}`;
  
  if (modelMap.has(key)) {
    // This is a duplicate - check which one to keep
    const existing = modelMap.get(key);
    
    // Prefer the one without parentheses
    const currentHasParentheses = model.name.includes('(') || model.name.includes('[');
    const existingHasParentheses = existing.originalName.includes('(') || existing.originalName.includes('[');
    
    if (currentHasParentheses && !existingHasParentheses) {
      // Keep the existing one (without parentheses)
      duplicates.push({
        original: model.name,
        cleaned: cleanedName,
        kept: existing.originalName,
        reason: 'prefer without parentheses'
      });
    } else if (!currentHasParentheses && existingHasParentheses) {
      // Replace with current one (without parentheses)
      duplicates.push({
        original: existing.originalName,
        cleaned: cleanedName,
        kept: model.name,
        reason: 'replaced with version without parentheses'
      });
      
      modelMap.set(key, {
        id: model.id,
        name: cleanedName,
        brandSlug: model.brandSlug,
        modelSlug: createModelSlug(cleanedName),
        originalName: model.name
      });
    } else {
      // Both have or don't have parentheses - keep the first one
      duplicates.push({
        original: model.name,
        cleaned: cleanedName,
        kept: existing.originalName,
        reason: 'duplicate, kept first occurrence'
      });
    }
  } else {
    // New model
    if (cleanedName !== model.name) {
      cleaned.push({
        original: model.name,
        cleaned: cleanedName
      });
    }
    
    modelMap.set(key, {
      id: model.id,
      name: cleanedName,
      brandSlug: model.brandSlug,
      modelSlug: createModelSlug(cleanedName),
      originalName: model.name
    });
  }
});

// Convert map to array and sort by brand, then model
const cleanedModels = Array.from(modelMap.values()).sort((a, b) => {
  if (a.brandSlug === b.brandSlug) {
    return a.name.localeCompare(b.name);
  }
  return a.brandSlug.localeCompare(b.brandSlug);
});

// Reassign IDs sequentially
cleanedModels.forEach((model, index) => {
  model.id = index + 1;
  // Remove the originalName field for final output
  delete model.originalName;
});

// Write cleaned models file
const outputPath = path.join(__dirname, 'cleaned_models.json');
fs.writeFileSync(outputPath, JSON.stringify(cleanedModels, null, 2));

console.log(`\nCleaning complete!`);
console.log(`Original models: ${models.length}`);
console.log(`Cleaned models: ${cleanedModels.length}`);
console.log(`Removed duplicates: ${duplicates.length}`);
console.log(`Names cleaned: ${cleaned.length}`);
console.log(`Output file: ${outputPath}`);

// Show some examples of cleaning
console.log(`\nExamples of cleaned names:`);
cleaned.slice(0, 10).forEach(item => {
  console.log(`"${item.original}" → "${item.cleaned}"`);
});

// Show some examples of duplicates removed
console.log(`\nExamples of duplicates removed:`);
duplicates.slice(0, 10).forEach(item => {
  console.log(`"${item.original}" (kept: "${item.kept}") - ${item.reason}`);
});

// Show statistics by brand
const brandStats = {};
cleanedModels.forEach(model => {
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

// Show sample of cleaned models
console.log(`\nSample cleaned models:`);
console.log(JSON.stringify(cleanedModels.slice(0, 10), null, 2));
