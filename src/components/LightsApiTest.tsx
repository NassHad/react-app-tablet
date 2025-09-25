import React, { useState } from 'react';
import { useLightsData } from '../hooks/useLightsData';
import LightsLoadingSpinner from './LightsLoadingSpinner';
import { formatErrorForUser } from '../utils/lightsApiUtils';

interface TestResult {
  id: string;
  timestamp: string;
  test: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  data?: any;
}

const LightsApiTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  const {
    brands,
    models,
    positions,
    lightData,
    loadingBrands,
    loadingModels,
    loadingPositions,
    loadingLightData,
    error,
    fetchBrands,
    fetchModels,
    fetchPositions,
    fetchLightData,
    searchModelBySlugs,
    fetchPositionsBySlugs,
    clearError,
    reset
  } = useLightsData();

  const addResult = (test: string, status: 'success' | 'error' | 'warning', message: string, data?: any) => {
    const result: TestResult = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      test,
      status,
      message,
      data
    };
    setTestResults(prev => [...prev, result]);
  };

  const testBrandsApi = async () => {
    addResult('Brands API', 'warning', 'Testing brands API...');
    try {
      await fetchBrands();
      if (brands.length > 0) {
        addResult('Brands API', 'success', `✅ Found ${brands.length} brands`, brands.slice(0, 3));
      } else {
        addResult('Brands API', 'error', '❌ No brands returned');
      }
    } catch (err) {
      addResult('Brands API', 'error', `❌ Error: ${err}`);
    }
  };

  const testModelsApi = async () => {
    if (brands.length === 0) {
      addResult('Models API', 'error', '❌ No brands available. Run brands test first.');
      return;
    }

    const testBrand = brands[0];
    addResult('Models API', 'warning', `Testing models API for brand: ${testBrand.name}...`);
    
    try {
      await fetchModels(testBrand.id);
      if (models.length > 0) {
        addResult('Models API', 'success', `✅ Found ${models.length} models for ${testBrand.name}`, models.slice(0, 3));
      } else {
        addResult('Models API', 'error', `❌ No models found for ${testBrand.name}`);
      }
    } catch (err) {
      addResult('Models API', 'error', `❌ Error: ${err}`);
    }
  };

  const testPositionsApi = async () => {
    if (models.length === 0) {
      addResult('Positions API', 'error', '❌ No models available. Run models test first.');
      return;
    }

    const testModel = models[0];
    addResult('Positions API', 'warning', `Testing positions API for model: ${testModel.name}...`);
    
    try {
      await fetchPositions(testModel.id);
      if (positions.length > 0) {
        addResult('Positions API', 'success', `✅ Found ${positions.length} positions for ${testModel.name}`, positions.slice(0, 3));
      } else {
        addResult('Positions API', 'error', `❌ No positions found for ${testModel.name}`);
      }
    } catch (err) {
      addResult('Positions API', 'error', `❌ Error: ${err}`);
    }
  };

  const testSlugsApi = async () => {
    addResult('Slugs API', 'warning', 'Testing positions by slugs API (alfa-romeo, 145)...');
    
    try {
      await fetchPositionsBySlugs('alfa-romeo', '145');
      if (positions.length > 0) {
        addResult('Slugs API', 'success', `✅ Found ${positions.length} positions for alfa-romeo 145`, positions.slice(0, 3));
      } else {
        addResult('Slugs API', 'error', '❌ No positions found for alfa-romeo 145');
      }
    } catch (err) {
      addResult('Slugs API', 'error', `❌ Error: ${err}`);
    }
  };

  const testLightDataApi = async () => {
    if (positions.length === 0) {
      addResult('Light Data API', 'error', '❌ No positions available. Run positions test first.');
      return;
    }

    const testPosition = positions[0];
    const testModelId = '1'; // Mock model ID
    addResult('Light Data API', 'warning', `Testing light data API for position: ${testPosition.name}...`);
    
    try {
      await fetchLightData(testModelId, testPosition.id);
      if (lightData) {
        addResult('Light Data API', 'success', `✅ Found light data for ${testPosition.name}`, lightData);
      } else {
        addResult('Light Data API', 'error', `❌ No light data found for ${testPosition.name}`);
      }
    } catch (err) {
      addResult('Light Data API', 'error', `❌ Error: ${err}`);
    }
  };

  const testSearchModelApi = async () => {
    addResult('Search Model API', 'warning', 'Testing search model by slugs API...');
    
    try {
      const result = await searchModelBySlugs('alfa-romeo', '145');
      if (result) {
        addResult('Search Model API', 'success', `✅ Found model: ${result.name}`, result);
      } else {
        addResult('Search Model API', 'error', '❌ No model found for alfa-romeo 145');
      }
    } catch (err) {
      addResult('Search Model API', 'error', `❌ Error: ${err}`);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    addResult('Test Suite', 'warning', '🚀 Starting comprehensive API tests...');
    
    try {
      // Test 1: Brands
      await testBrandsApi();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 2: Models
      await testModelsApi();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 3: Positions
      await testPositionsApi();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 4: Slugs
      await testSlugsApi();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 5: Search Model
      await testSearchModelApi();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 6: Light Data
      await testLightDataApi();
      
      addResult('Test Suite', 'success', '🎉 All tests completed!');
    } catch (err) {
      addResult('Test Suite', 'error', `❌ Test suite failed: ${err}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
    reset();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Lights API Test Suite</h2>
      
      {/* Test Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={testBrandsApi}
          disabled={loadingBrands || isRunning}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-600"
        >
          {loadingBrands ? 'Loading...' : 'Test Brands'}
        </button>
        
        <button
          onClick={testModelsApi}
          disabled={loadingModels || isRunning}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600"
        >
          {loadingModels ? 'Loading...' : 'Test Models'}
        </button>
        
        <button
          onClick={testPositionsApi}
          disabled={loadingPositions || isRunning}
          className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-purple-600"
        >
          {loadingPositions ? 'Loading...' : 'Test Positions'}
        </button>
        
        <button
          onClick={testSlugsApi}
          disabled={loadingPositions || isRunning}
          className="bg-orange-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-orange-600"
        >
          {loadingPositions ? 'Loading...' : 'Test Slugs'}
        </button>
        
        <button
          onClick={testSearchModelApi}
          disabled={isRunning}
          className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-indigo-600"
        >
          Test Search
        </button>
        
        <button
          onClick={testLightDataApi}
          disabled={loadingLightData || isRunning}
          className="bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-pink-600"
        >
          {loadingLightData ? 'Loading...' : 'Test Light Data'}
        </button>
        
        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-900 col-span-2"
        >
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </button>
        
        <button
          onClick={clearResults}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 col-span-2"
        >
          Clear Results
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center justify-between">
            <div>
              <strong>Error:</strong> {formatErrorForUser(error)}
            </div>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Loading States */}
      {(loadingBrands || loadingModels || loadingPositions || loadingLightData) && (
        <div className="mb-4">
          <LightsLoadingSpinner 
            message="API calls in progress..." 
            size="medium"
          />
        </div>
      )}

      {/* Test Results */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Test Results ({testResults.length})</h3>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {testResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No tests run yet. Click a button above to test the API.</p>
            </div>
          ) : (
            <div className="divide-y">
              {testResults.map((result) => (
                <div key={result.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getStatusIcon(result.status)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${getStatusColor(result.status)}`}>
                          {result.test}
                        </span>
                        <span className="text-xs text-gray-500">{result.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{result.message}</p>
                      {result.data && (
                        <details className="mt-2">
                          <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                            View Data
                          </summary>
                          <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LightsApiTest;
