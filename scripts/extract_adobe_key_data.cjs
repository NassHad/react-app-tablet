const fs = require('fs');
const path = require('path');

/**
 * Manual extraction of key data from the Adobe PDF CSV
 * Focus on extracting the most important battery information
 */

// Function to extract key data manually
function extractKeyData(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  console.log('🔋 ILV FULMEN ENDURANCE Adobe CSV Key Data Extraction\n');
  console.log(`📄 File: ${filePath}`);
  console.log(`📊 Total lines: ${lines.length}`);
  
  const batteryData = [];
  const brands = new Set();
  const batteryCodes = new Set();
  
  // Look for specific patterns in the data
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and headers
    if (!line || 
        line.startsWith(';') || 
        line.includes('TROUVEZ LA BONNE BATTERIE') ||
        line.includes('Modèle') ||
        line.includes('CONSEIL D\'EXPERT')) {
      continue;
    }
    
    // Extract battery codes (F numbers)
    const batteryMatches = line.match(/F\d+/g);
    if (batteryMatches) {
      batteryMatches.forEach(code => {
        batteryCodes.add(code);
      });
    }
    
    // Extract brand names (standalone caps)
    const brandMatches = line.match(/\b[A-Z][A-Z\s]+\b/g);
    if (brandMatches) {
      brandMatches.forEach(brand => {
        if (brand.length > 3 && 
            !brand.includes('(') && 
            !brand.includes('.') &&
            !brand.includes('Diesel') &&
            !brand.includes('Petrole') &&
            !brand.includes('Essence') &&
            !brand.includes('AGM') &&
            !brand.includes('EFB') &&
            !brand.includes('CONVENTIONNELLE')) {
          brands.add(brand);
        }
      });
    }
    
    // Look for specific vehicle entries with battery codes
    if (line.includes('Diesel') || line.includes('Petrole')) {
      const parts = line.split(';');
      
      let brand = '';
      let vehicle = '';
      let motorisation = '';
      let fuel = '';
      let startDate = '';
      let endDate = '';
      let agm = '';
      let efb = '';
      let conventional = '';
      
      // Extract brand
      for (let j = 0; j < parts.length; j++) {
        const part = parts[j].trim();
        if (part.match(/^[A-Z\s]+$/) && part.length > 3 && !part.includes('(')) {
          brand = part;
          break;
        }
      }
      
      // Extract fuel type
      for (let j = 0; j < parts.length; j++) {
        const part = parts[j].trim();
        if (part.includes('Diesel') || part.includes('Petrole')) {
          fuel = part;
          
          // Extract dates
          const dateMatch = part.match(/(\d{4}-\d{2})(\d{4}-\d{2})?/);
          if (dateMatch) {
            startDate = dateMatch[1];
            if (dateMatch[2]) {
              endDate = dateMatch[2];
            }
          }
          break;
        }
      }
      
      // Extract battery codes
      for (let j = 0; j < parts.length; j++) {
        const part = parts[j].trim();
        if (part.match(/^F\d+$/)) {
          if (part.startsWith('F4') || part.startsWith('F5') || part.startsWith('F6') || 
              part.startsWith('F7') || part.startsWith('F8') || part.startsWith('F9')) {
            agm = part;
          } else if (part.startsWith('F3')) {
            efb = part;
          } else if (part.startsWith('F1') || part.startsWith('F2') || part.startsWith('F0')) {
            conventional = part;
          }
        } else if (part.match(/^FL\d+$/)) {
          efb = part;
        }
      }
      
      // Extract vehicle model (contains parentheses)
      for (let j = 0; j < parts.length; j++) {
        const part = parts[j].trim();
        if (part.includes('(') && part.includes(')')) {
          vehicle = part;
          break;
        }
      }
      
      // Extract motorisation (contains engine specs)
      for (let j = 0; j < parts.length; j++) {
        const part = parts[j].trim();
        if (part.includes('JTD') || part.includes('TDI') || part.includes('TFSI') || 
            part.match(/\d+\.\d+/) || part.includes('16V') || part.includes('8V')) {
          motorisation = part;
          break;
        }
      }
      
      if (brand && fuel && (agm || efb || conventional)) {
        batteryData.push({
          brand: brand,
          vehicle: vehicle,
          motorisation: motorisation,
          fuel: fuel,
          startDate: startDate,
          endDate: endDate,
          battery_agm: agm,
          battery_efb: efb,
          battery_conventional: conventional,
          lineNumber: i + 1
        });
      }
    }
  }
  
  return { batteryData, brands: Array.from(brands), batteryCodes: Array.from(batteryCodes) };
}

