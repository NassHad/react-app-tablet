import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { VehicleType, ProductCategory, Vehicle } from '../types';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { checkProductAvailability } from '../utils/productAvailability';
import { FLOW_CONFIG } from '../config/flowConfig';
import { getVehicleTypeDisplayName } from '../utils';
import { databaseService } from '../db/database';
import { shouldUseLocalDatabase } from '../config/dataSource';
import { useMockData } from '../hooks/useMockData';

interface BatteryVehicleFormProps {
  vehicleType: VehicleType;
  category: ProductCategory;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

interface Brand {
  slug: string;
  name: string;
}

interface Model {
  name: string;
  brandSlug: string;
  startDate: string | null;
  endDate: string | null;
  motorisation: string;
  fuel: string | null;
}

const BatteryVehicleForm = ({ vehicleType, category, onVehicleSelect }: BatteryVehicleFormProps) => {
  const navigate = useNavigate();
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedMotorisation, setSelectedMotorisation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data hook
  const { isMockMode, getMockBrands, getMockModelsByBrand } = useMockData();

  // Load brands from database
  useEffect(() => {
    const loadBrands = async () => {
      try {
        if (isMockMode) {
          console.log('🎭 Loading mock brands...');
          const mockBrands = getMockBrands();
          const formattedBrands: Brand[] = mockBrands.map(brand => ({
            slug: brand.slug,
            name: brand.name
          }));
          setBrands(formattedBrands);
        } else if (shouldUseLocalDatabase()) {
          console.log('🗄️ Loading brands from local database...');
          const db = await databaseService.getDb();
          if (db) {
            const result = await db.query('SELECT * FROM brands ORDER BY name');
            const dbBrands = result.values || [];
            console.log(`✅ Loaded ${dbBrands.length} brands from database`);
            
            const formattedBrands: Brand[] = dbBrands.map((brand: any) => ({
              slug: brand.slug,
              name: brand.name
            }));
            setBrands(formattedBrands);
          }
        } else {
          // Fallback to static data for web development
          console.log('🌐 Using static brands data for web development');
          const staticBrands: Brand[] = [
            { slug: 'peugeot', name: 'Peugeot' },
            { slug: 'renault', name: 'Renault' },
            { slug: 'citroen', name: 'Citroën' },
            { slug: 'volkswagen', name: 'Volkswagen' },
            { slug: 'ford', name: 'Ford' }
          ];
          setBrands(staticBrands);
        }
      } catch (error) {
        console.error('❌ Error loading brands:', error);
        // Fallback brands
        setBrands([
          { slug: 'peugeot', name: 'Peugeot' },
          { slug: 'renault', name: 'Renault' },
          { slug: 'citroen', name: 'Citroën' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, [isMockMode, getMockBrands]);

  // Load models when brand is selected
  useEffect(() => {
    const loadModels = async () => {
      if (!selectedBrandSlug) {
        setAvailableModels([]);
        return;
      }

      try {
        if (isMockMode) {
          console.log(`🎭 Loading mock models for brand: ${selectedBrandSlug}`);
          const mockModels = getMockModelsByBrand(selectedBrandSlug);
          const formattedModels: Model[] = mockModels.map(model => ({
            name: model.name,
            brandSlug: model.brand_slug,
            slug: model.slug,
            startDate: '2018',
            endDate: '2021',
            motorisation: '1.4 TDI',
            fuel: 'Diesel'
          }));
          setAvailableModels(formattedModels);
        } else if (shouldUseLocalDatabase()) {
          console.log(`🗄️ Loading models for brand: ${selectedBrandSlug}`);
          const db = await databaseService.getDb();
          if (db) {
            const result = await db.query('SELECT * FROM models WHERE brand_slug = ? ORDER BY name', [selectedBrandSlug]);
            const dbModels = result.values || [];
            console.log(`✅ Loaded ${dbModels.length} models for brand ${selectedBrandSlug}`);
            
            const formattedModels: Model[] = dbModels.map((model: any) => ({
              name: model.name,
              brandSlug: model.brand_slug,
              startDate: model.start_date,
              endDate: model.end_date,
              motorisation: model.motorisation || 'Standard',
              fuel: model.fuel
            }));
            setAvailableModels(formattedModels);
          }
        } else {
          // Fallback to static data for web development
          console.log('🌐 Using static models data for web development');
          const staticModels: Model[] = [
            { name: '308', brandSlug: selectedBrandSlug, startDate: '2014', endDate: '2021', motorisation: '1.6 HDi', fuel: 'Diesel' },
            { name: '3008', brandSlug: selectedBrandSlug, startDate: '2016', endDate: null, motorisation: '1.6 PureTech', fuel: 'Essence' }
          ];
          setAvailableModels(staticModels);
        }
      } catch (error) {
        console.error('❌ Error loading models:', error);
        setAvailableModels([]);
      }
    };

    loadModels();
  }, [selectedBrandSlug, isMockMode, getMockModelsByBrand]);

  // Get motorisations from battery_products table
  const [availableMotorisations, setAvailableMotorisations] = useState<string[]>([]);

  // Load motorisations when model is selected
  useEffect(() => {
    const loadMotorisations = async () => {
      if (!selectedModel || !selectedBrandSlug) {
        setAvailableMotorisations([]);
        return;
      }

      try {
        if (shouldUseLocalDatabase()) {
          console.log(`🗄️ Loading motorisations for ${selectedBrandSlug} ${selectedModel.name}`);
          const db = await databaseService.getDb();
          if (db) {
            const result = await db.query(
              'SELECT motorisations FROM battery_products WHERE brand_slug = ? AND model_name = ?', 
              [selectedBrandSlug, selectedModel.name]
            );
            const products = result.values || [];
            console.log(`✅ Found ${products.length} battery products for this model`);
            
            // Extract unique motorisations from all products
            const allMotorisations = new Set<string>();
            products.forEach((product: any) => {
              if (product.motorisations) {
                try {
                  const motorisations = JSON.parse(product.motorisations);
                  if (Array.isArray(motorisations)) {
                    motorisations.forEach((motor: any) => {
                      if (motor.motorisation) {
                        allMotorisations.add(motor.motorisation);
                      }
                    });
                  }
                } catch (error) {
                  console.warn('Error parsing motorisations:', error);
                }
              }
            });
            
            const motorisationsArray = Array.from(allMotorisations).sort();
            console.log(`✅ Found ${motorisationsArray.length} unique motorisations:`, motorisationsArray);
            setAvailableMotorisations(motorisationsArray);
          }
        } else {
          // Fallback for web development
          console.log('🌐 Using static motorisations for web development');
          setAvailableMotorisations(['1.6 HDi', '1.6 PureTech', '2.0 HDi']);
        }
      } catch (error) {
        console.error('❌ Error loading motorisations:', error);
        setAvailableMotorisations([]);
      }
    };

    loadMotorisations();
  }, [selectedModel, selectedBrandSlug]);

  // Get available dates from battery_products table
  const [availableDates, setAvailableDates] = useState<Array<{startDate: string, endDate: string}>>([]);

  // Load dates when motorisation is selected
  useEffect(() => {
    const loadDates = async () => {
      if (!selectedModel || !selectedBrandSlug || !selectedMotorisation) {
        setAvailableDates([]);
        return;
      }

      try {
        if (shouldUseLocalDatabase()) {
          console.log(`🗄️ Loading dates for ${selectedBrandSlug} ${selectedModel.name} ${selectedMotorisation}`);
          const db = await databaseService.getDb();
          if (db) {
            const result = await db.query(
              'SELECT motorisations FROM battery_products WHERE brand_slug = ? AND model_name = ?', 
              [selectedBrandSlug, selectedModel.name]
            );
            const products = result.values || [];
            
            // Extract dates for the selected motorisation
            const allDates = new Set<string>();
            products.forEach((product: any) => {
              if (product.motorisations) {
                try {
                  const motorisations = JSON.parse(product.motorisations);
                  if (Array.isArray(motorisations)) {
                    motorisations.forEach((motor: any) => {
                      if (motor.motorisation === selectedMotorisation) {
                        const dateRange = motor.endDate 
                          ? `${motor.startDate} - ${motor.endDate}`
                          : `${motor.startDate} - présent`;
                        allDates.add(dateRange);
                      }
                    });
                  }
                } catch (error) {
                  console.warn('Error parsing motorisations for dates:', error);
                }
              }
            });
            
            const datesArray = Array.from(allDates).map(dateStr => {
              const [start, end] = dateStr.split(' - ');
              return { startDate: start, endDate: end };
            }).sort((a, b) => a.startDate.localeCompare(b.startDate));
            
            console.log(`✅ Found ${datesArray.length} date ranges:`, datesArray);
            setAvailableDates(datesArray);
          }
        } else {
          // Fallback for web development
          console.log('🌐 Using static dates for web development');
          setAvailableDates([
            { startDate: '2014', endDate: '2021' },
            { startDate: '2016', endDate: 'présent' }
          ]);
        }
      } catch (error) {
        console.error('❌ Error loading dates:', error);
        setAvailableDates([]);
      }
    };

    loadDates();
  }, [selectedModel, selectedBrandSlug, selectedMotorisation]);

  const handleBrandChange = (brandSlug: string) => {
    setSelectedBrandSlug(brandSlug);
    setSelectedModel(null);
    setSelectedMotorisation('');
    setSelectedDate('');
    setAvailableMotorisations([]);
    setAvailableDates([]);
  };

  const handleModelChange = (modelName: string) => {
    const model = availableModels.find(m => m.name === modelName);
    setSelectedModel(model || null);
    setSelectedMotorisation('');
    setSelectedDate('');
    setAvailableMotorisations([]);
    setAvailableDates([]);
  };

  const handleMotorisationChange = (motorisation: string) => {
    setSelectedMotorisation(motorisation);
    setSelectedDate('');
    setAvailableDates([]);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrandSlug && selectedModel && selectedMotorisation && selectedDate) {
      const brand = brands.find(b => b.slug === selectedBrandSlug);
      
      if (brand) {
        const vehicle: Vehicle = {
          id: Math.floor(Math.random() * 1000), // Mock ID
          type: vehicleType,
          brand: brand.name,
          model: selectedModel.name,
          motorisation: selectedMotorisation,
          dateCirculation: selectedDate,
        };
        
        onVehicleSelect(vehicle);
        
        // Navigate based on flow configuration
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
            // For batteries, go directly to products
            navigate('/products');
          }
        }
      }
    }
  };

  const submitAnimation = useClickAnimation({
    onComplete: () => {
      // Animation handled by form submission
    }
  });

  const isFormValid = selectedBrandSlug && selectedModel && selectedMotorisation && selectedDate;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-5xl text-[#1290AD] mt-16 mb-14">
          Sélectionnez la <span className="font-bold">marque</span>, le <span className="font-bold">modèle</span>, la <span className="font-bold">motorisation</span> et la <span className="font-bold">date</span> de mise en circulation de votre {getVehicleTypeDisplayName(vehicleType)}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Brand Selection */}
          <div className="space-y-3">
            <label htmlFor="brand" className="block text-xl font-bold text-black text-left pl-2">
              Marque
            </label>
            <select
              id="brand"
              value={selectedBrandSlug}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
              required
            >
              <option value="">Sélectionnez une marque</option>
              {brands.map((brand) => (
                <option key={brand.slug} value={brand.slug}>
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
              value={selectedModel?.name || ''}
              onChange={(e) => handleModelChange(e.target.value)}
              className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
              disabled={!selectedBrandSlug}
              required
            >
              <option value="">
                {selectedBrandSlug ? 'Sélectionnez un modèle' : 'Sélectionnez d\'abord une marque'}
              </option>
              {Array.from(new Set(availableModels.map(model => model.name)))
                .sort()
                .map((modelName) => (
                  <option key={modelName} value={modelName}>
                    {modelName}
                  </option>
                ))}
            </select>
          </div>

          {/* Motorisation Selection */}
          <div className="space-y-3">
            <label htmlFor="motorisation" className="block text-xl font-bold text-black text-left pl-2">
              Motorisation
            </label>
            <select
              id="motorisation"
              value={selectedMotorisation}
              onChange={(e) => handleMotorisationChange(e.target.value)}
              className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
              disabled={!selectedModel}
              required
            >
              <option value="">
                {selectedModel ? 'Sélectionnez une motorisation' : 'Sélectionnez d\'abord un modèle'}
              </option>
              {availableMotorisations.map((motorisation) => (
                <option key={motorisation} value={motorisation}>
                  {motorisation}
                </option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div className="space-y-3">
            <label htmlFor="date" className="block text-xl font-bold text-black text-left pl-2">
              Date de 1ère mise en circulation
            </label>
            <select
              id="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
              disabled={!selectedMotorisation}
              required
            >
              <option value="">
                {selectedMotorisation ? 'Sélectionnez une période' : 'Sélectionnez d\'abord une motorisation'}
              </option>
              {availableDates.map((dateInfo, index) => {
                const dateRange = dateInfo.endDate 
                  ? `${dateInfo.startDate} - ${dateInfo.endDate}`
                  : `${dateInfo.startDate} - présent`;
                return (
                  <option key={index} value={dateRange}>
                    {dateRange}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
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

export default BatteryVehicleForm;
