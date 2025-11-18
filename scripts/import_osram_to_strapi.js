import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Strapi configuration
const STRAPI_CONFIG = {
  baseUrl: 'http://localhost:1338',
  apiUrl: 'http://localhost:1338/api',
  timeout: 10000
};

// Create axios instance
const strapiClient = axios.create({
  baseURL: STRAPI_CONFIG.apiUrl,
  timeout: STRAPI_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
strapiClient.interceptors.request.use(
  (config) => {
    console.log(`🌐 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
strapiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.response?.status || 'Error'} ${error.config?.url}: ${error.message}`);
    return Promise.reject(error);
  }
);

// Function to create bulb brand
async function createBulbBrand(brandName) {
  try {
    const response = await strapiClient.post('/bulb-brands', {
      data: {
        name: brandName,
        isActive: true
      }
    });
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 400 && error.response.data?.error?.message?.includes('already exists')) {
      // Brand already exists, try to find it
      const existingBrands = await strapiClient.get(`/bulb-brands?filters[name][$eq]=${encodeURIComponent(brandName)}`);
      if (existingBrands.data.data.length > 0) {
        return existingBrands.data.data[0];
      }
    }
    throw error;
  }
}

// Function to create bulb type
async function createBulbType(bulbTypeData) {
  try {
    const response = await strapiClient.post('/bulb-types', {
      data: {
        name: bulbTypeData.name,
        code: bulbTypeData.code,
        description: bulbTypeData.description || '',
        category: bulbTypeData.category || 'headlight',
        isActive: true
      }
    });
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 400 && error.response.data?.error?.message?.includes('already exists')) {
      // Bulb type already exists, try to find it
      const existingTypes = await strapiClient.get(`/bulb-types?filters[code][$eq]=${encodeURIComponent(bulbTypeData.code)}`);
      if (existingTypes.data.data.length > 0) {
        return existingTypes.data.data[0];
      }
    }
    throw error;
  }
}

// Function to create bulb compatibility
async function createBulbCompatibility(compatibilityData, bulbTypeId) {
  try {
    const response = await strapiClient.post('/bulb-compatibilities', {
      data: {
        vehicleBrand: compatibilityData.brand,
        vehicleModel: compatibilityData.model,
        vehicleYear: compatibilityData.year || '',
        bulbType: bulbTypeId,
        position: compatibilityData.position || 'headlight',
        partNumber: compatibilityData.partNumber || '',
        isActive: true
      }
    });
    return response.data.data;
  } catch (error) {
    console.error(`❌ Failed to create compatibility for ${compatibilityData.brand} ${compatibilityData.model}:`, error.message);
    throw error;
  }
}

// Function to get position category
function getPositionCategory(position) {
  const positionMap = {
    'Headlight': 'headlight',
    'Fog Light': 'fog_light',
    'Signal Light': 'signal_light',
    'Light': 'headlight',
    'Unknown': 'headlight'
  };
  return positionMap[position] || 'headlight';
}

// Function to get bulb type name
function getBulbTypeName(bulbType) {
  const typeMap = {
    'H1': 'H1 Headlight Bulb',
    'H3': 'H3 Headlight Bulb',
    'H4': 'H4 Headlight Bulb',
    'H7': 'H7 Headlight Bulb',
    'H8': 'H8 Headlight Bulb',
    'H9': 'H9 Headlight Bulb',
    'H11': 'H11 Headlight Bulb',
    'H15': 'H15 Headlight Bulb',
    'HB3': 'HB3 Headlight Bulb',
    'HB4': 'HB4 Headlight Bulb',
    'HB5': 'HB5 Headlight Bulb',
    'H8_FOG': 'H8 Fog Light Bulb',
    'H11_FOG': 'H11 Fog Light Bulb',
    'W5W': 'W5W Signal Bulb',
    'W16W': 'W16W Signal Bulb',
    'W21W': 'W21W Signal Bulb',
    'PY21W': 'PY21W Signal Bulb',
    'P21W': 'P21W Signal Bulb',
    'P21W5W': 'P21W5W Signal Bulb',
    'LED': 'LED Bulb',
    'T10': 'T10 Bulb',
    'T20': 'T20 Bulb',
    'T25': 'T25 Bulb',
    'C5W': 'C5W Bulb',
    'R5W': 'R5W Bulb',
    'R10W': 'R10W Bulb',
    'R12W': 'R12W Bulb'
  };
  return typeMap[bulbType] || `${bulbType} Bulb`;
}

