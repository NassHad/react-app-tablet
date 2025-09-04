import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { VehicleType, ProductCategory, Vehicle } from '../types';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { checkProductAvailability } from '../utils/productAvailability';
import { FLOW_CONFIG } from '../config/flowConfig';
import { getVehicleTypeDisplayName } from '../utils';
import { 
  getBrands, 
  getModelsByBrand, 
  getDateRangesByModel,
  getBrandById,
  getModelById,
  type Brand,
  type Model,
  type DateRange
} from '../utils/vehicleData';

interface VehiclePageProps {
  vehicleType: VehicleType;
  category: ProductCategory;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

const VehiclePage = ({ vehicleType, category, onVehicleSelect }: VehiclePageProps) => {
  const navigate = useNavigate();
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [availableDateRanges, setAvailableDateRanges] = useState<DateRange[]>([]);
  const [brands] = useState<Brand[]>(getBrands());

  // Filter models when brand changes
  useEffect(() => {
    if (selectedBrandId) {
      const models = getModelsByBrand(selectedBrandId);
      setAvailableModels(models);
      setSelectedModelId(null);
      setSelectedDateRange('');
      setAvailableDateRanges([]);
    } else {
      setAvailableModels([]);
      setSelectedModelId(null);
      setSelectedDateRange('');
      setAvailableDateRanges([]);
    }
  }, [selectedBrandId]);

  // Filter date ranges when model changes
  useEffect(() => {
    if (selectedModelId) {
      const dateRanges = getDateRangesByModel(selectedModelId);
      setAvailableDateRanges(dateRanges);
      setSelectedDateRange('');
    } else {
      setAvailableDateRanges([]);
      setSelectedDateRange('');
    }
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
      const brand = getBrandById(selectedBrandId);
      const model = getModelById(selectedModelId);
      
      if (brand && model) {
        const vehicle: Vehicle = {
          id: Math.floor(Math.random() * 1000), // Mock ID
          type: vehicleType,
          brand: brand.name,
          model: model.name,
          dateCirculation: selectedDateRange,
        };
        
        onVehicleSelect(vehicle);
        
        // In the new flow, we navigate to category selection first
        // In the original flow, we check availability and navigate directly
        if (FLOW_CONFIG.SELECT_VEHICLE_FIRST) {
          // New flow: navigate to category selection
          navigate('/category');
        } else {
          // Original flow: check availability and navigate accordingly
          const productsAvailable = await checkProductAvailability(vehicle, category);
          
          if (!productsAvailable) {
            // Redirect to no products available page
            navigate('/no-products-available', { 
              state: { vehicle, category } 
            });
          } else {
            // Continue with normal flow
            if (category.slug === 'batteries') {
              navigate('/products');
            } else {
              navigate('/questions');
            }
          }
        }
      }
    }
  };

  const submitAnimation = useClickAnimation({
    onComplete: () => {
      // Only animate, do not trigger navigation or onVehicleSelect here
    }
  });

  const isFormValid = selectedBrandId && selectedModelId && selectedDateRange;

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-5xl text-[#1290AD] mt-16 mb-14">Sélectionnez la <span className="font-bold">marque</span>, le <span className="font-bold">modèle</span> et la <span className="font-bold">date</span> de mise en circulation de votre {getVehicleTypeDisplayName(vehicleType)}</h1>
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
                disabled={!selectedBrandId}
                required
              >
                <option value="">
                  {selectedBrandId ? 'Sélectionnez un modèle' : 'Sélectionnez d\'abord une marque'}
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
                disabled={!selectedModelId}
                required
              >
                <option value="">
                  {selectedModelId ? 'Sélectionnez une période' : 'Sélectionnez d\'abord un modèle'}
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
              Continuer
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehiclePage;