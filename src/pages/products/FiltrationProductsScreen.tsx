import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import type { UserSelection } from '../../types';
import filtersService, { type FilterType, type FindProductsResponse } from '../../services/filtersService';

interface FiltrationProductsScreenProps {
  userSelection: UserSelection;
}

const FiltrationProductsScreen = ({ userSelection }: FiltrationProductsScreenProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<FindProductsResponse['data']>([]);
  const [refs, setRefs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const answers = userSelection?.answers as Record<string, string | string[]> | undefined;
  const variant = useMemo(() => (answers?.variant as string) || '', [answers]);
  const uiFilterType = (answers?.filterType as string) || '';
  const apiFilterType: FilterType | null = useMemo(() => {
    if (!uiFilterType) return null;
    if (uiFilterType === 'gazole') return 'diesel';
    return uiFilterType as FilterType;
  }, [uiFilterType]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (!apiFilterType) {
          setProducts([]);
          return;
        }
        // 1) Fetch refs from FilterCompatibility
        const fetchedRefs = await filtersService.getRefs({
          brand: userSelection?.vehicle?.brand?.toUpperCase() || '',
          model: userSelection?.vehicle?.model || '',
          variant: variant || undefined,
          filterType: apiFilterType,
        });
        setRefs(fetchedRefs);

        // 2) Resolve refs to products through backend convenience endpoint
        const res = await filtersService.findProducts({
          brand: userSelection?.vehicle?.brand?.toUpperCase() || '',
          model: userSelection?.vehicle?.model || '',
          variant: variant || undefined,
          filterType: apiFilterType,
        });
        if (!res?.meta?.found) {
          console.info(res?.meta?.availability?.message ?? 'No product available for this vehicle');
          setProducts([]);
        } else {
          setProducts(res.data || []);
        }
      } catch (error) {
        console.error('Error loading filtration products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [apiFilterType, userSelection?.vehicle?.brand, userSelection?.vehicle?.model, variant]);

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
        <h1 className="text-5xl font-bold text-gray-category mt-12 mb-20 leading-15">Liste des filtres compatibles avec votre véhicule <span className='text-green-filtration-category capitalize-first-letter'>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span></h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
          <div className="">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Aucun produit trouvé pour ce véhicule.</p>
              </div>
            ) : products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg flex items-center justify-between"
              >
                {/* Product Info - All on same row */}
                <div className="flex flex-row justify-between w-full border-b-1 border-[#E5E5E5] items-center py-1">
                  <div className="w-1/4">
                    <span className="ml-2 text-xl font-bold text-gray-900">{product.brand}</span>
                  </div>
                  
                  <div className="w-1/4">
                    <span className="ml-2 text-xl font-semibold text-gray-900 text-left">{product.fullName}</span>
                  </div>
                  
                  <div className="w-1/4">
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.reference}</span>
                  </div>
                  <button
                    onClick={() => handleProductDetails(product.id)}
                    className="bg-green-filtration-category text-white py-1 rounded-lg hover:opacity-80 transition-colors text-lg font-semibold ml-8 w-1/4"
                  >
                    Plus d'infos
                  </button>
                </div>

                {/* Action Button */}
              </div>
            ))}
            {/* Optional: show refs used */}
            {refs.length > 0 && (
              <div className="mt-6 text-sm text-gray-500">
                Références utilisées: {refs.join(', ')}
              </div>
            )}
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

export default FiltrationProductsScreen; 