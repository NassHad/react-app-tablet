import { useState } from 'react';
import { vehicleDataService } from '../services/vehicleDataService';
// import { getStrapiVehicleTypeId } from '../config/vehicleTypeMapping';

const VehicleDataTest = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      addResult('🧪 Starting vehicle data integration tests...');
      
      // Test 1: Get battery brands
      addResult('📋 Testing battery brands fetch...');
      const brands = await vehicleDataService.getBrands();
      addResult(`✅ Found ${brands.length} battery brands`);
      
      if (brands.length > 0) {
        const firstBrand = brands[0];
        addResult(`📝 First brand: ${firstBrand.name} (ID: ${firstBrand.id})`);
        
        // Test 2: Get battery models for first brand
        addResult('🔋 Testing battery models fetch...');
        const models = await vehicleDataService.getModelsByBrand(firstBrand.id);
        addResult(`✅ Found ${models.length} battery models for brand ${firstBrand.name}`);
        
        if (models.length > 0) {
          const firstModel = models[0];
          addResult(`📝 First model: ${firstModel.name} (ID: ${firstModel.id})`);
          
          // Test 3: Get date ranges for first model
          addResult('📅 Testing date ranges fetch...');
          const dateRanges = await vehicleDataService.getDateRangesByModel(firstModel.id);
          addResult(`✅ Found ${dateRanges.length} date ranges for model ${firstModel.name}`);
          
          if (dateRanges.length > 0) {
            addResult(`📝 First date range: ${dateRanges[0].range}`);
          }
        }
      }
      
      // Test 4: Cache status
      const cacheStatus = vehicleDataService.getCacheStatus();
      addResult(`💾 Cache status: ${cacheStatus.hasCache ? 'Has cache' : 'No cache'} (Valid: ${cacheStatus.isValid})`);
      
      addResult('🎉 All tests completed successfully!');
      
    } catch (error) {
      addResult(`❌ Test failed: ${error}`);
      console.error('Test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCache = () => {
    vehicleDataService.clearCache();
    addResult('🗑️ Cache cleared');
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Vehicle Data Integration Test</h3>
      
      <div className="space-x-4 mb-4">
        <button
          onClick={runTests}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Running Tests...' : 'Run Tests'}
        </button>
        
        <button
          onClick={clearCache}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Cache
        </button>
      </div>
      
      <div className="bg-white p-4 rounded border max-h-96 overflow-y-auto">
        <h4 className="font-semibold mb-2">Test Results:</h4>
        {testResults.length === 0 ? (
          <p className="text-gray-500">Click "Run Tests" to start testing the integration</p>
        ) : (
          <div className="space-y-1">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDataTest;