// Function to clean the extracted data
function cleanExtractedData(data) {
  const cleanedData = data.map(entry => {
    return {
      brand: entry.brand.trim(),
      vehicle: entry.vehicle.trim(),
      motorisation: entry.motorisation.trim(),
      fuel: entry.fuel.trim(),
      startDate: entry.startDate.trim(),
      endDate: entry.endDate.trim(),
      battery_agm: entry.battery_agm.trim(),
      battery_efb: entry.battery_efb.trim(),
      battery_conventional: entry.battery_conventional.trim()
    };
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
    'Brand', 'Vehicle', 'Motorisation', 'Fuel', 'StartDate', 'EndDate', 
    'Battery_AGM', 'Battery_EFB', 'Battery_Conventional'
  ];
  
  const csvContent = [
    headers.join(';'),
    ...data.map(entry => [
      entry.brand,
      entry.vehicle,
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
  console.log(`✅ Key data saved to: ${outputPath}`);
}

// Function to find specific examples
function findExamples(data, searchTerm) {
  const examples = data.filter(entry => 
    entry.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  
  // Extract key data
  const { batteryData, brands, batteryCodes } = extractKeyData(inputPath);
  console.log(`🔍 Found ${batteryData.length} entries with battery data`);
  console.log(`🏷️ Found ${brands.length} unique brands: ${brands.slice(0, 10).join(', ')}...`);
  console.log(`🔋 Found ${batteryCodes.length} unique battery codes: ${batteryCodes.slice(0, 10).join(', ')}...`);
  
  // Clean the data
  console.log('🧹 Cleaning extracted data...');
  const cleanedData = cleanExtractedData(batteryData);
  console.log(`✅ Cleaned to ${cleanedData.length} unique entries`);
  
  // Show some examples
  console.log('\n📋 Sample entries:');
  cleanedData.slice(0, 5).forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.brand} ${entry.vehicle}`);
    console.log(`   Motorisation: ${entry.motorisation}`);
    console.log(`   Fuel: ${entry.fuel}, Dates: ${entry.startDate} - ${entry.endDate}`);
    console.log(`   Batteries: AGM=${entry.battery_agm}, EFB=${entry.battery_efb}, Conventional=${entry.battery_conventional}`);
    console.log('');
  });
  
  // Look for VOLVO XC90 example
  console.log('🔍 Searching for VOLVO XC90 example...');
  const volvoExamples = findExamples(cleanedData, 'VOLVO');
  const xc90Examples = findExamples(cleanedData, 'XC90');
  
  console.log(`Found ${volvoExamples.length} VOLVO entries`);
  console.log(`Found ${xc90Examples.length} XC90 entries`);
  
  if (volvoExamples.length > 0) {
    console.log('\n📋 VOLVO examples:');
    volvoExamples.slice(0, 3).forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.brand} ${entry.vehicle}`);
      console.log(`   Motorisation: ${entry.motorisation}`);
      console.log(`   Fuel: ${entry.fuel}, Dates: ${entry.startDate} - ${entry.endDate}`);
      console.log(`   Batteries: AGM=${entry.battery_agm}, EFB=${entry.battery_efb}, Conventional=${entry.battery_conventional}`);
    });
  }
  
  if (xc90Examples.length > 0) {
    console.log('\n📋 XC90 examples:');
    xc90Examples.slice(0, 3).forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.brand} ${entry.vehicle}`);
      console.log(`   Motorisation: ${entry.motorisation}`);
      console.log(`   Fuel: ${entry.fuel}, Dates: ${entry.startDate} - ${entry.endDate}`);
      console.log(`   Batteries: AGM=${entry.battery_agm}, EFB=${entry.battery_efb}, Conventional=${entry.battery_conventional}`);
    });
  }
  
  // Save cleaned data
  const outputPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_ADOBE_KEY_DATA.csv');
  saveToCSV(cleanedData, outputPath);
  
  console.log('\n✅ Key data extraction complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the extracted CSV file: ILV-FULMEN-ENDURANCE_ADOBE_KEY_DATA.csv');
  console.log('2. Compare with your existing data');
  console.log('3. Import the clean data into your database');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  extractKeyData,
  cleanExtractedData,
  saveToCSV,
  findExamples
};
