import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { UserSelection } from '../../types';
import { dataService } from '../../services/dataService';

interface OilProductsScreenProps {
  userSelection: UserSelection;
}

const OilProductsScreen = ({ userSelection }: OilProductsScreenProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const oilProducts = await dataService.getProducts('oil');
        setProducts(oilProducts);
      } catch (error) {
        console.error('Error loading oil products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
        <h1 className="text-5xl font-bold text-gray-category mt-12 mb-20 leading-15">Liste des huiles moteur compatibles avec votre véhicule <span className='text-orange-oil-category capitalize-first-letter'>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span></h1>
        
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
                  <div className="w-1/3">
                    <span className="ml-2 text-xl font-bold text-gray-900">{product.brand}</span>
                  </div>
                  
                  <div className="w-1/3">
                    <span className="ml-2 text-xl font-semibold text-gray-900 text-left">{product.type}</span>
                  </div>
                  
                  <div className="w-1/3">
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.quantity}</span>
                  </div>
                  <button
                    onClick={() => handleProductDetails(product.id)}
                    className="bg-orange-oil-category text-white py-1 rounded-lg hover:opacity-80 transition-colors text-lg font-semibold ml-8 w-1/6"
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

export default OilProductsScreen; 