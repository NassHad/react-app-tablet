const fs = require('fs');
const path = require('path');

console.log('🔄 Starting light positions merge process...');

// Read the parsed OSRAM data
const inputFile = path.join(__dirname, 'osram_bulbs_parsed.json');
const outputFile = path.join(__dirname, 'osram_bulbs_merged.json');

try {
  console.log('📖 Reading osram_bulbs_parsed.json...');
  const rawData = fs.readFileSync(inputFile, 'utf8');
  const bulbsData = JSON.parse(rawData);
  
  console.log(`📊 Found ${bulbsData.length} entries to process`);
  
  // Group by unique key: brand + model + constructionYear
  const groupedData = new Map();
  
  bulbsData.forEach(entry => {
    const key = `${entry.brand}|${entry.model}|${JSON.stringify(entry.constructionYear)}`;
    
    if (!groupedData.has(key)) {
      groupedData.set(key, {
        baseEntry: entry,
        lightPositions: []
      });
    }
    
    // Add light position data
    groupedData.get(key).lightPositions.push({
      ref: entry.lightType,
      position: entry.position,
      category: entry.category
    });
  });
  
  console.log(`🔗 Grouped into ${groupedData.size} unique vehicle models`);
  
  // Transform grouped data into merged format
  const mergedData = [];
  let newId = 1;
  
  groupedData.forEach((group, key) => {
    const { baseEntry, lightPositions } = group;
    
    // Create the merged entry
    const mergedEntry = {
      id: newId++,
      brand: baseEntry.brand,
      model: baseEntry.model,
      constructionYear: baseEntry.constructionYear,
      typeConception: baseEntry.typeConception,
      lightType: {},
      position: lightPositions.length > 1 ? "Multiple positions" : lightPositions[0].position,
      category: lightPositions.length > 1 ? "multiple" : lightPositions[0].category,
      partNumber: baseEntry.partNumber || "",
      notes: baseEntry.notes || "",
      source: baseEntry.source
    };
    
    // Build the lightType object with positions
    lightPositions.forEach((lightPos, index) => {
      const positionKey = `position${index + 1}`;
      mergedEntry.lightType[positionKey] = {
        ref: lightPos.ref,
        position: lightPos.position,
        category: lightPos.category
      };
    });
    
    mergedData.push(mergedEntry);
  });
  
  console.log(`✅ Created ${mergedData.length} merged entries`);
  
  // Write the merged data to file
  fs.writeFileSync(outputFile, JSON.stringify(mergedData, null, 2));
  
  console.log(`💾 Merged data saved to ${outputFile}`);
  
  // Show some statistics
  const singlePositionCount = mergedData.filter(entry => Object.keys(entry.lightType).length === 1).length;
  const multiplePositionCount = mergedData.filter(entry => Object.keys(entry.lightType).length > 1).length;
  
  console.log('\n📈 Statistics:');
  console.log(`   • Single position entries: ${singlePositionCount}`);
  console.log(`   • Multiple position entries: ${multiplePositionCount}`);
  console.log(`   • Total reduction: ${bulbsData.length - mergedData.length} entries (${((bulbsData.length - mergedData.length) / bulbsData.length * 100).toFixed(1)}%)`);
  
  // Show a few examples
  console.log('\n🔍 Examples of merged entries:');
  
  // Show a single position example
  const singleExample = mergedData.find(entry => Object.keys(entry.lightType).length === 1);
  if (singleExample) {
    console.log('\n   Single position example:');
    console.log(`   Brand: ${singleExample.brand}, Model: ${singleExample.model}`);
    console.log(`   Light Type: ${JSON.stringify(singleExample.lightType, null, 4)}`);
  }
  
  // Show a multiple position example
  const multipleExample = mergedData.find(entry => Object.keys(entry.lightType).length > 1);
  if (multipleExample) {
    console.log('\n   Multiple positions example:');
    console.log(`   Brand: ${multipleExample.brand}, Model: ${multipleExample.model}`);
    console.log(`   Light Type: ${JSON.stringify(multipleExample.lightType, null, 4)}`);
  }
  
  console.log('\n🎉 Light positions merge completed successfully!');
  
} catch (error) {
  console.error('❌ Error during merge process:', error);
  process.exit(1);
}
