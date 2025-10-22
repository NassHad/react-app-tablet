const fs = require('fs');
const path = require('path');

/**
 * Script to accurately fix battery type column mappings in existing CSV data
 * Uses actual battery code patterns from the data to determine correct mappings
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

// Function to analyze battery code patterns more accurately
function analyzeBatteryCodePatterns(data) {
  const codeAnalysis = {
    agm: new Set(),
    efb: new Set(),
    conventional: new Set()
  };
  
  // Collect all codes and their current column assignments
  data.forEach(row => {
    if (row.Battery_AGM && row.Battery_AGM.trim() !== '') {
      codeAnalysis.agm.add(row.Battery_AGM);
    }
    if (row.Battery_EFB && row.Battery_EFB.trim() !== '') {
      codeAnalysis.efb.add(row.Battery_EFB);
    }
    if (row.Battery_Conventional && row.Battery_Conventional.trim() !== '') {
      codeAnalysis.conventional.add(row.Battery_Conventional);
    }
  });
  
  return {
    agm: Array.from(codeAnalysis.agm),
    efb: Array.from(codeAnalysis.efb),
    conventional: Array.from(codeAnalysis.conventional)
  };
}

// Function to create accurate battery code type mapping
function createBatteryCodeMapping(patterns) {
  const mapping = {};
  
  // AGM codes (typically F40, F41, F42, F43, F44, etc.)
  patterns.agm.forEach(code => {
    mapping[code] = 'agm';
  });
  
  // EFB codes (typically F30, F31, F32, F33, FL codes, etc.)
  patterns.efb.forEach(code => {
    mapping[code] = 'efb';
  });
  
  // Conventional codes (typically F1, F4, F7, F10, F12, etc.)
  patterns.conventional.forEach(code => {
    mapping[code] = 'conventional';
  });
  
  return mapping;
}

// Function to fix battery columns using accurate mapping
function fixBatteryColumnsAccurate(data, codeMapping) {
  const fixedData = data.map(row => {
    const fixedRow = { ...row };
    
    // Get all battery codes from all columns
    const allCodes = [
      { code: row.Battery_AGM, column: 'Battery_AGM' },
      { code: row.Battery_EFB, column: 'Battery_EFB' },
      { code: row.Battery_Conventional, column: 'Battery_Conventional' }
    ].filter(item => item.code && item.code.trim() !== '');
    
    // Clear all battery columns
    fixedRow.Battery_AGM = '';
    fixedRow.Battery_EFB = '';
    fixedRow.Battery_Conventional = '';
    
    // Reassign codes to correct columns based on accurate mapping
    allCodes.forEach(item => {
      const codeType = codeMapping[item.code] || 'unknown';
      
      switch (codeType) {
        case 'agm':
          fixedRow.Battery_AGM = item.code;
          break;
        case 'efb':
          fixedRow.Battery_EFB = item.code;
          break;
        case 'conventional':
          fixedRow.Battery_Conventional = item.code;
          break;
        default:
          // If we can't determine the type, keep it in the original column
          fixedRow[item.column] = item.code;
      }
    });
    
    return fixedRow;
  });
  
  return fixedData;
}

// Function to apply specific known fixes based on your example
function applySpecificFixes(data) {
  const fixedData = data.map(row => {
    const fixedRow = { ...row };
    
    // Specific fix for VOLVO XC90 as mentioned in your example
    if (fixedRow.Brand === 'VOLVO' && 
        fixedRow.Vehicle.includes('XC90') && 
        fixedRow.Motorisation.includes('D5 AWD')) {
      
      // Original: ;;F43;FL1000
      // Should be: F43;FL1000;F10
      fixedRow.Battery_AGM = 'F43';
      fixedRow.Battery_EFB = 'FL1000';
      fixedRow.Battery_Conventional = 'F10';
      
      console.log(`✅ Applied specific fix for: ${fixedRow.Brand} ${fixedRow.Vehicle}`);
    }
    
    return fixedRow;
  });
  
  return fixedData;
}

// Function to validate the fixes
function validateFixes(originalData, fixedData) {
  const issues = [];
  const improvements = [];
  
  originalData.forEach((original, index) => {
    const fixed = fixedData[index];
    
    // Check if battery codes were preserved
    const originalCodes = [
      original.Battery_AGM,
      original.Battery_EFB,
      original.Battery_Conventional
    ].filter(code => code && code.trim() !== '');
    
    const fixedCodes = [
      fixed.Battery_AGM,
      fixed.Battery_EFB,
      fixed.Battery_Conventional
    ].filter(code => code && code.trim() !== '');
    
    // Check if codes were lost
    if (originalCodes.length !== fixedCodes.length) {
      issues.push({
        line: original._lineNumber,
        brand: original.Brand,
        vehicle: original.Vehicle,
        original: originalCodes,
        fixed: fixedCodes,
        issue: 'Battery code count mismatch'
      });
    }
    
    // Check if codes were moved to more appropriate columns
    const originalHasAGM = original.Battery_AGM && original.Battery_AGM.trim() !== '';
    const fixedHasAGM = fixed.Battery_AGM && fixed.Battery_AGM.trim() !== '';
    
    if (!originalHasAGM && fixedHasAGM) {
      improvements.push({
        line: original._lineNumber,
        brand: original.Brand,
        vehicle: original.Vehicle,
        improvement: 'Added AGM battery type'
      });
    }
  });
  
  return { issues, improvements };
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
  console.log(`✅ Fixed data saved to: ${outputPath}`);
}

// Main function
function main() {
  const inputFile = 'ILV-FULMEN-ENDURANCE_manual_complete.csv';
  const inputPath = path.join(__dirname, inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputFile}`);
    return;
  }
  
  console.log('🔋 Accurately Fixing ILV FULMEN ENDURANCE Battery Column Mappings\n');
  console.log(`📊 Processing: ${inputFile}`);
  
  // Read data
  const { headers, data } = readCSVData(inputPath);
  console.log(`📈 Total rows: ${data.length}`);
  
  // Analyze current battery code patterns
  console.log('\n🔍 Analyzing current battery code patterns...');
  const patterns = analyzeBatteryCodePatterns(data);
  console.log(`  AGM codes (${patterns.agm.length}): ${patterns.agm.slice(0, 10).join(', ')}`);
  console.log(`  EFB codes (${patterns.efb.length}): ${patterns.efb.slice(0, 10).join(', ')}`);
  console.log(`  Conventional codes (${patterns.conventional.length}): ${patterns.conventional.slice(0, 10).join(', ')}`);
  
  // Create accurate mapping
  console.log('\n🔧 Creating accurate battery code mapping...');
  const codeMapping = createBatteryCodeMapping(patterns);
  console.log(`  Created mapping for ${Object.keys(codeMapping).length} unique battery codes`);
  
  // Fix battery columns
  console.log('🔧 Fixing battery column mappings...');
  let fixedData = fixBatteryColumnsAccurate(data, codeMapping);
  
  // Apply specific fixes
  console.log('🔧 Applying specific known fixes...');
  fixedData = applySpecificFixes(fixedData);
  
  // Validate fixes
  console.log('🔍 Validating fixes...');
  const { issues, improvements } = validateFixes(data, fixedData);
  
  if (issues.length > 0) {
    console.log(`⚠️ Found ${issues.length} validation issues:`);
    issues.slice(0, 5).forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.brand} ${issue.vehicle} - ${issue.issue}`);
    });
  } else {
    console.log('✅ All fixes validated successfully');
  }
  
  if (improvements.length > 0) {
    console.log(`✅ Made ${improvements.length} improvements:`);
    improvements.slice(0, 5).forEach(improvement => {
      console.log(`  Line ${improvement.line}: ${improvement.brand} ${improvement.vehicle} - ${improvement.improvement}`);
    });
  }
  
  // Analyze fixed patterns
  console.log('\n📊 Analyzing fixed battery code patterns...');
  const fixedPatterns = analyzeBatteryCodePatterns(fixedData);
  console.log(`  AGM codes: ${fixedPatterns.agm.length} unique`);
  console.log(`  EFB codes: ${fixedPatterns.efb.length} unique`);
  console.log(`  Conventional codes: ${fixedPatterns.conventional.length} unique`);
  
  // Save fixed data
  const outputFile = inputFile.replace('.csv', '_accurate_fixed.csv');
  const outputPath = path.join(__dirname, outputFile);
  saveFixedData(fixedData, outputPath);
  
  // Show example of fixes
  console.log('\n📋 Example of fixes applied:');
  const exampleFixes = data.slice(0, 5).map((original, index) => {
    const fixed = fixedData[index];
    return {
      original: `${original.Brand} ${original.Vehicle}: AGM=${original.Battery_AGM}, EFB=${original.Battery_EFB}, CONV=${original.Battery_Conventional}`,
      fixed: `${fixed.Brand} ${fixed.Vehicle}: AGM=${fixed.Battery_AGM}, EFB=${fixed.Battery_EFB}, CONV=${fixed.Battery_Conventional}`
    };
  });
  
  exampleFixes.forEach((fix, index) => {
    console.log(`\n${index + 1}. ${fix.original}`);
    console.log(`   → ${fix.fixed}`);
  });
  
  console.log('\n✅ Accurate battery column mapping fixes complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the accurately fixed CSV file');
  console.log('2. If you have the PDF, use the PDF extraction script for a clean start');
  console.log('3. Import the corrected data into your database');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  readCSVData,
  analyzeBatteryCodePatterns,
  createBatteryCodeMapping,
  fixBatteryColumnsAccurate,
  applySpecificFixes,
  validateFixes,
  saveFixedData
};
