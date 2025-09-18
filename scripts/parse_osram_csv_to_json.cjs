const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, 'osram_complete_file_manual.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n');

// Position mappings based on CSV header
const positionMappings = {
  3: 'Feu de croisement',      // feu_croisement
  4: 'Feu de route',           // feu_route
  5: 'Éclairage jour',         // eclairage_jour
  6: 'Feu de position',        // feu_position
  7: 'Feu antibrouillard',     // feu_antibrouillard
  8: 'Clignotant avant',       // clignotant_avant_voiture
  9: 'Clignotant arrière',     // clignotant_arriere_voiture
  10: 'Feux arrières',         // feu_arriere
  11: 'Feu de stop',           // feu_stop
  12: 'Éclairage plaque',      // feu_plaque_immatriculation
  13: 'Éclairage intérieur',   // eclairage_interieur
  14: 'Éclairage coffre'       // eclairage_coffre
};

// Category mappings based on CSV header
const categoryMappings = {
  3: 'feu_croisement',
  4: 'feu_route',
  5: 'eclairage_jour',
  6: 'feu_position',
  7: 'feu_antibrouillard',
  8: 'clignotant_avant_voiture',
  9: 'clignotant_arriere_voiture',
  10: 'feu_arriere',
  11: 'feu_stop',
  12: 'feu_plaque_immatriculation',
  13: 'eclairage_interieur',
  14: 'eclairage_coffre'
};

let currentBrand = '';
let jsonData = [];
let idCounter = 1;

// Process each line (skip header row)
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  const columns = line.split(';');
  
  // Check if this is a brand line (starts with *)
  if (line.startsWith('*') && line.endsWith(';')) {
    currentBrand = line.replace('*', '').replace(/;+$/, '').trim();
    console.log(`Processing brand: ${currentBrand}`);
    continue;
  }
  
  // Skip empty lines or lines that don't have model info
  if (!columns[0] || columns[0].trim() === '') continue;
  
  const model = columns[0].trim();
  const productionPeriod = columns[1] ? columns[1].trim() : '';
  const typeConception = columns[2] ? columns[2].trim() : '';
  
  // Parse construction year
  let constructionYear = { start: '', end: 'Present' };
  if (productionPeriod) {
    if (productionPeriod.includes('->>')) {
      constructionYear.start = productionPeriod.replace('->>', '').trim();
      constructionYear.end = 'Present';
    } else if (productionPeriod.includes('-')) {
      const [start, end] = productionPeriod.split('-');
      constructionYear.start = start ? start.trim() : '';
      constructionYear.end = end ? end.trim() : 'Present';
    } else {
      constructionYear.start = productionPeriod;
    }
  }
  
  // Process each bulb position (columns 3-14)
  for (let colIndex = 3; colIndex <= 14; colIndex++) {
    const lightType = columns[colIndex] ? columns[colIndex].trim() : '';
    
    // Skip empty or invalid bulb types
    if (!lightType || lightType === '-' || lightType === '**' || lightType === '') continue;
    
    const position = positionMappings[colIndex] || 'Autre';
    const category = categoryMappings[colIndex] || 'autre';
    
    // Create JSON entry
    const entry = {
      id: idCounter++,
      brand: currentBrand,
      model: model,
      constructionYear: constructionYear,
      typeConception: typeConception,
      lightType: lightType,
      position: position,
      category: category,
      partNumber: '',
      notes: '',
      source: 'OSRAM CSV Guide'
    };
    
    jsonData.push(entry);
  }
}

// Write JSON file
const outputPath = path.join(__dirname, 'osram_bulbs_parsed.json');
fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

console.log(`\nProcessing complete!`);
console.log(`Total entries created: ${jsonData.length}`);
console.log(`Output file: ${outputPath}`);

// Show some statistics
const brandCount = new Set(jsonData.map(item => item.brand)).size;
const modelCount = new Set(jsonData.map(item => item.model)).size;
const lightTypeCount = new Set(jsonData.map(item => item.lightType)).size;

console.log(`\nStatistics:`);
console.log(`- Brands: ${brandCount}`);
console.log(`- Models: ${modelCount}`);
console.log(`- Light types: ${lightTypeCount}`);

// Show sample entries
console.log(`\nSample entries:`);
console.log(JSON.stringify(jsonData.slice(0, 3), null, 2));
