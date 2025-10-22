import React, { useState } from 'react';
import { wipersApiService } from '../services/wipersApiService';
import { mockWipersApiService } from '../services/mockWipersApiService';
import { useMockData } from '../hooks/useMockData';

interface TestResult {
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  data?: any;
  error?: string;
  duration?: number;
}

export const WipersApiTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { isMockMode } = useMockData();

  const runTest = async (endpoint: string, testFunction: () => Promise<any>) => {
    const startTime = Date.now();
    setTestResults(prev => [...prev, { endpoint, status: 'pending' }]);

    try {
      const data = await testFunction();
      const duration = Date.now() - startTime;
      
      setTestResults(prev => 
        prev.map(result => 
          result.endpoint === endpoint 
            ? { endpoint, status: 'success', data, duration }
            : result
        )
      );
    } catch (error) {
      const duration = Date.now() - startTime;
      setTestResults(prev => 
        prev.map(result => 
          result.endpoint === endpoint 
            ? { endpoint, status: 'error', error: error instanceof Error ? error.message : 'Unknown error', duration }
            : result
        )
      );
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const tests = [
      {
        endpoint: 'GET /wipers-selection/brands',
        test: () => isMockMode ? mockWipersApiService.getBrands() : wipersApiService.getBrands()
      },
      {
        endpoint: 'GET /wipers-selection/all-positions',
        test: () => isMockMode ? mockWipersApiService.getAllPositions() : wipersApiService.getAllPositions()
      },
      {
        endpoint: 'GET /wipers-selection/models-from-products',
        test: () => isMockMode ? mockWipersApiService.getModelsFromProducts() : wipersApiService.getModelsFromProducts()
      },
      {
        endpoint: 'GET /wipers-selection/positions-by-slugs',
        test: () => isMockMode 
          ? mockWipersApiService.getPositionsBySlugs(['kit-avant', 'cote-conducteur'])
          : wipersApiService.getPositionsBySlugs(['kit-avant', 'cote-conducteur'])
      },
      {
        endpoint: 'GET /wipers-selection/products-by-brand-model',
        test: () => isMockMode 
          ? mockWipersApiService.getProductsByBrandAndModel('bmw', '3-series-m3')
          : wipersApiService.getProductsByBrandAndModel('bmw', '3-series-m3')
      },
      {
        endpoint: 'GET /wipers-selection/products/:modelSlug/:position (NEW)',
        test: () => isMockMode 
          ? mockWipersApiService.getProductsByBrandAndModel('bmw', '3-series-m3')
          : wipersApiService.getProductsByModelAndPosition('1', 'conducteur')
      }
    ];

    for (const test of tests) {
      await runTest(test.endpoint, test.test);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setIsRunning(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>;
      case 'error':
        return <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </button>
          <button
            onClick={clearResults}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Clear Results
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Mode: {isMockMode ? 'Mock Data' : 'Real API'}
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900">Test Results</h3>
          {testResults.map((result, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(result.status)}
                  <span className={`font-medium ${getStatusColor(result.status)}`}>
                    {result.endpoint}
                  </span>
                </div>
                {result.duration && (
                  <span className="text-sm text-gray-500">
                    {result.duration}ms
                  </span>
                )}
              </div>
              
              {result.status === 'success' && result.data && (
                <div className="mt-2">
                  <details className="text-sm">
                    <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                      View Response Data
                    </summary>
                    <pre className="mt-2 p-3 bg-white rounded border text-xs overflow-auto max-h-40">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
              
              {result.status === 'error' && result.error && (
                <div className="mt-2 text-sm text-red-600">
                  Error: {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Test Summary */}
      {testResults.length > 0 && (
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Test Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {testResults.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {testResults.filter(r => r.status === 'success').length}
              </div>
              <div className="text-sm text-gray-500">Success</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {testResults.filter(r => r.status === 'error').length}
              </div>
              <div className="text-sm text-gray-500">Failed</div>
            </div>
          </div>
        </div>
      )}

      {/* API Documentation */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          📚 Available Wipers API Endpoints
        </h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• <code>GET /wipers-selection/brands</code> - Get all wipers brands</p>
          <p>• <code>GET /wipers-selection/all-positions</code> - Get all wiper positions</p>
          <p>• <code>GET /wipers-selection/models-from-products</code> - Get models from wipers products</p>
          <p>• <code>GET /wipers-selection/positions-by-slugs</code> - Get positions by slugs</p>
          <p>• <code>GET /wipers-selection/products-by-brand-model</code> - Get products by brand/model slugs</p>
          <p>• <code>GET /wipers-selection/products/:modelSlug/:position</code> - <strong>NEW:</strong> Get products by model slug and position</p>
          <p>• <code>GET /wipers-selection/wiper-data/:positionId</code> - Get wiper data by position</p>
        </div>
      </div>
    </div>
  );
};
