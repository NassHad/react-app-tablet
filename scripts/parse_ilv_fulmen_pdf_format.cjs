const fs = require('fs');
const path = require('path');

/**
 * Script to parse ILV FULMEN ENDURANCE PDF in its specific format
 * The PDF has a different structure than CSV - it's more like a table format
 */

// Function to extract text from PDF
async function extractTextFromPDF(pdfPath) {
  try {
    const pdfParse = require('pdf-parse');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting PDF:', error);
    return null;
  }
}

// Function to parse the specific PDF format
function parsePDFFormat(text) {
  const lines = text.split('\n');
  const batteryData = [];
  
  let currentBrand = '';
  let currentVehicle = '';
  let currentMotorisation = '';
  let currentFuel = '';
  let currentStart = '';
  let currentEnd = '';
  let currentAGM = '';
  let currentEFB = '';
  let currentConventional = '';
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines and headers
    if (!line || 
        line.includes('CONSEIL D\'EXPERT') ||
        line.includes('BATTERIESAUTO') ||
        line.includes('LES BATTERIES AGM') ||
        line.includes('Modèle') ||
        line.includes('Type') ||
        line.includes('Carburant') ||
        line.includes('AGM') ||
        line === 'E' ||
        line === 'F' ||
        line === 'B') {
      i++;
      continue;
    }
    
    // Check if this is a brand name (usually in caps and standalone)
    if (line.match(/^[A-Z\s]+$/) && line.length > 3 && !line.includes('(') && !line.includes('.')) {
      currentBrand = line;
      i++;
      continue;
    }
    
    // Check if this is a vehicle model (contains parentheses)
    if (line.includes('(') && line.includes(')')) {
      currentVehicle = line;
      i++;
      continue;
    }
    
    // Check if this is a motorisation (contains engine specs)
    if (line.includes('JTD') || line.includes('TDI') || line.includes('TFSI') || 
        line.includes('MultiJet') || line.includes('CRDi') || line.includes('Hybrid') ||
        line.match(/\d+\.\d+/) || line.includes('16V') || line.includes('8V')) {
      currentMotorisation = line;
      i++;
      continue;
    }
    
    // Check if this is fuel type with dates
    if (line.includes('Diesel') || line.includes('Petrole') || line.includes('Essence') || 
        line.includes('Electro') || line.includes('Hybrid')) {
      
      // Extract fuel type and dates
      const fuelMatch = line.match(/^(Diesel|Petrole|Essence|Electro|Hybrid|Petrole\/Electro)/);
      if (fuelMatch) {
        currentFuel = fuelMatch[1];
        
        // Extract dates
        const dateMatch = line.match(/(\d{4}-\d{2})(\d{4}-\d{2})?/);
        if (dateMatch) {
          currentStart = dateMatch[1] + '-01'; // Add day
          if (dateMatch[2]) {
            currentEnd = dateMatch[2] + '-01'; // Add day
          }
        }
      }
      i++;
      continue;
    }
    
    // Check if this is a battery code
    if (line.match(/^F\d+$/) || line.match(/^FL\d+$/)) {
      // Determine battery type based on code pattern
      if (line.startsWith('F4') || line.startsWith('F5') || line.startsWith('F6') || 
          line.startsWith('F7') || line.startsWith('F8') || line.startsWith('F9')) {
        currentAGM = line;
      } else if (line.startsWith('F3') || line.startsWith('FL')) {
        currentEFB = line;
      } else if (line.startsWith('F1') || line.startsWith('F2') || line.startsWith('F0')) {
        currentConventional = line;
      }
      
      // If we have all the data, create an entry
      if (currentBrand && currentVehicle && currentMotorisation && currentFuel) {
        batteryData.push({
          brand: currentBrand,
          vehicle: currentVehicle,
          motorisation: currentMotorisation,
          fuel: currentFuel,
          start: currentStart,
          end: currentEnd,
          battery_agm: currentAGM,
          battery_efb: currentEFB,
          battery_conventional: currentConventional,
          lineNumber: i + 1
        });
        
        // Reset for next entry
        currentVehicle = '';
        currentMotorisation = '';
        currentFuel = '';
        currentStart = '';
        currentEnd = '';
        currentAGM = '';
        currentEFB = '';
        currentConventional = '';
      }
      i++;
      continue;
    }
    
    // If we have a brand but no vehicle yet, this might be a vehicle name
    if (currentBrand && !currentVehicle && line.length > 2) {
      currentVehicle = line;
      i++;
      continue;
    }
    
    // If we have a vehicle but no motorisation, this might be a motorisation
    if (currentVehicle && !currentMotorisation && line.length > 2) {
      currentMotorisation = line;
      i++;
      continue;
    }
    
    i++;
  }
  
  return batteryData;
}

// Function to clean and validate the parsed data
function cleanParsedData(data) {
  const cleanedData = data.map(entry => {
    // Clean up the data
    const cleaned = {
      brand: entry.brand.trim(),
      vehicle: entry.vehicle.trim(),
      motorisation: entry.motorisation.trim(),
      fuel: entry.fuel.trim(),
      start: entry.start.trim(),
      end: entry.end.trim(),
      battery_agm: entry.battery_agm.trim(),
      battery_efb: entry.battery_efb.trim(),
      battery_conventional: entry.battery_conventional.trim()
    };
    
    // Fix fuel type names
    if (cleaned.fuel === 'Petrole') {
      cleaned.fuel = 'Petrol';
    }
    
    return cleaned;
  });
  
  // Remove duplicates
  const uniqueData = [];
  const seen = new Set();
  
  cleanedData.forEach(entry => {
    const key = `${entry.brand}|${entry.vehicle}|${entry.motorisation}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueData.push(entry);
    }
  });
  
  return uniqueData;
}

// Function to save to CSV
function saveToCSV(data, outputPath) {
  if (data.length === 0) {
    console.log('No data to save');
    return;
  }
  
  const headers = [
    'Brand', 'Vehicle', 'Motorisation', 'Fuel', 'Start', 'End', 
    'Battery_AGM', 'Battery_EFB', 'Battery_Conventional'
  ];
  
  const csvContent = [
    headers.join(';'),
    ...data.map(entry => [
      entry.brand,
      entry.vehicle,
      entry.motorisation,
      entry.fuel,
      entry.start,
      entry.end,
      entry.battery_agm,
      entry.battery_efb,
      entry.battery_conventional
    ].join(';'))
  ].join('\n');
  
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`✅ Clean data saved to: ${outputPath}`);
}

// Function to generate statistics
function generateStatistics(data) {
  const stats = {
    totalEntries: data.length,
    brands: {},
    batteryTypes: {
      AGM: 0,
      EFB: 0,
      Conventional: 0,
      Multiple: 0
    },
    fuelTypes: {}
  };
  
  data.forEach(entry => {
    // Count brands
    if (entry.brand) {
      stats.brands[entry.brand] = (stats.brands[entry.brand] || 0) + 1;
    }
    
    // Count fuel types
    if (entry.fuel) {
      stats.fuelTypes[entry.fuel] = (stats.fuelTypes[entry.fuel] || 0) + 1;
    }
    
    // Count battery types
    const batteryCount = [entry.battery_agm, entry.battery_efb, entry.battery_conventional]
      .filter(b => b && b.trim() !== '').length;
    
    if (batteryCount > 1) {
      stats.batteryTypes.Multiple++;
    } else if (entry.battery_agm && entry.battery_agm.trim() !== '') {
      stats.batteryTypes.AGM++;
    } else if (entry.battery_efb && entry.battery_efb.trim() !== '') {
      stats.batteryTypes.EFB++;
    } else if (entry.battery_conventional && entry.battery_conventional.trim() !== '') {
      stats.batteryTypes.Conventional++;
    }
  });
  
  return stats;
}

// Main function
async function main() {
  const pdfPath = process.argv[2] || 'scripts/ILV FULMEN ENDURANCE.pdf';
  
  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF file not found: ${pdfPath}`);
    return;
  }
  
  console.log('🔋 ILV FULMEN ENDURANCE PDF Parser (Specific Format)\n');
  console.log(`📄 Processing: ${pdfPath}`);
  
  // Extract text from PDF
  console.log('📖 Extracting text from PDF...');
  const text = await extractTextFromPDF(pdfPath);
  if (!text) {
    console.error('Failed to extract text from PDF');
    return;
  }
  
  console.log(`📝 Extracted ${text.length} characters of text`);
  
  // Parse the specific PDF format
  console.log('🔍 Parsing PDF in specific format...');
  const rawData = parsePDFFormat(text);
  console.log(`🔍 Found ${rawData.length} raw entries`);
  
  // Clean and validate data
  console.log('🧹 Cleaning and validating data...');
  const cleanedData = cleanParsedData(rawData);
  console.log(`✅ Cleaned to ${cleanedData.length} unique entries`);
  
  // Generate statistics
  const stats = generateStatistics(cleanedData);
  console.log('\n📊 Statistics:');
  console.log(`  Total entries: ${stats.totalEntries}`);
  console.log(`  Unique brands: ${Object.keys(stats.brands).length}`);
  console.log(`  Battery types: AGM=${stats.batteryTypes.AGM}, EFB=${stats.batteryTypes.EFB}, Conventional=${stats.batteryTypes.Conventional}, Multiple=${stats.batteryTypes.Multiple}`);
  console.log(`  Fuel types: ${Object.keys(stats.fuelTypes).join(', ')}`);
  
  // Show some examples
  console.log('\n📋 Sample entries:');
  cleanedData.slice(0, 5).forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.brand} ${entry.vehicle}`);
    console.log(`   Motorisation: ${entry.motorisation}`);
    console.log(`   Fuel: ${entry.fuel}, Dates: ${entry.start} - ${entry.end}`);
    console.log(`   Batteries: AGM=${entry.battery_agm}, EFB=${entry.battery_efb}, Conventional=${entry.battery_conventional}`);
    console.log('');
  });
  
  // Save clean data
  const outputPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_PDF_CLEAN.csv');
  saveToCSV(cleanedData, outputPath);
  
  console.log('✅ PDF parsing complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the clean CSV file: ILV-FULMEN-ENDURANCE_PDF_CLEAN.csv');
  console.log('2. Compare with your existing CSV data');
  console.log('3. Import the clean data into your database');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  extractTextFromPDF,
  parsePDFFormat,
  cleanParsedData,
  saveToCSV,
  generateStatistics
};
