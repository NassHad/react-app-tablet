const fs = require('fs');
const path = require('path');

/**
 * Comprehensive analysis of the Adobe PDF CSV file
 * This file appears to be the complete, properly formatted dataset
 */

// Function to read and analyze the Adobe CSV
function analyzeAdobeCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  console.log('🔋 ILV FULMEN ENDURANCE Adobe CSV Analysis\n');
  console.log(`📄 File: ${filePath}`);
  console.log(`📊 Total lines: ${lines.length}`);
  
  // Find the header row
  let headerRow = -1;
  let dataStartRow = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('Modèle') && line.includes('Type') && line.includes('Carburant')) {
      headerRow = i;
      dataStartRow = i + 1;
      break;
    }
  }
  
  if (headerRow === -1) {
    console.log('❌ Could not find header row');
    return null;
  }
  
  console.log(`📋 Header row: ${headerRow + 1}`);
  console.log(`📊 Data starts at row: ${dataStartRow + 1}`);
  
  // Analyze the header
  const headerLine = lines[headerRow];
  console.log(`\n📋 Header structure:`);
  console.log(headerLine);
  
  // Parse the data
  const data = [];
  const brands = new Set();
  const fuelTypes = new Set();
  const batteryTypes = {
    AGM: new Set(),
    EFB: new Set(),
    CONVENTIONNELLE: new Set()
  };
  
  let validEntries = 0;
  let invalidEntries = 0;
  
  for (let i = dataStartRow; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and separator lines
    if (!line || line.startsWith(';') || line.includes('TROUVEZ LA BONNE BATTERIE')) {
      continue;
    }
    
    // Parse the line - it appears to be semicolon-separated
    const parts = line.split(';');
    
    if (parts.length < 10) {
      invalidEntries++;
      continue;
    }
    
    // Extract data based on the structure we can see
    const entry = {
      lineNumber: i + 1,
      rawLine: line,
      parts: parts
    };
    
    // Try to identify brand, model, motorisation, fuel, dates, and battery types
    let brand = '';
    let model = '';
    let motorisation = '';
    let fuel = '';
    let startDate = '';
    let endDate = '';
    let agm = '';
    let efb = '';
    let conventional = '';
    
    // Look for brand names (usually in caps and standalone)
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j].trim();
      
      if (part.match(/^[A-Z\s]+$/) && part.length > 3 && !part.includes('(') && !part.includes('.')) {
        brand = part;
        brands.add(brand);
        break;
      }
    }
    
    // Look for fuel types
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j].trim();
      if (part.includes('Diesel') || part.includes('Petrole') || part.includes('Essence') || part.includes('Electro')) {
        fuel = part;
        fuelTypes.add(fuel);
        break;
      }
    }
    
    // Look for battery codes
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j].trim();
      if (part.match(/^F\d+$/) || part.match(/^FL\d+$/)) {
        if (part.startsWith('F4') || part.startsWith('F5') || part.startsWith('F6') || 
            part.startsWith('F7') || part.startsWith('F8') || part.startsWith('F9')) {
          agm = part;
          batteryTypes.AGM.add(part);
        } else if (part.startsWith('F3') || part.startsWith('FL')) {
          efb = part;
          batteryTypes.EFB.add(part);
        } else if (part.startsWith('F1') || part.startsWith('F2') || part.startsWith('F0')) {
          conventional = part;
          batteryTypes.CONVENTIONNELLE.add(part);
        }
      }
    }
    
    // Look for dates
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j].trim();
      if (part.match(/^\d{4}-\d{2}$/)) {
        if (!startDate) {
          startDate = part;
        } else if (!endDate) {
          endDate = part;
        }
      }
    }
    
    entry.brand = brand;
    entry.model = model;
    entry.motorisation = motorisation;
    entry.fuel = fuel;
    entry.startDate = startDate;
    entry.endDate = endDate;
    entry.agm = agm;
    entry.efb = efb;
    entry.conventional = conventional;
    
    if (brand || fuel || agm || efb || conventional) {
      data.push(entry);
      validEntries++;
    } else {
      invalidEntries++;
    }
  }
  
  // Generate statistics
  const stats = {
    totalLines: lines.length,
    headerRow: headerRow + 1,
    dataStartRow: dataStartRow + 1,
    validEntries: validEntries,
    invalidEntries: invalidEntries,
    brands: Array.from(brands).sort(),
    fuelTypes: Array.from(fuelTypes).sort(),
    batteryTypes: {
      AGM: Array.from(batteryTypes.AGM).sort(),
      EFB: Array.from(batteryTypes.EFB).sort(),
      CONVENTIONNELLE: Array.from(batteryTypes.CONVENTIONNELLE).sort()
    }
  };
  
  return { stats, data };
}

// Function to clean and structure the data
function cleanAdobeData(rawData) {
  const cleanedData = [];
  
  rawData.forEach(entry => {
    if (entry.brand && entry.fuel) {
      cleanedData.push({
        brand: entry.brand.trim(),
        model: entry.model.trim(),
        motorisation: entry.motorisation.trim(),
        fuel: entry.fuel.trim(),
        startDate: entry.startDate.trim(),
        endDate: entry.endDate.trim(),
        battery_agm: entry.agm.trim(),
        battery_efb: entry.efb.trim(),
        battery_conventional: entry.conventional.trim(),
        lineNumber: entry.lineNumber
      });
    }
  });
  
  return cleanedData;
}

