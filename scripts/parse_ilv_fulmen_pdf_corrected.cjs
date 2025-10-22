const fs = require('fs');
const path = require('path');

/**
 * Corrected parser for ILV FULMEN ENDURANCE PDF
 * Handles the actual format found in the PDF
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

// Function to parse the PDF with the correct format understanding
function parsePDFCorrected(text) {
  const lines = text.split('\n');
  const batteryData = [];
  
  // Find the start of the data (after headers)
  let dataStartIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('ALFA ROMEO')) {
      dataStartIndex = i;
      break;
    }
  }
  
  if (dataStartIndex === -1) {
    console.log('Could not find data start in PDF');
    return [];
  }
  
  console.log(`Found data start at line ${dataStartIndex}`);
  
  // Process the data section
  let i = dataStartIndex;
  let currentBrand = '';
  let currentVehicle = '';
  let currentMotorisation = '';
  let currentFuel = '';
  let currentStart = '';
  let currentEnd = '';
  let currentAGM = '';
  let currentEFB = '';
  let currentConventional = '';
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }
    
    // Check if this is a brand name (standalone, all caps, no parentheses)
    if (line.match(/^[A-Z\s]+$/) && 
        line.length > 3 && 
        !line.includes('(') && 
        !line.includes('.') &&
        !line.includes('Diesel') &&
        !line.includes('Petrole') &&
        !line.includes('Essence')) {
      
      // Save previous entry if we have one
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
          battery_conventional: currentConventional
        });
      }
      
      // Start new entry
      currentBrand = line;
      currentVehicle = '';
      currentMotorisation = '';
      currentFuel = '';
      currentStart = '';
      currentEnd = '';
      currentAGM = '';
      currentEFB = '';
      currentConventional = '';
      
      i++;
      continue;
    }
    
    // Check if this is a vehicle model (contains parentheses)
    if (line.includes('(') && line.includes(')') && !currentVehicle) {
      currentVehicle = line;
      i++;
      continue;
    }
    
    // Check if this is a motorisation (contains engine specs)
    if ((line.includes('JTD') || line.includes('TDI') || line.includes('TFSI') || 
         line.includes('MultiJet') || line.includes('CRDi') || line.includes('Hybrid') ||
         line.match(/\d+\.\d+/) || line.includes('16V') || line.includes('8V') ||
         line.includes('D2') || line.includes('D3') || line.includes('D4') ||
         line.includes('D5') || line.includes('AWD')) &&
        !currentMotorisation) {
      currentMotorisation = line;
      i++;
      continue;
    }
    
    // Check if this is fuel type with dates (need to separate them)
    if ((line.includes('Diesel') || line.includes('Petrole') || line.includes('Essence') || 
         line.includes('Electro') || line.includes('Hybrid')) &&
        !currentFuel) {
      
      // Extract fuel type and dates separately
      const fuelMatch = line.match(/^(Diesel|Petrole|Essence|Electro|Hybrid|Petrole\/Electro)/);
      if (fuelMatch) {
        currentFuel = fuelMatch[1];
        
        // Extract dates from the rest of the line
        const datePart = line.substring(fuelMatch[1].length);
        const dateMatch = datePart.match(/(\d{4}-\d{2})(\d{4}-\d{2})?/);
        if (dateMatch) {
          currentStart = dateMatch[1] + '-01';
          if (dateMatch[2]) {
            currentEnd = dateMatch[2] + '-01';
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
      
      i++;
      continue;
    }
    
    // Check if this is a date line (format: YYYY-MM)
    if (line.match(/^\d{4}-\d{2}$/) && currentFuel && !currentStart) {
      currentStart = line + '-01';
      i++;
      continue;
    }
    
    // Check if this is a date range (format: YYYY-MMYYYY-MM)
    if (line.match(/^\d{4}-\d{2}\d{4}-\d{2}$/)) {
      const match = line.match(/^(\d{4}-\d{2})(\d{4}-\d{2})$/);
      if (match) {
        currentStart = match[1] + '-01';
        currentEnd = match[2] + '-01';
      }
      i++;
      continue;
    }
    
    i++;
  }
  
  // Save the last entry
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
      battery_conventional: currentConventional
    });
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
    
    // Clean up vehicle names (remove extra text)
    cleaned.vehicle = cleaned.vehicle.replace(/\d+\.\d+.*$/, '').trim();
    
    // Clean up motorisation (remove extra text)
    cleaned.motorisation = cleaned.motorisation.replace(/^\d+\.\d+/, '').trim();
    
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
  
  console.log('🔋 ILV FULMEN ENDURANCE PDF Parser (Corrected)\n');
  console.log(`📄 Processing: ${pdfPath}`);
  
  // Extract text from PDF
  console.log('📖 Extracting text from PDF...');
  const text = await extractTextFromPDF(pdfPath);
  if (!text) {
    console.error('Failed to extract text from PDF');
    return;
  }
  
  console.log(`📝 Extracted ${text.length} characters of text`);
  
  // Parse the PDF using corrected method
  console.log('🔍 Parsing PDF with corrected method...');
  const rawData = parsePDFCorrected(text);
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
  const outputPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_PDF_CORRECTED.csv');
  saveToCSV(cleanedData, outputPath);
  
  console.log('✅ Corrected PDF parsing complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the clean CSV file: ILV-FULMEN-ENDURANCE_PDF_CORRECTED.csv');
  console.log('2. Compare with your existing CSV data');
  console.log('3. Import the clean data into your database');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  extractTextFromPDF,
  parsePDFCorrected,
  cleanParsedData,
  saveToCSV,
  generateStatistics
};
