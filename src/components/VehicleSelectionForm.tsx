import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSimpleVehicleContext } from '../contexts/SimpleVehicleContext';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { getVehicleTypeDisplayName } from '../utils';
import { getStrapiVehicleTypeId } from '../config/vehicleTypeMapping';
import { 
  getBrands, 
  getModelsByBrand, 
  getDateRangesByModel,
  vehicleDataService,
  type Brand,
  type Model,
  type DateRange
} from '../utils/vehicleData';

interface VehicleSelectionFormProps {
  vehicleType: string;
  onComplete: () => void;
}

const VehicleSelectionForm: React.FC<VehicleSelectionFormProps> = ({ vehicleType, onComplete }) => {
  const { updateVehicleData } = useSimpleVehicleContext();
  
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [availableDateRanges, setAvailableDateRanges] = useState<DateRange[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingModels, setIsLoadingModels] = useState<boolean>(false);
  const [isLoadingDateRanges, setIsLoadingDateRanges] = useState<boolean>(false);
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

  // Filter models when brand changes
  useEffect(() => {
    const loadModels = async () => {
      if (selectedBrandId) {
        try {
          setIsLoadingModels(true);
          setError(null);
          
          // Convert vehicleType to a number for Strapi
          const vehicleTypeId = getStrapiVehicleTypeId(vehicleType as any);
          
          const models = await vehicleDataService.getModelsByBrand(selectedBrandId, vehicleTypeId);
          setAvailableModels(models);
          setSelectedModelId(null);
          setSelectedDateRange('');
          setAvailableDateRanges([]);
        } catch (err) {
          console.error('Failed to load models:', err);
          setError('Failed to load models. Please try again.');
          // Fallback to local data
          const models = getModelsByBrand(selectedBrandId);
          setAvailableModels(models);
        } finally {
          setIsLoadingModels(false);
        }
      } else {
        setAvailableModels([]);
        setSelectedModelId(null);
        setSelectedDateRange('');
        setAvailableDateRanges([]);
      }
    };

    loadModels();
  }, [selectedBrandId, vehicleType]);

  // Load date ranges when model changes
  useEffect(() => {
    const loadDateRanges = async () => {
      if (selectedModelId) {
        try {
          setIsLoadingDateRanges(true);
          setError(null);
          
          const dateRanges = await vehicleDataService.getDateRangesByModel(selectedModelId);
          setAvailableDateRanges(dateRanges);
          setSelectedDateRange('');
        } catch (err) {
          console.error('Failed to load date ranges:', err);
          setError('Failed to load date ranges. Please try again.');
          // Fallback to local data
          const dateRanges = getDateRangesByModel(selectedModelId);
          setAvailableDateRanges(dateRanges);
        } finally {
          setIsLoadingDateRanges(false);
        }
      } else {
        setAvailableDateRanges([]);
        setSelectedDateRange('');
      }
    };

    loadDateRanges();
  }, [selectedModelId]);

  const handleBrandChange = (brandId: number) => {
    setSelectedBrandId(brandId);
  };

  const handleModelChange = (modelId: number) => {
    setSelectedModelId(modelId);
  };

  const handleDateRangeChange = (dateRange: string) => {
    setSelectedDateRange(dateRange);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrandId && selectedModelId && selectedDateRange) {
      try {
        const brand = await vehicleDataService.getBrandById(selectedBrandId);
        const model = await vehicleDataService.getModelById(selectedModelId);
        
        if (brand && model) {
          // Store vehicle data in context
          const vehicleData = {
            vehicleType,
            brand: brand.name,
            model: model.name,
            dateCirculation: selectedDateRange,
          };
          console.log('Storing vehicle data in context:', vehicleData);
          updateVehicleData(vehicleData);
          
          // Navigate to category selection
          onComplete();
        }
      } catch (err) {
        console.error('Failed to get brand/model data:', err);
        setError('Failed to process vehicle selection. Please try again.');
      }
    }
  };

  const submitAnimation = useClickAnimation({
    onComplete: () => {
      // Only animate, do not trigger navigation or onVehicleSelect here
    }
  });

  const isFormValid = selectedBrandId && selectedModelId && selectedDateRange;

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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-row gap-4 space-y-8 justify-around'>
            <div className="space-y-3">
              <label htmlFor="brand" className="block text-xl font-bold text-black text-left pl-2">
                Marque
              </label>
              <select
                id="brand"
                value={selectedBrandId || ''}
                onChange={(e) => handleBrandChange(Number(e.target.value))}
                className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                required
              >
                <option value="">Sélectionnez une marque</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
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
                value={selectedModelId || ''}
                onChange={(e) => handleModelChange(Number(e.target.value))}
                className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                disabled={!selectedBrandId || isLoadingModels}
                required
              >
                <option value="">
                  {isLoadingModels 
                    ? 'Chargement des modèles...' 
                    : selectedBrandId 
                      ? 'Sélectionnez un modèle' 
                      : 'Sélectionnez d\'abord une marque'
                  }
                </option>
                {availableModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className='flex flex-row gap-4 justify-around space-y-8'>
            {/* Date Range Selection */}
            <div className="space-y-4">
              <label htmlFor="dateRange" className="block text-xl font-bold text-black text-left pl-2">
                Date de 1ère mise en circulation
              </label>
              <select
                id="dateRange"
                value={selectedDateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                disabled={!selectedModelId || isLoadingDateRanges}
                required
              >
                <option value="">
                  {isLoadingDateRanges 
                    ? 'Chargement des périodes...' 
                    : selectedModelId 
                      ? 'Sélectionnez une période' 
                      : 'Sélectionnez d\'abord un modèle'
                  }
                </option>
                {availableDateRanges.map((dateRange) => (
                  <option key={dateRange.id} value={dateRange.range}>
                    {dateRange.range}
                  </option>
                ))}
              </select>
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