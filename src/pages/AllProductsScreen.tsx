import React, { useState, useEffect } from 'react';
import AllProductsVehicleForm from '../components/AllProductsVehicleForm';
import AllProductsByCategory from '../components/AllProductsByCategory';
import vehicleProductsService, { type VehicleProductsResponse } from '../services/vehicleProductsService';

const AllProductsScreen: React.FC = () => {
  const [vehicleParams, setVehicleParams] = useState<{
    brandSlug: string;
    modelSlug: string;
    vehicleModel?: string;
    motorisation?: string;
  } | null>(null);
  const [productsData, setProductsData] = useState<VehicleProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!vehicleParams) {
        setProductsData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await vehicleProductsService.getAllProductsByVehicle(vehicleParams);
        setProductsData(data);
        console.log('Products loaded:', data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des produits');
        setProductsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [vehicleParams]);

  const handleVehicleSelect = (params: {
    brandSlug: string;
    modelSlug: string;
    vehicleModel?: string;
    motorisation?: string;
  }) => {
    setVehicleParams(params);
    setIsFormVisible(false);
    // Scroll to products section
    setTimeout(() => {
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Form Section */}
      <div className="bg-white pb-8">
        {isFormVisible ? (
          <AllProductsVehicleForm onVehicleSelect={handleVehicleSelect} />
        ) : (
          <div className="flex flex-col items-center gap-4 py-12">
            <p className="text-lg text-gray-700">
              Vous pouvez modifier votre sélection de véhicule si besoin.
            </p>
            <button
              type="button"
              onClick={() => setIsFormVisible(true)}
              className="py-4 px-8 rounded-lg text-lg font-semibold bg-white text-[#1290AD] border-2 border-[#1290AD] shadow-md active:opacity-80"
            >
              Modifier la sélection du véhicule
            </button>
          </div>
        )}
      </div>

      {/* Products Section */}
      <div id="products-section" className="py-12">
        <AllProductsByCategory 
          data={productsData} 
          loading={loading} 
          error={error}
        />
      </div>
    </div>
  );
};

export default AllProductsScreen;

