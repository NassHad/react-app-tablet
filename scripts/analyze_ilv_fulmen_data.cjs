const fs = require('fs');
const path = require('path');

/**
 * Script to analyze and fix ILV FULMEN ENDURANCE CSV data
 * This script can identify inconsistencies and errors in the existing data
 */

// Function to read and parse CSV data
function readCSVData(filePath) {
  try {
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
      
      row._lineNumber = index + 2; // +2 because we skip header and arrays are 0-indexed
      return row;
    });
    
    return { headers, data };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return { headers: [], data: [] };
  }
}

// Function to analyze data quality
function analyzeDataQuality(data) {
  const analysis = {
    totalRows: data.length,
    emptyRows: 0,
    incompleteRows: 0,
    duplicateRows: 0,
    brandIssues: [],
    modelIssues: [],
    motorisationIssues: [],
    batteryIssues: [],
    dateIssues: []
  };
  
  const seenRows = new Set();
  
  data.forEach((row, index) => {
    // Check for empty rows
    const isEmpty = Object.values(row).every(value => !value || value.trim() === '');
    if (isEmpty) {
      analysis.emptyRows++;
      return;
    }
    
    // Check for incomplete rows
    const requiredFields = ['Brand', 'Vehicle', 'Motorisation'];
    const missingFields = requiredFields.filter(field => !row[field] || row[field].trim() === '');
    if (missingFields.length > 0) {
      analysis.incompleteRows++;
      console.log(`Row ${row._lineNumber}: Missing fields: ${missingFields.join(', ')}`);
    }
    
    // Check for duplicates
    const rowKey = `${row.Brand}|${row.Vehicle}|${row.Motorisation}`;
    if (seenRows.has(rowKey)) {
      analysis.duplicateRows++;
      console.log(`Row ${row._lineNumber}: Duplicate entry`);
    } else {
      seenRows.add(rowKey);
    }
    
    // Check brand issues
    if (row.Brand && row.Brand.length < 2) {
      analysis.brandIssues.push({ line: row._lineNumber, brand: row.Brand });
    }
    
    // Check model issues
    if (row.Vehicle && row.Vehicle.length < 2) {
      analysis.modelIssues.push({ line: row._lineNumber, model: row.Vehicle });
    }
    
    // Check motorisation issues
    if (row.Motorisation && row.Motorisation.length < 2) {
      analysis.motorisationIssues.push({ line: row._lineNumber, motorisation: row.Motorisation });
    }
    
    // Check battery type issues
    const batteryFields = ['Battery_AGM', 'Battery_EFB', 'Battery_Conventional'];
    const hasBattery = batteryFields.some(field => row[field] && row[field].trim() !== '');
    if (!hasBattery) {
      analysis.batteryIssues.push({ line: row._lineNumber, message: 'No battery type specified' });
    }
    
    // Check date issues
    if (row.Start && row.Start !== '' && !isValidDate(row.Start)) {
      analysis.dateIssues.push({ line: row._lineNumber, field: 'Start', value: row.Start });
    }
    if (row.End && row.End !== '' && !isValidDate(row.End)) {
      analysis.dateIssues.push({ line: row._lineNumber, field: 'End', value: row.End });
    }
  });
  
  return analysis;
}

