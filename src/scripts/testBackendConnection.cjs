#!/usr/bin/env node

/**
 * Backend Connection Test Script
 * 
 * This script tests the connection to your Strapi backend
 * and verifies that the lights-selection endpoints are working.
 */

const https = require('https');
const http = require('http');

// Configuration
const API_BASE_URL = process.env.VITE_STRAPI_API_URL || 'http://localhost:1338/api';
const ENDPOINTS = [
  '/lights-selection/brands',
  '/lights-selection/models-by-brand/1',
  '/lights-selection/model/1/positions',
  '/lights-selection/model/1/position/pos-1/light-data',
  '/lights-selection/search?brandSlug=alfa-romeo&modelSlug=145',
  '/lights-selection/positions?brandSlug=alfa-romeo&modelSlug=145'
];

// Test results
let testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: [],
  startTime: Date.now(),
  endTime: null
};

// Utility functions
const log = (message, type = 'info') => {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
};

const logError = (message) => log(message, 'error');
const logSuccess = (message) => log(message, 'success');
const logWarning = (message) => log(message, 'warning');

// HTTP request function
const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const startTime = Date.now();
    
    const req = client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const duration = Date.now() - startTime;
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          duration: duration
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Test individual endpoint
const testEndpoint = async (endpoint) => {
  testResults.total++;
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    log(`Testing endpoint: ${endpoint}`);
    const response = await makeRequest(url);
    
    if (response.statusCode === 200) {
      logSuccess(`✅ ${endpoint} - Status: ${response.statusCode} (${response.duration}ms)`);
      testResults.passed++;
      
      // Try to parse JSON response
      try {
        const jsonData = JSON.parse(response.data);
        log(`   Response data: ${JSON.stringify(jsonData).substring(0, 100)}...`);
      } catch (parseError) {
        logWarning(`   Could not parse JSON response`);
      }
    } else {
      logError(`❌ ${endpoint} - Status: ${response.statusCode} (${response.duration}ms)`);
      testResults.failed++;
      testResults.errors.push(`${endpoint}: HTTP ${response.statusCode}`);
    }
  } catch (error) {
    logError(`❌ ${endpoint} - Error: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`${endpoint}: ${error.message}`);
  }
};

// Main test function
const runTests = async () => {
  log('🚀 Starting Backend Connection Tests...');
  log(`Backend URL: ${API_BASE_URL}`);
  log(`Testing ${ENDPOINTS.length} endpoints...`);
  
  // Test each endpoint
  for (const endpoint of ENDPOINTS) {
    await testEndpoint(endpoint);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Calculate results
  testResults.endTime = Date.now();
  const duration = testResults.endTime - testResults.startTime;
  
  // Print summary
  log('\n📊 Test Results Summary:');
  log(`Total Tests: ${testResults.total}`);
  logSuccess(`Passed: ${testResults.passed}`);
  logError(`Failed: ${testResults.failed}`);
  log(`Duration: ${duration}ms`);
  
  if (testResults.errors.length > 0) {
    log('\n❌ Errors:');
    testResults.errors.forEach(error => logError(error));
  }
  
  // Exit with appropriate code
  if (testResults.failed > 0) {
    logError('❌ Some tests failed!');
    process.exit(1);
  } else {
    logSuccess('✅ All tests passed!');
    process.exit(0);
  }
};

// Run tests
runTests().catch(error => {
  logError(`Test suite failed: ${error.message}`);
  process.exit(1);
});
