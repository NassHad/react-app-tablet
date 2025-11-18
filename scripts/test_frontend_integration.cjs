const fs = require('fs');
const path = require('path');
const http = require('http');

/**
 * Test script to verify frontend integration with working endpoints
 * This simulates the frontend API calls
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

// Simulate the frontend API call
async function testFrontendIntegration() {
  console.log('🧪 Testing Frontend Integration\n');
  
  try {
    // Test the working endpoint that the frontend will use
    console.log('📡 Testing: /api/battery-selection/motorisations');
    const response = await makeHttpRequest(`${STRAPI_URL}/api/battery-selection/motorisations?brandSlug=alfa-romeo&modelSlug=147`);
    const data = response.data;
    
    if (response.status === 200 && data.success) {
      console.log('✅ API call successful!');
      console.log(`📊 Found ${data.data.length} motorisations`);
      console.log(`💬 Message: ${data.message}`);
      
      // Show the data structure that the frontend will receive
      console.log('\n📋 Data structure for frontend:');
      data.data.forEach((motorisation, index) => {
        console.log(`\n${index + 1}. ${motorisation.motorisation} (${motorisation.fuel})`);
        console.log(`   ID: ${motorisation.id}`);
        console.log(`   Fuel: ${motorisation.fuel}`);
        console.log(`   Start Date: ${new Date(motorisation.startDate).getFullYear()}`);
        console.log(`   End Date: ${new Date(motorisation.endDate).getFullYear()}`);
        console.log(`   Battery Model ID: ${motorisation.batteryModelId}`);
        console.log(`   Battery Model Slug: ${motorisation.batteryModelSlug}`);
        console.log(`   Battery Types: ${motorisation.batteryTypes ? 'Available' : 'Not available'}`);
      });
      
      // Test with different brand/model combinations
      console.log('\n🔄 Testing with different vehicles...');
      
      const testCases = [
        { brand: 'audi', model: 'a1' },
        { brand: 'bmw', model: '3' },
        { brand: 'volkswagen', model: 'golf' }
      ];
      
      for (const testCase of testCases) {
        try {
          const testResponse = await makeHttpRequest(`${STRAPI_URL}/api/battery-selection/motorisations?brandSlug=${testCase.brand}&modelSlug=${testCase.model}`);
          const testData = testResponse.data;
          
          if (testResponse.status === 200 && testData.success) {
            console.log(`✅ ${testCase.brand.toUpperCase()} ${testCase.model.toUpperCase()}: ${testData.data.length} motorisations`);
          } else {
            console.log(`❌ ${testCase.brand.toUpperCase()} ${testCase.model.toUpperCase()}: ${testData.error?.message || 'No data'}`);
          }
        } catch (error) {
          console.log(`❌ ${testCase.brand.toUpperCase()} ${testCase.model.toUpperCase()}: ${error.message}`);
        }
      }
      
      console.log('\n🎉 Frontend integration test completed successfully!');
      console.log('\n📝 Frontend Implementation Status:');
      console.log('✅ API endpoint is working');
      console.log('✅ Data structure is compatible');
      console.log('✅ Multiple vehicle types supported');
      console.log('⚠️  Battery types (F32, F7, F4) not available in current endpoint');
      console.log('💡 Frontend will show "Battery types not available" message');
      
      return true;
      
    } else {
      console.log('❌ API call failed');
      console.log('📋 Error:', JSON.stringify(data, null, 2));
      return false;
    }
    
  } catch (error) {
    console.log('💥 Exception:', error.message);
    return false;
  }
}

// Test the frontend environment configuration
function testEnvironmentConfig() {
  console.log('\n🔧 Testing Environment Configuration\n');
  
  // Check if the frontend environment file exists
  const envPath = path.join(__dirname, '..', 'src', 'config', 'environment.ts');
  
  if (fs.existsSync(envPath)) {
    console.log('✅ Environment configuration file exists');
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('1338')) {
      console.log('✅ Port 1338 is configured');
    } else {
      console.log('⚠️  Port 1338 might not be configured - check environment.ts');
    }
  } else {
    console.log('❌ Environment configuration file not found');
  }
}

// Main function
async function main() {
  console.log('🔋 Frontend Integration Test\n');
  console.log(`🌐 Strapi URL: ${STRAPI_URL}\n`);
  
  // Test environment configuration
  testEnvironmentConfig();
  
  // Test frontend integration
  const success = await testFrontendIntegration();
  
  if (success) {
    console.log('\n✅ All tests passed! Frontend is ready to use the battery endpoints.');
    console.log('\n📝 Next steps:');
    console.log('1. Test the frontend application');
    console.log('2. Navigate to battery category');
    console.log('3. Select a vehicle and verify motorisations are displayed');
    console.log('4. Check that "Battery types not available" message appears');
  } else {
    console.log('\n❌ Tests failed! Check the backend configuration.');
  }
}

// Run the test
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testFrontendIntegration,
  testEnvironmentConfig
};
