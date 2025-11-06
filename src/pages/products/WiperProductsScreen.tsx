import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import type { UserSelection } from '../../types';
import { useWipersData } from '../../hooks/useWipersData';
import type { WipersProduct } from '../../types/wipers';

interface WiperProductsScreenProps {
  userSelection: UserSelection;
}

interface WiperData {
  id: number;
  ref: string;
  brand: string;
  description: string;
  category: string;
  gtiCode: string;
  genCode: string;
  isActive: boolean;
  size: string;
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
      small?: { 
        name: string;
        hash: string;
        ext: string;
        url: string;
        width: number;
        height: number;
      };
      medium?: { 
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
    formats?: {
      thumbnail?: { 
        name: string;
        hash: string;
        ext: string;
        url: string;
        width: number;
        height: number;
      };
      small?: { 
        name: string;
        hash: string;
        ext: string;
        url: string;
        width: number;
        height: number;
      };
      medium?: { 
        name: string;
        hash: string;
        ext: string;
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

const WiperProductsScreen = ({ userSelection }: WiperProductsScreenProps) => {
  const navigate = useNavigate();
  const [zoomedImage, setZoomedImage] = useState<{ url: string; alt: string } | null>(null);

  // Function to handle image zoom
  const handleImageZoom = (imageUrl: string, alt: string) => {
    setZoomedImage({ url: imageUrl, alt });
  };

  // Function to close zoom modal
  const closeZoomModal = () => {
    setZoomedImage(null);
  };

  // Use the wipers data hook to get the filtered products
  const {
    products,
    loadingProducts,
    fetchProductsBySlugsAndPosition
  } = useWipersData();
  
  // Get the selected position from userSelection answers
  const positionName = userSelection?.answers?.positionName;
  
  // Fetch products when component mounts if we have the required data
  useEffect(() => {
    const fetchProducts = async () => {
      if (userSelection?.answers && userSelection?.vehicle && !products.length) {
        const { brandSlug, modelSlug, position } = userSelection.answers;
        const brandSlugStr = Array.isArray(brandSlug) ? brandSlug[0] : brandSlug;
        const modelSlugStr = Array.isArray(modelSlug) ? modelSlug[0] : modelSlug;
        const positionSlug = Array.isArray(position) ? position[0] : position;
        console.log('🔄 Fetching products in WiperProductsScreen:', { brandSlugStr, modelSlugStr, positionSlug });
        await fetchProductsBySlugsAndPosition(brandSlugStr, modelSlugStr, positionSlug);
      }
    };
    
    fetchProducts();
  }, [userSelection, products.length, fetchProductsBySlugsAndPosition]);


  if (loadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">
          {loadingProducts ? 'Chargement des produits...' : 'Chargement des détails des produits...'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/4">
        <img src="/src/assets/img/categories/wiper/beg_classique.png" alt="Wiper" className="h-auto object-contain m-[-5rem]" />
      </div>
      <div className="text-center w-1/2 flex flex-col">
        <h1 className="text-5xl font-semibold text-gray-category mt-20 mb-8 leading-15">
          Liste des balais, <span className='text-green-wiper-category capitalize-first-letter'>{positionName || 'position sélectionnée'}</span> pour votre <span className='text-green-wiper-category capitalize-first-letter'>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span>
        </h1>
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Aucun produit trouvé pour cette position.</p>
              </div>
            ) : (
              products.map((product: WipersProduct) => {

                return (
                  <>
                    {product.wipersPositions.map((wiperPos: any, index: number) => (
                      // Show the wiper data from the API response
                      <div
                        key={`${product.id}-${index}-${wiperPos.id}`}
                        className="bg-white rounded-lg flex flex-row justify-center w-full border-b-1 border-[#E5E5E5] items-center overflow-hidden"
                      >
                        {/* Wiper Product Info */}
                        {/* 1. Brand Image */}
                        <div className="w-1/4 h-16 ml-4 flex items-center justify-center">
                          {wiperPos?.wiperData?.brandImg?.url ? (
                            console.log('🔍 wiperPos?.wiperData?.img?.url:', wiperPos?.wiperData?.img?.url),
                            <img 
                              src={`http://localhost:1338${wiperPos?.wiperData?.brandImg?.url}`}
                              alt={`${wiperPos?.wiperData?.brand} Logo`}
                              className="w-32 h-16 object-contain"
                              onError={(e) => {
                                e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                              }}
                            />
                          ) : (
                            <div className="w-32 h-16 flex items-center justify-center text-gray-400 text-xs">
                              {wiperPos.brand}
                            </div>
                          )}
                        </div>
                        
                        {/* 2. Description */}
                        <div className="w-1/4 text-xl text-black flex-1 ml-4">
                          {wiperPos.ref || wiperPos.description || 'N/A'}
                        </div>
                        
                        {/* 3. Reference */}
                        <div className="w-1/4 h-24 ml-4 text-center leading-24 text-xl text-black">
                          {wiperPos.wiperData?.size || wiperPos.size || ''}
                        </div>

                        <div className="w-1/4 h-24 ml-4 leading-24 text-center text-xl text-black">
                        {wiperPos?.wiperData?.img?.url ? (
                          
                              <img 
                                src={`http://localhost:1338${wiperPos?.wiperData?.img?.formats?.thumbnail?.url}`}
                                alt={`Image de l'essuie-glace ${wiperPos.ref || wiperPos.description || 'essuie-glace'}`}
                                className="w-24 h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => handleImageZoom(
                                  `http://localhost:1338${wiperPos?.wiperData?.img?.formats?.large?.url}`,
                                  `Image de l'essuie-glace ${wiperPos.ref || wiperPos.description || 'essuie-glace'}`
                                )}
                                onError={(e) => {
                                  e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                }}
                              />
                            ) : (<>
                                Aucune image disponible
                              </>
                            )}
                        </div>
                      </div>
                    ))}
                  </>
                );
              })
            )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 text-gray-500 text-lg leading-2">
          ↑ Faites glisser pour voir plus de produits ↓
        </div>
      </div>
      <div className="w-1/4">
        <img src="/src/assets/img/categories/wiper/beg_plat.png" alt="Wiper" className="h-auto object-contain ml-[-15rem]" />
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

export default WiperProductsScreen; 