import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';

interface MockVehicleSelectorProps {
  onVehicleSelect?: () => void;
}

export const MockVehicleSelector: React.FC<MockVehicleSelectorProps> = ({ onVehicleSelect }) => {
  const { isMockMode, createMockUserSelection, setMockUserSelectionData } = useMockData();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const mockVehicles = [
    { id: 1, brand: 'Audi', model: 'A1 Sportback', category: 'lights', positionSlug: 'feu-de-route' },
    { id: 2, brand: 'Audi', model: 'A1 Sportback', category: 'batteries' },
    { id: 3, brand: 'Peugeot', model: '308', category: 'lights', positionSlug: 'feu-de-croisement' },
    { id: 4, brand: 'Peugeot', model: '308', category: 'batteries' },
    { id: 5, brand: 'Renault', model: 'Clio', category: 'lights', positionSlug: 'feu-de-position' },
    { id: 6, brand: 'Renault', model: 'Clio', category: 'batteries' }
  ];

  const handleVehicleSelect = (vehicle: typeof mockVehicles[0]) => {
    const mockSelection = createMockUserSelection(vehicle.id, vehicle.category, vehicle.positionSlug);
    setMockUserSelectionData(mockSelection);
    
    // Store the selection in localStorage for the app to use
    const userSelection = {
      vehicle: {
        type: 'car',
        brand: vehicle.brand,
        model: vehicle.model,
        brandSlug: vehicle.brand.toLowerCase(),
        modelSlug: vehicle.model.toLowerCase().replace(/\s+/g, '-')
      },
      category: vehicle.category,
      answers: {
        positionSlug: vehicle.positionSlug,
        lightingType: 'Halogen'
      }
    };

    localStorage.setItem('mockUserSelection', JSON.stringify(userSelection));
    
    // Navigate to the appropriate page
    if (vehicle.category === 'lights') {
      navigate('/questions/bulbs');
    } else if (vehicle.category === 'batteries') {
      navigate('/questions/battery');
    }
    
    onVehicleSelect?.();
  };

  if (!isMockMode) return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-gray-700">
              Sélection Rapide
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
          <div className="mt-3 space-y-2">
            <div className="text-xs text-gray-500 mb-2">
              Cliquez sur un véhicule pour le sélectionner automatiquement :
            </div>
            
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {mockVehicles.map((vehicle, index) => (
                <button
                  key={index}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className="w-full text-left px-3 py-2 rounded text-sm bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="font-medium text-gray-800">
                    {vehicle.brand} {vehicle.model}
                  </div>
                  <div className="text-xs text-gray-500">
                    {vehicle.category === 'lights' ? 'Éclairage' : 'Batteries'}
                    {vehicle.positionSlug && ` - ${vehicle.positionSlug.replace(/-/g, ' ')}`}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                💡 Ces sélections utilisent des données mock pour le développement
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
