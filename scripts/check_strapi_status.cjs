const fs = require('fs');
const path = require('path');

/**
 * Script to check Strapi status and available endpoints
 */

const STRAPI_URL = 'http://localhost:1338';

async function checkStrapiStatus() {
  console.log('🔍 Checking Strapi Status\n');
  console.log(`🌐 Strapi URL: ${STRAPI_URL}\n`);
  
  try {
    // Check if Strapi is running
    console.log('1. Checking if Strapi is running...');
    const response = await fetch(`${STRAPI_URL}/api`);
    if (response.ok) {
      console.log('✅ Strapi is running and accessible');
    } else {
      console.log(`❌ Strapi responded with status: ${response.status}`);
      return;
    }
    
    // Check battery-product endpoints
    console.log('\n2. Checking battery-product endpoints...');
    
    const endpoints = [
      '/api/battery-products',
      '/api/battery-products/by-slugs?brandSlug=test&modelSlug=test',
      '/api/battery-products/by-brand?brandSlug=test',
      '/api/battery-products/battery-types-summary'
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${STRAPI_URL}${endpoint}`);
        console.log(`${response.ok ? '✅' : '❌'} ${endpoint} - Status: ${response.status}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log(`   Error: ${errorText.substring(0, 200)}...`);
        }
      } catch (error) {
        console.log(`❌ ${endpoint} - Error: ${error.message}`);
      }
    }
    
    // Check if battery-product content type exists
    console.log('\n3. Checking content types...');
    try {
      const response = await fetch(`${STRAPI_URL}/api/battery-products`);
      if (response.ok) {
        const data = await response.json();
        console.log('✅ battery-product content type exists');
        console.log(`   Found ${data.data ? data.data.length : 0} entries`);
      } else {
        console.log('❌ battery-product content type not found or not accessible');
      }
    } catch (error) {
      console.log('❌ Error checking content type:', error.message);
    }
    
    // Check battery-selection endpoints (fallback)
    console.log('\n4. Checking battery-selection endpoints (fallback)...');
    const fallbackEndpoints = [
      '/api/battery-selection/motorisations?brandSlug=test&modelSlug=test',
      '/api/battery-selection/products?brandSlug=test&modelSlug=test'
    ];
    
    for (const endpoint of fallbackEndpoints) {
      try {
        const response = await fetch(`${STRAPI_URL}${endpoint}`);
        console.log(`${response.ok ? '✅' : '❌'} ${endpoint} - Status: ${response.status}`);
      } catch (error) {
        console.log(`❌ ${endpoint} - Error: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Cannot connect to Strapi:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure Strapi is running: npm run develop (in strapi folder)');
    console.log('2. Check if Strapi is running on the correct port (1337)');
    console.log('3. Verify the Strapi URL in your configuration');
  }
}

// Run the check
checkStrapiStatus().catch(console.error);
