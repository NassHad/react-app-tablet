import React, { useState, useEffect } from 'react';
import { useLightsData } from '../hooks/useLightsData';
import LightsLoadingSpinner from './LightsLoadingSpinner';
import { formatErrorForUser } from '../utils/lightsApiUtils';
import type { Vehicle, ProductCategory } from '../types';

interface TestResult {
  id: string;
  timestamp: string;
  test: string;
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
  data?: any;
  duration?: number;
}

interface RealBackendTestProps {
  vehicle: Vehicle;
  category: ProductCategory;
}

const RealBackendTest: React.FC<RealBackendTestProps> = ({ vehicle, category }) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  
  const {
    brands,
    positions,
    lightData,
    loadingBrands,
    loadingPositions,
    loadingLightData,
    error,
    fetchBrands,
    fetchLightData,
    fetchPositionsBySlugs,
    clearError,
    reset
  } = useLightsData();

  const addResult = (test: string, status: 'success' | 'error' | 'warning' | 'info', message: string, data?: any, duration?: number) => {
    const result: TestResult = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      test,
      status,
      message,
      data,
      duration
    };
    setTestResults(prev => [...prev, result]);
  };

  const testBackendConnection = async () => {
    const startTime = Date.now();
    addResult('Backend Connection', 'info', 'Testing connection to real Strapi backend...');
    
    try {
      // Test basic connectivity by fetching brands
      await fetchBrands();
      const duration = Date.now() - startTime;
      
      if (brands.length > 0) {
        addResult('Backend Connection', 'success', `✅ Connected successfully! Found ${brands.length} brands`, brands.slice(0, 3), duration);
      } else {
        addResult('Backend Connection', 'warning', '⚠️ Connected but no brands found', null, duration);
      }
    } catch (err: any) {
      const duration = Date.now() - startTime;
      addResult('Backend Connection', 'error', `❌ Connection failed: ${err.message}`, null, duration);
    }
  };

  const testVehicleDataFlow = async () => {
    addResult('Vehicle Data Flow', 'info', `Testing data flow for ${vehicle.brand} ${vehicle.model}...`);
    
    try {
      // Use stored slugs
      if (!vehicle.brandSlug || !vehicle.modelSlug) {
        addResult('Vehicle Data Flow', 'error', `❌ Missing slugs: brandSlug="${vehicle.brandSlug || 'missing'}", modelSlug="${vehicle.modelSlug || 'missing'}"`);
        return;
      }
      
      addResult('Vehicle Data Flow', 'info', `Using stored slugs: brandSlug="${vehicle.brandSlug}", modelSlug="${vehicle.modelSlug}"`);
      
      // Test positions by slugs
      await fetchPositionsBySlugs(vehicle.brandSlug, vehicle.modelSlug);
      
      if (positions.length > 0) {
        addResult('Vehicle Data Flow', 'success', `✅ Found ${positions.length} positions for ${vehicle.brand} ${vehicle.model}`, positions.slice(0, 3));
      } else {
        addResult('Vehicle Data Flow', 'warning', `⚠️ No positions found for ${vehicle.brand} ${vehicle.model}`);
      }
    } catch (err: any) {
      addResult('Vehicle Data Flow', 'error', `❌ Data flow failed: ${err.message}`);
    }
  };

  const testPositionSelection = async (positionId: string) => {
    const startTime = Date.now();
    setSelectedPosition(positionId);
    
    const position = positions.find(p => p.id === positionId);
    if (!position) {
      addResult('Position Selection', 'error', `❌ Position ${positionId} not found`);
      return;
    }
    
    addResult('Position Selection', 'info', `Testing position selection: ${position.name}...`);
    
    try {
      // Use a mock model ID for now - in real implementation, this should come from vehicle data
      const mockModelId = '1';
      await fetchLightData(mockModelId, positionId);
      
      const duration = Date.now() - startTime;
      
      if (lightData) {
        addResult('Position Selection', 'success', `✅ Light data fetched for ${position.name}`, lightData, duration);
      } else {
        addResult('Position Selection', 'warning', `⚠️ No light data returned for ${position.name}`, null, duration);
      }
    } catch (err: any) {
      const duration = Date.now() - startTime;
      addResult('Position Selection', 'error', `❌ Position selection failed: ${err.message}`, null, duration);
    }
  };

  const runComprehensiveTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    addResult('Comprehensive Test', 'info', '🚀 Starting comprehensive real backend test...');
    
    try {
      // Test 1: Backend Connection
      await testBackendConnection();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 2: Vehicle Data Flow
      await testVehicleDataFlow();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 3: Position Selection (if positions are available)
      if (positions.length > 0) {
        await testPositionSelection(positions[0].id);
      } else {
        addResult('Position Selection', 'warning', '⚠️ Skipping position selection test - no positions available');
      }
      
      addResult('Comprehensive Test', 'success', '🎉 Comprehensive test completed!');
    } catch (err: any) {
      addResult('Comprehensive Test', 'error', `❌ Comprehensive test failed: ${err.message}`);
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
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  // Auto-run connection test on mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <div className="p-6 bg-gray-50 rounded-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Real Backend Test - BulbsQuestions</h2>
      
      {/* Test Vehicle Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Test Vehicle</h3>
        <p><strong>Brand:</strong> {vehicle.brand}</p>
        <p><strong>Model:</strong> {vehicle.model}</p>
        <p><strong>Category:</strong> {category.name}</p>
        <p><strong>Stored Slugs:</strong> brandSlug="{vehicle.brandSlug || 'not stored'}", modelSlug="{vehicle.modelSlug || 'not stored'}"</p>
      </div>

      {/* Test Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={testBackendConnection}
          disabled={loadingBrands || isRunning}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-600"
        >
          {loadingBrands ? 'Testing...' : 'Test Connection'}
        </button>
        
        <button
          onClick={testVehicleDataFlow}
          disabled={loadingPositions || isRunning}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600"
        >
          {loadingPositions ? 'Testing...' : 'Test Data Flow'}
        </button>
        
        <button
          onClick={runComprehensiveTest}
          disabled={isRunning}
          className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-purple-600"
        >
          {isRunning ? 'Running...' : 'Run All Tests'}
        </button>
        
        <button
          onClick={clearResults}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
      {(loadingBrands || loadingPositions || loadingLightData) && (
        <div className="mb-4">
          <LightsLoadingSpinner 
            message="API calls in progress..." 
            size="medium"
          />
        </div>
      )}

      {/* Positions List for Testing */}
      {positions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Available Positions (Click to Test)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {positions.map((position) => (
              <button
                key={position.id}
                onClick={() => testPositionSelection(position.id)}
                disabled={loadingLightData || isRunning}
                className={`p-3 text-left border rounded hover:bg-gray-50 disabled:opacity-50 ${
                  selectedPosition === position.id ? 'bg-blue-50 border-blue-300' : 'border-gray-300'
                }`}
              >
                <div className="font-medium">{position.name}</div>
                <div className="text-sm text-gray-600">ID: {position.id}</div>
                {position.ref && <div className="text-sm text-gray-500">Ref: {position.ref}</div>}
              </button>
            ))}
          </div>
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
              <p>No tests run yet. Click a button above to test the real backend.</p>
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
                        {result.duration && (
                          <span className="text-xs text-gray-400">({result.duration}ms)</span>
                        )}
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

export default RealBackendTest;
