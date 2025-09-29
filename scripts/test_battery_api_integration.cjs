const fs = require('fs');
const path = require('path');

/**
 * Test script to verify the battery API integration
 * This script simulates the frontend API calls to test the backend endpoints
 */

// Mock environment configuration
const ENV = {
  STRAPI_API_URL: 'http://localhost:1338/api' // Update this to match your Strapi URL
};

// Function to test API endpoint
async function testApiEndpoint(url, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log(`📡 URL: ${url}`);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Success: ${response.status}`);
      console.log(`📊 Response:`, JSON.stringify(data, null, 2));
      return { success: true, data };
    } else {
      console.log(`❌ Error: ${response.status}`);
      console.log(`📊 Response:`, JSON.stringify(data, null, 2));
      return { success: false, data };
    }
  } catch (error) {
    console.log(`💥 Exception:`, error.message);
    return { success: false, error: error.message };
  }
}

// Main test function
async function runTests() {
  console.log('🔋 Battery API Integration Tests\n');
  console.log(`🌐 Base URL: ${ENV.STRAPI_API_URL}`);
  
  // Test 1: Get battery products for ALFA ROMEO 147
  await testApiEndpoint(
    `${ENV.STRAPI_API_URL}/battery-products/by-slugs?brandSlug=alfa-romeo&modelSlug=147`,
    'Get battery products for ALFA ROMEO 147'
  );
  
  // Test 2: Get battery products for AUDI A1
  await testApiEndpoint(
    `${ENV.STRAPI_API_URL}/battery-products/by-slugs?brandSlug=audi&modelSlug=a1`,
    'Get battery products for AUDI A1'
  );
  
  // Test 3: Get battery products for BMW 3
  await testApiEndpoint(
    `${ENV.STRAPI_API_URL}/battery-products/by-slugs?brandSlug=bmw&modelSlug=3`,
    'Get battery products for BMW 3'
  );
  
  // Test 4: Get all battery products for a brand
  await testApiEndpoint(
    `${ENV.STRAPI_API_URL}/battery-products/by-brand?brandSlug=alfa-romeo`,
    'Get all battery products for ALFA ROMEO brand'
  );
  
  // Test 5: Get battery types summary
  await testApiEndpoint(
    `${ENV.STRAPI_API_URL}/battery-products/battery-types-summary`,
    'Get battery types summary'
  );
  
  // Test 6: Test with invalid brand/model (should return empty or error)
  await testApiEndpoint(
    `${ENV.STRAPI_API_URL}/battery-products/by-slugs?brandSlug=invalid&modelSlug=invalid`,
    'Test with invalid brand/model (should return empty)'
  );
  
  console.log('\n✅ All tests completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Verify that your Strapi server is running on the correct port');
  console.log('2. Update the ENV.STRAPI_API_URL if needed');
  console.log('3. Check that the battery-product data has been imported');
  console.log('4. Test the frontend integration with real data');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testApiEndpoint,
  runTests
};
