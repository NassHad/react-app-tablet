import React, { useState } from 'react';
import { shouldUseLocalDatabase, DataSource } from '../config/dataSource';
import { useMockData } from '../hooks/useMockData';

interface DataModeToggleProps {
  onModeChange?: (mode: 'mock' | 'real') => void;
}

export const DataModeToggle: React.FC<DataModeToggleProps> = ({ onModeChange }) => {
  const { isMockMode } = useMockData();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleModeToggle = (mockMode: boolean) => {
    onModeChange?.(mockMode ? 'mock' : 'real');
    
    // Store preference in localStorage
    localStorage.setItem('dataMode', mockMode ? 'mock' : 'real');
    
    // Trigger a storage event to update other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'dataMode',
      newValue: mockMode ? 'mock' : 'real'
    }));
  };

  const currentDataSource = shouldUseLocalDatabase() ? 'Local Database' : 'Strapi API';
  const mockDataSource = 'Mock Data';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isMockMode ? 'bg-green-500' : 'bg-blue-500'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isMockMode ? 'Mode Mock' : 'Mode Réel'}
            </span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            <div className="text-xs text-gray-500">
              <div>Source actuelle: <span className="font-medium">{isMockMode ? mockDataSource : currentDataSource}</span></div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleModeToggle(false)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  !isMockMode 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">Mode Réel</div>
                <div className="text-xs text-gray-500">Données de la base de données</div>
              </button>
              
              <button
                onClick={() => handleModeToggle(true)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  isMockMode 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">Mode Mock</div>
                <div className="text-xs text-gray-500">Données de test pour le développement</div>
              </button>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                <div className="font-medium mb-1">Véhicules de test disponibles :</div>
                <ul className="space-y-1">
                  <li>• Audi A1 Sportback</li>
                  <li>• Peugeot 308</li>
                  <li>• Renault Clio</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
