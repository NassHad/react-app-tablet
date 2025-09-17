const fs = require('fs');
const path = require('path');

// CSV column mapping based on the structure
const CSV_COLUMNS = {
  BRAND: 0,
  MODEL: 1,
  CONSTRUCTION_YEAR: 2,
  TYPE_CONCEPTION: 3,
  // Light positions (based on the header structure)
  HEADLIGHT_LEFT: 4,      // H7, H1, H4, etc.
  HEADLIGHT_RIGHT: 5,     // H7, H1, H4, etc.
  FOG_LIGHT_LEFT: 6,      // H11, H8, etc.
  FOG_LIGHT_RIGHT: 7,     // H11, H8, etc.
  SIGNAL_FRONT_LEFT: 8,   // W5W, W21W, etc.
  SIGNAL_FRONT_RIGHT: 9,  // W5W, W21W, etc.
  SIGNAL_REAR_LEFT: 10,   // PY21W, P21W, etc.
  SIGNAL_REAR_RIGHT: 11,  // PY21W, P21W, etc.
  REVERSE_LIGHT: 12,      // P21W, R5W, etc.
  LICENSE_PLATE: 13,      // W5W, C5W, etc.
  INTERIOR: 14,           // W5W, LED, etc.
  PART_NUMBER: 15,        // 6411, 6413, etc.
  NOTES: 16               // Additional notes
};

// Function to parse construction year range
function parseConstructionYear(yearStr) {
  if (!yearStr || yearStr.trim() === '') return { start: '', end: '' };
  
  const cleanYear = yearStr.trim();
  
  if (cleanYear.includes('->>')) {
    const startYear = cleanYear.replace('->>', '');
    return { start: startYear, end: 'Present' };
  } else if (cleanYear.includes('-')) {
    const [start, end] = cleanYear.split('-');
    return { start: start.trim(), end: end.trim() };
  } else {
    return { start: cleanYear, end: cleanYear };
  }
}

// Function to clean light type codes
function cleanLightType(lightType) {
  if (!lightType || lightType.trim() === '' || lightType === '-') return null;
  
  const clean = lightType.trim().toUpperCase();
  
  if (clean === '**' || clean === 'LED' || clean === 'T4W') return clean;
  
  const match = clean.match(/^([A-Z]\d+[A-Z]?)/);
  return match ? match[1] : clean;
}

// Function to determine light position based on the legend
function getLightPosition(columnIndex) {
  const positionMap = {
    [CSV_COLUMNS.HEADLIGHT_LEFT]: 'Feu de croisement', // Low beam headlight
    [CSV_COLUMNS.HEADLIGHT_RIGHT]: 'Feu de route', // High beam headlight
    [CSV_COLUMNS.FOG_LIGHT_LEFT]: 'Feux antibrouillard', // Fog lights
    [CSV_COLUMNS.FOG_LIGHT_RIGHT]: 'Feux de route supplémentaires', // Supplementary high beam
    [CSV_COLUMNS.SIGNAL_FRONT_LEFT]: 'Clignotant avant voiture', // Front turn signal
    [CSV_COLUMNS.SIGNAL_FRONT_RIGHT]: 'Clignotant avant moto', // Front motorcycle turn signal
    [CSV_COLUMNS.SIGNAL_REAR_LEFT]: 'Clignotant arrière voiture', // Rear turn signal
    [CSV_COLUMNS.SIGNAL_REAR_RIGHT]: 'Clignotant arrière moto', // Rear motorcycle turn signal
    [CSV_COLUMNS.REVERSE_LIGHT]: 'Feux de stop', // Brake lights
    [CSV_COLUMNS.LICENSE_PLATE]: 'Feux de plaque d\'immatriculation', // License plate lights
    [CSV_COLUMNS.INTERIOR]: 'Éclairage intérieur' // Interior lighting
  };
  return positionMap[columnIndex] || 'Unknown';
}

// Function to determine light category based on the legend
function getLightCategory(columnIndex) {
  if (columnIndex <= CSV_COLUMNS.HEADLIGHT_RIGHT) return 'feu_de_croisement';
  if (columnIndex <= CSV_COLUMNS.FOG_LIGHT_RIGHT) return 'feu_antibrouillard';
  if (columnIndex <= CSV_COLUMNS.SIGNAL_REAR_RIGHT) return 'clignotant';
  if (columnIndex === CSV_COLUMNS.REVERSE_LIGHT) return 'feu_stop';
  if (columnIndex === CSV_COLUMNS.LICENSE_PLATE) return 'feu_plaque';
  if (columnIndex === CSV_COLUMNS.INTERIOR) return 'eclairage_interieur';
  return 'other';
}

