const fs = require('fs');
const path = require('path');

/**
 * Script to extract ILV FULMEN ENDURANCE data directly from PDF
 * This will create a clean, accurate dataset with correct battery type mappings
 */

// Function to install required dependencies
function checkDependencies() {
  try {
    require('pdf-parse');
    console.log('✅ pdf-parse is available');
    return true;
  } catch (error) {
    console.log('❌ pdf-parse not found');
    console.log('📦 Installing pdf-parse...');
    console.log('Run: npm install pdf-parse');
    return false;
  }
}

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

// Function to parse battery data from PDF text
function parseBatteryDataFromPDF(text) {
  const lines = text.split('\n');
  const batteryData = [];
  
  console.log('🔍 Parsing PDF text for battery data...');
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Skip empty lines and headers
    if (!trimmedLine || 
        trimmedLine.includes('Brand') || 
        trimmedLine.includes('Vehicle') ||
        trimmedLine.includes('Page') ||
        trimmedLine.length < 10) {
      return;
    }
    
    // Look for patterns that match vehicle entries
    // Pattern: BRAND;MODEL;MOTORISATION;FUEL;START;END;BATTERY_AGM;BATTERY_EFB;BATTERY_CONVENTIONAL
    const parts = trimmedLine.split(';');
    
    if (parts.length >= 6) {
      const entry = {
        brand: parts[0]?.trim() || '',
        vehicle: parts[1]?.trim() || '',
        motorisation: parts[2]?.trim() || '',
        fuel: parts[3]?.trim() || '',
        start: parts[4]?.trim() || '',
        end: parts[5]?.trim() || '',
        battery_agm: parts[6]?.trim() || '',
        battery_efb: parts[7]?.trim() || '',
        battery_conventional: parts[8]?.trim() || '',
        originalLine: trimmedLine,
        lineNumber: index + 1
      };
      
      // Only add if we have essential data
      if (entry.brand && entry.vehicle && entry.motorisation) {
        batteryData.push(entry);
      }
    }
  });
  
  return batteryData;
}

// Function to validate and clean the extracted data
function validateExtractedData(data) {
  const validatedData = [];
  const errors = [];
  
  console.log('🔍 Validating extracted data...');
  
  data.forEach((entry, index) => {
    const entryErrors = [];
    
    // Validate brand
    if (!entry.brand || entry.brand.length < 2) {
      entryErrors.push('Invalid brand');
    }
    
    // Validate vehicle
    if (!entry.vehicle || entry.vehicle.length < 2) {
      entryErrors.push('Invalid vehicle');
    }
    
    // Validate motorisation
    if (!entry.motorisation || entry.motorisation.length < 2) {
      entryErrors.push('Invalid motorisation');
    }
    
    // Validate fuel type
    const validFuels = ['Diesel', 'Petrole', 'Essence', 'Hybrid', 'Electric', 'Petrole/Electro', 'Electro'];
    if (entry.fuel && !validFuels.includes(entry.fuel)) {
      entryErrors.push(`Invalid fuel type: ${entry.fuel}`);
    }
    
    // Validate dates
    if (entry.start && !isValidDate(entry.start)) {
      entryErrors.push(`Invalid start date: ${entry.start}`);
    }
    if (entry.end && entry.end !== '' && !isValidDate(entry.end)) {
      entryErrors.push(`Invalid end date: ${entry.end}`);
    }
    
    // Check if at least one battery type is specified
    const hasBattery = entry.battery_agm || entry.battery_efb || entry.battery_conventional;
    if (!hasBattery) {
      entryErrors.push('No battery type specified');
    }
    
    if (entryErrors.length === 0) {
      validatedData.push(entry);
    } else {
      errors.push({
        line: entry.lineNumber,
        entry: entry,
        errors: entryErrors
      });
    }
  });
  
  return { validatedData, errors };
}

// Function to validate date format
function isValidDate(dateString) {
  if (!dateString || dateString.trim() === '') return true;
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
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
    fuelTypes: {},
    dateRange: {
      earliest: null,
      latest: null
    }
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
    
    // Track date range
    if (entry.start && isValidDate(entry.start)) {
      if (!stats.dateRange.earliest || entry.start < stats.dateRange.earliest) {
        stats.dateRange.earliest = entry.start;
      }
    }
    if (entry.end && entry.end !== '' && isValidDate(entry.end)) {
      if (!stats.dateRange.latest || entry.end > stats.dateRange.latest) {
        stats.dateRange.latest = entry.end;
      }
    }
  });
  
  return stats;
}

// Function to save data to CSV
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
  console.log(`✅ Data saved to: ${outputPath}`);
}

