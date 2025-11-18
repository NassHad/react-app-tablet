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

// Generate Strapi import commands with proper relationship handling
const generateStrapiImportCommands = () => {
  let commands = [];
  
  // Create a map to track brand IDs
  const brandIdMap = new Map();
  const modelIdMap = new Map();
  const positionIdMap = new Map();
  
  commands.push('// Import Osram Lights Data to Strapi');
  commands.push('// Run this script in the Strapi console or as a migration');
  commands.push('');
  
  // Create brands first
  commands.push('// Step 1: Create Lights Brands');
  commands.push('const brandIds = {};');
  commands.push('');
  
  uniqueBrands.forEach((brand, index) => {
    const brandId = index + 1;
    brandIdMap.set(brand.name, brandId);
    
    commands.push(`const brand${brandId} = await strapi.entityService.create('api::lights-brand.lights-brand', { 
  data: { 
    name: '${brand.name.replace(/'/g, "\\'")}', 
    slug: '${brand.slug}', 
    isActive: ${brand.isActive}, 
    publishedAt: new Date() 
  } 
});`);
    commands.push(`brandIds['${brand.name.replace(/'/g, "\\'")}'] = brand${brandId}.id;`);
    commands.push('');
  });
  
  // Create positions
  commands.push('// Step 2: Create Lights Positions');
  commands.push('const positionIds = {};');
  commands.push('');
  
  uniquePositions.forEach((position, index) => {
    const positionId = index + 1;
    positionIdMap.set(position.name, positionId);
    
    commands.push(`const position${positionId} = await strapi.entityService.create('api::lights-position.lights-position', { 
  data: { 
    name: '${position.name.replace(/'/g, "\\'")}', 
    slug: '${position.slug}', 
    isActive: ${position.isActive}, 
    publishedAt: new Date() 
  } 
});`);
    commands.push(`positionIds['${position.name.replace(/'/g, "\\'")}'] = position${positionId}.id;`);
    commands.push('');
  });
  
  // Create models with proper brand relationships
  commands.push('// Step 3: Create Lights Models');
  commands.push('const modelIds = {};');
  commands.push('');
  
  uniqueModels.forEach((model, index) => {
    const modelId = index + 1;
    const brandId = brandIdMap.get(model.brand);
    const modelSlug = model.model.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    modelIdMap.set(`${model.brand}-${model.model}`, modelId);
    
    commands.push(`const model${modelId} = await strapi.entityService.create('api::lights-model.lights-model', { 
  data: { 
    name: '${model.model.replace(/'/g, "\\'")}', 
    slug: '${modelSlug}', 
    constructionYearStart: '${model.constructionYearStart}', 
    constructionYearEnd: ${model.constructionYearEnd ? `'${model.constructionYearEnd}'` : 'null'}, 
    isActive: ${model.isActive}, 
    lightsBrand: brandIds['${model.brand.replace(/'/g, "\\'")}'],
    publishedAt: new Date() 
  } 
});`);
    commands.push(`modelIds['${model.brand.replace(/'/g, "\\'")}-${model.model.replace(/'/g, "\\'")}'] = model${modelId}.id;`);
    commands.push('');
  });
  
  // Create light position data entries (in batches to avoid memory issues)
  commands.push('// Step 4: Create Light Position Data (in batches)');
  commands.push('const batchSize = 1000;');
  commands.push('const totalEntries = ${osramData.length};');
  commands.push('');
  
  commands.push('for (let i = 0; i < totalEntries; i += batchSize) {');
  commands.push('  const batch = [');
  
  // Process in batches
  const batchSize = 1000;
  for (let i = 0; i < osramData.length; i += batchSize) {
    const batch = osramData.slice(i, i + batchSize);
    
    commands.push(`    // Batch ${Math.floor(i / batchSize) + 1} (entries ${i + 1}-${Math.min(i + batchSize, osramData.length)})`);
    
    batch.forEach((item, batchIndex) => {
      const globalIndex = i + batchIndex;
      const modelKey = `${item.brand}-${item.model}`;
      const modelId = modelIdMap.get(modelKey);
      const positionId = positionIdMap.get(item.position);
      
      if (modelId && positionId) {
        commands.push(`    await strapi.entityService.create('api::light-position-data.light-position-data', { 
      data: { 
        lightType: '${item.lightType.replace(/'/g, "\\'")}', 
        position: '${item.position.replace(/'/g, "\\'")}', 
        category: '${item.category}', 
        typeConception: '${item.typeConception.replace(/'/g, "\\'")}', 
        partNumber: '${item.partNumber.replace(/'/g, "\\'")}', 
        notes: '${item.notes.replace(/'/g, "\\'")}', 
        source: '${item.source.replace(/'/g, "\\'")}', 
        isActive: true, 
        lightsPosition: positionIds['${item.position.replace(/'/g, "\\'")}'],
        publishedAt: new Date() 
      } 
    });`);
      }
    });
    
    commands.push('  ];');
    commands.push('  console.log(`Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(osramData.length / batchSize)}`);');
    commands.push('}');
    commands.push('');
  }
  
  commands.push('console.log("✅ All Osram lights data imported successfully!");');
  
  return commands;
};

// Generate the import commands
const importCommands = generateStrapiImportCommands();

// Write to file
const outputFile = path.join(__dirname, 'strapi_import_osram_lights_improved.js');
fs.writeFileSync(outputFile, importCommands.join('\n'));

console.log(`✅ Generated improved Strapi import commands: ${outputFile}`);
console.log(`📝 Total commands: ${importCommands.length}`);

// Create a simpler version for testing with a small subset
const generateTestImport = () => {
  const testData = osramData.slice(0, 10); // First 10 entries for testing
  const testBrands = Array.from(new Set(testData.map(item => item.brand)));
  const testModels = Array.from(new Set(testData.map(item => `${item.brand}-${item.model}`)));
  const testPositions = Array.from(new Set(testData.map(item => item.position)));
  
  let testCommands = [];
  testCommands.push('// Test Import - First 10 Osram entries');
  testCommands.push('');
  
  // Create test brands
  testBrands.forEach((brand, index) => {
    testCommands.push(`await strapi.entityService.create('api::lights-brand.lights-brand', { 
  data: { 
    name: '${brand}', 
    slug: '${brand.toLowerCase().replace(/\s+/g, '-')}', 
    isActive: true, 
    publishedAt: new Date() 
  } 
});`);
  });
  
  testCommands.push('');
  testCommands.push('// Add more test commands as needed...');
  
  return testCommands;
};

const testCommands = generateTestImport();
const testOutputFile = path.join(__dirname, 'strapi_import_osram_test.js');
fs.writeFileSync(testOutputFile, testCommands.join('\n'));

console.log(`🧪 Generated test import commands: ${testOutputFile}`);
console.log('');
console.log('📋 Next Steps:');
console.log('1. Test with the small test file first: strapi_import_osram_test.js');
console.log('2. If successful, run the full import: strapi_import_osram_lights_improved.js');
console.log('3. Monitor Strapi logs for any errors during import');
