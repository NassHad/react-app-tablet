const fs = require('fs');
const path = require('path');

/**
 * Script to fix battery type column mappings in existing CSV data
 * This addresses the issue where battery codes are in wrong columns
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

// Function to analyze battery code patterns
function analyzeBatteryCodes(data) {
  const patterns = {
    agm: [],
    efb: [],
    conventional: []
  };
  
  data.forEach(row => {
    const agm = row.Battery_AGM || '';
    const efb = row.Battery_EFB || '';
    const conventional = row.Battery_Conventional || '';
    
    if (agm) patterns.agm.push(agm);
    if (efb) patterns.efb.push(efb);
    if (conventional) patterns.conventional.push(conventional);
  });
  
  // Count unique codes
  const uniquePatterns = {
    agm: [...new Set(patterns.agm)],
    efb: [...new Set(patterns.efb)],
    conventional: [...new Set(patterns.conventional)]
  };
  
  return uniquePatterns;
}

// Function to identify battery code types based on patterns
function identifyBatteryCodeType(code) {
  if (!code || code.trim() === '') return 'unknown';
  
  const upperCode = code.toUpperCase();
  
  // AGM battery patterns (typically F40, F41, F42, F43, F44, etc.)
  if (upperCode.match(/^F[4-9]\d*$/) || upperCode.match(/^F[1-9]\d+$/)) {
    return 'agm';
  }
  
  // EFB battery patterns (typically F30, F31, F32, F33, etc.)
  if (upperCode.match(/^F[3]\d*$/)) {
    return 'efb';
  }
  
  // Conventional battery patterns (typically F1, F4, F7, F10, F12, etc.)
  if (upperCode.match(/^F[1-2]\d*$/) || upperCode.match(/^F[0-9]$/)) {
    return 'conventional';
  }
  
  // FL codes are typically EFB
  if (upperCode.startsWith('FL')) {
    return 'efb';
  }
  
  return 'unknown';
}

// Function to fix battery column mappings
function fixBatteryColumns(data) {
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
    
    // Reassign codes to correct columns based on type
    allCodes.forEach(item => {
      const codeType = identifyBatteryCodeType(item.code);
      
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

// Function to detect and fix specific known issues
function fixKnownIssues(data) {
  const fixedData = data.map(row => {
    const fixedRow = { ...row };
    
    // Known issue patterns and their fixes
    const knownFixes = [
      // Example: VOLVO XC90 issue
      {
        condition: (r) => r.Brand === 'VOLVO' && r.Vehicle.includes('XC90') && r.Motorisation.includes('D5 AWD'),
        fix: (r) => {
          r.Battery_AGM = 'F43';
          r.Battery_EFB = 'FL1000';
          r.Battery_Conventional = 'F10';
        }
      }
    ];
    
    // Apply known fixes
    knownFixes.forEach(fix => {
      if (fix.condition(fixedRow)) {
        fix.fix(fixedRow);
        console.log(`Applied known fix for: ${fixedRow.Brand} ${fixedRow.Vehicle}`);
      }
    });
    
    return fixedRow;
  });
  
  return fixedData;
}

// Function to validate fixes
function validateFixes(originalData, fixedData) {
  const issues = [];
  
  originalData.forEach((original, index) => {
    const fixed = fixedData[index];
    
    // Check if any battery codes were lost
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
  });
  
  return issues;
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
  
  console.log('🔋 Fixing ILV FULMEN ENDURANCE Battery Column Mappings\n');
  console.log(`📊 Processing: ${inputFile}`);
  
  // Read data
  const { headers, data } = readCSVData(inputPath);
  console.log(`📈 Total rows: ${data.length}`);
  
  // Analyze current battery code patterns
  console.log('\n🔍 Analyzing current battery code patterns...');
  const patterns = analyzeBatteryCodes(data);
  console.log(`  AGM codes: ${patterns.agm.length} unique (${patterns.agm.slice(0, 5).join(', ')}...)`);
  console.log(`  EFB codes: ${patterns.efb.length} unique (${patterns.efb.slice(0, 5).join(', ')}...)`);
  console.log(`  Conventional codes: ${patterns.conventional.length} unique (${patterns.conventional.slice(0, 5).join(', ')}...)`);
  
  // Fix battery columns
  console.log('\n🔧 Fixing battery column mappings...');
  let fixedData = fixBatteryColumns(data);
  
  // Apply known fixes
  console.log('🔧 Applying known issue fixes...');
  fixedData = fixKnownIssues(fixedData);
  
  // Validate fixes
  console.log('🔍 Validating fixes...');
  const validationIssues = validateFixes(data, fixedData);
  
  if (validationIssues.length > 0) {
    console.log(`⚠️ Found ${validationIssues.length} validation issues:`);
    validationIssues.slice(0, 5).forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.brand} ${issue.vehicle} - ${issue.issue}`);
    });
  } else {
    console.log('✅ All fixes validated successfully');
  }
  
  // Analyze fixed patterns
  console.log('\n📊 Analyzing fixed battery code patterns...');
  const fixedPatterns = analyzeBatteryCodes(fixedData);
  console.log(`  AGM codes: ${fixedPatterns.agm.length} unique (${fixedPatterns.agm.slice(0, 5).join(', ')}...)`);
  console.log(`  EFB codes: ${fixedPatterns.efb.length} unique (${fixedPatterns.efb.slice(0, 5).join(', ')}...)`);
  console.log(`  Conventional codes: ${fixedPatterns.conventional.length} unique (${fixedPatterns.conventional.slice(0, 5).join(', ')}...)`);
  
  // Save fixed data
  const outputFile = inputFile.replace('.csv', '_columns_fixed.csv');
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
  
  console.log('\n✅ Battery column mapping fixes complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the fixed CSV file');
  console.log('2. Compare with PDF data if available');
  console.log('3. Import the corrected data into your database');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  readCSVData,
  analyzeBatteryCodes,
  identifyBatteryCodeType,
  fixBatteryColumns,
  fixKnownIssues,
  validateFixes,
  saveFixedData
};
