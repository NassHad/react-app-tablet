const fs = require('fs');
const path = require('path');

/**
 * Script to extract ILV FULMEN ENDURANCE battery data from PDF
 * This script can be used to process the PDF and extract battery information
 */

// Function to extract text from PDF (requires pdf-parse or similar library)
async function extractTextFromPDF(pdfPath) {
  try {
    // You would need to install: npm install pdf-parse
    // const pdfParse = require('pdf-parse');
    // const dataBuffer = fs.readFileSync(pdfPath);
    // const data = await pdfParse(dataBuffer);
    // return data.text;
    
    console.log('PDF extraction requires pdf-parse library');
    console.log('Install with: npm install pdf-parse');
    return null;
  } catch (error) {
    console.error('Error extracting PDF:', error);
    return null;
  }
}

// Function to parse battery data from text
function parseBatteryData(text) {
  const lines = text.split('\n');
  const batteryData = [];
  
  // Look for patterns in the text that match battery specifications
  const patterns = {
    // Pattern for vehicle info: Brand Model (Motorisation) - Battery Type
    vehiclePattern: /^([A-Z\s]+)\s+([^(]+)\s*\(([^)]+)\)\s*-\s*(.+)$/,
    // Pattern for battery specifications
    batteryPattern: /(AGM|EFB|Conventional|Standard)\s*:\s*([A-Z0-9]+)/i
  };
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Skip empty lines and headers
    if (!trimmedLine || trimmedLine.includes('Brand') || trimmedLine.includes('Vehicle')) {
      return;
    }
    
    // Try to match vehicle pattern
    const vehicleMatch = trimmedLine.match(patterns.vehiclePattern);
    if (vehicleMatch) {
      const [, brand, model, motorisation, batteryInfo] = vehicleMatch;
      batteryData.push({
        brand: brand.trim(),
        model: model.trim(),
        motorisation: motorisation.trim(),
        batteryInfo: batteryInfo.trim(),
        lineNumber: index + 1
      });
    }
  });
  
  return batteryData;
}

// Function to validate and clean battery data
function validateBatteryData(data) {
  const validatedData = [];
  const errors = [];
  
  data.forEach((item, index) => {
    const errors = [];
    
    // Validate brand
    if (!item.brand || item.brand.length < 2) {
      errors.push('Invalid brand');
    }
    
    // Validate model
    if (!item.model || item.model.length < 2) {
      errors.push('Invalid model');
    }
    
    // Validate motorisation
    if (!item.motorisation || item.motorisation.length < 2) {
      errors.push('Invalid motorisation');
    }
    
    // Validate battery info
    if (!item.batteryInfo || item.batteryInfo.length < 2) {
      errors.push('Invalid battery info');
    }
    
    if (errors.length === 0) {
      validatedData.push(item);
    } else {
      console.log(`Row ${index + 1} has errors: ${errors.join(', ')}`);
      console.log(`Data: ${JSON.stringify(item)}`);
    }
  });
  
  return { validatedData, errors };
}

// Function to convert to CSV format
function convertToCSV(data) {
  const headers = ['Brand', 'Vehicle', 'Motorisation', 'Fuel', 'Start', 'End', 'Battery_AGM', 'Battery_EFB', 'Battery_Conventional'];
  const csvLines = [headers.join(';')];
  
  data.forEach(item => {
    // Parse battery info to extract different types
    const batteryTypes = parseBatteryTypes(item.batteryInfo);
    
    const row = [
      item.brand,
      item.model,
      item.motorisation,
      'Unknown', // Fuel type - would need to be extracted from PDF
      '', // Start date - would need to be extracted from PDF
      '', // End date - would need to be extracted from PDF
      batteryTypes.agm || '',
      batteryTypes.efb || '',
      batteryTypes.conventional || ''
    ];
    
    csvLines.push(row.join(';'));
  });
  
  return csvLines.join('\n');
}

// Function to parse battery types from battery info string
function parseBatteryTypes(batteryInfo) {
  const types = {
    agm: '',
    efb: '',
    conventional: ''
  };
  
  // Look for battery type codes (like F32, F7, etc.)
  const batteryCodes = batteryInfo.match(/[A-Z]\d+/g);
  if (batteryCodes) {
    // This is a simplified parsing - you might need to adjust based on actual data
    batteryCodes.forEach(code => {
      if (code.startsWith('F3') || code.startsWith('F4')) {
        types.efb = code;
      } else if (code.startsWith('F1') || code.startsWith('F7')) {
        types.conventional = code;
      } else {
        types.agm = code;
      }
    });
  }
  
  return types;
}

// Main function
async function main() {
  const pdfPath = process.argv[2];
  
  if (!pdfPath) {
    console.log('Usage: node extract_ilv_fulmen_pdf.js <path-to-pdf>');
    console.log('Example: node extract_ilv_fulmen_pdf.js ILV-FULMEN-ENDURANCE.pdf');
    return;
  }
  
  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF file not found: ${pdfPath}`);
    return;
  }
  
  console.log(`Extracting data from: ${pdfPath}`);
  
  // Extract text from PDF
  const text = await extractTextFromPDF(pdfPath);
  if (!text) {
    console.log('Could not extract text from PDF. Please install pdf-parse library.');
    console.log('Run: npm install pdf-parse');
    return;
  }
  
  // Parse battery data
  const batteryData = parseBatteryData(text);
  console.log(`Found ${batteryData.length} battery entries`);
  
  // Validate data
  const { validatedData, errors } = validateBatteryData(batteryData);
  console.log(`Validated ${validatedData.length} entries`);
  
  if (errors.length > 0) {
    console.log(`Found ${errors.length} validation errors`);
  }
  
  // Convert to CSV
  const csvContent = convertToCSV(validatedData);
  
  // Save to file
  const outputPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_extracted.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  
  console.log(`Data saved to: ${outputPath}`);
  console.log(`Total entries: ${validatedData.length}`);
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  extractTextFromPDF,
  parseBatteryData,
  validateBatteryData,
  convertToCSV
};
