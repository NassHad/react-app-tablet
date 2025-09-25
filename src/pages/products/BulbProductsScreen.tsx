import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import type { UserSelection } from '../../types';
import { useLightsData } from '../../hooks/useLightsData';

interface BulbProductsScreenProps {
  userSelection: UserSelection;
}

const BulbProductsScreen = ({ userSelection }: BulbProductsScreenProps) => {
  const navigate = useNavigate();
  const { products, loadingProducts, fetchProductsBySlugsAndPosition } = useLightsData();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (userSelection.vehicle?.brandSlug && userSelection.vehicle?.modelSlug && userSelection.answers?.positionSlug) {
          // Only fetch if we haven't loaded products yet for this specific combination
          if (!hasLoadedRef.current) {
            hasLoadedRef.current = true;
            await fetchProductsBySlugsAndPosition(
              userSelection.vehicle.brandSlug,
              userSelection.vehicle.modelSlug,
              userSelection.answers.positionSlug as string
            );
          }
        }
      } catch (error) {
        console.error('Error loading bulb products:', error);
      }
    };

    // Reset the ref when the component mounts or when the position changes
    hasLoadedRef.current = false;
    loadProducts();
  }, [userSelection.vehicle?.brandSlug, userSelection.vehicle?.modelSlug, userSelection.answers?.positionSlug]);

  const handleProductDetails = (productId: string | number) => {
    navigate(`/product-details/${productId}`);
  };

  if (loadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Chargement des produits...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-category mt-12 mb-20 leading-15">Liste des ampoules <span className='text-blue-title-bulbs-category capitalize-first-letter'>{userSelection.answers?.lightingType || 'compatibles'}</span> compatibles avec votre <span className='text-blue-title-bulbs-category capitalize-first-letter'>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span></h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
          <div className="">
            {/* Column Headers */}
            <div className="flex flex-row justify-between w-full border-b-2 border-gray-300 items-center py-3 bg-gray-50 rounded-t-lg">
              <div className="w-1/5">
                <span className="ml-2 text-lg font-bold text-gray-700">Type</span>
              </div>
              
              <div className="w-1/5">
                <span className="ml-2 text-lg font-bold text-gray-700">Référence</span>
              </div>

              <div className="w-1/5">
                <span className="ml-2 text-lg font-bold text-gray-700">Année début</span>
              </div>

              <div className="w-1/5">
                <span className="ml-2 text-lg font-bold text-gray-700">Année fin</span>
              </div>
              
              <div className="w-1/5">
                <span className="ml-2 text-lg font-bold text-gray-700">Action</span>
              </div>
            </div>
            
            {products.map((product) => {
              // Find the matching light position ref
              const matchingPosition = product.lightPositions?.find((pos: any) => 
                pos.slug === userSelection.answers?.positionSlug
              );
              const positionRef = matchingPosition?.ref || product.ref || 'N/A';
              
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg flex items-center justify-between"
                >
                  {/* Product Info - All on same row */}
                  <div className="flex flex-row justify-between w-full border-b-1 border-[#E5E5E5] items-center py-4">
                    <div className="w-1/5">
                      <span className="ml-2 text-xl font-semibold text-gray-900">{product.typeConception}</span>
                    </div>
                    
                    <div className="w-1/5">
                      <span className="ml-2 text-xl font-semibold text-gray-900 text-left">{positionRef}</span>
                    </div>

                    <div className="w-1/5">
                      <span className="ml-2 text-xl font-semibold text-gray-900">{product.constructionYearStart}</span>
                    </div>

                    <div className="w-1/5">
                      <span className="ml-2 text-xl font-semibold text-gray-900">{product.constructionYearEnd}</span>
                    </div>
                    
                    <button
                      onClick={() => handleProductDetails(product.id)}
                      className="bg-blue-title-bulbs-category text-white py-2 px-4 rounded-lg hover:opacity-80 transition-colors text-lg font-semibold ml-8 w-1/5"
                    >
                      Plus d'infos
                    </button>
                  </div>

                  {/* Action Button */}
                </div>
              );
            })}
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

export default BulbProductsScreen; 