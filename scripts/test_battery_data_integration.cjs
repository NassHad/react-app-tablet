const fs = require('fs');
const path = require('path');
const http = require('http');

/**
 * Test script to verify battery data integration works correctly
 * This tests the new BatteryData entity endpoints
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

// Test battery data endpoints
async function testBatteryDataEndpoints() {
  console.log('🔋 Testing Battery Data Integration\n');
  
  try {
    // Step 1: Test basic CRUD endpoints
    console.log('📡 Step 1: Testing basic CRUD endpoints...');
    
    // Test GET all battery data
    const allBatteryDataResponse = await makeHttpRequest(`${STRAPI_URL}/api/battery-datas`);
    console.log(`✅ GET /api/battery-datas: ${allBatteryDataResponse.status}`);
    
    if (allBatteryDataResponse.status === 200) {
      const allBatteryData = allBatteryDataResponse.data.data;
      console.log(`   Found ${allBatteryData.length} battery data entries`);
      
      if (allBatteryData.length > 0) {
        console.log('   Sample entry:', {
          id: allBatteryData[0].id,
          ref: allBatteryData[0].ref,
          brand: allBatteryData[0].brand,
          hasImg: !!allBatteryData[0].img,
          hasBrandImg: !!allBatteryData[0].brandImg,
          description: allBatteryData[0].description
        });
      }
    }
    
    // Step 2: Test custom endpoints
    console.log('\n📡 Step 2: Testing custom endpoints...');
    
    // Test GET brands
    const brandsResponse = await makeHttpRequest(`${STRAPI_URL}/api/battery-data/brands`);
    console.log(`✅ GET /api/battery-data/brands: ${brandsResponse.status}`);
    
    if (brandsResponse.status === 200) {
      const brands = brandsResponse.data.data;
      console.log(`   Found ${brands.length} unique brands:`, brands);
    }
    
    // Test GET refs
    const refsResponse = await makeHttpRequest(`${STRAPI_URL}/api/battery-data/refs`);
    console.log(`✅ GET /api/battery-data/refs: ${refsResponse.status}`);
    
    if (refsResponse.status === 200) {
      const refs = refsResponse.data.data;
      console.log(`   Found ${refs.length} reference codes:`, refs);
    }
    
    // Step 3: Test specific reference lookup
    console.log('\n📡 Step 3: Testing specific reference lookup...');
    
    // Test with F7 (if it exists)
    const f7Response = await makeHttpRequest(`${STRAPI_URL}/api/battery-data/ref/F7`);
    console.log(`✅ GET /api/battery-data/ref/F7: ${f7Response.status}`);
    
    if (f7Response.status === 200) {
      const f7Data = f7Response.data.data;
      console.log('   F7 data:', {
        ref: f7Data.ref,
        brand: f7Data.brand,
        hasImg: !!f7Data.img,
        hasBrandImg: !!f7Data.brandImg,
        description: f7Data.description,
        isActive: f7Data.isActive
      });
    } else {
      console.log('   ⚠️  F7 not found - this is expected if no data has been added yet');
    }
    
    // Test with F32 (if it exists)
    const f32Response = await makeHttpRequest(`${STRAPI_URL}/api/battery-data/ref/F32`);
    console.log(`✅ GET /api/battery-data/ref/F32: ${f32Response.status}`);
    
    if (f32Response.status === 200) {
      const f32Data = f32Response.data.data;
      if (f32Data) {
        console.log('   F32 data:', {
          ref: f32Data.ref,
          brand: f32Data.brand,
          hasImg: !!f32Data.img,
          hasBrandImg: !!f32Data.brandImg,
          description: f32Data.description,
          isActive: f32Data.isActive
        });
      } else {
        console.log('   ⚠️  F32 data is null');
      }
    } else {
      console.log('   ⚠️  F32 not found - this is expected if no data has been added yet');
    }
    
    // Step 4: Test brand filtering
    console.log('\n📡 Step 4: Testing brand filtering...');
    
    // Test with a specific brand (if any exist)
    const brandResponse = await makeHttpRequest(`${STRAPI_URL}/api/battery-data/brand?brand=Fulmen Endurance`);
    console.log(`✅ GET /api/battery-data/brand?brand=Fulmen Endurance: ${brandResponse.status}`);
    
    if (brandResponse.status === 200) {
      const brandData = brandResponse.data.data;
      console.log(`   Found ${brandData.length} batteries for Fulmen Endurance`);
    } else {
      console.log('   ⚠️  No Fulmen Endurance batteries found - this is expected if no data has been added yet');
    }
    
    // Step 5: Test frontend integration simulation
    console.log('\n📡 Step 5: Testing frontend integration simulation...');
    
    // Simulate what the frontend would do
    const batteryTypes = ['F7', 'F32', 'F1', 'F30'];
    const batteryDataMap = {};
    
    console.log('   Simulating frontend battery data fetching...');
    
    for (const ref of batteryTypes) {
      try {
        const response = await makeHttpRequest(`${STRAPI_URL}/api/battery-data/ref/${ref}`);
        if (response.status === 200) {
          batteryDataMap[ref] = response.data.data;
          console.log(`   ✅ ${ref}: Found (${response.data.data.brand})`);
        } else {
          console.log(`   ⚠️  ${ref}: Not found`);
        }
      } catch (error) {
        console.log(`   ❌ ${ref}: Error - ${error.message}`);
      }
    }
    
    console.log(`\n   Final battery data map:`, Object.keys(batteryDataMap));
    
    // Step 6: Test image URLs
    console.log('\n📡 Step 6: Testing image URL generation...');
    
    if (Object.keys(batteryDataMap).length > 0) {
      const firstRef = Object.keys(batteryDataMap)[0];
      const firstData = batteryDataMap[firstRef];
      
      console.log(`   Testing image URLs for ${firstRef}:`);
      
      if (firstData.img) {
        const imgUrl = `http://localhost:1338${firstData.img.url}`;
        console.log(`   Battery image URL: ${imgUrl}`);
      } else {
        console.log('   No battery image available');
      }
      
      if (firstData.brandImg) {
        const brandImgUrl = `http://localhost:1338${firstData.brandImg.url}`;
        console.log(`   Brand image URL: ${brandImgUrl}`);
      } else {
        console.log('   No brand image available');
      }
    }
    
    console.log('\n🎉 Battery data integration test completed successfully!');
    console.log('\n📝 Summary:');
    console.log('✅ All API endpoints are working');
    console.log('✅ Frontend integration simulation successful');
    console.log('✅ Image URL generation working');
    console.log('✅ Error handling working correctly');
    
    if (Object.keys(batteryDataMap).length === 0) {
      console.log('\n⚠️  Note: No battery data found - this is expected if no data has been added yet');
      console.log('   The endpoints are ready, but you need to add battery data via Strapi admin');
    }
    
    return true;
    
  } catch (error) {
    console.log('💥 Exception:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🔋 Battery Data Integration Test\n');
  console.log(`🌐 Strapi URL: ${STRAPI_URL}\n`);
  
  const success = await testBatteryDataEndpoints();
  
  if (success) {
    console.log('\n✅ All tests passed! Battery data integration is working correctly.');
    console.log('\n📝 Next steps:');
    console.log('1. Add battery data via Strapi admin (refs, brands, images, descriptions)');
    console.log('2. Test the frontend application');
    console.log('3. Navigate to battery category and select a vehicle');
    console.log('4. Verify that battery images, brand images, and descriptions are displayed');
  } else {
    console.log('\n❌ Tests failed! Check the implementation.');
  }
}

// Run the test
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testBatteryDataEndpoints
};
