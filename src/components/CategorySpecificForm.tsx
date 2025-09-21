import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductCategory } from '../types';
import { useSimpleVehicleContext } from '../contexts/SimpleVehicleContext';

interface CategorySpecificFormProps {
  onComplete: (vehicleData: any) => void;
}

const CategorySpecificForm: React.FC<CategorySpecificFormProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const { vehicleData, updateVehicleData } = useSimpleVehicleContext();
  
  const [categoryData, setCategoryData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create final vehicle object with category-specific data
    const finalVehicleData = {
      ...vehicleData,
      ...categoryData
    };
    
    onComplete(finalVehicleData);
  };

  const renderCategoryForm = () => {
    if (!vehicleData.selectedCategory) {
      return <div>No category selected</div>;
    }

    switch (vehicleData.selectedCategory.slug) {
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Configuration Batterie
      </h2>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Véhicule sélectionné :</h3>
        <p className="text-blue-700">
          {vehicleData.brand} {vehicleData.model} ({vehicleData.dateCirculation})
        </p>
      </div>

      <div className="space-y-4">
        <label htmlFor="motorisation" className="block text-xl font-bold text-gray-800">
          Motorisation
        </label>
        <select
          id="motorisation"
          value={vehicleData.motorisation || ''}
          onChange={(e) => updateVehicleData({ motorisation: e.target.value })}
          className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          required
        >
          <option value="">Sélectionnez une motorisation</option>
          <option value="1.6 TDI">1.6 TDI</option>
          <option value="2.0 TDI">2.0 TDI</option>
          <option value="1.4 TSI">1.4 TSI</option>
          <option value="2.0 TSI">2.0 TSI</option>
        </select>
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
          {vehicleData.brand} {vehicleData.model} ({vehicleData.dateCirculation})
        </p>
      </div>

      <div className="space-y-4">
        <label htmlFor="position" className="block text-xl font-bold text-gray-800">
          Position
        </label>
        <select
          id="position"
          value={vehicleData.position || ''}
          onChange={(e) => updateVehicleData({ position: e.target.value })}
          className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Configuration Huile
      </h2>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Véhicule sélectionné :</h3>
        <p className="text-blue-700">
          {vehicleData.brand} {vehicleData.model} ({vehicleData.dateCirculation})
        </p>
      </div>

      <div className="space-y-4">
        <label htmlFor="viscosity" className="block text-xl font-bold text-gray-800">
          Viscosité
        </label>
        <select
          id="viscosity"
          value={vehicleData.viscosity || ''}
          onChange={(e) => updateVehicleData({ viscosity: e.target.value })}
          className="w-full bg-white p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
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
        Configuration {vehicleData.selectedCategory?.name}
      </h2>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Véhicule sélectionné :</h3>
        <p className="text-blue-700">
          {vehicleData.brand} {vehicleData.model} ({vehicleData.dateCirculation})
        </p>
      </div>

      <div className="text-center text-gray-600">
        <p>Configuration spécifique pour {vehicleData.selectedCategory?.name}</p>
        <p className="text-sm mt-2">Cette catégorie n'a pas encore de configuration spécialisée.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderCategoryForm()}
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/category')}
              className="flex-1 py-3 px-6 rounded-xl font-bold text-lg bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200"
            >
              Retour aux catégories
            </button>
            
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Voir les produits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategorySpecificForm;