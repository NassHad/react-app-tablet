import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { shouldUseStrapi } from '../config/dataSource';

const StrapiStatus = () => {
  const [status, setStatus] = useState<{ source: string; isConnected: boolean; baseUrl?: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      updateStatus();
    }
  }, [isVisible]);

  const updateStatus = () => {
    const currentStatus = dataService.getStatus();
    setStatus(currentStatus);
  };

  const testConnection = async () => {
    setTesting(true);
    try {
      console.log('🧪 Testing data source connection...');
      const isConnected = await dataService.testConnection();
      
      // Update status after test
      updateStatus();
      
      if (isConnected) {
        console.log('✅ Connection test successful');
      } else {
        console.log('❌ Connection test failed');
      }
    } catch (error) {
      console.error('❌ Connection test error:', error);
    } finally {
      setTesting(false);
    }
  };

  const switchToStrapi = () => {
    dataService.switchDataSource('strapi');
    updateStatus();
  };

  const switchToLocal = () => {
    dataService.switchDataSource('local');
    updateStatus();
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg z-50 transition-all duration-200 hover:scale-110"
        title="Statut Strapi"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Data Source Status</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {status && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Current Source:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              status.source === 'Strapi Backend' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {status.source}
            </span>
          </div>

          {status.baseUrl && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Strapi URL:</span>
              <span className="text-xs text-gray-500 font-mono">{status.baseUrl}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Connection:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              status.isConnected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {status.isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <button
          onClick={testConnection}
          disabled={testing}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          {testing ? 'Testing...' : 'Test Connection'}
        </button>

        <div className="flex space-x-2">
          <button
            onClick={switchToStrapi}
            disabled={!shouldUseStrapi()}
            className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white py-2 px-3 rounded-md text-xs font-medium transition-colors"
          >
            Use Strapi
          </button>
          <button
            onClick={switchToLocal}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md text-xs font-medium transition-colors"
          >
            Use Local DB
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 Tip: Change the data source in <code className="bg-gray-100 px-1 rounded">src/config/dataSource.ts</code>
        </p>
      </div>
    </div>
  );
};

export default StrapiStatus;
