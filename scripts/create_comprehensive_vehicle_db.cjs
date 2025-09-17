const fs = require('fs');

// Read the comprehensive CSV file
const csvContent = fs.readFileSync('join_tables_osram_file_csv.csv', 'utf8');
const lines = csvContent.split('\n');

console.log('🚀 Creating comprehensive vehicle database...');
console.log('='.repeat(60));

// Light position mapping based on the CSV structure
const LIGHT_POSITIONS = {
  3: 'feu_croisement',        // Low beam headlight
  4: 'feu_route',            // High beam headlight  
  5: 'feux_antibrouillard',  // Fog lights
  6: 'feux_route_supplementaires', // Supplementary high beam
  7: 'clignotant_avant',     // Front turn signal
  8: 'clignotant_arriere',   // Rear turn signal
  9: 'feux_stop',            // Brake lights
  10: 'feux_plaque',         // License plate lights
  11: 'eclairage_interieur', // Interior lighting
  12: 'feu_coffre',          // Trunk lighting
  13: 'part_number',         // Part number
  14: 'notes'                // Additional notes
};

// French position names
const FRENCH_POSITIONS = {
  'feu_croisement': 'Feu de croisement',
  'feu_route': 'Feu de route',
  'feux_antibrouillard': 'Feux antibrouillard',
  'feux_route_supplementaires': 'Feux de route supplémentaires',
  'clignotant_avant': 'Clignotant avant',
  'clignotant_arriere': 'Clignotant arrière',
  'feux_stop': 'Feux de stop',
  'feux_plaque': 'Feux de plaque d\'immatriculation',
  'eclairage_interieur': 'Éclairage intérieur',
  'feu_coffre': 'Feu de coffre'
};

// Function to clean light type codes
function cleanLightType(lightType) {
  if (!lightType || lightType.trim() === '') return null;
  
  const clean = lightType.trim().toUpperCase();
  
  // Handle special cases including "-" for blank entries
  if (clean === '**' || clean === 'LED' || clean === 'T4W' || clean === '-') return clean;
  
  // Extract main light type (H1, H7, W5W, etc.)
  const match = clean.match(/^([A-Z]\d+[A-Z]?)/);
  return match ? match[1] : clean;
}

// Function to parse construction year range
function parseConstructionYear(yearStr) {
  if (!yearStr || yearStr.trim() === '') return { start: '', end: '' };
  
  const cleanYear = yearStr.trim();
  
  if (cleanYear.includes('->>')) {
    // Range with end date
    const start = cleanYear.replace('->>', '').trim();
    return { start: start, end: 'Present' };
  } else if (cleanYear.includes('-')) {
    // Range with both dates
    const [start, end] = cleanYear.split('-').map(s => s.trim());
    return { start: start, end: end };
  } else {
    // Single year
    return { start: cleanYear, end: cleanYear };
  }
}

// Function to determine if a line is a brand header
function isBrandHeader(columns) {
  if (!columns[0] || columns[0].trim() === '') return false;
  
  // Check if it has many empty columns (brand headers typically have 10+ empty columns)
  const emptyColumns = columns.slice(3).filter(col => col === '').length;
  return emptyColumns >= 10;
}

// Function to determine if a line is a model entry
function isModelEntry(columns) {
  return columns[0] && columns[0].trim() !== '' && 
         columns[1] && columns[1].trim() !== '' &&
         !isBrandHeader(columns);
}

// Process the CSV data
const vehicleDatabase = {
  metadata: {
    totalBrands: 0,
    totalModels: 0,
    totalEntries: 0,
    generatedAt: new Date().toISOString(),
    sourceFile: 'join_tables_osram_file_csv.csv'
  },
  brands: {}
};

let currentBrand = '';
let entryId = 1;