// Function to process CSV data
function processOSRAMCSV(csvContent) {
  const lines = csvContent.split('\n');
  const lightData = [];
  let currentBrand = '';
  let entryId = 1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith(';') && line.split(';').every(cell => cell.trim() === '')) continue;
    
    const columns = line.split(';');
    
    // Check if this is a brand line
    if (columns[0] && columns[0].trim() !== '' && 
        columns.slice(1, 4).every(cell => cell.trim() === '')) {
      currentBrand = columns[0].trim();
      continue;
    }
    
    // Skip header lines
    if (line.includes('Modèle') || line.includes('construction') || 
        line.includes('Type/conception') || line.includes('Anno di costruzione')) {
      continue;
    }
    
    // Process vehicle model line
    if (columns[1] && columns[1].trim() !== '') {
      const model = columns[1].trim();
      const constructionYear = parseConstructionYear(columns[2]);
      const typeConception = columns[3] ? columns[3].trim() : '';
      
      // Process each light position
      for (let colIndex = CSV_COLUMNS.HEADLIGHT_LEFT; colIndex <= CSV_COLUMNS.INTERIOR; colIndex++) {
        const lightType = cleanLightType(columns[colIndex]);
        
        if (lightType && lightType !== '-') {
          const lightEntry = {
            id: entryId++,
            brand: currentBrand,
            model: model,
            constructionYear: constructionYear,
            typeConception: typeConception,
            lightType: lightType,
            position: getLightPosition(colIndex),
            category: getLightCategory(colIndex),
            partNumber: columns[CSV_COLUMNS.PART_NUMBER] ? columns[CSV_COLUMNS.PART_NUMBER].trim() : '',
            notes: columns[CSV_COLUMNS.NOTES] ? columns[CSV_COLUMNS.NOTES].trim() : '',
            source: 'OSRAM CSV Guide'
          };
          
          lightData.push(lightEntry);
        }
      }
    }
  }
  
  return lightData;
}

// Main processing function
function processOSRAMCSVData() {
  try {
    console.log('🔍 Processing OSRAM CSV data...');
    
    const inputFile = path.join(__dirname, 'GUIDE AMPOULES OSRAM.csv');
    const outputFile = path.join(__dirname, 'osram_lights_from_csv.json');
    const csvOutputFile = path.join(__dirname, 'osram_lights_from_csv.csv');
    
    console.log(`📁 Looking for file: ${inputFile}`);
    
    if (!fs.existsSync(inputFile)) {
      console.error(`❌ Input file not found: ${inputFile}`);
      return;
    }
    
    const csvContent = fs.readFileSync(inputFile, 'utf8');
    console.log(`📖 Read ${csvContent.length} characters from ${inputFile}`);
    
    const rawLightData = processOSRAMCSV(csvContent);
    console.log(`📊 Found ${rawLightData.length} raw light entries`);
    
    // Clean and deduplicate data
    const cleanedLightData = [];
    const seen = new Set();
    
    for (const light of rawLightData) {
      const key = `${light.brand}-${light.model}-${light.lightType}-${light.position}`;
      if (!seen.has(key)) {
        seen.add(key);
        cleanedLightData.push(light);
      }
    }
    
    console.log(`✅ Cleaned data: ${cleanedLightData.length} unique entries`);
    
    // Save as JSON
    fs.writeFileSync(outputFile, JSON.stringify(cleanedLightData, null, 2), 'utf8');
    console.log(`💾 JSON data saved to: ${outputFile}`);
    
    // Save as CSV
    const headers = [
      'ID', 'Brand', 'Model', 'ConstructionYearStart', 'ConstructionYearEnd', 
      'TypeConception', 'LightType', 'Position', 'Category', 'PartNumber', 'Notes', 'Source'
    ];
    const csvLines = [headers.join(',')];
    
    for (const light of cleanedLightData) {
      const row = [
        light.id,
        `"${light.brand}"`,
        `"${light.model}"`,
        `"${light.constructionYear.start}"`,
        `"${light.constructionYear.end}"`,
        `"${light.typeConception}"`,
        `"${light.lightType}"`,
        `"${light.position}"`,
        `"${light.category}"`,
        `"${light.partNumber}"`,
        `"${light.notes}"`,
        `"${light.source}"`
      ];
      csvLines.push(row.join(','));
    }
    
    const csvData = csvLines.join('\n');
    fs.writeFileSync(csvOutputFile, csvData, 'utf8');
    console.log(`📊 CSV data saved to: ${csvOutputFile}`);
    
    // Show summary
    console.log('\n📋 Summary:');
    console.log(`   Total entries: ${cleanedLightData.length}`);
    
    // Group by brand
    const brandCounts = {};
    for (const light of cleanedLightData) {
      brandCounts[light.brand] = (brandCounts[light.brand] || 0) + 1;
    }
    
    console.log('\n🏷️  Entries by brand:');
    for (const [brand, count] of Object.entries(brandCounts)) {
      console.log(`   ${brand}: ${count} entries`);
    }
    
    // Group by light type
    const lightTypeCounts = {};
    for (const light of cleanedLightData) {
      lightTypeCounts[light.lightType] = (lightTypeCounts[light.lightType] || 0) + 1;
    }
    
    console.log('\n💡 Entries by light type:');
    for (const [type, count] of Object.entries(lightTypeCounts)) {
      console.log(`   ${type}: ${count} entries`);
    }
    
    // Group by category
    const categoryCounts = {};
    for (const light of cleanedLightData) {
      categoryCounts[light.category] = (categoryCounts[light.category] || 0) + 1;
    }
    
    console.log('\n🔧 Entries by category:');
    for (const [category, count] of Object.entries(categoryCounts)) {
      console.log(`   ${category}: ${count} entries`);
    }
    
    // Show first few entries as preview
    console.log('\n📋 Preview of processed data:');
    console.log('-'.repeat(100));
    for (let i = 0; i < Math.min(10, cleanedLightData.length); i++) {
      const light = cleanedLightData[i];
      console.log(`${i + 1}. ${light.brand} ${light.model} (${light.constructionYear.start}-${light.constructionYear.end}) - ${light.lightType} ${light.position} [${light.category}]`);
    }
    console.log('-'.repeat(100));
    
  } catch (error) {
    console.error('❌ Error processing OSRAM CSV data:', error.message);
  }
}

// Run the processing
console.log('🚀 Starting OSRAM CSV processing...');
processOSRAMCSVData();
console.log('✅ Processing completed!');
