import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the OSRAM CSV file
const inputFile = path.join(__dirname, 'GUIDE AMPOULES OSRAM.csv');
const outputFile = path.join(__dirname, 'osram_bulbs_from_csv.json');
const csvOutputFile = path.join(__dirname, 'osram_bulbs_from_csv.csv');

// CSV column mapping based on the actual structure
const CSV_COLUMNS = {
  BRAND: 0,
  MODEL: 1,
  CONSTRUCTION_YEAR: 2,
  TYPE_CONCEPTION: 3,
  // Light positions (based on the actual CSV structure)
  FEU_CROISEMENT: 4,      // H11, H7, H1, etc. (Low beam headlight)
  FEU_ROUTE: 5,           // H15, H7, H1, etc. (High beam headlight)
  FEUX_ANTIBROUILLARD: 6, // H15, H11, H8, etc. (Fog lights)
  FEUX_ROUTE_SUPP: 7,     // W5W, W21W, etc. (Supplementary high beam)
  CLIGNOTANT_AVANT: 9,    // WY21W, etc. (Front turn signal) - was motorcycle column
  CLIGNOTANT_AVANT_MOTO: 8,  // H11, H3, etc. (Front motorcycle turn signal) - IGNORE
  CLIGNOTANT_ARRIERE: 10, // WY21W, PY21W, etc. (Rear turn signal)
  CLIGNOTANT_ARRIERE_MOTO: 11, // LED, etc. (Rear motorcycle turn signal) - IGNORE
  FEUX_STOP: 12,          // LED, P21W, R5W, etc. (Brake lights)
  FEUX_PLAQUE: 13,        // W5W, C5W, etc. (License plate lights)
  ECLAIRAGE_INTERIEUR: 14, // 6411, W5W, LED, etc. (Interior lighting)
  FEU_COFFRE: 15,         // 6411, W5W, LED, etc. (Trunk lighting)
  PART_NUMBER: 16,        // 6411, 6413, etc.
  NOTES: 17               // Additional notes
};

// Function to parse construction year range
function parseConstructionYear(yearStr) {
  if (!yearStr || yearStr.trim() === '') return { start: '', end: '' };
  
  // Handle different formats: "07/94-01/01", "03/16->>", "12/07-12/12"
  const cleanYear = yearStr.trim();
  
  if (cleanYear.includes('->>')) {
    // Format: "03/16->>"
    const startYear = cleanYear.replace('->>', '');
    return { start: startYear, end: 'Present' };
  } else if (cleanYear.includes('-')) {
    // Format: "07/94-01/01" or "12/07-12/12"
    const [start, end] = cleanYear.split('-');
    return { start: start.trim(), end: end.trim() };
  } else {
    // Single year
    return { start: cleanYear, end: cleanYear };
  }
}

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

// Function to determine light position based on the actual CSV structure
function getLightPosition(columnIndex) {
  const positionMap = {
    [CSV_COLUMNS.FEU_CROISEMENT]: 'Feu de croisement', // Low beam headlight
    [CSV_COLUMNS.FEU_ROUTE]: 'Feu de route', // High beam headlight
    [CSV_COLUMNS.FEUX_ANTIBROUILLARD]: 'Feux antibrouillard', // Fog lights
    [CSV_COLUMNS.FEUX_ROUTE_SUPP]: 'Feux de route supplémentaires', // Supplementary high beam
    [CSV_COLUMNS.CLIGNOTANT_AVANT]: 'Clignotant avant voiture', // Front turn signal
    [CSV_COLUMNS.CLIGNOTANT_AVANT_MOTO]: 'Clignotant avant moto', // Front motorcycle turn signal - IGNORE
    [CSV_COLUMNS.CLIGNOTANT_ARRIERE]: 'Clignotant arrière voiture', // Rear turn signal
    [CSV_COLUMNS.CLIGNOTANT_ARRIERE_MOTO]: 'Clignotant arrière moto', // Rear motorcycle turn signal - IGNORE
    [CSV_COLUMNS.FEUX_STOP]: 'Feux de stop', // Brake lights
    [CSV_COLUMNS.FEUX_PLAQUE]: 'Feux de plaque d\'immatriculation', // License plate lights
    [CSV_COLUMNS.ECLAIRAGE_INTERIEUR]: 'Éclairage intérieur', // Interior lighting
    [CSV_COLUMNS.FEU_COFFRE]: 'Feu de coffre' // Trunk lighting
  };
  return positionMap[columnIndex] || 'Unknown';
}

