import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { VehicleType, ProductCategory, Vehicle } from '../types';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { checkProductAvailability } from '../utils/productAvailability';
import { FLOW_CONFIG } from '../config/flowConfig';

interface VehiclePageProps {
  vehicleType: VehicleType;
  category: ProductCategory;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

// Mock data for brands, models, and versions
const MOCK_BRANDS = [
  { id: 1, name: 'Renault', models: [
    { id: 1, name: 'Clio', versions: ['1.0 TCE', '1.5 dCI', '1.6 16V'] },
    { id: 2, name: 'Megane', versions: ['1.2 TCE', '1.5 dCI', '1.6 16V'] },
    { id: 3, name: 'Captur', versions: ['1.2 TCE', '1.5 dCI', '1.3 TCE'] }
  ]},
  { id: 2, name: 'Peugeot', models: [
    { id: 4, name: '208', versions: ['1.2 PureTech', '1.5 BlueHDi', '1.6 VTi'] },
    { id: 5, name: '308', versions: ['1.2 PureTech', '1.5 BlueHDi', '1.6 THP'] },
    { id: 6, name: '3008', versions: ['1.2 PureTech', '1.5 BlueHDi', '1.6 THP'] }
  ]},
  { id: 3, name: 'BMW', models: [
    { id: 7, name: 'Série 1', versions: ['116i', '118i', '120i', '116d', '118d'] },
    { id: 8, name: 'Série 3', versions: ['316i', '318i', '320i', '316d', '318d', '320d'] },
    { id: 9, name: 'X1', versions: ['18i', '20i', '18d', '20d', '25d'] }
  ]},
  { id: 4, name: 'Audi', models: [
    { id: 10, name: 'A3', versions: ['1.0 TFSI', '1.5 TFSI', '2.0 TDI'] },
    { id: 11, name: 'A4', versions: ['1.4 TFSI', '2.0 TFSI', '2.0 TDI'] },
    { id: 12, name: 'Q3', versions: ['1.4 TFSI', '1.5 TFSI', '2.0 TDI'] }
  ]}
];

const VehiclePage = ({ vehicleType, category, onVehicleSelect }: VehiclePageProps) => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedMotorisation, setSelectedMotorisation] = useState<string>('');
  const [dateCirculation, setDateCirculation] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<Array<{id: number, name: string, versions: string[]}>>([]);
  const [availableVersions, setAvailableVersions] = useState<string[]>([]);

  // Filter models when brand changes
  useEffect(() => {
    if (selectedBrand) {
      const brand = MOCK_BRANDS.find(b => b.name === selectedBrand);
      if (brand) {
        setAvailableModels(brand.models);
        setSelectedModel('');
        setSelectedMotorisation('');
        setDateCirculation('');
        setAvailableVersions([]);
      }
    } else {
      setAvailableModels([]);
      setSelectedModel('');
      setSelectedMotorisation('');
      setDateCirculation('');
      setAvailableVersions([]);
    }
  }, [selectedBrand]);

  // Filter versions when model changes
  useEffect(() => {
    if (selectedModel && availableModels.length > 0) {
      const model = availableModels.find(m => m.name === selectedModel);
      if (model) {
        setAvailableVersions(model.versions);
        setSelectedMotorisation('');
        setDateCirculation('');
      }
    } else {
      setAvailableVersions([]);
      setSelectedMotorisation('');
      setDateCirculation('');
    }
  }, [selectedModel, availableModels]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  const handleVersionChange = (motorisation: string) => {
    setSelectedMotorisation(motorisation);
  };
  const handleDateCirculationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateCirculation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrand && selectedModel && selectedMotorisation && dateCirculation) {
      const vehicle: Vehicle = {
        id: Math.floor(Math.random() * 1000), // Mock ID
        type: vehicleType,
        brand: selectedBrand,
        model: selectedModel,
        version: selectedMotorisation,
        year: new Date(dateCirculation).getFullYear(),
        dateCirculation,
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
  };

  const submitAnimation = useClickAnimation({
    onComplete: () => {
      // Only animate, do not trigger navigation or onVehicleSelect here
    }
  });

  const isFormValid = selectedBrand && selectedModel && selectedMotorisation && dateCirculation;

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-5xl text-[#1290AD] mt-10 mb-14">Sélectionnez la <span className="font-bold">marque</span>, le <span className="font-bold">modèle</span>, la <span className="font-bold">version</span> et la <span className="font-bold">date</span> de 1ère mise en circulation de votre véhicule</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-row gap-4 space-y-8 justify-around'>
            <div className="space-y-3">
              <label htmlFor="brand" className="block text-xl font-bold text-gray-700 text-left pl-2">
                Marque
              </label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                required
              >
                <option value="">Sélectionnez une marque</option>
                {MOCK_BRANDS.map((brand) => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Selection */}
            <div className="space-y-4">
              <label htmlFor="model" className="block text-xl font-bold text-gray-700 text-left pl-2">
                Modèle
              </label>
              <select
                id="model"
                value={selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                disabled={selectedBrand === '' ? true : false}
                required
              >
                <option value="">
                  {selectedBrand ? 'Sélectionnez un modèle' : 'Sélectionnez d\'abord une marque'}
                </option>
                {availableModels.map((model) => (
                  <option key={model.id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Brand Selection */}
          
          <div className='flex flex-row gap-4 justify-around space-y-8'>
          {/* Motorisation Selection */}
            <div className="space-y-4">
              <label htmlFor="motorisation" className="block text-xl font-bold text-gray-700 text-left pl-2">
                Motorisation
              </label>
              <select
                id="motorisation"
                value={selectedMotorisation}
                onChange={(e) => handleVersionChange(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                required
              >
                <option value="">Sélectionnez une motorisation</option>
                {availableVersions.map((motorisation) => (
                  <option key={motorisation} value={motorisation}>
                    {motorisation}
                  </option>
                ))}
              </select>
            </div>
            {/* Date de 1ère mise en circulation */}
            <div className="space-y-4">
              <label htmlFor="dateCirculation" className="block text-xl font-bold text-gray-700 text-left pl-2">
                Date de 1ère mise en circulation
              </label>
              <input
                id="dateCirculation"
                type="date"
                value={dateCirculation}
                onChange={handleDateCirculationChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
                required
              />
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <motion.button
              type="submit"
              disabled={!isFormValid}
              onClick={submitAnimation.handleClick}
              className={`py-4 px-8 rounded-lg text-lg font-semibold transition-all ${
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