// Function to compare with existing CSV
function compareWithExistingCSV(newData, existingCSVPath) {
  if (!fs.existsSync(existingCSVPath)) {
    console.log('No existing CSV to compare with');
    return;
  }
  
  console.log('🔍 Comparing with existing CSV...');
  
  const existingContent = fs.readFileSync(existingCSVPath, 'utf8');
  const existingLines = existingContent.split('\n').filter(line => line.trim());
  const existingData = existingLines.slice(1).map(line => {
    const parts = line.split(';');
    return {
      brand: parts[0] || '',
      vehicle: parts[1] || '',
      motorisation: parts[2] || '',
      battery_agm: parts[6] || '',
      battery_efb: parts[7] || '',
      battery_conventional: parts[8] || ''
    };
  });
  
  const differences = [];
  
  newData.forEach(newEntry => {
    const existingEntry = existingData.find(existing => 
      existing.brand === newEntry.brand &&
      existing.vehicle === newEntry.vehicle &&
      existing.motorisation === newEntry.motorisation
    );
    
    if (existingEntry) {
      const batteryDiff = {
        brand: newEntry.brand,
        vehicle: newEntry.vehicle,
        motorisation: newEntry.motorisation,
        new: {
          agm: newEntry.battery_agm,
          efb: newEntry.battery_efb,
          conventional: newEntry.battery_conventional
        },
        existing: {
          agm: existingEntry.battery_agm,
          efb: existingEntry.battery_efb,
          conventional: existingEntry.battery_conventional
        }
      };
      
      // Check if battery types are different
      if (batteryDiff.new.agm !== batteryDiff.existing.agm ||
          batteryDiff.new.efb !== batteryDiff.existing.efb ||
          batteryDiff.new.conventional !== batteryDiff.existing.conventional) {
        differences.push(batteryDiff);
      }
    }
  });
  
  return differences;
}

// Main function
async function main() {
  const pdfPath = process.argv[2];
  
  if (!pdfPath) {
    console.log('Usage: node extract_ilv_fulmen_pdf_clean.cjs <path-to-pdf>');
    console.log('Example: node extract_ilv_fulmen_pdf_clean.cjs ILV-FULMEN-ENDURANCE.pdf');
    return;
  }
  
  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF file not found: ${pdfPath}`);
    return;
  }
  
  // Check dependencies
  if (!checkDependencies()) {
    console.log('Please install pdf-parse first: npm install pdf-parse');
    return;
  }
  
  console.log('🔋 ILV FULMEN ENDURANCE PDF Extraction (Clean Start)\n');
  console.log(`📄 Processing: ${pdfPath}`);
  
  // Extract text from PDF
  console.log('📖 Extracting text from PDF...');
  const text = await extractTextFromPDF(pdfPath);
  if (!text) {
    console.error('Failed to extract text from PDF');
    return;
  }
  
  console.log(`📝 Extracted ${text.length} characters of text`);
  
  // Parse battery data
  const batteryData = parseBatteryDataFromPDF(text);
  console.log(`🔍 Found ${batteryData.length} potential battery entries`);
  
  // Validate data
  const { validatedData, errors } = validateExtractedData(batteryData);
  console.log(`✅ Validated ${validatedData.length} entries`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Found ${errors.length} validation errors:`);
    errors.slice(0, 5).forEach(error => {
      console.log(`  Line ${error.line}: ${error.errors.join(', ')}`);
    });
    if (errors.length > 5) {
      console.log(`  ... and ${errors.length - 5} more errors`);
    }
  }
  
  // Generate statistics
  const stats = generateStatistics(validatedData);
  console.log('\n📊 Statistics:');
  console.log(`  Total entries: ${stats.totalEntries}`);
  console.log(`  Unique brands: ${Object.keys(stats.brands).length}`);
  console.log(`  Battery types: AGM=${stats.batteryTypes.AGM}, EFB=${stats.batteryTypes.EFB}, Conventional=${stats.batteryTypes.Conventional}, Multiple=${stats.batteryTypes.Multiple}`);
  console.log(`  Date range: ${stats.dateRange.earliest} to ${stats.dateRange.latest}`);
  
  // Save clean data
  const outputPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_PDF_CLEAN.csv');
  saveToCSV(validatedData, outputPath);
  
  // Compare with existing CSV
  const existingCSVPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_manual_complete.csv');
  const differences = compareWithExistingCSV(validatedData, existingCSVPath);
  
  if (differences.length > 0) {
    console.log(`\n🔍 Found ${differences.length} differences with existing CSV:`);
    differences.slice(0, 10).forEach(diff => {
      console.log(`\n${diff.brand} ${diff.vehicle} (${diff.motorisation}):`);
      console.log(`  PDF:    AGM=${diff.new.agm}, EFB=${diff.new.efb}, Conventional=${diff.new.conventional}`);
      console.log(`  CSV:    AGM=${diff.existing.agm}, EFB=${diff.existing.efb}, Conventional=${diff.existing.conventional}`);
    });
    
    if (differences.length > 10) {
      console.log(`\n... and ${differences.length - 10} more differences`);
    }
    
    // Save differences report
    const diffReport = differences.map(diff => 
      `${diff.brand};${diff.vehicle};${diff.motorisation};PDF:AGM=${diff.new.agm},EFB=${diff.new.efb},CONV=${diff.new.conventional};CSV:AGM=${diff.existing.agm},EFB=${diff.existing.efb},CONV=${diff.existing.conventional}`
    ).join('\n');
    
    const diffPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_DIFFERENCES.csv');
    fs.writeFileSync(diffPath, 'Brand;Vehicle;Motorisation;PDF_Data;CSV_Data\n' + diffReport, 'utf8');
    console.log(`\n📋 Differences report saved to: ${diffPath}`);
  }
  
  console.log('\n✅ PDF extraction complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the clean CSV file: ILV-FULMEN-ENDURANCE_PDF_CLEAN.csv');
  console.log('2. Check the differences report if any differences were found');
  console.log('3. Use the clean data for your database import');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  extractTextFromPDF,
  parseBatteryDataFromPDF,
  validateExtractedData,
  generateStatistics,
  saveToCSV,
  compareWithExistingCSV
};
