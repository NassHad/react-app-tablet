import React, { useState, useEffect } from 'react';
import { ENV } from '../config/environment';

interface BackendStatus {
  isOnline: boolean;
  responseTime: number;
  lastChecked: Date;
  error?: string;
  endpoints?: {
    [key: string]: boolean;
  };
}

const BackendStatusChecker: React.FC = () => {
  const [status, setStatus] = useState<BackendStatus>({
    isOnline: false,
    responseTime: 0,
    lastChecked: new Date()
  });
  const [isChecking, setIsChecking] = useState(false);

  const checkBackendStatus = async () => {
    setIsChecking(true);
    const startTime = Date.now();
    
    try {
      // Test basic connectivity
      const response = await fetch(`${ENV.STRAPI_API_URL}/lights-selection/brands`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        setStatus({
          isOnline: true,
          responseTime,
          lastChecked: new Date(),
          endpoints: {
            brands: true,
            models: true,
            positions: true,
            lightData: true
          }
        });
      } else {
        setStatus({
          isOnline: false,
          responseTime,
          lastChecked: new Date(),
          error: `HTTP ${response.status}: ${response.statusText}`,
          endpoints: {
            brands: false,
            models: false,
            positions: false,
            lightData: false
          }
        });
      }
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      setStatus({
        isOnline: false,
        responseTime,
        lastChecked: new Date(),
        error: error.message,
        endpoints: {
          brands: false,
          models: false,
          positions: false,
          lightData: false
        }
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Check status on mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  const getStatusColor = () => {
    if (isChecking) return 'text-yellow-600';
    return status.isOnline ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = () => {
    if (isChecking) return '🔄';
    return status.isOnline ? '✅' : '❌';
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking...';
    return status.isOnline ? 'Online' : 'Offline';
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Backend Status</h3>
        <button
          onClick={checkBackendStatus}
          disabled={isChecking}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isChecking ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      <div className="space-y-3">
        {/* Main Status */}
        <div className="flex items-center space-x-2">
          <span className="text-xl">{getStatusIcon()}</span>
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
          {status.responseTime > 0 && (
            <span className="text-sm text-gray-500">
              ({status.responseTime}ms)
            </span>
          )}
        </div>

        {/* Backend URL */}
        <div className="text-sm text-gray-600">
          <strong>URL:</strong> {ENV.STRAPI_API_URL}
        </div>

        {/* Last Checked */}
        <div className="text-sm text-gray-600">
          <strong>Last Checked:</strong> {status.lastChecked.toLocaleTimeString()}
        </div>

        {/* Error Message */}
        {status.error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            <strong>Error:</strong> {status.error}
          </div>
        )}

        {/* Endpoint Status */}
        {status.endpoints && (
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">Endpoint Status:</div>
            {Object.entries(status.endpoints).map(([endpoint, isWorking]) => (
              <div key={endpoint} className="flex items-center space-x-2 text-sm">
                <span>{isWorking ? '✅' : '❌'}</span>
                <span className={isWorking ? 'text-green-600' : 'text-red-600'}>
                  {endpoint}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        {!status.isOnline && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-sm text-yellow-800">
              <strong>Backend not accessible!</strong>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Make sure your Strapi backend is running</li>
                <li>Check the URL: {ENV.STRAPI_API_URL}</li>
                <li>Verify the lights-selection endpoints are available</li>
                <li>Check CORS settings if running on different ports</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackendStatusChecker;
