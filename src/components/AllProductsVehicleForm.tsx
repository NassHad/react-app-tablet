import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { 
  vehicleDataService,
  type Brand,
  type Model
} from '../utils/vehicleData';
import { useMockData } from '../hooks/useMockData';
import filtersService from '../services/filtersService';

interface AllProductsVehicleFormProps {
  onVehicleSelect: (params: {
    brandSlug: string;
    modelSlug: string;
    vehicleModel?: string;
    motorisation?: string;
  }) => void;
}

const AllProductsVehicleForm: React.FC<AllProductsVehicleFormProps> = ({ onVehicleSelect }) => {
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('');
  const [selectedModelSlug, setSelectedModelSlug] = useState<string>('');
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>('');
  const [selectedMotorisation, setSelectedMotorisation] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [availableVariants, setAvailableVariants] = useState<Array<{ variant: string; fullName?: string }>>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingModels, setIsLoadingModels] = useState<boolean>(false);
  const [isLoadingVariants, setIsLoadingVariants] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isMockMode, getMockBrands, getMockModelsByBrand } = useMockData();

  // Load initial brands data
  const loadBrands = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (isMockMode) {
        console.log('🎭 Loading mock brands...');
        const mockBrands = getMockBrands();
        const formattedBrands: Brand[] = mockBrands.map(brand => ({
          id: brand.id,
          slug: brand.slug,
          name: brand.name
        }));
        setBrands(formattedBrands);
      } else {
        const brandsData = await vehicleDataService.getBrands();
        setBrands(brandsData);
      }
    } catch (err) {
      console.error('Failed to load brands:', err);
      setError('Échec du chargement des données véhicule. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  }, [isMockMode, getMockBrands]);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  // Load models when brand changes
  const loadModelsForBrand = useCallback(async () => {
    if (selectedBrandSlug) {
      try {
        setIsLoadingModels(true);
        setError(null);
        
        if (isMockMode) {
          console.log(`🎭 Loading mock models for brand: ${selectedBrandSlug}`);
          const mockModels = getMockModelsByBrand(selectedBrandSlug);
          const formattedModels: Model[] = mockModels.map(model => ({
            id: model.id,
            slug: model.slug,
            name: model.name,
            brandSlug: model.brand_slug,
            modelSlug: model.slug,
            startDate: '2018',
            endDate: '2021'
          }));
          setAvailableModels(formattedModels);
        } else {
          const modelsData = await vehicleDataService.getModelsByBrandSlug(selectedBrandSlug);
          setAvailableModels(modelsData);
        }
        setSelectedModelSlug(''); // Reset model selection
        setSelectedVehicleModel(''); // Reset vehicleModel
        setSelectedMotorisation(''); // Reset motorisation
        setAvailableVariants([]); // Reset variants
      } catch (err) {
        console.error('Failed to load models:', err);
        setError('Échec du chargement des modèles. Veuillez réessayer.');
        setAvailableModels([]);
      } finally {
        setIsLoadingModels(false);
      }
    } else {
      setAvailableModels([]);
      setSelectedModelSlug('');
      setSelectedVehicleModel('');
      setSelectedMotorisation('');
      setAvailableVariants([]);
    }
  }, [selectedBrandSlug, isMockMode, getMockModelsByBrand]);

  useEffect(() => {
    loadModelsForBrand();
  }, [loadModelsForBrand]);

  // Load variants when brand and model are selected
  const loadVariants = useCallback(async () => {
    if (selectedBrandSlug && selectedModelSlug) {
      try {
        setIsLoadingVariants(true);
        const selectedBrand = brands.find(b => b.slug === selectedBrandSlug);
        if (selectedBrand) {
          const variants = await filtersService.getVariants(
            selectedBrand.name.toUpperCase(),
            availableModels.find(m => m.modelSlug === selectedModelSlug)?.name || ''
          );
          setAvailableVariants(variants.map(v => ({ variant: v.variant, fullName: v.fullName })));
        }
      } catch (err) {
        console.error('Failed to load variants:', err);
        setAvailableVariants([]);
      } finally {
        setIsLoadingVariants(false);
      }
    } else {
      setAvailableVariants([]);
    }
  }, [selectedBrandSlug, selectedModelSlug, brands, availableModels]);

  useEffect(() => {
    loadVariants();
  }, [loadVariants]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrandSlug && selectedModelSlug) {
      onVehicleSelect({
        brandSlug: selectedBrandSlug,
        modelSlug: selectedModelSlug,
        vehicleModel: selectedVehicleModel || undefined,
        motorisation: selectedMotorisation || undefined,
      });
    }
  };

  const submitAnimation = useClickAnimation({
    onComplete: () => {
      // Animation handled
    }
  });

  const isFormValid = selectedBrandSlug && selectedModelSlug;

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
    <div className="flex justify-center">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-3xl text-[#1290AD] mt-16 mb-14">
          Sélectionnez la <span className="font-bold">marque</span> et le <span className="font-bold">modèle</span> de votre véhicule
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className='flex flex-row gap-4 space-y-8 justify-around'>
            {/* Brand Selection */}
            <div className="space-y-3">
              <label htmlFor="brand" className="block text-base font-bold text-black text-left pl-2">
                Marque *
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
            <div className="space-y-4">
              <label htmlFor="model" className="block text-base font-bold text-black text-left pl-2">
                Modèle *
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
                {availableModels.map((model) => (
                  <option key={model.id} value={model.modelSlug}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Fields */}
          {/* <div className='flex flex-row gap-4 space-y-8 justify-around'> */}
            {/* VehicleModel Selection (Optional) */}
            {/* <div className="space-y-3">
              <label htmlFor="vehicleModel" className="block text-base font-bold text-black text-left pl-2">
                Modèle véhicule (optionnel)
              </label>
              <input
                id="vehicleModel"
                type="text"
                value={selectedVehicleModel}
                onChange={(e) => setSelectedVehicleModel(e.target.value)}
                placeholder="Ex: 308 SW"
                className="form-input w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
              />
              <p className="text-sm text-gray-500 text-left pl-2">
                Utilisé pour la compatibilité des filtres
              </p>
            </div> */}

            {/* Motorisation Selection (Optional) */}
            {/* <div className="space-y-4">
              <label htmlFor="motorisation" className="block text-base font-bold text-black text-left pl-2">
                Motorisation (optionnel)
              </label>
              <select
                id="motorisation"
                value={selectedMotorisation}
                onChange={(e) => setSelectedMotorisation(e.target.value)}
                className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                disabled={!selectedBrandSlug || !selectedModelSlug || isLoadingVariants}
              >
                <option value="">
                  {isLoadingVariants 
                    ? 'Chargement des motorisations...' 
                    : selectedBrandSlug && selectedModelSlug
                      ? 'Sélectionnez une motorisation (optionnel)' 
                      : 'Sélectionnez d\'abord marque et modèle'
                  }
                </option>
                {availableVariants.map((variant, index) => (
                  <option key={index} value={variant.variant}>
                    {variant.fullName || variant.variant}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
          
          {/* Submit Button */}
          <div>
            <motion.button
              type="submit"
              disabled={!isFormValid}
              onClick={submitAnimation.handleClick}
              className={`py-4 px-8 rounded-lg text-lg font-semibold transition-all mt-10 ${
                isFormValid
                  ? 'bg-[#1290AD] text-white active:opacity-80 shadow-lg active:shadow-xl cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              {...submitAnimation.animationProps}
            >
              Afficher tous les produits
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllProductsVehicleForm;

