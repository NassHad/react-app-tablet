const fs = require('fs');
const path = require('path');

/**
 * Advanced parser for the Adobe PDF CSV file
 * This file has a complex structure that needs careful parsing
 */

// Function to parse the Adobe CSV with advanced logic
function parseAdobeCSVAdvanced(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  console.log('🔋 ILV FULMEN ENDURANCE Adobe CSV Advanced Parser\n');
  console.log(`📄 File: ${filePath}`);
  console.log(`📊 Total lines: ${lines.length}`);
  
  const batteryData = [];
  let currentBrand = '';
  let currentVehicle = '';
  let currentMotorisation = '';
  let currentFuel = '';
  let currentStartDate = '';
  let currentEndDate = '';
  let currentAGM = '';
  let currentEFB = '';
  let currentConventional = '';
  
  // Process each line
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
    
    // Check if this is a brand name (standalone, all caps)
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
          startDate: currentStartDate,
          endDate: currentEndDate,
          battery_agm: currentAGM,
          battery_efb: currentEFB,
          battery_conventional: currentConventional,
          lineNumber: i + 1
        });
      }
      
      // Start new entry
      currentBrand = line;
      currentVehicle = '';
      currentMotorisation = '';
      currentFuel = '';
      currentStartDate = '';
      currentEndDate = '';
      currentAGM = '';
      currentEFB = '';
      currentConventional = '';
      
      continue;
    }
    
    // Parse the line for vehicle data
    const parts = line.split(';');
    
    // Look for vehicle model (contains parentheses)
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j].trim();
      if (part.includes('(') && part.includes(')') && !currentVehicle) {
        currentVehicle = part;
        break;
      }
    }
    
    // Look for motorisation (contains engine specs)
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j].trim();
      if ((part.includes('JTD') || part.includes('TDI') || part.includes('TFSI') || 
           part.includes('MultiJet') || part.includes('CRDi') || part.includes('Hybrid') ||
           part.match(/\d+\.\d+/) || part.includes('16V') || part.includes('8V') ||
           part.includes('D2') || part.includes('D3') || part.includes('D4') ||
           part.includes('D5') || part.includes('AWD')) &&
          !currentMotorisation) {
        currentMotorisation = part;
        break;
      }
    }
    
    // Look for fuel type and dates
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j].trim();
      if (part.includes('Diesel') || part.includes('Petrole') || part.includes('Essence') || 
          part.includes('Electro') || part.includes('Hybrid')) {
        
        currentFuel = part;
        
        // Extract dates from the same part or nearby parts
        const dateMatch = part.match(/(\d{4}-\d{2})(\d{4}-\d{2})?/);
        if (dateMatch) {
          currentStartDate = dateMatch[1];
          if (dateMatch[2]) {
            currentEndDate = dateMatch[2];
          }
        }
        
        // Also check nearby parts for dates
        for (let k = Math.max(0, j - 2); k <= Math.min(parts.length - 1, j + 2); k++) {
          const nearbyPart = parts[k].trim();
          const nearbyDateMatch = nearbyPart.match(/(\d{4}-\d{2})(\d{4}-\d{2})?/);
          if (nearbyDateMatch) {
            if (!currentStartDate) {
              currentStartDate = nearbyDateMatch[1];
            }
            if (nearbyDateMatch[2] && !currentEndDate) {
              currentEndDate = nearbyDateMatch[2];
            }
          }
        }
        
        break;
      }
    }
    
    // Look for battery codes
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j].trim();
      if (part.match(/^F\d+$/) || part.match(/^FL\d+$/)) {
        // Determine battery type based on code pattern
        if (part.startsWith('F4') || part.startsWith('F5') || part.startsWith('F6') || 
            part.startsWith('F7') || part.startsWith('F8') || part.startsWith('F9')) {
          currentAGM = part;
        } else if (part.startsWith('F3') || part.startsWith('FL')) {
          currentEFB = part;
        } else if (part.startsWith('F1') || part.startsWith('F2') || part.startsWith('F0')) {
          currentConventional = part;
        }
      }
    }
  }
  
  // Save the last entry
  if (currentBrand && currentVehicle && currentMotorisation && currentFuel) {
    batteryData.push({
      brand: currentBrand,
      vehicle: currentVehicle,
      motorisation: currentMotorisation,
      fuel: currentFuel,
      startDate: currentStartDate,
      endDate: currentEndDate,
      battery_agm: currentAGM,
      battery_efb: currentEFB,
      battery_conventional: currentConventional,
      lineNumber: lines.length
    });
  }
  
  return batteryData;
}

// Function to clean and validate the data
function cleanAndValidateData(data) {
  const cleanedData = data.map(entry => {
    // Clean up the data
    const cleaned = {
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

// Function to generate statistics
function generateStatistics(data) {
  const stats = {
    totalEntries: data.length,
    brands: {},
    fuelTypes: {},
    batteryTypes: {
      AGM: 0,
      EFB: 0,
      Conventional: 0,
      Multiple: 0
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
  });
  
  return stats;
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
  console.log(`✅ Clean data saved to: ${outputPath}`);
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
  
  // Parse the file
  const rawData = parseAdobeCSVAdvanced(inputPath);
  console.log(`🔍 Found ${rawData.length} raw entries`);
  
  // Clean and validate data
  console.log('🧹 Cleaning and validating data...');
  const cleanedData = cleanAndValidateData(rawData);
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
  const outputPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_ADOBE_ADVANCED.csv');
  saveToCSV(cleanedData, outputPath);
  
  console.log('\n✅ Advanced Adobe CSV parsing complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the cleaned CSV file: ILV-FULMEN-ENDURANCE_ADOBE_ADVANCED.csv');
  console.log('2. Compare with your existing data');
  console.log('3. Import the clean data into your database');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  parseAdobeCSVAdvanced,
  cleanAndValidateData,
  generateStatistics,
  saveToCSV,
  findExamples
};
