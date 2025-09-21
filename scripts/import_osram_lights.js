import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the parsed Osram bulbs data
const osramData = JSON.parse(fs.readFileSync(path.join(__dirname, 'osram_bulbs_parsed.json'), 'utf8'));

console.log(`📊 Loaded ${osramData.length} Osram light entries`);

// Step 1: Extract unique brands
const uniqueBrands = Array.from(new Set(osramData.map(item => item.brand)))
  .map(brand => ({
    name: brand,
    slug: brand.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    isActive: true
  }));

console.log(`🏷️ Found ${uniqueBrands.length} unique brands`);

// Step 2: Extract unique models with their brands and construction years
const modelMap = new Map();
osramData.forEach(item => {
  const key = `${item.brand}-${item.model}`;
  if (!modelMap.has(key)) {
    modelMap.set(key, {
      brand: item.brand,
      model: item.model,
      constructionYearStart: item.constructionYear.start,
      constructionYearEnd: item.constructionYear.end === 'Present' ? null : item.constructionYear.end,
      isActive: true
    });
  }
});

const uniqueModels = Array.from(modelMap.values());
console.log(`🚗 Found ${uniqueModels.length} unique models`);

// Step 3: Extract unique positions
const uniquePositions = Array.from(new Set(osramData.map(item => item.position)))
  .map(position => ({
    name: position,
    slug: position.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    isActive: true
  }));

console.log(`💡 Found ${uniquePositions.length} unique positions`);

// Step 4: Generate Strapi import commands
const generateStrapiImportCommands = () => {
  let commands = [];
  
  // Create brands
  commands.push('// Create Lights Brands');
  uniqueBrands.forEach((brand, index) => {
    commands.push(`await strapi.entityService.create('api::lights-brand.lights-brand', { 
  data: { 
    name: '${brand.name}', 
    slug: '${brand.slug}', 
    isActive: ${brand.isActive}, 
    publishedAt: new Date() 
  } 
});`);
  });
  
  commands.push('\n// Create Lights Models');
  uniqueModels.forEach((model, index) => {
    const brandSlug = model.brand.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const modelSlug = model.model.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    commands.push(`await strapi.entityService.create('api::lights-model.lights-model', { 
  data: { 
    name: '${model.model}', 
    slug: '${modelSlug}', 
    constructionYearStart: '${model.constructionYearStart}', 
    constructionYearEnd: ${model.constructionYearEnd ? `'${model.constructionYearEnd}'` : 'null'}, 
    isActive: ${model.isActive}, 
    lightsBrand: ${index + 1}, // Reference to brand ID
    publishedAt: new Date() 
  } 
});`);
  });
  
  commands.push('\n// Create Lights Positions');
  uniquePositions.forEach((position, index) => {
    commands.push(`await strapi.entityService.create('api::lights-position.lights-position', { 
  data: { 
    name: '${position.name}', 
    slug: '${position.slug}', 
    isActive: ${position.isActive}, 
    publishedAt: new Date() 
  } 
});`);
  });
  
  // Create light position data entries
  commands.push('\n// Create Light Position Data');
  osramData.forEach((item, index) => {
    const brandSlug = item.brand.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const modelSlug = item.model.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const positionSlug = item.position.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Find the model ID (this is a simplified approach - in practice you'd need to look up the actual IDs)
    const modelIndex = uniqueModels.findIndex(m => m.brand === item.brand && m.model === item.model);
    const positionIndex = uniquePositions.findIndex(p => p.name === item.position);
    
    commands.push(`await strapi.entityService.create('api::light-position-data.light-position-data', { 
  data: { 
    lightType: '${item.lightType}', 
    position: '${item.position}', 
    category: '${item.category}', 
    typeConception: '${item.typeConception}', 
    partNumber: '${item.partNumber}', 
    notes: '${item.notes}', 
    source: '${item.source}', 
    isActive: true, 
    lightsPosition: ${positionIndex + 1}, // Reference to position ID
    publishedAt: new Date() 
  } 
});`);
  });
  
  return commands;
};

// Generate the import commands
const importCommands = generateStrapiImportCommands();

// Write to file
const outputFile = path.join(__dirname, 'strapi_import_osram_lights.js');
fs.writeFileSync(outputFile, importCommands.join('\n'));

console.log(`✅ Generated Strapi import commands: ${outputFile}`);
console.log(`📝 Total commands: ${importCommands.length}`);

// Also create a summary file
const summary = {
  brands: uniqueBrands.length,
  models: uniqueModels.length,
  positions: uniquePositions.length,
  lightData: osramData.length,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(__dirname, 'osram_import_summary.json'), 
  JSON.stringify(summary, null, 2)
);

console.log('📊 Import Summary:');
console.log(`- Brands: ${summary.brands}`);
console.log(`- Models: ${summary.models}`);
console.log(`- Positions: ${summary.positions}`);
console.log(`- Light Data Entries: ${summary.lightData}`);
