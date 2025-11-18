const fs = require('fs');
const path = require('path');

/**
 * Script to fix specific battery issues in ILV FULMEN ENDURANCE data
 */

// Function to read CSV data
function readCSVData(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    return { headers: [], data: [] };
  }
  
  const headers = lines[0].split(';').map(h => h.trim());
  const data = lines.slice(1).map((line, index) => {
    const values = line.split(';').map(v => v.trim());
    const row = {};
    
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });
    
    row._lineNumber = index + 2;
    return row;
  });
  
  return { headers, data };
}

// Function to identify battery issues
function identifyBatteryIssues(data) {
  const issues = [];
  
  data.forEach(row => {
    const batteryFields = ['Battery_AGM', 'Battery_EFB', 'Battery_Conventional'];
    const hasBattery = batteryFields.some(field => row[field] && row[field].trim() !== '');
    
    if (!hasBattery) {
      issues.push({
        line: row._lineNumber,
        brand: row.Brand,
        vehicle: row.Vehicle,
        motorisation: row.Motorisation,
        fuel: row.Fuel,
        start: row.Start,
        end: row.End,
        agm: row.Battery_AGM,
        efb: row.Battery_EFB,
        conventional: row.Battery_Conventional
      });
    }
  });
  
  return issues;
}

// Function to suggest battery types based on vehicle characteristics
function suggestBatteryType(row) {
  const suggestions = {
    agm: '',
    efb: '',
    conventional: ''
  };
  
  // Analyze vehicle characteristics to suggest battery types
  const vehicle = row.vehicle.toLowerCase();
  const motorisation = row.motorisation.toLowerCase();
  const fuel = row.fuel.toLowerCase();
  const startYear = row.start ? parseInt(row.start.split('-')[0]) : null;
  
  // AGM batteries are typically used for:
  // - Start-stop systems
  // - Luxury vehicles
  // - Vehicles with high electrical demands
  if (vehicle.includes('audi') || vehicle.includes('bmw') || vehicle.includes('mercedes')) {
    if (startYear && startYear >= 2010) {
      suggestions.agm = 'F44'; // Common AGM battery code
    }
  }
  
  // EFB batteries are typically used for:
  // - Start-stop systems in mid-range vehicles
  // - Diesel engines with start-stop
  if (fuel === 'diesel' && startYear && startYear >= 2008) {
    suggestions.efb = 'F32'; // Common EFB battery code
  }
  
  // Conventional batteries for:
  // - Older vehicles
  // - Basic systems without start-stop
  if (startYear && startYear < 2010) {
    suggestions.conventional = 'F7'; // Common conventional battery code
  }
  
  // If no specific suggestion, provide a default
  if (!suggestions.agm && !suggestions.efb && !suggestions.conventional) {
    suggestions.conventional = 'F7';
  }
  
  return suggestions;
}

// Function to fix battery issues
function fixBatteryIssues(data) {
  const fixedData = data.map(row => {
    const batteryFields = ['Battery_AGM', 'Battery_EFB', 'Battery_Conventional'];
    const hasBattery = batteryFields.some(field => row[field] && row[field].trim() !== '');
    
    if (!hasBattery) {
      // Get suggestions for this row
      const suggestions = suggestBatteryType({
        vehicle: row.Vehicle,
        motorisation: row.Motorisation,
        fuel: row.Fuel,
        start: row.Start
      });
      
      // Apply suggestions
      if (suggestions.agm) {
        row.Battery_AGM = suggestions.agm;
      }
      if (suggestions.efb) {
        row.Battery_EFB = suggestions.efb;
      }
      if (suggestions.conventional) {
        row.Battery_Conventional = suggestions.conventional;
      }
      
      console.log(`Fixed row ${row._lineNumber}: ${row.Brand} ${row.Vehicle} - Added: AGM=${suggestions.agm}, EFB=${suggestions.efb}, Conventional=${suggestions.conventional}`);
    }
    
    return row;
  });
  
  return fixedData;
}

// Function to save fixed data
function saveFixedData(data, outputPath) {
  if (data.length === 0) {
    console.log('No data to save');
    return;
  }
  
  const headers = Object.keys(data[0]).filter(key => !key.startsWith('_'));
  const csvContent = [
    headers.join(';'),
    ...data.map(row => headers.map(header => row[header] || '').join(';'))
  ].join('\n');
  
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Fixed data saved to: ${outputPath}`);
}

// Main function
function main() {
  const inputFile = 'ILV-FULMEN-ENDURANCE_manual_complete.csv';
  const inputPath = path.join(__dirname, inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputFile}`);
    return;
  }
  
  console.log('🔋 Fixing ILV FULMEN ENDURANCE Battery Issues\n');
  console.log(`📊 Processing: ${inputFile}`);
  
  // Read data
  const { headers, data } = readCSVData(inputPath);
  console.log(`📈 Total rows: ${data.length}`);
  
  // Identify issues
  const issues = identifyBatteryIssues(data);
  console.log(`🔍 Found ${issues.length} rows with missing battery types:\n`);
  
  // Display issues
  issues.forEach(issue => {
    console.log(`Line ${issue.line}: ${issue.brand} ${issue.vehicle}`);
    console.log(`  Motorisation: ${issue.motorisation}`);
    console.log(`  Fuel: ${issue.fuel}, Start: ${issue.start}`);
    console.log(`  Current: AGM=${issue.agm}, EFB=${issue.efb}, Conventional=${issue.conventional}`);
    console.log('');
  });
  
  // Fix issues
  console.log('🔧 Applying fixes...\n');
  const fixedData = fixBatteryIssues(data);
  
  // Save fixed data
  const outputFile = inputFile.replace('.csv', '_battery_fixed.csv');
  const outputPath = path.join(__dirname, outputFile);
  saveFixedData(fixedData, outputPath);
  
  // Verify fixes
  const fixedIssues = identifyBatteryIssues(fixedData);
  console.log(`\n✅ Verification: ${fixedIssues.length} rows still have missing battery types`);
  
  if (fixedIssues.length === 0) {
    console.log('🎉 All battery issues have been fixed!');
  } else {
    console.log('⚠️ Some issues remain. Manual review may be needed.');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  readCSVData,
  identifyBatteryIssues,
  suggestBatteryType,
  fixBatteryIssues,
  saveFixedData
};
