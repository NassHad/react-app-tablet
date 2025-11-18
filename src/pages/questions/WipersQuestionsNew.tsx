import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWipersData } from '../../hooks/useWipersData';
import { WipersPositionSelectorNew } from '../../components/WipersPositionSelectorNew';
import { WipersProductDisplay } from '../../components/WipersProductDisplay';
import LoadingSpinner from '../../components/LoadingSpinner';
import HelpModal from '../../components/HelpModal';
import type { Vehicle, ProductCategory } from '../../types';
import type { WipersProduct } from '../../types/wipers';

interface WipersQuestionsNewProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const WipersQuestionsNew = ({ vehicle, category, onAnswersComplete }: WipersQuestionsNewProps) => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [products, setProducts] = useState<WipersProduct[]>([]);
  
  // Use the wipers data hook
  const {
    loadingProducts,
    error,
    fetchProductsBySlugsAndPosition,
    clearError
  } = useWipersData();

  const handlePositionSelect = async (position: string) => {
    console.log('🎯 Wiper position selected:', position);
    setSelectedPosition(position);
    
    try {
      // Get slugs from vehicle data
      const modelSlug = vehicle.modelSlug || vehicle.model.toLowerCase().replace(/\s+/g, '-');
      const brandSlug = vehicle.brandSlug || vehicle.brand.toLowerCase().replace(/\s+/g, '-');
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
        return 'Conducteur';
      case 'passenger':
        return 'Passager';
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
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-5xl font-semibold text-green-wiper mt-20 mb-8 leading-15">
            Veuillez indiquer l'emplacement de l'essuie-glace souhaité
          </h2>
        </div>

        {/* Position Selector */}
        <WipersPositionSelectorNew
          onPositionSelect={handlePositionSelect}
          selectedPosition={selectedPosition}
          loading={loadingProducts}
        />
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

export default WipersQuestionsNew;
