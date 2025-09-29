const fs = require('fs');
const path = require('path');
const http = require('http');

/**
 * Debug script to identify battery types mismatch between frontend and database
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

// Debug battery types mismatch
async function debugBatteryTypesMismatch() {
  console.log('🔋 Debugging Battery Types Mismatch\n');
  
  try {
    // Step 1: Get all battery products for ALFA ROMEO GIULIETTA
    console.log('📡 Step 1: Fetching battery products for ALFA ROMEO GIULIETTA...');
    const allProductsResponse = await makeHttpRequest(`${STRAPI_URL}/api/battery-products`);
    
    if (allProductsResponse.status !== 200) {
      console.log('❌ Failed to fetch battery products');
      return false;
    }
    
    const allProducts = allProductsResponse.data.data;
    const brandSlug = 'alfa-romeo';
    const modelSlug = 'giulietta';
    
    const matchingProducts = allProducts.filter(product => 
      product.brandSlug?.toLowerCase() === brandSlug.toLowerCase() &&
      product.modelSlug?.toLowerCase() === modelSlug.toLowerCase()
    );
    
    console.log(`✅ Found ${matchingProducts.length} matching products`);
    
    // Step 2: Extract battery types from motorisations
    console.log('\n📡 Step 2: Extracting battery types from motorisations...');
    const requestedBatteryTypes = new Set();
    
    matchingProducts.forEach((product, productIndex) => {
      console.log(`\nProduct ${productIndex + 1}: ${product.slug}`);
      
      if (product.motorisations && Array.isArray(product.motorisations)) {
        product.motorisations.forEach((motor, motorIndex) => {
          console.log(`  Motorisation ${motorIndex + 1}: ${motor.motorisation}`);
          console.log(`    Fuel: ${motor.fuel}`);
          console.log(`    Battery Types:`);
          
          if (motor.batteryAGM) {
            console.log(`      AGM: ${motor.batteryAGM}`);
            requestedBatteryTypes.add(motor.batteryAGM);
          }
          if (motor.batteryEFB) {
            console.log(`      EFB: ${motor.batteryEFB}`);
            requestedBatteryTypes.add(motor.batteryEFB);
          }
          if (motor.batteryConventional) {
            console.log(`      Conventional: ${motor.batteryConventional}`);
            requestedBatteryTypes.add(motor.batteryConventional);
          }
        });
      }
    });
    
    console.log(`\n📋 Battery types requested by frontend:`, Array.from(requestedBatteryTypes));
    
    // Step 3: Check what's available in BatteryData database
    console.log('\n📡 Step 3: Checking available battery data...');
    const batteryDataResponse = await makeHttpRequest(`${STRAPI_URL}/api/battery-datas`);
    
    if (batteryDataResponse.status === 200) {
      const batteryData = batteryDataResponse.data.data;
      const availableRefs = batteryData.map(item => item.ref);
      
      console.log(`✅ Found ${batteryData.length} battery data entries`);
      console.log(`📋 Available battery refs:`, availableRefs);
      
      // Step 4: Compare requested vs available
      console.log('\n📡 Step 4: Comparing requested vs available...');
      
      const requestedArray = Array.from(requestedBatteryTypes);
      const missing = requestedArray.filter(ref => !availableRefs.includes(ref));
      const available = requestedArray.filter(ref => availableRefs.includes(ref));
      
      console.log(`✅ Available battery types:`, available);
      console.log(`❌ Missing battery types:`, missing);
      
      if (missing.length > 0) {
        console.log('\n🔍 Missing battery types details:');
        missing.forEach(ref => {
          console.log(`   ${ref}: Not found in BatteryData database`);
        });
      }
      
      if (available.length > 0) {
        console.log('\n🔍 Available battery types details:');
        available.forEach(ref => {
          const data = batteryData.find(item => item.ref === ref);
          if (data) {
            console.log(`   ${ref}: ${data.brand} - ${data.description || 'No description'}`);
            console.log(`     Has image: ${!!data.img}`);
            console.log(`     Has brand image: ${!!data.brandImg}`);
          }
        });
      }
    }
    
    // Step 5: Test individual battery type lookups
    console.log('\n📡 Step 5: Testing individual battery type lookups...');
    
    for (const ref of Array.from(requestedBatteryTypes)) {
      try {
        const response = await makeHttpRequest(`${STRAPI_URL}/api/battery-data/ref/${ref}`);
        if (response.status === 200 && response.data.data) {
          console.log(`✅ ${ref}: Found - ${response.data.data.brand}`);
        } else {
          console.log(`❌ ${ref}: Not found (status: ${response.status})`);
        }
      } catch (error) {
        console.log(`❌ ${ref}: Error - ${error.message}`);
      }
    }
    
    console.log('\n🎉 Battery types mismatch debug completed!');
    console.log('\n📝 Summary:');
    console.log('✅ Battery products endpoint working');
    console.log('✅ Battery data endpoint working');
    console.log('✅ Comparison completed');
    
    if (missing.length > 0) {
      console.log('\n⚠️  Action Required:');
      console.log('   Add missing battery types to BatteryData database:');
      missing.forEach(ref => {
        console.log(`   - ${ref}`);
      });
    }
    
    return true;
    
  } catch (error) {
    console.log('💥 Exception:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🔋 Battery Types Mismatch Debug\n');
  console.log(`🌐 Strapi URL: ${STRAPI_URL}\n`);
  
  const success = await debugBatteryTypesMismatch();
  
  if (success) {
    console.log('\n✅ Debug completed successfully!');
  } else {
    console.log('\n❌ Debug failed! Check the implementation.');
  }
}

// Run the debug
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  debugBatteryTypesMismatch
};