// Function to determine light category based on the actual CSV structure
function getLightCategory(columnIndex) {
  if (columnIndex === CSV_COLUMNS.FEU_CROISEMENT) return 'feu_de_croisement';
  if (columnIndex === CSV_COLUMNS.FEU_ROUTE) return 'feu_de_route';
  if (columnIndex === CSV_COLUMNS.FEUX_ANTIBROUILLARD) return 'feu_antibrouillard';
  if (columnIndex === CSV_COLUMNS.FEUX_ROUTE_SUPP) return 'feu_route_supplementaire';
  if (columnIndex === CSV_COLUMNS.CLIGNOTANT_AVANT) return 'clignotant_avant';
  if (columnIndex === CSV_COLUMNS.CLIGNOTANT_ARRIERE) return 'clignotant_arriere';
  if (columnIndex === CSV_COLUMNS.FEUX_STOP) return 'feu_stop';
  if (columnIndex === CSV_COLUMNS.FEUX_PLAQUE) return 'feu_plaque';
  if (columnIndex === CSV_COLUMNS.ECLAIRAGE_INTERIEUR) return 'eclairage_interieur';
  if (columnIndex === CSV_COLUMNS.FEU_COFFRE) return 'feu_coffre';
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
    
    // Check if this is a brand line (first column has content, others are empty)
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
      
      // Process each light position (excluding motorcycle columns)
      const lightColumns = [
        CSV_COLUMNS.FEU_CROISEMENT,
        CSV_COLUMNS.FEU_ROUTE,
        CSV_COLUMNS.FEUX_ANTIBROUILLARD,
        CSV_COLUMNS.FEUX_ROUTE_SUPP,
        CSV_COLUMNS.CLIGNOTANT_AVANT,
        // Skip motorcycle columns: CLIGNOTANT_AVANT_MOTO, CLIGNOTANT_ARRIERE_MOTO
        CSV_COLUMNS.CLIGNOTANT_ARRIERE,
        CSV_COLUMNS.FEUX_STOP,
        CSV_COLUMNS.FEUX_PLAQUE,
        CSV_COLUMNS.ECLAIRAGE_INTERIEUR,
        CSV_COLUMNS.FEU_COFFRE
      ];
      
      for (const colIndex of lightColumns) {
        const lightType = cleanLightType(columns[colIndex]);
        
        // Include all light positions, even if blank (especially for Feu de coffre)
        // Only skip if the lightType is null (completely empty)
        if (lightType !== null) {
          const lightEntry = {
            id: entryId++,
            brand: currentBrand,
            model: model,
            constructionYear: constructionYear,
            typeConception: typeConception,
            lightType: lightType || '', // Use empty string if blank
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

// Function to clean and deduplicate data
function cleanLightData(lightData) {
  const cleanedData = [];
  const seen = new Set();
  
  for (const light of lightData) {
    const key = `${light.brand}-${light.model}-${light.lightType}-${light.position}`;
    if (!seen.has(key)) {
      seen.add(key);
      cleanedData.push(light);
    }
  }
  
  return cleanedData;
}

// Function to convert to CSV format
function convertToCSV(lightData) {
  const headers = [
    'ID', 'Brand', 'Model', 'ConstructionYearStart', 'ConstructionYearEnd', 
    'TypeConception', 'LightType', 'Position', 'Category', 'PartNumber', 'Notes', 'Source'
  ];
  const csvLines = [headers.join(',')];
  
  for (const light of lightData) {
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
  
  return csvLines.join('\n');
}

// Main processing function
async function processOSRAMCSVData() {
  try {
    console.log('🔍 Processing OSRAM CSV data...');
    console.log(`📁 Looking for file: ${inputFile}`);
    
    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
      console.error(`❌ Input file not found: ${inputFile}`);
      console.log('📁 Available files:');
      const files = fs.readdirSync(__dirname);
      files.forEach(file => console.log(`   - ${file}`));
      return;
    }
    
    // Read the CSV file
    const csvContent = fs.readFileSync(inputFile, 'utf8');
    console.log(`📖 Read ${csvContent.length} characters from ${inputFile}`);
    
    // Process the CSV data
    console.log('🔍 Processing CSV data...');
    const rawLightData = processOSRAMCSV(csvContent);
    console.log(`📊 Found ${rawLightData.length} raw light entries`);
    
    // Clean and deduplicate data
    console.log('🧹 Cleaning and deduplicating data...');
    const cleanedLightData = cleanLightData(rawLightData);
    console.log(`✅ Cleaned data: ${cleanedLightData.length} unique entries`);
    
    // Save as JSON
    fs.writeFileSync(outputFile, JSON.stringify(cleanedLightData, null, 2), 'utf8');
    console.log(`💾 JSON data saved to: ${outputFile}`);
    
    // Save as CSV
    const csvData = convertToCSV(cleanedLightData);
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
processOSRAMCSVData().then(() => {
  console.log('✅ Processing completed!');
}).catch((error) => {
  console.error('❌ Processing failed:', error);
});

