import React, { useState } from 'react';
import BulbsQuestions from '../questions/BulbsQuestions';
import LightsApiTest from '../../components/LightsApiTest';
import RealBackendTest from '../../components/RealBackendTest';
import BackendStatusChecker from '../../components/BackendStatusChecker';
import type { Vehicle, ProductCategory } from '../../types';

const LightsTestPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'component' | 'real-backend'>('api');
  
  // Mock data for testing
  const mockVehicle: Vehicle = {
    id: 1,
    type: 'car',
    brand: 'ABARTH',
    brandSlug: 'abarth',
    model: '500 / 595 / 695',
    modelSlug: '500-595-695',
    motorisation: '',
    dateCirculation: '2007-2020'
  };

  const mockCategory: ProductCategory = {
    id: 1,
    name: 'Éclairage',
    slug: 'lights',
    active: true
  };

  const handleAnswersComplete = (answers: Record<string, string | string[]>) => {
    console.log('Answers completed:', answers);
    alert(`Answers received: ${JSON.stringify(answers, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Lights Integration Test</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('api')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'api'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                API Tests
              </button>
              <button
                onClick={() => setActiveTab('component')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'component'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Component Test
              </button>
              <button
                onClick={() => setActiveTab('real-backend')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'real-backend'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Real Backend Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'api' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">API Integration Tests</h2>
              <p className="text-gray-600">
                Test all the lights API endpoints to verify they're working correctly with your Strapi backend.
              </p>
            </div>
            <LightsApiTest />
          </div>
        )}

        {activeTab === 'component' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">BulbsQuestions Component Test</h2>
              <p className="text-gray-600">
                Test the BulbsQuestions component with mock data to verify the UI and data flow.
              </p>
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Test Vehicle:</strong> {mockVehicle.brand} {mockVehicle.model} ({mockVehicle.dateCirculation})
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border">
              <BulbsQuestions
                vehicle={mockVehicle}
                category={mockCategory}
                onAnswersComplete={handleAnswersComplete}
              />
            </div>
          </div>
        )}

        {activeTab === 'real-backend' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Real Backend Test - BulbsQuestions</h2>
              <p className="text-gray-600">
                Test the BulbsQuestions component with your real Strapi backend to verify API integration and data flow.
              </p>
            </div>

            {/* Backend Status Checker */}
            <div className="mb-6">
              <BackendStatusChecker />
            </div>
            
            <RealBackendTest
              vehicle={mockVehicle}
              category={mockCategory}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LightsTestPage;
