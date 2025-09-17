import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the extracted OSRAM text file
const inputFile = path.join(__dirname, 'OSRAM_EXTRACTED_TEXT.txt');
const outputFile = path.join(__dirname, 'osram_bulbs_processed.json');
const csvOutputFile = path.join(__dirname, 'osram_bulbs_processed.csv');

// Bulb type patterns
const BULB_PATTERNS = {
  // Headlight bulbs
  H1: /H1/gi,
  H3: /H3/gi,
  H4: /H4/gi,
  H7: /H7/gi,
  H8: /H8/gi,
  H9: /H9/gi,
  H11: /H11/gi,
  H15: /H15/gi,
  HB3: /HB3/gi,
  HB4: /HB4/gi,
  HB5: /HB5/gi,
  // Fog light bulbs
  H8_FOG: /H8\s*FOG/gi,
  H11_FOG: /H11\s*FOG/gi,
  // Signal bulbs
  W5W: /W5W/gi,
  W16W: /W16W/gi,
  W21W: /W21W/gi,
  PY21W: /PY21W/gi,
  P21W: /P21W/gi,
  P21W5W: /P21W5W/gi,
  // LED bulbs
  LED: /LED/gi,
  // Other common types
  T10: /T10/gi,
  T20: /T20/gi,
  T25: /T25/gi,
  C5W: /C5W/gi,
  R5W: /R5W/gi,
  R10W: /R10W/gi,
  R12W: /R12W/gi
};

// Vehicle brand patterns
const BRAND_PATTERNS = [
  /AUDI/gi,
  /BMW/gi,
  /MERCEDES/gi,
  /VOLKSWAGEN/gi,
  /VW/gi,
  /FORD/gi,
  /OPEL/gi,
  /PEUGEOT/gi,
  /RENAULT/gi,
  /CITROËN/gi,
  /CITROEN/gi,
  /NISSAN/gi,
  /TOYOTA/gi,
  /HONDA/gi,
  /HYUNDAI/gi,
  /KIA/gi,
  /MAZDA/gi,
  /SUBARU/gi,
  /MITSUBISHI/gi,
  /SUZUKI/gi,
  /SKODA/gi,
  /SEAT/gi,
  /FIAT/gi,
  /ALFA\s*ROMEO/gi,
  /LANCIA/gi,
  /JEEP/gi,
  /CHRYSLER/gi,
  /DODGE/gi,
  /CHEVROLET/gi,
  /CADILLAC/gi,
  /BUICK/gi,
  /PONTIAC/gi,
  /SAAB/gi,
  /VOLVO/gi,
  /MINI/gi,
  /SMART/gi,
  /LAND\s*ROVER/gi,
  /JAGUAR/gi,
  /BENTLEY/gi,
  /ROLLS\s*ROYCE/gi,
  /ASTON\s*MARTIN/gi,
  /FERRARI/gi,
  /LAMBORGHINI/gi,
  /MASERATI/gi,
  /ALPINE/gi,
  /DS/gi
];

// Function to extract bulb data from text
function extractBulbData(text) {
  const lines = text.split('\n');
  const bulbData = [];
  const processedLines = new Set();
  
  let currentBrand = '';
  let currentModel = '';
  let currentYear = '';
  let currentBulbType = '';
  let currentPosition = '';
  let currentPartNumber = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || processedLines.has(line)) continue;
    
    processedLines.add(line);
    
    // Check if this is a brand line
    for (const brandPattern of BRAND_PATTERNS) {
      if (brandPattern.test(line)) {
        currentBrand = line.toUpperCase().trim();
        continue;
      }
    }
    
    // Check if this is a model line (contains model name, often with year)
    if (currentBrand && line.match(/\d{4}/) && line.length > 3 && line.length < 50) {
      // Extract model and year
      const yearMatch = line.match(/(\d{4})/);
      if (yearMatch) {
        currentYear = yearMatch[1];
        currentModel = line.replace(/\d{4}/, '').trim();
      } else {
        currentModel = line;
      }
      continue;
    }
    
    // Check for bulb types
    for (const [bulbType, pattern] of Object.entries(BULB_PATTERNS)) {
      if (pattern.test(line)) {
        currentBulbType = bulbType;
        
        // Look for position information (headlight, fog, signal, etc.)
        if (line.toLowerCase().includes('phare') || line.toLowerCase().includes('headlight')) {
          currentPosition = 'Headlight';
        } else if (line.toLowerCase().includes('anti-brouillard') || line.toLowerCase().includes('fog')) {
          currentPosition = 'Fog Light';
        } else if (line.toLowerCase().includes('clignotant') || line.toLowerCase().includes('signal')) {
          currentPosition = 'Signal Light';
        } else if (line.toLowerCase().includes('feu') || line.toLowerCase().includes('light')) {
          currentPosition = 'Light';
        } else {
          currentPosition = 'Unknown';
        }
        
        // Look for part numbers (OSRAM part numbers usually start with specific patterns)
        const partNumberMatch = line.match(/([A-Z0-9]{6,12})/);
        if (partNumberMatch) {
          currentPartNumber = partNumberMatch[1];
        }
        
        // If we have enough data, create a bulb entry
        if (currentBrand && currentModel && currentBulbType) {
          const bulbEntry = {
            id: bulbData.length + 1,
            brand: currentBrand,
            model: currentModel,
            year: currentYear || '',
            bulbType: currentBulbType,
            position: currentPosition,
            partNumber: currentPartNumber || '',
            source: 'OSRAM Guide'
          };
          
          bulbData.push(bulbEntry);
          
          // Reset for next entry
          currentModel = '';
          currentYear = '';
          currentBulbType = '';
          currentPosition = '';
          currentPartNumber = '';
        }
        break;
      }
    }
  }
  
  return bulbData;
}

