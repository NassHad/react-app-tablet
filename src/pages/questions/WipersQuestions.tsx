import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWipersData } from '../../hooks/useWipersData';
import { useClickAnimation } from '../../hooks/useClickAnimation';
import { WipersPositionSelectorNew } from '../../components/WipersPositionSelectorNew';
import LoadingSpinner from '../../components/LoadingSpinner';
import HelpModal from '../../components/HelpModal';
import type { Vehicle, ProductCategory } from '../../types';
import type { WipersProduct } from '../../types/wipers';

// Import wipers position icons - using existing icons and fallbacks
import begIcon from '../../assets/img/categories/beg.png';
import carIcon from '../../assets/img/car.png';

interface WipersQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const WipersQuestions = ({ vehicle, category, onAnswersComplete }: WipersQuestionsProps) => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  
  // Use the wipers data hook
  const {
    loadingProducts,
    error,
    fetchProductsBySlugsAndPosition,
    clearError
  } = useWipersData();

  // Get the model slug from vehicle data
  const getModelSlugFromVehicle = (vehicle: Vehicle): string => {
    // Convert model name to slug format
    const modelSlug = vehicle.model.toLowerCase().replace(/\s+/g, '-');
    console.log(`🔍 WipersQuestions Debug:`, { 
      vehicle: `${vehicle.brand} ${vehicle.model}`, 
      modelSlug,
      originalModel: vehicle.model 
    });
    return modelSlug;
  };

  const handlePositionSelect = async (position: string) => {
    console.log('🎯 Wiper position selected:', position);
    setSelectedPosition(position);
    
    try {
      // Get model slug from vehicle data
      const modelSlug = getModelSlugFromVehicle(vehicle);
      const brandSlug = vehicle.brandSlug || vehicle.brand.toLowerCase().replace(/\s+/g, '-');
      console.log('🔍 Current data mode:', localStorage.getItem('dataMode'));
      console.log('🔍 About to fetch products for:', { brandSlug, modelSlug, position });
      
      // Fetch products using the slugs and position API
      await fetchProductsBySlugsAndPosition(brandSlug, modelSlug, position);
      
      // Complete the answers
      const answers = {
        position: position,
        positionName: getPositionDisplayName(position),
        modelSlug: modelSlug,
        brandSlug: brandSlug
      };
      
      onAnswersComplete(answers);
      
      // Navigate to products page
      navigate('/products');
    } catch (error) {
      console.error('Error selecting wiper position:', error);
    }
  };

  const getPositionDisplayName = (position: string): string => {
    switch (position) {
      case 'driver':
        return 'Côté Conducteur';
      case 'passenger':
        return 'Côté Passager';
      case 'back':
        return 'Arrière';
      default:
        return position;
    }
  };

  const handleHelpToggle = () => {
    setShowHelp(!showHelp);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loadingProducts) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={clearError}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleBackClick}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {category.name} - {vehicle.brand} {vehicle.model}
                </h1>
                <p className="text-sm text-gray-500">
                  Sélectionnez la position de l'essuie-glace
                </p>
              </div>
            </div>
            <button
              onClick={handleHelpToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choisissez la position de l'essuie-glace
          </h2>
          <p className="text-gray-600">
            Sélectionnez la position pour laquelle vous souhaitez trouver des essuie-glaces
          </p>
        </div>

        {/* Position Selector */}
        <WipersPositionSelectorNew
          onPositionSelect={handlePositionSelect}
          selectedPosition={selectedPosition}
          loading={loadingProducts}
        />

        {/* Selected Position Info */}
        {selectedPosition && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Position sélectionnée : {getPositionDisplayName(selectedPosition)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Position :</span> {selectedPosition}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Véhicule :</span> {vehicle.brand} {vehicle.model}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Année :</span> {vehicle.year}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Type :</span> {vehicle.type}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State for Products */}
        {loadingProducts && (
          <div className="mt-8 flex items-center justify-center">
            <LoadingSpinner />
            <span className="ml-2 text-gray-600">Chargement des produits...</span>
          </div>
        )}
      </div>

      {/* Help Modal */}
      {showHelp && (
        <HelpModal
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
};

export default WipersQuestions;