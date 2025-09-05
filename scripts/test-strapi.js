#!/usr/bin/env node

import axios from 'axios';

const STRAPI_BASE_URL = 'http://localhost:1338';
const STRAPI_API_URL = `${STRAPI_BASE_URL}/api`;

console.log('🧪 Testing Strapi Connection...\n');

async function testStrapiConnection() {
  try {
    // Test 1: Basic connectivity
    console.log('1️⃣ Testing basic connectivity...');
    const response = await axios.get(STRAPI_BASE_URL, { timeout: 5000 });
    console.log(`   ✅ Strapi server is running (Status: ${response.status})`);
  } catch (error) {
    console.log('   ❌ Cannot connect to Strapi server');
    console.log(`   💡 Make sure Strapi is running on ${STRAPI_BASE_URL}`);
    console.log('   💡 Run: npm run develop (in your Strapi project)');
    return false;
  }

  try {
    // Test 2: API endpoint
    console.log('\n2️⃣ Testing API endpoint...');
    const apiResponse = await axios.get(STRAPI_API_URL, { timeout: 5000 });
    console.log(`   ✅ API endpoint accessible (Status: ${apiResponse.status})`);
  } catch (error) {
    console.log('   ❌ API endpoint not accessible');
    console.log(`   💡 This usually means content types haven't been created yet`);
    console.log(`   💡 Go to Strapi Admin Panel and create Categories and Products content types`);
    
    // Continue testing individual endpoints even if API root fails
    console.log('\n🔄 Continuing with individual endpoint tests...');
  }

  try {
    // Test 3: Categories endpoint
    console.log('\n3️⃣ Testing categories endpoint...');
    const categoriesResponse = await axios.get(`${STRAPI_API_URL}/categories`, { timeout: 5000 });
    console.log(`   ✅ Categories endpoint accessible (Status: ${categoriesResponse.status})`);
    
    if (categoriesResponse.data && categoriesResponse.data.data) {
      console.log(`   📊 Found ${categoriesResponse.data.data.length} categories`);
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log('   ⚠️  Categories endpoint accessible but forbidden');
      console.log('   💡 Check permissions in Strapi Admin Panel');
      console.log('   💡 Go to Settings → Users & Permissions Plugin → Roles → Public');
      console.log('   💡 Enable "find" permission for Categories');
    } else if (error.response && error.response.status === 404) {
      console.log('   ❌ Categories endpoint not found');
      console.log('   💡 Create a "Categories" content type in Strapi');
    } else {
      console.log(`   ❌ Categories endpoint error: ${error.message}`);
    }
  }

  try {
    // Test 4: Products endpoint
    console.log('\n4️⃣ Testing products endpoint...');
    const productsResponse = await axios.get(`${STRAPI_API_URL}/products`, { timeout: 5000 });
    console.log(`   ✅ Products endpoint accessible (Status: ${productsResponse.status})`);
    
    if (productsResponse.data && productsResponse.data.data) {
      console.log(`   📊 Found ${productsResponse.data.data.length} products`);
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log('   ⚠️  Products endpoint accessible but forbidden');
      console.log('   💡 Check permissions in Strapi Admin Panel');
      console.log('   💡 Go to Settings → Users & Permissions Plugin → Roles → Public');
      console.log('   💡 Enable "find" permission for Products');
    } else if (error.response && error.response.status === 404) {
      console.log('   ❌ Products endpoint not found');
      console.log('   💡 Create a "Products" content type in Strapi');
    } else {
      console.log(`   ❌ Products endpoint error: ${error.message}`);
    }
  }

  console.log('\n🎉 Strapi connection test completed!');
  console.log('\n📋 Next steps:');
  console.log('   1. Create Categories and Products content types in Strapi');
  console.log('   2. Set permissions for public access');
  console.log('   3. Add some sample data');
  console.log('   4. Test your React app with the new Strapi integration');
  
  return true;
}

// Run the test
testStrapiConnection().catch(error => {
  console.error('\n❌ Test failed with error:', error.message);
  process.exit(1);
});
