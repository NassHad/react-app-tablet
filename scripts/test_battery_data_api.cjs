#!/usr/bin/env node

/**
 * Test script to check if battery data API endpoints are working
 */

const BASE_URL = 'http://localhost:1338/api';

async function testBatteryDataAPI() {
  console.log('🔋 Testing Battery Data API Endpoints\n');
  
  // Test F7 battery data
  console.log('1. Testing F7 battery data...');
  try {
    const response = await fetch(`${BASE_URL}/battery-datas/ref/F7`);
    console.log(`   Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   Response:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`   Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }
  
  console.log('\n2. Testing F32 battery data...');
  try {
    const response = await fetch(`${BASE_URL}/battery-datas/ref/F32`);
    console.log(`   Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   Response:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`   Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }
  
  console.log('\n3. Testing all battery data...');
  try {
    const response = await fetch(`${BASE_URL}/battery-datas`);
    console.log(`   Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   Total entries: ${data.data?.length || 0}`);
      if (data.data && data.data.length > 0) {
        console.log(`   Available refs: ${data.data.map(item => item.ref).join(', ')}`);
      }
    } else {
      console.log(`   Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }
  
  console.log('\n4. Testing battery products endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/battery-products/by-slugs?brandSlug=audi&modelSlug=a4`);
    console.log(`   Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   Response:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`   Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }
}

// Run the test
testBatteryDataAPI().catch(console.error);
