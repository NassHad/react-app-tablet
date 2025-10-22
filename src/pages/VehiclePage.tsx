import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { VehicleType, ProductCategory, Vehicle } from '../types';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { vehicleDataService } from '../services/vehicleDataService';
import type { Brand, Model } from '../utils/vehicleData';
import BatteryVehicleForm from '../components/BatteryVehicleForm';

interface VehiclePageProps {
  vehicleType: VehicleType;
  category: ProductCategory;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

const VehiclePage = ({ vehicleType, category, onVehicleSelect }: VehiclePageProps) => {
  const navigate = useNavigate();
  
  // Check if this is a battery category
  const isBatteryCategory = category.slug === 'batteries' || category.name.toLowerCase().includes('batterie');
  
  // If it's a battery category, render the specialized form
  if (isBatteryCategory) {
    return (
      <BatteryVehicleForm
        vehicleType={vehicleType}
        category={category}
        onVehicleSelect={onVehicleSelect}
      />
    );
  }
  
  // State management for new API-based form
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('');
  const [selectedModelSlug, setSelectedModelSlug] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingModels, setIsLoadingModels] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load brands on component mount
  useEffect(() => {
    const loadBrands = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const brandsData = await vehicleDataService.getBrands();
        setBrands(brandsData);
      } catch (err) {
        console.error('Failed to load brands:', err);
        setError('Échec du chargement des marques. Veuillez réessayer.');
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
          setFilteredModels(modelsData);
          setSelectedModelSlug(''); // Reset model selection
        } catch (err) {
          console.error('Failed to load models:', err);
          setError('Échec du chargement des modèles. Veuillez réessayer.');
          setFilteredModels([]);
        } finally {
          setIsLoadingModels(false);
        }
      } else {
        setFilteredModels([]);
        setSelectedModelSlug('');
      }
    };

    loadModelsForBrand();
  }, [selectedBrandSlug]);

  // Date input component
  const DateInput = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
    const months = [
      { value: '01', label: 'Janvier' },
      { value: '02', label: 'Février' },
      { value: '03', label: 'Mars' },
      { value: '04', label: 'Avril' },
      { value: '05', label: 'Mai' },
      { value: '06', label: 'Juin' },
      { value: '07', label: 'Juillet' },
      { value: '08', label: 'Août' },
      { value: '09', label: 'Septembre' },
      { value: '10', label: 'Octobre' },
      { value: '11', label: 'Novembre' },
      { value: '12', label: 'Décembre' }
    ];

    return (
      <div className="space-y-3">
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
            className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            required
          >
            <option value="">Mois</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          
          <select
            id="year"
            value={selectedDate.split('-')[0] || ''}
            onChange={(e) => {
              const month = selectedDate.split('-')[1] || '';
              setSelectedDate(month ? `${e.target.value}-${month}` : `${e.target.value}-01`);
            }}
            className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            required
          >
            <option value="">Année</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrandSlug && selectedModelSlug && selectedDate) {
      try {
        const selectedBrand = brands.find(b => b.slug === selectedBrandSlug);
        const selectedModel = filteredModels.find(m => m.modelSlug === selectedModelSlug);
        
        if (selectedBrand && selectedModel) {
          const vehicle: Vehicle = {
            id: Math.floor(Math.random() * 1000),
            type: vehicleType,
            brand: selectedBrand.name,
            model: selectedModel.name,
            motorisation: '', // Not needed for this flow
            dateCirculation: selectedDate,
          };
          
          onVehicleSelect(vehicle);
          navigate('/category');
        }
      } catch (err) {
        console.error('Failed to process vehicle selection:', err);
        setError('Échec du traitement de la sélection véhicule. Veuillez réessayer.');
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
      <div className="flex items-center justify-center">
        <div className="text-center w-full max-w-4xl">
          <h1 className="text-5xl text-[#1290AD] mt-16 mb-14">
            Sélectionnez la <span className="font-bold">marque</span>, le <span className="font-bold">modèle</span> et la <span className="font-bold">date</span> de mise en circulation
          </h1>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1290AD]"></div>
            <span className="ml-4 text-lg text-gray-600">Chargement des données...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-5xl text-[#1290AD] mt-16 mb-14">
          Sélectionnez la <span className="font-bold">marque</span>, le <span className="font-bold">modèle</span> et la <span className="font-bold">date</span> de mise en circulation
        </h1>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-row gap-4 justify-around">
            {/* Brand Selection */}
            <div className="space-y-3">
              <label htmlFor="brand" className="block text-xl font-bold text-black text-left pl-2">
                Marque
              </label>
              <select
                id="brand"
                value={selectedBrandSlug}
                onChange={(e) => setSelectedBrandSlug(e.target.value)}
                className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
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
            <div className="space-y-3">
              <label htmlFor="model" className="block text-xl font-bold text-black text-left pl-2">
                Modèle
              </label>
              <select
                id="model"
                value={selectedModelSlug}
                onChange={(e) => setSelectedModelSlug(e.target.value)}
                className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
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
                {filteredModels.map((model) => (
                  <option key={model.id} value={model.modelSlug}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Selection */}
          <div className="flex justify-center">
            <DateInput />
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