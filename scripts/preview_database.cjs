const fs = require('fs');

// Read the comprehensive database
const database = JSON.parse(fs.readFileSync('comprehensive_vehicle_database.json', 'utf8'));

console.log('🔍 Comprehensive Vehicle Database Preview');
console.log('='.repeat(60));

console.log('\n📊 Database Metadata:');
console.log(`Total brands: ${database.metadata.totalBrands}`);
console.log(`Total models: ${database.metadata.totalModels}`);
console.log(`Total light entries: ${database.metadata.totalEntries}`);
console.log(`Generated: ${database.metadata.generatedAt}`);

// Show sample brand structure
const sampleBrands = ['BMW', 'AUDI', 'FORD', 'HONDA'];
console.log('\n🏷️  Sample Brand Structure:');

sampleBrands.forEach(brandName => {
  if (database.brands[brandName]) {
    const brand = database.brands[brandName];
    console.log(`\n${brandName}:`);
    console.log(`  Model count: ${brand.modelCount}`);
    
    // Show first 3 models
    const modelNames = Object.keys(brand.models).slice(0, 3);
    modelNames.forEach(modelName => {
      const model = brand.models[modelName];
      console.log(`  - ${modelName} (${model.constructionYear.start}-${model.constructionYear.end})`);
      console.log(`    Type: ${model.typeConception}`);
      console.log(`    Light entries: ${model.entryCount}`);
      
      // Show sample light specifications
      if (model.lightSpecifications) {
        const lightSpecs = Object.entries(model.lightSpecifications)
          .filter(([key, value]) => value && value !== '-')
          .slice(0, 3);
        
        if (lightSpecs.length > 0) {
          console.log(`    Sample lights:`);
          lightSpecs.forEach(([position, lightType]) => {
            console.log(`      ${position}: ${lightType}`);
          });
        }
      }
    });
    
    if (brand.modelCount > 3) {
      console.log(`    ... and ${brand.modelCount - 3} more models`);
    }
  }
});

// Show light position mapping
console.log('\n💡 Light Position Categories:');
const lightPositions = {
  'feu_croisement': 'Feu de croisement (Low beam headlight)',
  'feu_route': 'Feu de route (High beam headlight)',
  'feux_antibrouillard': 'Feux antibrouillard (Fog lights)',
  'feux_route_supplementaires': 'Feux de route supplémentaires (Supplementary high beam)',
  'clignotant_avant': 'Clignotant avant (Front turn signal)',
  'clignotant_arriere': 'Clignotant arrière (Rear turn signal)',
  'feux_stop': 'Feux de stop (Brake lights)',
  'feux_plaque': 'Feux de plaque d\'immatriculation (License plate lights)',
  'eclairage_interieur': 'Éclairage intérieur (Interior lighting)',
  'feu_coffre': 'Feu de coffre (Trunk lighting)'
};

Object.entries(lightPositions).forEach(([key, description]) => {
  console.log(`  ${key}: ${description}`);
});

// Show sample complete entry
console.log('\n📋 Sample Complete Entry:');
const bmwBrand = database.brands['BMW'];
if (bmwBrand) {
  const firstModel = Object.values(bmwBrand.models)[0];
  if (firstModel) {
    console.log(`Brand: BMW`);
    console.log(`Model: ${firstModel.name}`);
    console.log(`Year: ${firstModel.constructionYear.start}-${firstModel.constructionYear.end}`);
    console.log(`Type: ${firstModel.typeConception}`);
    console.log(`Light Specifications:`);
    Object.entries(firstModel.lightSpecifications).forEach(([position, lightType]) => {
      if (lightType && lightType !== '-') {
        console.log(`  ${position}: ${lightType}`);
      }
    });
  }
}

console.log('\n✅ Database preview complete!');
console.log('\n📁 Files available:');
console.log('1. comprehensive_vehicle_database.json - Complete database (15.58 MB)');
console.log('2. simplified_vehicle_database.json - Simplified lookup database');
console.log('3. osram_bulbs_from_csv.json - Original OSRAM data (390 entries)');