console.log('📖 Processing CSV data...');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  const columns = line.split(';');
  
  if (isBrandHeader(columns)) {
    // This is a brand header
    const brandName = columns[0].trim();
    if (brandName && brandName !== currentBrand) {
      currentBrand = brandName;
      vehicleDatabase.brands[brandName] = {
        name: brandName,
        models: {},
        modelCount: 0
      };
      console.log(`🏷️  Processing brand: ${brandName}`);
    }
  } else if (isModelEntry(columns) && currentBrand) {
    // This is a model entry
    const modelName = columns[0].trim();
    const constructionYear = parseConstructionYear(columns[1]);
    const typeConception = columns[2] ? columns[2].trim() : '';
    
    // Extract light specifications
    const lightSpecs = {};
    const lightEntries = [];
    
    for (const [colIndex, position] of Object.entries(LIGHT_POSITIONS)) {
      const lightType = cleanLightType(columns[parseInt(colIndex)]);
      
      if (lightType !== null) {
        lightSpecs[position] = lightType;
        
        // Create individual light entry for detailed compatibility
        if (position !== 'part_number' && position !== 'notes') {
          lightEntries.push({
            id: entryId++,
            position: FRENCH_POSITIONS[position] || position,
            category: position,
            lightType: lightType,
            partNumber: columns[13] ? columns[13].trim() : '',
            notes: columns[14] ? columns[14].trim() : ''
          });
        }
      }
    }
    
    // Create model entry
    const modelEntry = {
      name: modelName,
      constructionYear: constructionYear,
      typeConception: typeConception,
      lightSpecifications: lightSpecs,
      lightEntries: lightEntries,
      entryCount: lightEntries.length
    };
    
    vehicleDatabase.brands[currentBrand].models[modelName] = modelEntry;
    vehicleDatabase.brands[currentBrand].modelCount++;
    vehicleDatabase.metadata.totalModels++;
    vehicleDatabase.metadata.totalEntries += lightEntries.length;
  }
}

// Calculate total brands
vehicleDatabase.metadata.totalBrands = Object.keys(vehicleDatabase.brands).length;

// Sort brands alphabetically
const sortedBrands = {};
Object.keys(vehicleDatabase.brands).sort().forEach(brand => {
  sortedBrands[brand] = vehicleDatabase.brands[brand];
});
vehicleDatabase.brands = sortedBrands;

// Generate summary statistics
console.log('\n📊 Database Statistics:');
console.log(`Total brands: ${vehicleDatabase.metadata.totalBrands}`);
console.log(`Total models: ${vehicleDatabase.metadata.totalModels}`);
console.log(`Total light entries: ${vehicleDatabase.metadata.totalEntries}`);

// Show top 10 brands by model count
console.log('\n🏆 Top 10 brands by model count:');
const brandStats = Object.entries(vehicleDatabase.brands)
  .map(([name, data]) => ({ name, count: data.modelCount }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);

brandStats.forEach((brand, index) => {
  console.log(`${index + 1}. ${brand.name}: ${brand.count} models`);
});

// Save to JSON file
const outputFile = 'comprehensive_vehicle_database.json';
fs.writeFileSync(outputFile, JSON.stringify(vehicleDatabase, null, 2));

console.log(`\n💾 Database saved to: ${outputFile}`);
console.log(`📁 File size: ${(fs.statSync(outputFile).size / 1024 / 1024).toFixed(2)} MB`);

// Create a simplified version for easier querying
const simplifiedDatabase = {
  metadata: vehicleDatabase.metadata,
  brands: {}
};

Object.entries(vehicleDatabase.brands).forEach(([brandName, brandData]) => {
  simplifiedDatabase.brands[brandName] = {
    name: brandName,
    modelCount: brandData.modelCount,
    models: Object.keys(brandData.models)
  };
});

const simplifiedFile = 'simplified_vehicle_database.json';
fs.writeFileSync(simplifiedFile, JSON.stringify(simplifiedDatabase, null, 2));

console.log(`💾 Simplified database saved to: ${simplifiedFile}`);

console.log('\n✅ Comprehensive vehicle database creation complete!');
console.log('\n📋 Files created:');
console.log(`1. ${outputFile} - Complete database with all light specifications`);
console.log(`2. ${simplifiedFile} - Simplified database for quick brand/model lookup`);
