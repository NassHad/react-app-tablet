import { useState, useEffect } from 'react';
import { databaseService } from '../db/database';

const DatabaseDebugger = () => {
  const [status, setStatus] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [jeepStatus, setJeepStatus] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  
  const checkJeepStatus = async () => {
    const status = await databaseService.checkJeepSQLiteStatus();
    setJeepStatus(status);
    console.log('�� Jeep-SQLite Status:', status);
  };
  const checkStatus = () => {
    const dbStatus = databaseService.getDatabaseStatus();
    setStatus(dbStatus);
    console.log('🔍 Database Status:', dbStatus);
  };

  const testConnection = async () => {
    console.log('🧪 Testing database connection...');
    const isConnected = await databaseService.testConnection();
    console.log('🧪 Connection test result:', isConnected);
    checkStatus();
  };

  const forceReinitialize = async () => {
    console.log('🔄 Force re-initializing database...');
    await databaseService.forceReinitialize();
    checkStatus();
  };

  // const _manualInitialize = async () => {
  //   console.log('🔧 Manually initializing database...');
  //   await databaseService.initialize();
  //   checkStatus();
  // };


  const manuallyLoadJeep = async () => {
    setLoadingStatus('Loading jeep-sqlite...');
    try {
      console.log('🔧 Manually loading jeep-sqlite...');
      await databaseService.forceReinitialize();
      setLoadingStatus('Jeep-SQLite loaded successfully!');
      setTimeout(() => setLoadingStatus(''), 3000);
      checkJeepStatus();
    } catch (error) {
      setLoadingStatus('Failed to load jeep-sqlite');
      console.error('❌ Failed to load jeep-sqlite:', error);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg z-50"
        title="Database Debugger"
      >
        🗄️
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isVisible ? 'block' : 'hidden'}`}>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">��️ Database Debugger</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {/* Loading Status */}
        {loadingStatus && (
          <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
            {loadingStatus}
          </div>
        )}
        
        {/* Database Status */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Database Status</h4>
          {status && (
            <div className="text-sm space-y-1">
              <div>SQLite Enabled: <span className={status.useSQLite ? 'text-green-600' : 'text-red-600'}>{status.useSQLite ? '✅ Yes' : '❌ No'}</span></div>
              <div>Initialized: <span className={status.isInitialized ? 'text-green-600' : 'text-red-600'}>{status.isInitialized ? '✅ Yes' : '❌ No'}</span></div>
              <div>Platform: <span className="text-blue-600">{status.isWeb ? '�� Web' : '📱 Mobile'}</span></div>
            </div>
          )}
        </div>
        
        {/* Jeep-SQLite Status */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Jeep-SQLite Status</h4>
          {jeepStatus && (
            <div className="text-sm space-y-1">
              <div>Element Exists: <span className={jeepStatus.exists ? 'text-green-600' : 'text-red-600'}>{jeepStatus.exists ? '✅ Yes' : '❌ No'}</span></div>
              <div>Custom Element: <span className={jeepStatus.defined ? 'text-green-600' : 'text-red-600'}>{jeepStatus.defined ? '✅ Yes' : '❌ No'}</span></div>
              <div>Ready: <span className={jeepStatus.ready ? 'text-green-600' : 'text-red-600'}>{jeepStatus.ready ? '✅ Yes' : '❌ No'}</span></div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={checkStatus}
            className="w-full bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
          >
            🔍 Check Status
          </button>
          <button
            onClick={checkJeepStatus}
            className="w-full bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600"
          >
            �� Check Jeep-SQLite
          </button>
          <button
            onClick={manuallyLoadJeep}
            className="w-full bg-indigo-500 text-white px-3 py-2 rounded text-sm hover:bg-indigo-600"
          >
            🔧 Load Jeep-SQLite
          </button>
          <button
            onClick={testConnection}
            className="w-full bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
          >
            🧪 Test Connection
          </button>
          <button
            onClick={forceReinitialize}
            className="w-full bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600"
          >
            �� Manual Initialize
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseDebugger;
