import React, { useState } from 'react';
import WipersQuestionsNew from '../questions/WipersQuestionsNew';
import { WipersApiTest } from '../../components/WipersApiTest';
import BackendStatusChecker from '../../components/BackendStatusChecker';
import type { Vehicle, ProductCategory } from '../../types';

const WipersTestPageNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'component' | 'real-backend'>('api');
  
  // Mock data for testing
  const mockVehicle: Vehicle = {
    id: 1,
    type: 'car',
    brand: 'BMW',
    brandSlug: 'bmw',
    model: '3-Series M3',
    modelSlug: '3-series-m3',
    motorisation: '',
    dateCirculation: '2014-2020'
  };

  const mockCategory: ProductCategory = {
    id: 1,
    name: 'Balais essuie-glace',
    slug: 'wipers',
    active: true
  };

  const handleAnswersComplete = (answers: Record<string, string | string[]>) => {
    console.log('Wipers answers completed:', answers);
    alert(`Wipers answers received: ${JSON.stringify(answers, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                🚗 Wipers Category - NEW Position-Based Filtering
              </h1>
              <p className="text-sm text-gray-500">
                Test the new position-based filtering system
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('api')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'api'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                API Test
              </button>
              <button
                onClick={() => setActiveTab('component')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'component'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                New Component
              </button>
              <button
                onClick={() => setActiveTab('real-backend')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'real-backend'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Backend Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                🔌 Wipers API Endpoints Test (Including NEW Position-Based Filtering)
              </h2>
              <p className="text-gray-600 mb-4">
                Test all wipers API endpoints including the new position-based filtering endpoint.
              </p>
              <WipersApiTest />
            </div>
          </div>
        )}

        {activeTab === 'component' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                🎨 NEW Wipers Component Test
              </h2>
              <p className="text-gray-600 mb-4">
                Test the new WipersQuestionsNew component with simplified 3-position selection (Driver, Passenger, Rear).
              </p>
              <div className="border rounded-lg">
                <WipersQuestionsNew
                  vehicle={mockVehicle}
                  category={mockCategory}
                  onAnswersComplete={handleAnswersComplete}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'real-backend' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                🌐 Backend Status Check
              </h2>
              <p className="text-gray-600 mb-4">
                Check the status of the backend API and wipers endpoints.
              </p>
              <BackendStatusChecker />
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-sm text-gray-500">
            <h3 className="font-medium text-gray-900 mb-2">NEW Position-Based Filtering:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Vehicle:</strong> {mockVehicle.brand} {mockVehicle.model}</p>
                <p><strong>Category:</strong> {mockCategory.name}</p>
              </div>
              <div>
                <p><strong>NEW Positions:</strong> Conducteur, Passager, Arrière</p>
                <p><strong>NEW Endpoint:</strong> /api/wipers-selection/products/:modelId/:position</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🚀 Key Benefits:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Cleaner Interface:</strong> Only 3 simple position options</li>
                <li>• <strong>Better UX:</strong> Users see exactly what they need</li>
                <li>• <strong>Faster Loading:</strong> Smaller response payloads</li>
                <li>• <strong>Professional Look:</strong> Organized by wiper function</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WipersTestPageNew;