// Function to clean and deduplicate data
function cleanBulbData(bulbData) {
  const cleanedData = [];
  const seen = new Set();
  
  for (const bulb of bulbData) {
    const key = `${bulb.brand}-${bulb.model}-${bulb.bulbType}-${bulb.position}`;
    if (!seen.has(key)) {
      seen.add(key);
      cleanedData.push(bulb);
    }
  }
  
  return cleanedData;
}

// Function to convert to CSV format
function convertToCSV(bulbData) {
  const headers = ['ID', 'Brand', 'Model', 'Year', 'BulbType', 'Position', 'PartNumber', 'Source'];
  const csvLines = [headers.join(',')];
  
  for (const bulb of bulbData) {
    const row = [
      bulb.id,
      `"${bulb.brand}"`,
      `"${bulb.model}"`,
      `"${bulb.year}"`,
      `"${bulb.bulbType}"`,
      `"${bulb.position}"`,
      `"${bulb.partNumber}"`,
      `"${bulb.source}"`
    ];
    csvLines.push(row.join(','));
  }
  
  return csvLines.join('\n');
}

// Main processing function
async function processOSRAMData() {
  try {
    console.log('🔍 Processing OSRAM PDF data...');
    
    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
      console.error(`❌ Input file not found: ${inputFile}`);
      console.log('💡 Please run the Python extraction script first:');
      console.log('   python extract_osram_pdf.py');
      return;
    }
    
    // Read the extracted text
    const text = fs.readFileSync(inputFile, 'utf8');
    console.log(`📖 Read ${text.length} characters from ${inputFile}`);
    
    // Extract bulb data
    console.log('🔍 Extracting bulb data...');
    const rawBulbData = extractBulbData(text);
    console.log(`📊 Found ${rawBulbData.length} raw bulb entries`);
    
    // Clean and deduplicate data
    console.log('🧹 Cleaning and deduplicating data...');
    const cleanedBulbData = cleanBulbData(rawBulbData);
    console.log(`✅ Cleaned data: ${cleanedBulbData.length} unique entries`);
    
    // Save as JSON
    fs.writeFileSync(outputFile, JSON.stringify(cleanedBulbData, null, 2), 'utf8');
    console.log(`💾 JSON data saved to: ${outputFile}`);
    
    // Save as CSV
    const csvData = convertToCSV(cleanedBulbData);
    fs.writeFileSync(csvOutputFile, csvData, 'utf8');
    console.log(`📊 CSV data saved to: ${csvOutputFile}`);
    
    // Show summary
    console.log('\n📋 Summary:');
    console.log(`   Total entries: ${cleanedBulbData.length}`);
    
    // Group by brand
    const brandCounts = {};
    for (const bulb of cleanedBulbData) {
      brandCounts[bulb.brand] = (brandCounts[bulb.brand] || 0) + 1;
    }
    
    console.log('\n🏷️  Entries by brand:');
    for (const [brand, count] of Object.entries(brandCounts)) {
      console.log(`   ${brand}: ${count} entries`);
    }
    
    // Group by bulb type
    const bulbTypeCounts = {};
    for (const bulb of cleanedBulbData) {
      bulbTypeCounts[bulb.bulbType] = (bulbTypeCounts[bulb.bulbType] || 0) + 1;
    }
    
    console.log('\n💡 Entries by bulb type:');
    for (const [type, count] of Object.entries(bulbTypeCounts)) {
      console.log(`   ${type}: ${count} entries`);
    }
    
    // Show first few entries as preview
    console.log('\n📋 Preview of processed data:');
    console.log('-'.repeat(80));
    for (let i = 0; i < Math.min(5, cleanedBulbData.length); i++) {
      const bulb = cleanedBulbData[i];
      console.log(`${i + 1}. ${bulb.brand} ${bulb.model} (${bulb.year}) - ${bulb.bulbType} ${bulb.position}`);
    }
    console.log('-'.repeat(80));
    
  } catch (error) {
    console.error('❌ Error processing OSRAM data:', error.message);
  }
}

// Run the processing
processOSRAMData();
