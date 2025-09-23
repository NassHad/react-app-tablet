const fs = require('fs');
const path = require('path');

console.log('🔄 Adding date information using separate brandSlug and modelSlug search...');

try {
  // Read the osram_models.json file
  const modelsFile = path.join(__dirname, 'osram_models.json');
  const modelsData = JSON.parse(fs.readFileSync(modelsFile, 'utf8'));
  
  // Read the osram_bulbs_with_slugs.json file
  const bulbsFile = path.join(__dirname, 'osram_bulbs_with_slugs.json');
  const bulbsData = JSON.parse(fs.readFileSync(bulbsFile, 'utf8'));
  
  console.log(`📊 Found ${modelsData.length} models in osram_models.json`);
  console.log(`📊 Found ${bulbsData.length} bulb entries in osram_bulbs_with_slugs.json`);
  
  // Create a map of bulb entries by brandSlug and modelSlug separately
  const bulbMap = new Map();
  
  bulbsData.forEach(bulb => {
    if (bulb.brandSlug && bulb.modelSlug && bulb.constructionYear) {
      const key = `${bulb.brandSlug}-${bulb.modelSlug}`;
      if (!bulbMap.has(key)) {
        bulbMap.set(key, {
          start: bulb.constructionYear.start,
          end: bulb.constructionYear.end
        });
      }
    }
  });
  
  console.log(`🗺️  Created lookup map with ${bulbMap.size} unique brand-model slug combinations`);
  
  let matchedCount = 0;
  let unmatchedCount = 0;
  const unmatchedModels = [];
  const matchedModels = [];
  
  // Add date information to models using separate slug search
  modelsData.forEach(model => {
    if (model.brandSlug && model.modelSlug) {
      // Strip parentheses content and forward slashes from model name for matching
      const cleanModelName = model.name.replace(/\s*\([^)]*\)\s*/g, '').trim();
      const cleanModelSlug = cleanModelName
        .replace(/\s*\/\s*/g, '-')  // Replace forward slashes with dashes
        .toLowerCase()
        .replace(/\s+/g, '-');
      
      // Search for exact match: both brandSlug and clean modelSlug must match
      const key = `${model.brandSlug}-${cleanModelSlug}`;
      const dateInfo = bulbMap.get(key);
      
      if (dateInfo) {
        model.constructionYear = {
          start: dateInfo.start,
          end: dateInfo.end
        };
        matchedCount++;
        matchedModels.push({
          brandSlug: model.brandSlug,
          modelSlug: model.modelSlug,
          cleanModelSlug: cleanModelSlug,
          name: model.name,
          start: dateInfo.start,
          end: dateInfo.end,
          searchKey: key
        });
      } else {
        unmatchedCount++;
        unmatchedModels.push({
          brandSlug: model.brandSlug,
          modelSlug: model.modelSlug,
          cleanModelSlug: cleanModelSlug,
          name: model.name,
          searchKey: key
        });
      }
    } else {
      unmatchedCount++;
      unmatchedModels.push({
        brandSlug: model.brandSlug || 'MISSING',
        modelSlug: model.modelSlug || 'MISSING',
        name: model.name || 'MISSING',
        searchKey: 'MISSING_SLUGS'
      });
    }
  });
  
  console.log(`✅ Matched ${matchedCount} models with date information`);
  console.log(`❌ ${unmatchedCount} models without date information`);
  
  // Write the updated models data back
  fs.writeFileSync(modelsFile, JSON.stringify(modelsData, null, 2));
  
  // Create detailed log files
  const logDir = path.join(__dirname, 'separate_slug_matching_logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  
  // Log matched models
  const matchedLogFile = path.join(logDir, 'matched_models_separate_slugs.txt');
  let matchedLog = 'MATCHED MODELS WITH DATES (SEPARATE SLUG SEARCH):\n';
  matchedLog += '='.repeat(70) + '\n\n';
  matchedLog += `Total matched: ${matchedCount}\n\n`;
  matchedModels.forEach((model, index) => {
    matchedLog += `${index + 1}. ${model.brandSlug} - ${model.name}\n`;
    matchedLog += `   Original Model Slug: ${model.modelSlug}\n`;
    matchedLog += `   Clean Model Slug: ${model.cleanModelSlug}\n`;
    matchedLog += `   Search Key: ${model.searchKey}\n`;
    matchedLog += `   Dates: ${model.start} - ${model.end}\n\n`;
  });
  fs.writeFileSync(matchedLogFile, matchedLog);
  
  // Log unmatched models
  const unmatchedLogFile = path.join(logDir, 'unmatched_models_separate_slugs.txt');
  let unmatchedLog = 'UNMATCHED MODELS (NO DATES) - SEPARATE SLUG SEARCH:\n';
  unmatchedLog += '='.repeat(70) + '\n\n';
  unmatchedLog += `Total unmatched: ${unmatchedCount}\n\n`;
  
  // Group by brand for better organization
  const unmatchedByBrand = {};
  unmatchedModels.forEach(model => {
    if (!unmatchedByBrand[model.brandSlug]) {
      unmatchedByBrand[model.brandSlug] = [];
    }
    unmatchedByBrand[model.brandSlug].push(model);
  });
  
  Object.keys(unmatchedByBrand).sort().forEach(brandSlug => {
    unmatchedLog += `\n${brandSlug.toUpperCase()}:\n`;
    unmatchedLog += '-'.repeat(50) + '\n';
    unmatchedByBrand[brandSlug].forEach((model, index) => {
      unmatchedLog += `${index + 1}. ${model.name}\n`;
      unmatchedLog += `   Original Model Slug: ${model.modelSlug}\n`;
      unmatchedLog += `   Clean Model Slug: ${model.cleanModelSlug || 'N/A'}\n`;
      unmatchedLog += `   Search Key: ${model.searchKey}\n\n`;
    });
  });
  
  fs.writeFileSync(unmatchedLogFile, unmatchedLog);
  
  // Create summary log
  const summaryLogFile = path.join(logDir, 'separate_slug_matching_summary.txt');
  let summaryLog = 'SEPARATE SLUG MATCHING SUMMARY\n';
  summaryLog += '='.repeat(70) + '\n\n';
  summaryLog += `Total models processed: ${modelsData.length}\n`;
  summaryLog += `Models with dates: ${matchedCount} (${((matchedCount/modelsData.length)*100).toFixed(1)}%)\n`;
  summaryLog += `Models without dates: ${unmatchedCount} (${((unmatchedCount/modelsData.length)*100).toFixed(1)}%)\n\n`;
  summaryLog += `Matching method: Separate brandSlug + clean modelSlug search\n`;
  summaryLog += `Source file: osram_bulbs_with_slugs.json\n`;
  summaryLog += `Search logic: Both brandSlug AND clean modelSlug must match exactly\n`;
  summaryLog += `Clean model slug: Strips parentheses content and forward slashes from model name\n\n`;
  summaryLog += `Log files created:\n`;
  summaryLog += `- matched_models_separate_slugs.txt: ${matchedCount} models with dates\n`;
  summaryLog += `- unmatched_models_separate_slugs.txt: ${unmatchedCount} models without dates\n`;
  summaryLog += `- separate_slug_matching_summary.txt: This summary\n\n`;
  summaryLog += `Generated on: ${new Date().toISOString()}\n`;
  
  fs.writeFileSync(summaryLogFile, summaryLog);
  
  console.log('\n📋 Examples of models with added dates:');
  matchedModels.slice(0, 10).forEach(model => {
    console.log(`   - ${model.brandSlug} ${model.name}: ${model.start} - ${model.end}`);
  });
  
  console.log('\n📋 Examples of models without dates:');
  unmatchedModels.slice(0, 10).forEach(model => {
    console.log(`   - ${model.brandSlug} ${model.name} (${model.modelSlug})`);
  });
  
  console.log('\n💾 Updated osram_models.json with date information');
  console.log(`📝 Detailed logs saved to: ${logDir}/`);
  console.log(`   - matched_models_separate_slugs.txt: ${matchedCount} models with dates`);
  console.log(`   - unmatched_models_separate_slugs.txt: ${unmatchedCount} models without dates`);
  console.log(`   - separate_slug_matching_summary.txt: Summary statistics`);
  
  // Calculate statistics
  const totalModels = modelsData.length;
  const modelsWithDates = modelsData.filter(m => m.constructionYear).length;
  const modelsWithoutDates = totalModels - modelsWithDates;
  
  console.log(`\n📊 Final Statistics:`);
  console.log(`   - Total models: ${totalModels}`);
  console.log(`   - Models with dates: ${modelsWithDates} (${((modelsWithDates/totalModels)*100).toFixed(1)}%)`);
  console.log(`   - Models without dates: ${modelsWithoutDates} (${((modelsWithoutDates/totalModels)*100).toFixed(1)}%)`);
  
  console.log('\n🎉 Date information addition using separate slug search completed successfully!');
  
} catch (error) {
  console.error('❌ Error during separate slug-based date addition:', error);
  process.exit(1);
}
