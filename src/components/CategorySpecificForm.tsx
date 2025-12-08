import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ProductCategory, Vehicle } from '../types';
import { useSimpleVehicleContext } from '../contexts/SimpleVehicleContext';
import { useBatteryData } from '../hooks/useBatteryData';
import HelpModal from './HelpModal';

interface CategorySpecificFormProps {
  onComplete: (vehicleData: any) => void;
  category?: ProductCategory;
  vehicle?: Vehicle;
}

const CategorySpecificForm: React.FC<CategorySpecificFormProps> = ({ onComplete, category, vehicle }) => {
  const navigate = useNavigate();
  const { vehicleData, updateVehicleData } = useSimpleVehicleContext();
  const { motorisations, loadingMotorisations, fetchBatteryProductsBySlugs } = useBatteryData();
  
  const [categoryData] = useState<any>({});
  const [selectedMotorisation, setSelectedMotorisation] = useState<string>('');
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Fetch motorisations when component mounts or vehicle changes
  useEffect(() => {
    if (category?.slug === 'batteries' && vehicle?.brandSlug && vehicle?.modelSlug) {
      console.log(`🔋 Fetching battery products for battery category: ${vehicle.brandSlug} - ${vehicle.modelSlug}`);
      fetchBatteryProductsBySlugs(vehicle.brandSlug, vehicle.modelSlug);
    } else if (category?.slug === 'oil' && vehicle?.brandSlug && vehicle?.modelSlug) {
      console.log(`🛢️ Fetching motorisations for oil category: ${vehicle.brandSlug} - ${vehicle.modelSlug}`);
      fetchBatteryProductsBySlugs(vehicle.brandSlug, vehicle.modelSlug);
    }
  }, [category?.slug, vehicle?.brandSlug, vehicle?.modelSlug, fetchBatteryProductsBySlugs]);

  // Handle motorisation selection
  const handleMotorisationChange = (motorisation: string) => {
    setSelectedMotorisation(motorisation);
    updateVehicleData({ motorisation });
  };

  // Handle viewing battery products
  const handleViewBatteryProducts = () => {
    if (category?.slug === 'batteries' && selectedMotorisation) {
      console.log(`🔋 Viewing battery products for motorisation: ${selectedMotorisation}`);
      // Create final vehicle data with motorisation, preserving all vehicle data
      const finalVehicleData = {
        ...vehicleData,
        motorisation: selectedMotorisation,
        selectedCategory: category,
        // Ensure vehicle data from UserSelection is preserved
        brand: vehicle?.brand || vehicleData.brand,
        model: vehicle?.model || vehicleData.model,
        dateCirculation: vehicle?.dateCirculation || vehicleData.dateCirculation,
        brandSlug: vehicle?.brandSlug,
        modelSlug: vehicle?.modelSlug,
        year: vehicle?.year
      };
      onComplete(finalVehicleData);
      navigate('/products');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create final vehicle object with category-specific data
    const finalVehicleData = {
      ...vehicleData,
      ...categoryData,
      selectedCategory: category,
      // Include motorisation for oil and battery categories
      motorisation: (category?.slug === 'oil' || category?.slug === 'batteries') ? selectedMotorisation : vehicleData.motorisation,
      // Ensure vehicle data from UserSelection is preserved
      brand: vehicle?.brand || vehicleData.brand,
      model: vehicle?.model || vehicleData.model,
      dateCirculation: vehicle?.dateCirculation || vehicleData.dateCirculation,
      brandSlug: vehicle?.brandSlug,
      modelSlug: vehicle?.modelSlug,
      year: vehicle?.year
    };
    
    onComplete(finalVehicleData);
    navigate('/products');
  };

  const renderCategoryForm = () => {
    if (!category) {
      return <div>No category selected</div>;
    }

    switch (category.slug) {
      case 'batteries':
        return <BatteryForm />;
      case 'lights':
        return <LightsForm />;
      case 'oil':
        return <OilForm />;
      default:
        return <GenericForm />;
    }
  };

  const BatteryForm = () => (
    <div className="flex flex-col gap-8">
      <h2 className="text-5xl text-[#FD171E] text-center mt-16 mb-10">
        Configuration complémentaire
      </h2>
      
      <h3 className="font-semibold text-2xl mb-2">Véhicule sélectionné :</h3>
      <div className="bg-blue-50 p-4 rounded-lg bg-motorisation">
        <p className="text-[#1590AD] font-semibold py-4 text-xl">
          {vehicle?.brand} {vehicle?.model} ({vehicle?.dateCirculation})
        </p>
      </div>

      <div className="space-y-4">
        <label htmlFor="motorisation" className="block text-2xl font-bold text-gray-800">
          Motorisation
        </label>
        {loadingMotorisations ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Chargement des motorisations...</span>
          </div>
        ) : (
          <select
            id="motorisation"
            value={selectedMotorisation}
            onChange={(e) => handleMotorisationChange(e.target.value)}
            className="form-select w-full bg-white py-7 pl-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
            required
          >
            <option value="">Sélectionnez une motorisation</option>
            {motorisations.map((motor, index) => (
              <option key={`${motor.id}-${index}`} value={motor.motorisation}>
                {motor.motorisation} ({motor.fuel}) - {motor.startDate ? new Date(motor.startDate).getFullYear() : 'N/A'} à {motor.endDate ? new Date(motor.endDate).getFullYear() : 'Présent'}
              </option>
            ))}
          </select>
        )}
        
        {motorisations.length === 0 && !loadingMotorisations && (
          <div className="text-center text-gray-500 p-4">
            <p>Aucune motorisation trouvée pour ce véhicule.</p>
            <p className="text-sm mt-1">Vérifiez que le véhicule est correctement sélectionné.</p>
          </div>
        )}
      </div>

    </div>
  );

  const LightsForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Configuration Éclairage
      </h2>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Véhicule sélectionné :</h3>
        <p className="text-blue-700">
          {vehicle?.brand} {vehicle?.model} ({vehicle?.dateCirculation})
        </p>
      </div>

      <div className="space-y-4">
        <label htmlFor="position" className="block text-xl font-bold text-gray-800">
          Position
        </label>
        <select
          id="position"
          value={vehicle?.position || ''}
          onChange={(e) => updateVehicleData({ position: e.target.value })}
          className="form-select w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          required
        >
          <option value="">Sélectionnez une position</option>
          <option value="feu_croisement">Feu de croisement</option>
          <option value="feu_route">Feu de route</option>
          <option value="feu_arriere">Feu arrière</option>
          <option value="feu_stop">Feu stop</option>
        </select>
      </div>
    </div>
  );

  const OilForm = () => (
    <div className="flex flex-col gap-8">
      <h2 className="text-5xl text-[#F3B11F] text-center mt-16 mb-10">
        Configuration complémentaire
      </h2>
      
      <h3 className="font-semibold text-2xl mb-2">Véhicule sélectionné :</h3>
      <div className="bg-blue-50 p-4 rounded-lg bg-motorisation">
        <p className="text-[#1590AD] font-semibold py-4 text-xl">
          {vehicle?.brand} {vehicle?.model} ({vehicle?.dateCirculation})
        </p>
      </div>

      <div className="space-y-4">
        <label htmlFor="motorisation" className="block text-2xl font-bold text-gray-800">
          Motorisation
        </label>
        {loadingMotorisations ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Chargement des motorisations...</span>
          </div>
        ) : (
          <select
            id="motorisation"
            value={selectedMotorisation}
            onChange={(e) => handleMotorisationChange(e.target.value)}
            className="form-select w-full bg-white py-7 pl-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
            required
          >
            <option value="">Sélectionnez une motorisation</option>
            {motorisations.map((motor, index) => (
              <option key={`${motor.id}-${index}`} value={motor.motorisation}>
                {motor.motorisation} ({motor.fuel}) - {motor.startDate ? new Date(motor.startDate).getFullYear() : 'N/A'} à {motor.endDate ? new Date(motor.endDate).getFullYear() : 'Présent'}
              </option>
            ))}
          </select>
        )}
        
        {motorisations.length === 0 && !loadingMotorisations && (
          <div className="text-center text-gray-500 p-4">
            <p>Aucune motorisation trouvée pour ce véhicule.</p>
            <p className="text-sm mt-1">Vérifiez que le véhicule est correctement sélectionné.</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label htmlFor="viscosity" className="block text-2xl font-bold text-gray-800">
          Viscosité
        </label>
        <select
          id="viscosity"
          value={vehicleData?.viscosity || vehicle?.viscosity || ''}
          onChange={(e) => updateVehicleData({ viscosity: e.target.value })}
          className="form-select w-full bg-white py-7 pl-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
          required
        >
          <option value="">Sélectionnez une viscosité</option>
          <option value="5W-30">5W-30</option>
          <option value="5W-40">5W-40</option>
          <option value="10W-40">10W-40</option>
          <option value="15W-40">15W-40</option>
        </select>
      </div>
    </div>
  );

  const GenericForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Configuration complémentaire
      </h2>
      
      <div className="bg-motorisation p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Véhicule sélectionné :</h3>
        <p className="text-blue-700">
          {vehicle?.brand} {vehicle?.model} ({vehicle?.dateCirculation})
        </p>
      </div>

      <div className="text-center text-gray-600">
        <p>Configuration spécifique pour {category?.name}</p>
        <p className="text-sm mt-2">Cette catégorie n'a pas encore de configuration spécialisée.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderCategoryForm()}
          
          <div className="flex gap-8">
            <button
              type="button"
              onClick={() => navigate('/category')}
              className="flex-1 py-3 px-6 rounded-xl font-bold text-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
            >
              Retour aux catégories
            </button>
            
            {/* Show submit button for all categories */}
            <button
              type="submit"
              className="flex-1 py-4 rounded-xl font-bold text-lg bg-[#FD171E] text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Voir la sélection de {category?.name.toLowerCase()}
            </button>
          </div>
        </form>
        
        {/* Help Button */}
        <div className="flex w-full justify-center flex-col items-center mt-12">
          <div className='relative w-8 h-8 bg-stone-200 rotate-45 top-[15px]'></div>
          <div className="bg-stone-200 size-fit p-4 rounded-2xl">
            <p className='text-center mb-2'>Besoin d'aide ?</p>
            <button 
              onClick={() => setShowHelpModal(true)}
              className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer'
            >
              Cliquez ici
            </button>
          </div> 
        </div>
      </div>
      
      {/* Help Modal */}
      <HelpModal 
        isOpen={showHelpModal} 
        onClose={() => setShowHelpModal(false)} 
      />
    </div>
  );
};

export default CategorySpecificForm;