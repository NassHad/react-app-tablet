const fs = require('fs');
const path = require('path');

/**
 * Comprehensive test script for battery endpoints
 * Tests all possible endpoints and provides detailed results
 */

const STRAPI_URL = 'http://localhost:1338';

// Function to test API endpoint with detailed logging
async function testEndpoint(url, description, expectedResult = null) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log(`📡 URL: ${url}`);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log(`✅ Success!`);
      if (data.data) {
        console.log(`📈 Data count: ${Array.isArray(data.data) ? data.data.length : 'N/A'}`);
      }
      if (data.message) {
        console.log(`💬 Message: ${data.message}`);
      }
      
      // Show sample data structure
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        console.log(`📋 Sample data structure:`);
        console.log(JSON.stringify(data.data[0], null, 2));
      }
      
      return { success: true, data, status: response.status };
    } else {
      console.log(`❌ Error: ${response.status}`);
      console.log(`📋 Error details:`, JSON.stringify(data, null, 2));
      return { success: false, error: data, status: response.status };
    }
  } catch (error) {
    console.log(`💥 Exception: ${error.message}`);
    return { success: false, error: error.message, status: 'NETWORK_ERROR' };
  }
}

// Main test function
async function runComprehensiveTests() {
  console.log('🔋 Comprehensive Battery Endpoints Test\n');
  console.log(`🌐 Strapi URL: ${STRAPI_URL}\n`);
  
  const results = {
    basicEndpoints: {},
    customEndpoints: {},
    fallbackEndpoints: {},
    summary: {}
  };
  
  // Step 1: Test Basic Endpoints
  console.log('='.repeat(60));
  console.log('📋 STEP 1: Testing Basic Endpoints');
  console.log('='.repeat(60));
  
  results.basicEndpoints.batteryProducts = await testEndpoint(
    `${STRAPI_URL}/api/battery-products`,
    'Basic battery-products endpoint'
  );
  
  results.basicEndpoints.brands = await testEndpoint(
    `${STRAPI_URL}/api/brands`,
    'Basic brands endpoint (control test)'
  );
  
  // Step 2: Test Custom Endpoints
  console.log('\n' + '='.repeat(60));
  console.log('📋 STEP 2: Testing Custom Endpoints');
  console.log('='.repeat(60));
  
  results.customEndpoints.bySlugs = await testEndpoint(
    `${STRAPI_URL}/api/battery-products/by-slugs?brandSlug=alfa-romeo&modelSlug=147`,
    'Custom by-slugs endpoint'
  );
  
  results.customEndpoints.byBrand = await testEndpoint(
    `${STRAPI_URL}/api/battery-products/by-brand?brandSlug=alfa-romeo`,
    'Custom by-brand endpoint'
  );
  
  results.customEndpoints.summary = await testEndpoint(
    `${STRAPI_URL}/api/battery-products/battery-types-summary`,
    'Custom battery-types-summary endpoint'
  );
  
  // Step 3: Test Fallback Endpoints
  console.log('\n' + '='.repeat(60));
  console.log('📋 STEP 3: Testing Fallback Endpoints');
  console.log('='.repeat(60));
  
  results.fallbackEndpoints.motorisations = await testEndpoint(
    `${STRAPI_URL}/api/battery-selection/motorisations?brandSlug=alfa-romeo&modelSlug=147`,
    'Fallback battery-selection motorisations endpoint'
  );
  
  results.fallbackEndpoints.products = await testEndpoint(
    `${STRAPI_URL}/api/battery-selection/products?brandSlug=alfa-romeo&modelSlug=147`,
    'Fallback battery-selection products endpoint'
  );
  
  results.fallbackEndpoints.motorisationBatteries = await testEndpoint(
    `${STRAPI_URL}/api/battery-selection/motorisation-batteries?brandSlug=alfa-romeo&modelSlug=147&motorisation=1.9 JTD`,
    'Fallback motorisation-batteries endpoint'
  );
  
  // Step 4: Generate Summary and Recommendations
  console.log('\n' + '='.repeat(60));
  console.log('📋 STEP 4: Summary and Recommendations');
  console.log('='.repeat(60));
  
  const summary = {
    workingEndpoints: [],
    brokenEndpoints: [],
    hasBatteryTypes: false,
    hasData: false,
    recommendedApproach: ''
  };
  
  // Analyze results
  Object.entries(results.customEndpoints).forEach(([key, result]) => {
    if (result.success) {
      summary.workingEndpoints.push(`battery-products/${key}`);
      if (result.data?.data?.length > 0) {
        summary.hasData = true;
        // Check if battery types are present
        if (result.data.data[0]?.batteryTypes) {
          summary.hasBatteryTypes = true;
        }
      }
    } else {
      summary.brokenEndpoints.push(`battery-products/${key}`);
    }
  });
  
  // Check fallback endpoints
  if (results.fallbackEndpoints.motorisations.success) {
    summary.workingEndpoints.push('battery-selection/motorisations');
    if (results.fallbackEndpoints.motorisations.data?.data?.length > 0) {
      summary.hasData = true;
    }
  }
  
  // Determine recommended approach
  if (summary.workingEndpoints.includes('battery-products/by-slugs') && summary.hasBatteryTypes) {
    summary.recommendedApproach = 'Use new battery-products endpoints with battery types';
  } else if (summary.workingEndpoints.includes('battery-selection/motorisations')) {
    summary.recommendedApproach = 'Use fallback battery-selection endpoints (no battery types)';
  } else {
    summary.recommendedApproach = 'No working endpoints - contact backend team';
  }
  
  // Display summary
  console.log(`\n📊 SUMMARY:`);
  console.log(`✅ Working endpoints: ${summary.workingEndpoints.length}`);
  summary.workingEndpoints.forEach(endpoint => console.log(`   - ${endpoint}`));
  
  console.log(`\n❌ Broken endpoints: ${summary.brokenEndpoints.length}`);
  summary.brokenEndpoints.forEach(endpoint => console.log(`   - ${endpoint}`));
  
  console.log(`\n🔋 Data availability:`);
  console.log(`   - Has data: ${summary.hasData ? 'Yes' : 'No'}`);
  console.log(`   - Has battery types: ${summary.hasBatteryTypes ? 'Yes' : 'No'}`);
  
  console.log(`\n🎯 Recommended approach: ${summary.recommendedApproach}`);
  
  // Generate frontend code recommendations
  console.log(`\n💻 Frontend Implementation:`);
  if (summary.recommendedApproach.includes('new battery-products')) {
    console.log(`   ✅ Use: /api/battery-products/by-slugs`);
    console.log(`   ✅ Battery types available: F32, F7, F4, etc.`);
  } else if (summary.recommendedApproach.includes('fallback')) {
    console.log(`   ⚠️  Use: /api/battery-selection/motorisations`);
    console.log(`   ❌ No battery types available`);
  } else {
    console.log(`   🚨 Contact backend team - no working endpoints`);
  }
  
  // Save results to file
  const resultsPath = path.join(__dirname, 'battery-endpoints-test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    results,
    summary
  }, null, 2));
  
  console.log(`\n💾 Results saved to: ${resultsPath}`);
  
  return { results, summary };
}

// Run the tests
if (require.main === module) {
  runComprehensiveTests().catch(console.error);
}

module.exports = {
  testEndpoint,
  runComprehensiveTests
};
