const fs = require('fs');
const path = require('path');

// Read the parsed OSRAM JSON file
const osramPath = path.join(__dirname, 'osram_bulbs_parsed.json');
const osramContent = fs.readFileSync(osramPath, 'utf8');
const osramData = JSON.parse(osramContent);

// Read the final brands file to get brand slug mappings
const brandsPath = path.join(__dirname, 'final_brands.json');
const brandsContent = fs.readFileSync(brandsPath, 'utf8');
const brands = JSON.parse(brandsContent);

// Create a map of brand name to brand slug
const brandSlugMap = new Map();
brands.forEach(brand => {
  brandSlugMap.set(brand.name.toUpperCase(), brand.slug);
});

console.log(`Processing ${osramData.length} OSRAM entries...`);

// Extract unique models from OSRAM data
const modelMap = new Map();

osramData.forEach(entry => {
  if (entry.brand && entry.model && 
      entry.brand.trim() !== '' && 
      entry.model.trim() !== '' &&
      !entry.brand.startsWith('*') && 
      !entry.brand.includes(';')) {
    
    const brandName = entry.brand.trim();
    const modelName = entry.model.trim();
    const brandSlug = brandSlugMap.get(brandName.toUpperCase());
    
    if (brandSlug) {
      // Create a unique key for model identification
      const modelKey = `${brandSlug}-${modelName.toLowerCase()}`;
      
      if (!modelMap.has(modelKey)) {
        // Create model slug
        const modelSlug = modelName
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
          .trim();
        
        modelMap.set(modelKey, {
          name: modelName,
          brandSlug: brandSlug,
          modelSlug: modelSlug,
          source: 'osram'
        });
      }
    } else {
      console.log(`Brand not found in final brands: ${brandName}`);
    }
  }
});

console.log(`Found ${modelMap.size} unique models from OSRAM data`);

// Convert to array and sort by brand, then model
const osramModels = Array.from(modelMap.values()).sort((a, b) => {
  if (a.brandSlug === b.brandSlug) {
    return a.name.localeCompare(b.name);
  }
  return a.brandSlug.localeCompare(b.brandSlug);
});

// Write OSRAM models file
const osramOutputPath = path.join(__dirname, 'osram_models.json');
fs.writeFileSync(osramOutputPath, JSON.stringify(osramModels, null, 2));

console.log(`OSRAM models saved to: ${osramOutputPath}`);

// Show sample models
console.log(`\nSample OSRAM models:`);
console.log(JSON.stringify(osramModels.slice(0, 10), null, 2));

// Show statistics by brand
const brandStats = {};
osramModels.forEach(model => {
  if (!brandStats[model.brandSlug]) {
    brandStats[model.brandSlug] = 0;
  }
  brandStats[model.brandSlug]++;
});

console.log(`\nModels per brand:`);
Object.entries(brandStats)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([brand, count]) => {
    console.log(`${brand}: ${count} models`);
  });