// Function to save cleaned data
function saveCleanedData(data, outputPath) {
  if (data.length === 0) {
    console.log('No data to save');
    return;
  }
  
  const headers = [
    'Brand', 'Model', 'Motorisation', 'Fuel', 'StartDate', 'EndDate', 
    'Battery_AGM', 'Battery_EFB', 'Battery_Conventional'
  ];
  
  const csvContent = [
    headers.join(';'),
    ...data.map(entry => [
      entry.brand,
      entry.model,
      entry.motorisation,
      entry.fuel,
      entry.startDate,
      entry.endDate,
      entry.battery_agm,
      entry.battery_efb,
      entry.battery_conventional
    ].join(';'))
  ].join('\n');
  
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`✅ Cleaned data saved to: ${outputPath}`);
}

// Function to find specific examples
function findExamples(data, searchTerm) {
  const examples = data.filter(entry => 
    entry.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.motorisation.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return examples;
}

// Main function
function main() {
  const inputFile = process.argv[2] || 'ILV FULMEN ENDURANCE from adobe PDF.csv';
  const inputPath = path.join(__dirname, inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputFile}`);
    return;
  }
  
  // Analyze the file
  const analysis = analyzeAdobeCSV(inputPath);
  if (!analysis) {
    return;
  }
  
  const { stats, data } = analysis;
  
  // Display statistics
  console.log('\n📊 Statistics:');
  console.log(`  Valid entries: ${stats.validEntries}`);
  console.log(`  Invalid entries: ${stats.invalidEntries}`);
  console.log(`  Unique brands: ${stats.brands.length}`);
  console.log(`  Fuel types: ${stats.fuelTypes.join(', ')}`);
  console.log(`  AGM battery codes: ${stats.batteryTypes.AGM.length} (${stats.batteryTypes.AGM.slice(0, 5).join(', ')}...)`);
  console.log(`  EFB battery codes: ${stats.batteryTypes.EFB.length} (${stats.batteryTypes.EFB.slice(0, 5).join(', ')}...)`);
  console.log(`  Conventional battery codes: ${stats.batteryTypes.CONVENTIONNELLE.length} (${stats.batteryTypes.CONVENTIONNELLE.slice(0, 5).join(', ')}...)`);
  
  // Show some examples
  console.log('\n📋 Sample entries:');
  data.slice(0, 5).forEach((entry, index) => {
    console.log(`${index + 1}. Line ${entry.lineNumber}: ${entry.brand}`);
    console.log(`   Fuel: ${entry.fuel}`);
    console.log(`   Dates: ${entry.startDate} - ${entry.endDate}`);
    console.log(`   Batteries: AGM=${entry.agm}, EFB=${entry.efb}, Conventional=${entry.conventional}`);
    console.log('');
  });
  
  // Look for VOLVO XC90 example
  console.log('🔍 Searching for VOLVO XC90 example...');
  const volvoExamples = findExamples(data, 'VOLVO');
  const xc90Examples = findExamples(data, 'XC90');
  
  console.log(`Found ${volvoExamples.length} VOLVO entries`);
  console.log(`Found ${xc90Examples.length} XC90 entries`);
  
  if (volvoExamples.length > 0) {
    console.log('\n📋 VOLVO examples:');
    volvoExamples.slice(0, 3).forEach((entry, index) => {
      console.log(`${index + 1}. Line ${entry.lineNumber}: ${entry.brand} ${entry.model}`);
      console.log(`   Fuel: ${entry.fuel}, Dates: ${entry.startDate} - ${entry.endDate}`);
      console.log(`   Batteries: AGM=${entry.agm}, EFB=${entry.efb}, Conventional=${entry.conventional}`);
    });
  }
  
  if (xc90Examples.length > 0) {
    console.log('\n📋 XC90 examples:');
    xc90Examples.slice(0, 3).forEach((entry, index) => {
      console.log(`${index + 1}. Line ${entry.lineNumber}: ${entry.brand} ${entry.model}`);
      console.log(`   Fuel: ${entry.fuel}, Dates: ${entry.startDate} - ${entry.endDate}`);
      console.log(`   Batteries: AGM=${entry.agm}, EFB=${entry.efb}, Conventional=${entry.conventional}`);
    });
  }
  
  // Clean the data
  console.log('\n🧹 Cleaning data...');
  const cleanedData = cleanAdobeData(data);
  console.log(`✅ Cleaned ${cleanedData.length} entries`);
  
  // Save cleaned data
  const outputPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_ADOBE_CLEAN.csv');
  saveCleanedData(cleanedData, outputPath);
  
  console.log('\n✅ Adobe CSV analysis complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the cleaned CSV file: ILV-FULMEN-ENDURANCE_ADOBE_CLEAN.csv');
  console.log('2. Compare with your existing data');
  console.log('3. Import the clean data into your database');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  analyzeAdobeCSV,
  cleanAdobeData,
  saveCleanedData,
  findExamples
};
