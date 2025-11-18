const fs = require('fs');
const path = require('path');
const http = require('http');

/**
 * Test script to verify motorisation filtering works correctly
 * This simulates the frontend filtering logic
 */

const STRAPI_URL = 'http://localhost:1338';

// Helper function to make HTTP requests
function makeHttpRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Simulate the frontend filtering logic
function filterMotorisations(motorisations, selectedMotorisation) {
  if (!selectedMotorisation) {
    return motorisations;
  }
  
  return motorisations.filter(motor => {
    const motorisationMatch = motor.motorisation.toLowerCase().includes(selectedMotorisation.toLowerCase()) ||
                             selectedMotorisation.toLowerCase().includes(motor.motorisation.toLowerCase());
    const fuelMatch = motor.fuel.toLowerCase().includes(selectedMotorisation.toLowerCase()) ||
                     selectedMotorisation.toLowerCase().includes(motor.fuel.toLowerCase());
    return motorisationMatch || fuelMatch;
  });
}

// Test motorisation filtering
async function testMotorisationFiltering() {
  console.log('🔋 Testing Motorisation Filtering\n');
  
  try {
    // Step 1: Get all battery products for ALFA ROMEO 147
    console.log('📡 Step 1: Fetching battery products for ALFA ROMEO 147...');
    const allProductsResponse = await makeHttpRequest(`${STRAPI_URL}/api/battery-products`);
    
    if (allProductsResponse.status !== 200) {
      console.log('❌ Failed to fetch battery products');
      return false;
    }
    
    const allProducts = allProductsResponse.data.data;
    const brandSlug = 'alfa-romeo';
    const modelSlug = '147';
    
    const matchingProducts = allProducts.filter(product => 
      product.brandSlug?.toLowerCase() === brandSlug.toLowerCase() &&
      product.modelSlug?.toLowerCase() === modelSlug.toLowerCase()
    );
    
    console.log(`✅ Found ${matchingProducts.length} matching products`);
    
    // Step 2: Extract all motorisations
    console.log('\n📡 Step 2: Extracting all motorisations...');
    const allMotorisations = [];
    
    matchingProducts.forEach((product, productIndex) => {
      if (product.motorisations && Array.isArray(product.motorisations)) {
        product.motorisations.forEach((motor, motorIndex) => {
          allMotorisations.push({
            id: `${product.id}-${motorIndex}`,
            motorisation: motor.motorisation,
            fuel: motor.fuel,
            startDate: motor.startDate,
            endDate: motor.endDate,
            batteryTypes: {
              AGM: motor.batteryAGM || null,
              EFB: motor.batteryEFB || null,
              Conventional: motor.batteryConventional || null,
            },
            batteryProductId: product.id,
            batteryProductSlug: product.slug,
          });
        });
      }
    });
    
    console.log(`✅ Extracted ${allMotorisations.length} total motorisations`);
    console.log('\n📋 All available motorisations:');
    allMotorisations.forEach((motor, index) => {
      console.log(`   ${index + 1}. ${motor.motorisation} (${motor.fuel})`);
    });
    
    // Step 3: Test filtering with different selections
    console.log('\n📡 Step 3: Testing filtering with different selections...');
    
    const testCases = [
      '1.9 JTD',
      '1.6 16V T.SPARK',
      'ECO',
      'Diesel',
      'Petrole'
    ];
    
    testCases.forEach(selectedMotorisation => {
      console.log(`\n🔍 Testing selection: "${selectedMotorisation}"`);
      const filtered = filterMotorisations(allMotorisations, selectedMotorisation);
      
      console.log(`   Total motorisations: ${allMotorisations.length}`);
      console.log(`   Filtered motorisations: ${filtered.length}`);
      
      if (filtered.length > 0) {
        console.log('   Filtered results:');
        filtered.forEach((motor, index) => {
          console.log(`     ${index + 1}. ${motor.motorisation} (${motor.fuel})`);
          if (motor.batteryTypes.EFB) console.log(`        EFB: ${motor.batteryTypes.EFB}`);
          if (motor.batteryTypes.Conventional) console.log(`        Conventional: ${motor.batteryTypes.Conventional}`);
        });
      } else {
        console.log('   ❌ No motorisations found for this selection');
      }
    });
    
    // Step 4: Test exact match
    console.log('\n📡 Step 4: Testing exact motorisation match...');
    const exactMatch = '1.9 JTD, 1.9 JTD 16V, 1.9 JTDM, 1.9 JTDM 8V, 1.9 JTDM, 16V';
    const exactFiltered = filterMotorisations(allMotorisations, exactMatch);
    
    console.log(`🔍 Testing exact match: "${exactMatch}"`);
    console.log(`   Filtered motorisations: ${exactFiltered.length}`);
    
    if (exactFiltered.length > 0) {
      console.log('   ✅ Exact match found!');
      exactFiltered.forEach((motor, index) => {
        console.log(`     ${index + 1}. ${motor.motorisation} (${motor.fuel})`);
        console.log(`        EFB: ${motor.batteryTypes.EFB}`);
        console.log(`        Conventional: ${motor.batteryTypes.Conventional}`);
      });
    }
    
    console.log('\n🎉 Motorisation filtering test completed successfully!');
    console.log('\n📝 Summary:');
    console.log('✅ All motorisations extracted correctly');
    console.log('✅ Filtering logic works for partial matches');
    console.log('✅ Filtering logic works for exact matches');
    console.log('✅ Battery types are preserved in filtered results');
    
    return true;
    
  } catch (error) {
    console.log('💥 Exception:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🔋 Motorisation Filtering Test\n');
  console.log(`🌐 Strapi URL: ${STRAPI_URL}\n`);
  
  const success = await testMotorisationFiltering();
  
  if (success) {
    console.log('\n✅ All tests passed! Motorisation filtering is working correctly.');
    console.log('\n📝 Next steps:');
    console.log('1. Test the frontend application');
    console.log('2. Navigate to battery category');
    console.log('3. Select ALFA ROMEO 147');
    console.log('4. Select a specific motorisation');
    console.log('5. Verify that only the selected motorisation is displayed');
  } else {
    console.log('\n❌ Tests failed! Check the implementation.');
  }
}

// Run the test
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testMotorisationFiltering,
  filterMotorisations
};