// Main import function
async function importOSRAMData() {
  try {
    console.log('🚀 Starting OSRAM data import to Strapi...');
    
    // Read the processed data
    const dataFile = path.join(__dirname, 'osram_bulbs_processed.json');
    if (!fs.existsSync(dataFile)) {
      console.error(`❌ Processed data file not found: ${dataFile}`);
      console.log('💡 Please run the processing script first:');
      console.log('   node process_osram_data.js');
      return;
    }
    
    const bulbData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    console.log(`📊 Found ${bulbData.length} bulb entries to import`);
    
    // Create unique sets for brands and bulb types
    const uniqueBrands = [...new Set(bulbData.map(bulb => bulb.brand))];
    const uniqueBulbTypes = [...new Set(bulbData.map(bulb => bulb.bulbType))];
    
    console.log(`🏷️  Found ${uniqueBrands.length} unique brands`);
    console.log(`💡 Found ${uniqueBulbTypes.length} unique bulb types`);
    
    // Create brands
    console.log('\n📝 Creating bulb brands...');
    const brandMap = new Map();
    for (const brandName of uniqueBrands) {
      try {
        const brand = await createBulbBrand(brandName);
        brandMap.set(brandName, brand.id);
        console.log(`✅ Created brand: ${brandName} (ID: ${brand.id})`);
      } catch (error) {
        console.error(`❌ Failed to create brand ${brandName}:`, error.message);
      }
    }
    
    // Create bulb types
    console.log('\n💡 Creating bulb types...');
    const bulbTypeMap = new Map();
    for (const bulbType of uniqueBulbTypes) {
      try {
        const bulbTypeData = {
          name: getBulbTypeName(bulbType),
          code: bulbType,
          category: getPositionCategory('Headlight'), // Default category
          description: `OSRAM ${bulbType} bulb type`
        };
        
        const createdBulbType = await createBulbType(bulbTypeData);
        bulbTypeMap.set(bulbType, createdBulbType.id);
        console.log(`✅ Created bulb type: ${bulbType} (ID: ${createdBulbType.id})`);
      } catch (error) {
        console.error(`❌ Failed to create bulb type ${bulbType}:`, error.message);
      }
    }
    
    // Create compatibilities
    console.log('\n🔗 Creating bulb compatibilities...');
    let successCount = 0;
    let errorCount = 0;
    
    for (const bulb of bulbData) {
      try {
        const bulbTypeId = bulbTypeMap.get(bulb.bulbType);
        if (!bulbTypeId) {
          console.warn(`⚠️  Bulb type not found for ${bulb.bulbType}, skipping...`);
          errorCount++;
          continue;
        }
        
        await createBulbCompatibility(bulb, bulbTypeId);
        successCount++;
        
        if (successCount % 10 === 0) {
          console.log(`📊 Processed ${successCount} compatibilities...`);
        }
      } catch (error) {
        errorCount++;
        if (errorCount % 10 === 0) {
          console.log(`❌ ${errorCount} errors so far...`);
        }
      }
    }
    
    // Summary
    console.log('\n🎉 Import completed!');
    console.log(`✅ Successfully imported: ${successCount} compatibilities`);
    console.log(`❌ Errors: ${errorCount} compatibilities`);
    console.log(`📊 Success rate: ${((successCount / bulbData.length) * 100).toFixed(1)}%`);
    
    // Test the import
    console.log('\n🧪 Testing import...');
    try {
      const brandsResponse = await strapiClient.get('/bulb-brands');
      const bulbTypesResponse = await strapiClient.get('/bulb-types');
      const compatibilitiesResponse = await strapiClient.get('/bulb-compatibilities');
      
      console.log(`📊 Final counts:`);
      console.log(`   Brands: ${brandsResponse.data.data.length}`);
      console.log(`   Bulb Types: ${bulbTypesResponse.data.data.length}`);
      console.log(`   Compatibilities: ${compatibilitiesResponse.data.data.length}`);
    } catch (error) {
      console.error('❌ Error testing import:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  }
}

// Run the import
importOSRAMData();
