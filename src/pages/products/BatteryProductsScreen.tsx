import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { UserSelection } from '../../types';
import { dataService } from '../../services/dataService';

interface BatteryProductsScreenProps {
  userSelection: UserSelection;
}

const BatteryProductsScreen = ({ userSelection }: BatteryProductsScreenProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const batteryProducts = await dataService.getProducts('battery', {
          battery_type: userSelection.answers?.batteryType
        });
        setProducts(batteryProducts);
      } catch (error) {
        console.error('Error loading battery products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [userSelection.answers?.batteryType]);

  const handleProductDetails = (productId: number) => {
    navigate(`/product-details/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Chargement des produits...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-category mt-12 mb-20 leading-15">Liste des batteries <span className={`${userSelection.answers?.batteryType === 'standard' ? 'text-green-battery-category' : userSelection.answers?.batteryType === 'efb' ? 'text-orange-battery-category' : 'text-red-battery-category'} uppercase`}>{userSelection.answers?.batteryType}</span> <br />compatibles avec votre véhicule <br/><span className={`${userSelection.answers?.batteryType === 'standard' ? 'text-green-battery-category' : userSelection.answers?.batteryType === 'efb' ? 'text-orange-battery-category' : 'text-red-battery-category'} capitalize-first-letter`}>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span></h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
          <div className="">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg flex items-center justify-between"
              >
                {/* Product Info - All on same row */}
                <div className="flex flex-row justify-between w-full border-b-1 border-[#E5E5E5] items-center py-1">
                  <div className="w-1/5">
                    <span className="ml-2 text-xl font-bold text-gray-900">{product.brand}</span>
                  </div>
                  
                  <div className="w-1/5">
                    <span className="ml-2 text-xl font-semibold text-gray-900 text-left">{product.type}</span>
                  </div>
                  
                  <div className="w-1/5">
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.power}</span>
                  </div>

                  <div className="w-1/5">
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.tension}</span>
                  </div>
                  <button
                    onClick={() => handleProductDetails(product.id)}
                    className={`text-white py-1 rounded-lg hover:opacity-80 transition-colors text-lg font-semibold ml-8 w-1/5 ${userSelection.answers?.batteryType === 'standard' ? 'bg-green-battery-category' : userSelection.answers?.batteryType === 'efb' ? 'bg-orange-battery-category' : 'bg-red-battery-category'}`}
                  >
                    Plus d'infos
                  </button>
                </div>

                {/* Action Button */}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 text-gray-500 text-lg leading-2">
          ↑ Faites glisser pour voir plus de produits ↓
        </div>
      </div>
    </div>
  );
};

export default BatteryProductsScreen; 