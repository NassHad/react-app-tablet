import React, { useState, useEffect } from 'react';
import { syncService, type SyncResult } from '../services/syncService';

interface SyncButtonProps {
  className?: string;
  onSyncComplete?: (result: SyncResult) => void;
}

const SyncButton: React.FC<SyncButtonProps> = ({ className = '', onSyncComplete }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);

  // Load sync status on component mount
  useEffect(() => {
    loadSyncStatus();
  }, []);

  const loadSyncStatus = async () => {
    try {
      const status = await syncService.getStatus();
      setLastSync(status.lastSync);
      setIsOnline(status.isOnline);
      setCurrentVersion(status.currentVersion);
    } catch (error) {
      console.error('Error loading sync status:', error);
    }
  };

  const handleSync = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    try {
      console.log('🔄 Starting synchronization...');
      const result = await syncService.sync();
      
      if (result.success) {
        console.log('✅ Synchronization completed:', result.message);
        setLastSync(new Date().toISOString());
        if (result.data) {
          setCurrentVersion(result.data.version);
        }
      } else {
        console.error('❌ Synchronization failed:', result.message);
      }

      if (onSyncComplete) {
        onSyncComplete(result);
      }
    } catch (error) {
      console.error('❌ Synchronization error:', error);
      if (onSyncComplete) {
        onSyncComplete({
          success: false,
          message: 'Synchronization failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const formatLastSync = (timestamp: string | null) => {
    if (!timestamp) return 'Jamais';
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR');
  };

  return (
    <div className={`sync-button ${className}`}>
      <button
        onClick={handleSync}
        disabled={isSyncing || !isOnline}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${isSyncing 
            ? 'bg-gray-400 text-white cursor-not-allowed' 
            : isOnline 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-400 text-white cursor-not-allowed'
          }
        `}
      >
        {isSyncing ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Synchronisation...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Mettre à jour</span>
          </div>
        )}
      </button>

      {/* Sync Status Info */}
      <div className="mt-2 text-xs text-gray-600 space-y-1">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>{isOnline ? 'En ligne' : 'Hors ligne'}</span>
        </div>
        
        {currentVersion && (
          <div>
            <span className="font-medium">Version:</span> {currentVersion}
          </div>
        )}
        
        {lastSync && (
          <div>
            <span className="font-medium">Dernière sync:</span> {formatLastSync(lastSync)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncButton;
