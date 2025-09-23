import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { getVehicleTypeDisplayName } from '../utils';
import { 
  getBrands, 
  vehicleDataService,
  type Brand,
  type Model
} from '../utils/vehicleData';
import type { UserSelection } from '../types';

interface VehicleSelectionFormProps {
  vehicleType: string;
  userSelection: UserSelection | null;
  updateUserSelection: (updates: Partial<UserSelection>) => void;
  onComplete: () => void;
}

const VehicleSelectionForm: React.FC<VehicleSelectionFormProps> = ({ vehicleType, userSelection, updateUserSelection, onComplete }) => {
  
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('');
  const [selectedModelSlug, setSelectedModelSlug] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingModels, setIsLoadingModels] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial brands data
  useEffect(() => {
    const loadBrands = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const brandsData = await vehicleDataService.getBrands();
        setBrands(brandsData);
      } catch (err) {
        console.error('Failed to load brands:', err);
        setError('Failed to load vehicle data. Please try again.');
        // Fallback to local data
        setBrands(getBrands());
      } finally {
        setIsLoading(false);
      }
    };

    loadBrands();
  }, []);

  // Load models when brand changes
  useEffect(() => {
    const loadModelsForBrand = async () => {
      if (selectedBrandSlug) {
        try {
          setIsLoadingModels(true);
          setError(null);
          const modelsData = await vehicleDataService.getModelsByBrandSlug(selectedBrandSlug);
          setAvailableModels(modelsData);
          setSelectedModelSlug(''); // Reset model selection
        } catch (err) {
          console.error('Failed to load models:', err);
          setError('Failed to load models. Please try again.');
          setAvailableModels([]);
        } finally {
          setIsLoadingModels(false);
        }
      } else {
        setAvailableModels([]);
        setSelectedModelSlug('');
      }
    };

    loadModelsForBrand();
  }, [selectedBrandSlug]);

  const handleBrandChange = (brandSlug: string) => {
    setSelectedBrandSlug(brandSlug);
  };

  const handleModelChange = (modelSlug: string) => {
    setSelectedModelSlug(modelSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrandSlug && selectedModelSlug && selectedDate) {
      try {
        const selectedBrand = brands.find(b => b.slug === selectedBrandSlug);
        const selectedModel = availableModels.find(m => m.modelSlug === selectedModelSlug);
        
        if (selectedBrand && selectedModel) {
          // Create vehicle object for main userSelection state
          const vehicle = {
            id: Date.now(),
            type: vehicleType as any,
            brand: selectedBrand.name,
            model: selectedModel.name,
            dateCirculation: selectedDate,
          };
          console.log('Storing vehicle data in userSelection:', vehicle);
          updateUserSelection({ vehicle });
          
          // Navigate to category selection
          onComplete();
        }
      } catch (err) {
        console.error('Failed to process vehicle selection:', err);
        setError('Failed to process vehicle selection. Please try again.');
      }
    }
  };

  const submitAnimation = useClickAnimation({
    onComplete: () => {
      // Only animate, do not trigger navigation or onVehicleSelect here
    }
  });

  const isFormValid = selectedBrandSlug && selectedModelSlug && selectedDate;

  // Show loading state while initial data is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Chargement des données véhicules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-5xl text-[#1290AD] mt-16 mb-14">
          Sélectionnez la <span className="font-bold">marque</span>, le <span className="font-bold">modèle</span> et la <span className="font-bold">date</span> de mise en circulation de votre {getVehicleTypeDisplayName(vehicleType as any)}
        </h1>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className='flex flex-row gap-4 space-y-8 justify-around'>
            <div className="space-y-3">
              <label htmlFor="brand" className="block text-xl font-bold text-black text-left pl-2">
                Marque
              </label>
              <select
                id="brand"
                value={selectedBrandSlug}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                required
              >
                <option value="">Sélectionnez une marque</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.slug}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Selection */}
            <div className="space-y-4">
              <label htmlFor="model" className="block text-xl font-bold text-black text-left pl-2">
                Modèle
              </label>
              <select
                id="model"
                value={selectedModelSlug}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                disabled={!selectedBrandSlug || isLoadingModels}
                required
              >
                <option value="">
                  {isLoadingModels 
                    ? 'Chargement des modèles...' 
                    : selectedBrandSlug 
                      ? 'Sélectionnez un modèle' 
                      : 'Sélectionnez d\'abord une marque'
                  }
                </option>
                {availableModels.map((model) => (
                  <option key={model.id} value={model.modelSlug}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Date Selection */}
          <div className="flex justify-center">
            <div className="space-y-3 w-full max-w-md">
              <label htmlFor="date" className="block text-xl font-bold text-black text-left pl-2">
                Date de 1ère mise en circulation
              </label>
              <div className="flex gap-4">
                <select
                  id="month"
                  value={selectedDate.split('-')[1] || ''}
                  onChange={(e) => {
                    const year = selectedDate.split('-')[0] || '';
                    setSelectedDate(year ? `${year}-${e.target.value}` : `2024-${e.target.value}`);
                  }}
                  className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  required
                >
                  <option value="">Mois</option>
                  <option value="01">Janvier</option>
                  <option value="02">Février</option>
                  <option value="03">Mars</option>
                  <option value="04">Avril</option>
                  <option value="05">Mai</option>
                  <option value="06">Juin</option>
                  <option value="07">Juillet</option>
                  <option value="08">Août</option>
                  <option value="09">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
                
                <select
                  id="year"
                  value={selectedDate.split('-')[0] || ''}
                  onChange={(e) => {
                    const month = selectedDate.split('-')[1] || '';
                    setSelectedDate(month ? `${e.target.value}-${month}` : `${e.target.value}-01`);
                  }}
                  className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  required
                >
                  <option value="">Année</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <motion.button
              type="submit"
              disabled={!isFormValid}
              onClick={submitAnimation.handleClick}
              className={`py-4 px-8 rounded-lg text-lg font-semibold transition-all mt-10 ${
                isFormValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              {...submitAnimation.animationProps}
            >
              Continuer vers les catégories
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleSelectionForm;