import React from 'react';
import type { LightData } from '../types/lights';

interface LightDataDisplayProps {
  lightData: LightData;
  className?: string;
}

const LightDataDisplay: React.FC<LightDataDisplayProps> = ({ lightData, className = '' }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      <h3 className="text-lg font-bold text-gray-800 mb-3">Détails de l'ampoule</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Position:</span>
          <span className="font-medium">{lightData.position}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Référence:</span>
          <span className="font-medium text-blue-600">{lightData.ref}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Catégorie:</span>
          <span className="font-medium">{lightData.category}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Années de construction:</span>
          <span className="font-medium">{lightData.constructionYear}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Type de conception:</span>
          <span className="font-medium">{lightData.typeConception}</span>
        </div>
      </div>
    </div>
  );
};

export default LightDataDisplay;
