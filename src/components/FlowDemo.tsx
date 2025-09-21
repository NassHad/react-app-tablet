import React from 'react';
import { useSimpleVehicleContext } from '../contexts/SimpleVehicleContext';

const FlowDemo: React.FC = () => {
  const { vehicleData } = useSimpleVehicleContext();

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500 max-w-sm">
      <h3 className="font-bold text-blue-600 mb-2">🚀 Enhanced Flow Demo</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>Vehicle Type:</strong> {vehicleData.vehicleType || 'Not selected'}
        </div>
        <div>
          <strong>Brand:</strong> {vehicleData.brand || 'Not selected'}
        </div>
        <div>
          <strong>Model:</strong> {vehicleData.model || 'Not selected'}
        </div>
        <div>
          <strong>Date:</strong> {vehicleData.dateCirculation || 'Not selected'}
        </div>
        <div>
          <strong>Category:</strong> {vehicleData.selectedCategory?.name || 'Not selected'}
        </div>
        
        {vehicleData.motorisation && (
          <div>
            <strong>Motorisation:</strong> {vehicleData.motorisation}
          </div>
        )}
        
        {vehicleData.position && (
          <div>
            <strong>Position:</strong> {vehicleData.position}
          </div>
        )}
        
        {vehicleData.viscosity && (
          <div>
            <strong>Viscosity:</strong> {vehicleData.viscosity}
          </div>
        )}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        This shows the global vehicle state as you progress through the flow
      </div>
    </div>
  );
};

export default FlowDemo;
