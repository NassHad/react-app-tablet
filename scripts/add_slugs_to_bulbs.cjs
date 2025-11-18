const fs = require('fs');
const path = require('path');

console.log('🔄 Starting slug transformation process...');

// File paths
const inputFile = path.join(__dirname, 'osram_bulbs_merged.json');
const brandsFile = path.join(__dirname, 'final_brands.json');
const modelsFile = path.join(__dirname, 'cleaned_models.json');
const outputFile = path.join(__dirname, 'osram_bulbs_with_slugs.json');
const logFile = path.join(__dirname, 'slug_transformation_log.txt');

try {
  // Read all files
  console.log('📖 Reading reference files...');
  const brandsData = JSON.parse(fs.readFileSync(brandsFile, 'utf8'));
  const modelsData = JSON.parse(fs.readFileSync(modelsFile, 'utf8'));
  const bulbsData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  
  console.log(`📊 Found ${brandsData.length} brands, ${modelsData.length} models, ${bulbsData.length} bulb entries`);
  
  // Create lookup maps for faster validation
  const brandSlugMap = new Map();
  brandsData.forEach(brand => {
    brandSlugMap.set(brand.slug, brand.name);
  });
  
  const modelSlugMap = new Map();
  modelsData.forEach(model => {
    if (!modelSlugMap.has(model.modelSlug)) {
      modelSlugMap.set(model.modelSlug, []);
    }
    modelSlugMap.get(model.modelSlug).push({ name: model.name, brandSlug: model.brandSlug });
  });
  
  console.log(`🗺️  Created lookup maps: ${brandSlugMap.size} brand slugs, ${modelSlugMap.size} model slugs`);
  
  // Helper functions
  function generateBrandSlug(brandName) {
    return brandName.toLowerCase().replace(/\s+/g, '-');
  }
  
  function generateModelSlug(modelName) {
    // Remove parentheses and content inside, then convert to lowercase and replace spaces/slashes with dashes
    return modelName
      .replace(/\s*\([^)]*\)\s*/g, '') // Remove parentheses and content inside
      .trim() // Remove leading/trailing spaces
      .toLowerCase()
      .replace(/\s*\/\s*/g, '-') // Replace forward slashes (with optional spaces) with dashes
      .replace(/\s+/g, '-'); // Replace spaces with dashes
  }
  
  // Process each bulb entry
  const processedData = [];
  const unmatchedEntries = [];
  const stats = {
    total: bulbsData.length,
    matched: 0,
    unmatched: 0,
    brandOnlyMatched: 0,
    modelOnlyMatched: 0,
    neitherMatched: 0
  };
  
  console.log('🔄 Processing bulb entries...');
  
  bulbsData.forEach((entry, index) => {
    if (index % 500 === 0) {
      console.log(`   Processed ${index}/${bulbsData.length} entries...`);
    }
    
    // Generate slugs
    const brandSlug = generateBrandSlug(entry.brand);
    const modelSlug = generateModelSlug(entry.model);
    
    // Check if slugs exist in reference files
    const brandExists = brandSlugMap.has(brandSlug);
    const modelExists = modelSlugMap.has(modelSlug);
    
    // Check if model belongs to the correct brand
    let modelBelongsToBrand = false;
    if (modelExists) {
      const modelsWithSlug = modelSlugMap.get(modelSlug);
      modelBelongsToBrand = modelsWithSlug.some(model => model.brandSlug === brandSlug);
    }
    
    // Create new entry with slugs
    const newEntry = {
      ...entry,
      brandSlug: brandSlug,
      modelSlug: modelSlug,
      // Keep original brand and model for reference
      originalBrand: entry.brand,
      originalModel: entry.model
    };
    
    // Remove the old brand and model fields
    delete newEntry.brand;
    delete newEntry.model;
    
    processedData.push(newEntry);
    
    // Track statistics and unmatched entries
    if (brandExists && modelExists && modelBelongsToBrand) {
      stats.matched++;
    } else {
      stats.unmatched++;
      
      const unmatchedEntry = {
        id: entry.id,
        originalBrand: entry.brand,
        originalModel: entry.model,
        generatedBrandSlug: brandSlug,
        generatedModelSlug: modelSlug,
        brandExists: brandExists,
        modelExists: modelExists,
        modelBelongsToBrand: modelBelongsToBrand,
        issues: []
      };
      
      if (!brandExists) {
        unmatchedEntry.issues.push('Brand slug not found in brands.json');
        stats.neitherMatched++;
      } else if (!modelExists) {
        unmatchedEntry.issues.push('Model slug not found in cleaned_models.json');
        stats.brandOnlyMatched++;
      } else if (!modelBelongsToBrand) {
        unmatchedEntry.issues.push('Model exists but belongs to different brand');
        stats.modelOnlyMatched++;
      }
      
      unmatchedEntries.push(unmatchedEntry);
    }
  });
  
  // Write the processed data
  console.log('💾 Writing processed data...');
  fs.writeFileSync(outputFile, JSON.stringify(processedData, null, 2));
  
  // Write detailed log
  console.log('📝 Writing transformation log...');
  const logContent = [
    'OSRAM Bulbs Slug Transformation Log',
    '=====================================',
    '',
    `Generated on: ${new Date().toISOString()}`,
    '',
    'STATISTICS:',
    `Total entries processed: ${stats.total}`,
    `Matched entries: ${stats.matched} (${(stats.matched/stats.total*100).toFixed(1)}%)`,
    `Unmatched entries: ${stats.unmatched} (${(stats.unmatched/stats.total*100).toFixed(1)}%)`,
    '',
    'UNMATCHED BREAKDOWN:',
    `  - Brand only matched: ${stats.brandOnlyMatched}`,
    `  - Model only matched: ${stats.modelOnlyMatched}`,
    `  - Neither matched: ${stats.neitherMatched}`,
    '',
    'UNMATCHED ENTRIES DETAILS:',
    '==========================',
    ''
  ];
  
  unmatchedEntries.forEach((entry, index) => {
    logContent.push(`${index + 1}. ID: ${entry.id}`);
    logContent.push(`   Original Brand: "${entry.originalBrand}"`);
    logContent.push(`   Original Model: "${entry.originalModel}"`);
    logContent.push(`   Generated Brand Slug: "${entry.generatedBrandSlug}"`);
    logContent.push(`   Generated Model Slug: "${entry.generatedModelSlug}"`);
    logContent.push(`   Brand Exists: ${entry.brandExists}`);
    logContent.push(`   Model Exists: ${entry.modelExists}`);
    logContent.push(`   Model Belongs to Brand: ${entry.modelBelongsToBrand}`);
    logContent.push(`   Issues: ${entry.issues.join(', ')}`);
    logContent.push('');
  });
  
  fs.writeFileSync(logFile, logContent.join('\n'));
  
  // Display summary
  console.log('\n📈 TRANSFORMATION SUMMARY:');
  console.log(`   Total entries: ${stats.total}`);
  console.log(`   ✅ Matched: ${stats.matched} (${(stats.matched/stats.total*100).toFixed(1)}%)`);
  console.log(`   ❌ Unmatched: ${stats.unmatched} (${(stats.unmatched/stats.total*100).toFixed(1)}%)`);
  console.log(`   📊 Breakdown:`);
  console.log(`      - Brand only matched: ${stats.brandOnlyMatched}`);
  console.log(`      - Model only matched: ${stats.modelOnlyMatched}`);
  console.log(`      - Neither matched: ${stats.neitherMatched}`);
  
  console.log(`\n📁 Output files:`);
  console.log(`   - Processed data: ${outputFile}`);
  console.log(`   - Detailed log: ${logFile}`);
  
  // Show some examples
  console.log('\n🔍 EXAMPLES:');
  
  // Show a matched entry
  const matchedExample = processedData.find(entry => 
    brandSlugMap.has(entry.brandSlug) && 
    modelSlugMap.has(entry.modelSlug) &&
    modelSlugMap.get(entry.modelSlug).brandSlug === entry.brandSlug
  );
  
  if (matchedExample) {
    console.log('\n   ✅ Matched entry example:');
    console.log(`   Original: "${matchedExample.originalBrand}" / "${matchedExample.originalModel}"`);
    console.log(`   Slugs: "${matchedExample.brandSlug}" / "${matchedExample.modelSlug}"`);
  }
  
  // Show an unmatched entry
  if (unmatchedEntries.length > 0) {
    console.log('\n   ❌ Unmatched entry example:');
    const unmatched = unmatchedEntries[0];
    console.log(`   Original: "${unmatched.originalBrand}" / "${unmatched.originalModel}"`);
    console.log(`   Generated: "${unmatched.generatedBrandSlug}" / "${unmatched.generatedModelSlug}"`);
    console.log(`   Issues: ${unmatched.issues.join(', ')}`);
  }
  
  console.log('\n🎉 Slug transformation completed successfully!');
  
} catch (error) {
  console.error('❌ Error during transformation process:', error);
  process.exit(1);
}
