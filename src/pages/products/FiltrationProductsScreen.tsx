import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import type { UserSelection } from '../../types';
import filtersService, { type FilterType, type FindProductsResponse } from '../../services/filtersService';
import { getImageUrl, getBrandImageUrl } from '../../config/environment';

interface FiltrationProductsScreenProps {
  userSelection: UserSelection;
}

// Extended product type to support image fields (if API provides them)
type FiltrationProductWithImages = FindProductsResponse['data'][0] & {
  img?: {
    id: number;
    name: string;
    url: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        url: string;
        width: number;
        height: number;
      };
      large?: {
        name: string;
        hash: string;
        ext: string;
        url: string;
        width: number;
        height: number;
      };
    };
  };
  brandImg?: {
    id: number;
    name: string;
    url: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
  };
};

// Helper function to get filter type display name
const getFilterTypeDisplayName = (filterType: string): string => {
  const filterTypeMap: Record<string, string> = {
    cabin: 'Habitacle',
    air: 'Air',
    diesel: 'Gazole',
    gazole: 'Gazole',
    oil: 'Huile',
  };
  return filterTypeMap[filterType] || filterType;
};

const FiltrationProductsScreen = ({ userSelection }: FiltrationProductsScreenProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<FindProductsResponse['data']>([]);
  const [refs, setRefs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; alt: string } | null>(null);
  
  const answers = userSelection?.answers as Record<string, string | string[]> | undefined;
  const variant = useMemo(() => (answers?.variant as string) || '', [answers]);
  const uiFilterType = (answers?.filterType as string) || '';
  const apiFilterType: FilterType | null = useMemo(() => {
    if (!uiFilterType) return null;
    if (uiFilterType === 'gazole') return 'diesel';
    return uiFilterType as FilterType;
  }, [uiFilterType]);

  // Function to handle image zoom
  const handleImageZoom = (imageUrl: string, alt: string) => {
    setZoomedImage({ url: imageUrl, alt });
  };

  // Function to close zoom modal
  const closeZoomModal = () => {
    setZoomedImage(null);
  };

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

  console.log('products', products);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Chargement des produits...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="text-center flex flex-col">
        <h1 className="text-5xl font-semibold text-gray-category mt-20 mb-8 leading-15">
          Liste des filtres <span className='text-green-wiper-category capitalize-first-letter'>{uiFilterType ? getFilterTypeDisplayName(uiFilterType) : 'sélectionnés'}</span> pour votre <span className='text-green-wiper-category capitalize-first-letter'>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span>
        </h1>
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Aucun produit trouvé pour ce type de filtre.</p>
              </div>
            ) : (
              products.map((product) => {
                const productWithImages = product as FiltrationProductWithImages;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg flex flex-row justify-center w-full border-b-1 border-[#E5E5E5] items-center overflow-hidden"
                  >
                    {/* Filter Product Info */}
                    {/* 1. Brand Image */}
                    <div className="w-1/4 h-16 ml-4 flex items-center justify-center">
                      {productWithImages?.brandImg?.url ? (
                        <img
                          src={getBrandImageUrl(productWithImages.brandImg.url)}
                          alt={`${product.brand} Logo`}
                          className="w-32 h-16 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                          }}
                        />
                      ) : (
                        <div className="w-32 h-16 flex items-center justify-center text-gray-400 text-xs">
                          {product.brand}
                        </div>
                      )}
                    </div>
                    
                    {/* 2. Reference */}
                    <div className="w-1/4 text-xl text-black flex-1 ml-4">
                      {product.reference}
                    </div>
                    
                    {/* 3. Filter Type */}
                    <div className="w-1/4 h-24 ml-4 text-center leading-24 text-xl text-black">
                      {getFilterTypeDisplayName(product.filterType)}
                    </div>

                    {/* 4. Product Image */}
                    <div className="w-1/4 h-24 ml-4 leading-24 text-center text-xl text-black">
                      {productWithImages?.img?.url ? (
                        <img
                          src={getImageUrl(productWithImages.img.formats?.thumbnail?.url || productWithImages.img.url)}
                          alt={`Image du filtre ${product.reference}`}
                          className="w-24 h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleImageZoom(
                            getImageUrl(productWithImages.img?.formats?.large?.url || productWithImages.img?.url),
                            `Image du filtre ${product.reference}`
                          )}
                          onError={(e) => {
                            e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 text-sm">
                          Aucune image disponible
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 text-gray-500 text-lg leading-2">
          ↑ Faites glisser pour voir plus de produits ↓
        </div>
      </div>
      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeZoomModal}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeZoomModal}
              className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-gray-300 z-10"
            >
              ×
            </button>
            <img
              src={zoomedImage.url}
              alt={zoomedImage.alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltrationProductsScreen; 