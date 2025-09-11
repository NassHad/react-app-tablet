import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { VehicleType, ProductCategory, Vehicle } from '../types';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { checkProductAvailability } from '../utils/productAvailability';
import { FLOW_CONFIG } from '../config/flowConfig';
import { getVehicleTypeDisplayName } from '../utils';

// Import the new models data
import modelsData from '../../scripts/models.json';

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
  
  // Get unique brands from models data
  const brands: Brand[] = Array.from(
    new Set(modelsData.map(model => model.brandSlug))
  ).map(slug => ({
    slug,
    name: slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  })).sort((a, b) => a.name.localeCompare(b.name));

  // Get models for selected brand
  const availableModels = selectedBrandSlug 
    ? modelsData.filter(model => model.brandSlug === selectedBrandSlug)
    : [];

  // Get unique motorisations for selected model
  const availableMotorisations = selectedModel
    ? Array.from(new Set(
        availableModels
          .filter(model => model.name === selectedModel.name)
          .map(model => model.motorisation)
      ))
    : [];

  // Get available dates for selected model and motorisation
  const availableDates = selectedModel && selectedMotorisation
    ? Array.from(new Set(
        availableModels
          .filter(model => 
            model.name === selectedModel.name && 
            model.motorisation === selectedMotorisation
          )
          .map(model => ({
            startDate: model.startDate,
            endDate: model.endDate
          }))
      ))
    : [];

  const handleBrandChange = (brandSlug: string) => {
    setSelectedBrandSlug(brandSlug);
    setSelectedModel(null);
    setSelectedMotorisation('');
    setSelectedDate('');
  };

  const handleModelChange = (modelName: string) => {
    const model = availableModels.find(m => m.name === modelName);
    setSelectedModel(model || null);
    setSelectedMotorisation('');
    setSelectedDate('');
  };

  const handleMotorisationChange = (motorisation: string) => {
    setSelectedMotorisation(motorisation);
    setSelectedDate('');
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
              className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
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
              className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
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
              className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
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
              className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-w-[320px]"
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
