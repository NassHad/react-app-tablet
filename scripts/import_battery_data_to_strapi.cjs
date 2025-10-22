const fs = require('fs');
const path = require('path');

/**
 * Script to import battery data into Strapi
 * This script reads the battery-products-merged.json file and creates Strapi entries
 */

// Configuration
const STRAPI_URL = 'http://localhost:1338';
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''; // Set this environment variable

// Function to make API request to Strapi
async function makeStrapiRequest(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (API_TOKEN) {
    options.headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(result)}`);
    }
    
    return result;
  } catch (error) {
    console.error(`❌ API Error for ${endpoint}:`, error.message);
    throw error;
  }
}

// Function to import battery products
async function importBatteryProducts() {
  console.log('🔋 Starting battery products import...\n');
  
  // Read the merged JSON file
  const jsonPath = path.join(__dirname, 'battery-products-merged.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error('battery-products-merged.json file not found. Please run the merge script first.');
  }
  
  const batteryProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`📊 Found ${batteryProducts.length} battery products to import`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < batteryProducts.length; i++) {
    const product = batteryProducts[i];
    
    try {
      // Create the battery product entry
      const entryData = {
        data: {
          brand: product.brand,
          brandSlug: product.brandSlug,
          modelName: product.modelName,
          modelSlug: product.modelSlug,
          motorisations: product.motorisations,
          isActive: true,
          name: `${product.brand} ${product.modelName}`,
          slug: `${product.brandSlug}-${product.modelSlug}`,
          source: 'ILV FULMEN ENDURANCE',
          category: 'battery'
        }
      };
      
      console.log(`📝 Importing ${i + 1}/${batteryProducts.length}: ${product.brand} ${product.modelName}`);
      
      const result = await makeStrapiRequest('/api/battery-products', 'POST', entryData);
      
      if (result.data) {
        successCount++;
        console.log(`✅ Success: ${product.brand} ${product.modelName} (ID: ${result.data.id})`);
      } else {
        errorCount++;
        console.log(`❌ Failed: ${product.brand} ${product.modelName} - No data returned`);
      }
      
      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      errorCount++;
      console.log(`❌ Error importing ${product.brand} ${product.modelName}:`, error.message);
    }
  }
  
  console.log(`\n📊 Import Summary:`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📈 Success Rate: ${((successCount / batteryProducts.length) * 100).toFixed(1)}%`);
  
  return { successCount, errorCount };
}

// Function to test the API endpoints
async function testEndpoints() {
  console.log('\n🧪 Testing API endpoints...\n');
  
  try {
    // Test 1: Get battery products for ALFA ROMEO 147
    console.log('Testing: Get battery products for ALFA ROMEO 147');
    const result1 = await makeStrapiRequest('/api/battery-products/by-slugs?brandSlug=alfa-romeo&modelSlug=147');
    console.log(`✅ Found ${result1.data.length} motorisations for ALFA ROMEO 147`);
    
    // Test 2: Get battery products for AUDI A1
    console.log('Testing: Get battery products for AUDI A1');
    const result2 = await makeStrapiRequest('/api/battery-products/by-slugs?brandSlug=audi&modelSlug=a1');
    console.log(`✅ Found ${result2.data.length} motorisations for AUDI A1`);
    
    // Test 3: Get battery types summary
    console.log('Testing: Get battery types summary');
    const result3 = await makeStrapiRequest('/api/battery-products/battery-types-summary');
    console.log(`✅ Summary: ${result3.data.totalProducts} products, ${result3.data.totalMotorisations} motorisations`);
    
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.log(`❌ Test failed:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🔋 Battery Data Import to Strapi\n');
  console.log(`🌐 Strapi URL: ${STRAPI_URL}`);
  console.log(`🔑 API Token: ${API_TOKEN ? 'Set' : 'Not set (using public access)'}\n`);
  
  try {
    // Check if Strapi is running
    console.log('🔍 Checking Strapi connection...');
    await makeStrapiRequest('/api/battery-products');
    console.log('✅ Strapi is running and accessible\n');
    
    // Import battery products
    await importBatteryProducts();
    
    // Test the endpoints
    await testEndpoints();
    
    console.log('\n✅ Import process completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Test the frontend integration');
    console.log('2. Verify that battery products are displayed correctly');
    console.log('3. Check that motorisations and battery types are working');
    
  } catch (error) {
    console.error('\n💥 Import failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure Strapi is running on http://localhost:1337');
    console.log('2. Check that the battery-product content type exists');
    console.log('3. Verify your API token if using authentication');
    console.log('4. Check Strapi logs for detailed error messages');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  importBatteryProducts,
  testEndpoints,
  makeStrapiRequest
};