// Function to validate date format
function isValidDate(dateString) {
  if (!dateString || dateString.trim() === '') return true; // Empty dates are OK
  
  // Check for YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

// Function to fix common data issues
function fixDataIssues(data) {
  const fixedData = data.map(row => {
    const fixedRow = { ...row };
    
    // Fix brand names (common typos)
    const brandFixes = {
      'BMW': 'BMW',
      'AUDI': 'AUDI',
      'MERCEDES': 'MERCEDES',
      'VOLKSWAGEN': 'VOLKSWAGEN',
      'PEUGEOT': 'PEUGEOT',
      'RENAULT': 'RENAULT',
      'CITROEN': 'CITROEN',
      'FORD': 'FORD',
      'OPEL': 'OPEL',
      'TOYOTA': 'TOYOTA',
      'HONDA': 'HONDA',
      'NISSAN': 'NISSAN',
      'HYUNDAI': 'HYUNDAI',
      'KIA': 'KIA',
      'SKODA': 'SKODA',
      'SEAT': 'SEAT',
      'FIAT': 'FIAT',
      'ALFA ROMEO': 'ALFA ROMEO'
    };
    
    if (fixedRow.Brand && brandFixes[fixedRow.Brand.toUpperCase()]) {
      fixedRow.Brand = brandFixes[fixedRow.Brand.toUpperCase()];
    }
    
    // Fix vehicle names (remove extra spaces, standardize)
    if (fixedRow.Vehicle) {
      fixedRow.Vehicle = fixedRow.Vehicle.replace(/\s+/g, ' ').trim();
    }
    
    // Fix motorisation (remove extra spaces, standardize)
    if (fixedRow.Motorisation) {
      fixedRow.Motorisation = fixedRow.Motorisation.replace(/\s+/g, ' ').trim();
    }
    
    // Fix fuel type
    if (fixedRow.Fuel) {
      const fuelFixes = {
        'Petrole': 'Petrol',
        'Diesel': 'Diesel',
        'Essence': 'Petrol',
        'Hybrid': 'Hybrid',
        'Electric': 'Electric'
      };
      
      if (fuelFixes[fixedRow.Fuel]) {
        fixedRow.Fuel = fuelFixes[fixedRow.Fuel];
      }
    }
    
    // Fix battery codes (standardize format)
    const batteryFields = ['Battery_AGM', 'Battery_EFB', 'Battery_Conventional'];
    batteryFields.forEach(field => {
      if (fixedRow[field] && fixedRow[field].trim() !== '') {
        // Ensure battery codes are uppercase
        fixedRow[field] = fixedRow[field].toUpperCase().trim();
      }
    });
    
    return fixedRow;
  });
  
  return fixedData;
}

// Function to generate statistics
function generateStatistics(data) {
  const stats = {
    brands: {},
    models: {},
    motorisations: {},
    batteryTypes: {
      AGM: 0,
      EFB: 0,
      Conventional: 0
    },
    fuelTypes: {},
    dateRanges: {
      earliest: null,
      latest: null
    }
  };
  
  data.forEach(row => {
    // Count brands
    if (row.Brand) {
      stats.brands[row.Brand] = (stats.brands[row.Brand] || 0) + 1;
    }
    
    // Count models
    if (row.Vehicle) {
      stats.models[row.Vehicle] = (stats.models[row.Vehicle] || 0) + 1;
    }
    
    // Count motorisations
    if (row.Motorisation) {
      stats.motorisations[row.Motorisation] = (stats.motorisations[row.Motorisation] || 0) + 1;
    }
    
    // Count battery types
    if (row.Battery_AGM && row.Battery_AGM.trim() !== '') {
      stats.batteryTypes.AGM++;
    }
    if (row.Battery_EFB && row.Battery_EFB.trim() !== '') {
      stats.batteryTypes.EFB++;
    }
    if (row.Battery_Conventional && row.Battery_Conventional.trim() !== '') {
      stats.batteryTypes.Conventional++;
    }
    
    // Count fuel types
    if (row.Fuel) {
      stats.fuelTypes[row.Fuel] = (stats.fuelTypes[row.Fuel] || 0) + 1;
    }
    
    // Track date ranges
    if (row.Start && isValidDate(row.Start)) {
      if (!stats.dateRanges.earliest || row.Start < stats.dateRanges.earliest) {
        stats.dateRanges.earliest = row.Start;
      }
    }
    if (row.End && isValidDate(row.End)) {
      if (!stats.dateRanges.latest || row.End > stats.dateRanges.latest) {
        stats.dateRanges.latest = row.End;
      }
    }
  });
  
  return stats;
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
  const csvFiles = [
    'ILV-FULMEN-ENDURANCE_cleaned.csv',
    'ILV-FULMEN-ENDURANCE_complete.csv',
    'ILV-FULMEN-ENDURANCE_manual_complete.csv',
    'ILV-FULMEN-ENDURANCE_manual_filtered.csv'
  ];
  
  console.log('🔋 ILV FULMEN ENDURANCE Data Analysis\n');
  
  csvFiles.forEach(fileName => {
    const filePath = path.join(__dirname, fileName);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${fileName}`);
      return;
    }
    
    console.log(`\n📊 Analyzing: ${fileName}`);
    console.log('='.repeat(50));
    
    // Read data
    const { headers, data } = readCSVData(filePath);
    
    if (data.length === 0) {
      console.log('❌ No data found in file');
      return;
    }
    
    console.log(`📋 Headers: ${headers.join(', ')}`);
    console.log(`📈 Total rows: ${data.length}`);
    
    // Analyze data quality
    const analysis = analyzeDataQuality(data);
    console.log(`\n🔍 Data Quality Analysis:`);
    console.log(`   Empty rows: ${analysis.emptyRows}`);
    console.log(`   Incomplete rows: ${analysis.incompleteRows}`);
    console.log(`   Duplicate rows: ${analysis.duplicateRows}`);
    console.log(`   Brand issues: ${analysis.brandIssues.length}`);
    console.log(`   Model issues: ${analysis.modelIssues.length}`);
    console.log(`   Motorisation issues: ${analysis.motorisationIssues.length}`);
    console.log(`   Battery issues: ${analysis.batteryIssues.length}`);
    console.log(`   Date issues: ${analysis.dateIssues.length}`);
    
    // Generate statistics
    const stats = generateStatistics(data);
    console.log(`\n📊 Statistics:`);
    console.log(`   Unique brands: ${Object.keys(stats.brands).length}`);
    console.log(`   Unique models: ${Object.keys(stats.models).length}`);
    console.log(`   Unique motorisations: ${Object.keys(stats.motorisations).length}`);
    console.log(`   Battery types: AGM=${stats.batteryTypes.AGM}, EFB=${stats.batteryTypes.EFB}, Conventional=${stats.batteryTypes.Conventional}`);
    console.log(`   Date range: ${stats.dateRanges.earliest} to ${stats.dateRanges.latest}`);
    
    // Fix data issues
    const fixedData = fixDataIssues(data);
    
    // Save fixed data
    const outputFileName = fileName.replace('.csv', '_fixed.csv');
    const outputPath = path.join(__dirname, outputFileName);
    saveFixedData(fixedData, outputPath);
  });
  
  console.log('\n✅ Analysis complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the fixed CSV files');
  console.log('2. Check for any remaining data issues');
  console.log('3. Import the corrected data into your database');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  readCSVData,
  analyzeDataQuality,
  fixDataIssues,
  generateStatistics,
  saveFixedData
};
