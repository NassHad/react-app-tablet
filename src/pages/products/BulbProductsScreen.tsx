import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { UserSelection } from '../../types';
import { useLightsData } from '../../hooks/useLightsData';

interface BulbProductsScreenProps {
  userSelection: UserSelection;
}

interface LightData {
  id: number;
  ref: string;
  brand: string;
  img?: { 
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  brandImg?: { 
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  isActive: boolean;
  description?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const BulbProductsScreen = ({ userSelection }: BulbProductsScreenProps) => {
  const { products, loadingProducts, fetchProductsBySlugs, fetchProductsBySlugsAndPosition } = useLightsData();
  const hasLoadedRef = useRef(false);
  const lightDataFetchedRef = useRef(false);
  
  // State for light data (now stores arrays of light data per reference)
  const [lightData, setLightData] = useState<Record<string, LightData[]>>({});
  const [loadingLightData, setLoadingLightData] = useState(false);
  
  // State for image zoom modal
  const [zoomedImage, setZoomedImage] = useState<{url: string, alt: string} | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (userSelection.vehicle?.brandSlug && userSelection.vehicle?.modelSlug && userSelection.answers?.positionSlug) {
          // Only fetch if we haven't loaded products yet for this specific combination
          if (!hasLoadedRef.current) {
            hasLoadedRef.current = true;
            console.log(`🔍 Fetching ALL products for ${userSelection.vehicle.brandSlug}/${userSelection.vehicle.modelSlug}`);
            // Fetch ALL products first, then filter by position on frontend
            await fetchProductsBySlugs(
              userSelection.vehicle.brandSlug,
              userSelection.vehicle.modelSlug
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

  // Function to handle image zoom
  const handleImageZoom = (imageUrl: string, alt: string) => {
    setZoomedImage({ url: imageUrl, alt });
  };

  // Function to close zoom modal
  const closeZoomModal = () => {
    setZoomedImage(null);
  };

  // Function to fetch light data for a specific reference (now returns array)
  const fetchLightDataByRef = async (ref: string): Promise<LightData[]> => {
    try {
      const response = await fetch(`http://localhost:1338/api/lights-data/ref/${ref}`);
      if (!response.ok) {
        console.warn(`No light data found for reference: ${ref}`);
        return [];
      }
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error(`Error fetching light data for ${ref}:`, error);
      return [];
    }
  };

  // Function to fetch light data for all light references in products
  const fetchAllLightData = useCallback(async () => {
    if (products.length === 0 || lightDataFetchedRef.current) return;
    
    lightDataFetchedRef.current = true;
    setLoadingLightData(true);
    const lightDataMap: Record<string, LightData[]> = {};
    
    // Collect all unique light references
    const lightRefs = new Set<string>();
    products.forEach(product => {
      console.log(`💡 Processing product: ${product.typeConception}`);
      
      // Extract refs from lightPositions array (API) or light_positions JSON (local DB)
      if (product.lightPositions && Array.isArray(product.lightPositions)) {
        // API format: lightPositions is already an array
        product.lightPositions.forEach((pos: any) => {
          // Match position by slug
          const positionSlug = Array.isArray(userSelection.answers?.positionSlug) 
            ? userSelection.answers.positionSlug[0] 
            : userSelection.answers?.positionSlug;
          const normalizedPositionSlug = positionSlug?.replace(/-/g, '_').replace(/_de_/g, '_');
          const normalizedCategory = pos.category?.replace(/-/g, '_');
          
          if (pos.category === positionSlug || 
              normalizedCategory === normalizedPositionSlug ||
              pos.position?.toLowerCase().includes(positionSlug?.toLowerCase() || '') ||
              positionSlug?.toLowerCase().includes(pos.category?.toLowerCase() || '')) {
            lightRefs.add(pos.ref);
            console.log(`   Adding light ref: ${pos.ref} for position ${pos.position} (${pos.category})`);
          }
        });
      } else if (product.light_positions) {
        // Local DB format: light_positions is a JSON string
        try {
          const positions = JSON.parse(product.light_positions);
          positions.forEach((pos: any) => {
            // Match position by slug
            const positionSlug = Array.isArray(userSelection.answers?.positionSlug) 
              ? userSelection.answers.positionSlug[0] 
              : userSelection.answers?.positionSlug;
            const normalizedPositionSlug = positionSlug?.replace(/-/g, '_').replace(/_de_/g, '_');
            const normalizedCategory = pos.category?.replace(/-/g, '_');
            
            if (pos.category === positionSlug || 
                normalizedCategory === normalizedPositionSlug ||
                pos.position?.toLowerCase().includes(positionSlug?.toLowerCase() || '') ||
                positionSlug?.toLowerCase().includes(pos.category?.toLowerCase() || '')) {
              lightRefs.add(pos.ref);
              console.log(`   Adding light ref: ${pos.ref} for position ${pos.position} (${pos.category})`);
            }
          });
        } catch (error) {
          console.warn('Error parsing light_positions:', error);
        }
      } else if (product.ref && product.ref !== 'Multiple') {
        // Fallback: use product ref if no light_positions JSON
        lightRefs.add(product.ref);
        console.log(`   Adding product ref as fallback: ${product.ref}`);
      }
    });
    
    console.log('💡 Fetching light data for refs:', Array.from(lightRefs));
    
    // Fetch data for each light reference
    const promises = Array.from(lightRefs).map(async (ref) => {
      console.log(`💡 Fetching data for light ref: ${ref}`);
      const dataArray = await fetchLightDataByRef(ref);
      if (dataArray && dataArray.length > 0) {
        console.log(`✅ Found ${dataArray.length} light data entries for ${ref}:`, dataArray);
        lightDataMap[ref] = dataArray;
      } else {
        console.log(`❌ No data found for ${ref}`);
        lightDataMap[ref] = [];
      }
    });
    
    await Promise.all(promises);
    
    console.log('💡 Light data fetched:', lightDataMap);
    setLightData(lightDataMap);
    setLoadingLightData(false);
  }, [products, userSelection.answers?.positionSlug]);

  // Helper function to get light data for a specific reference (returns first item)
  const getLightDataForRef = (ref: string) => {
    const dataArray = lightData[ref];
    if (!dataArray || dataArray.length === 0) {
      console.log(`⚠️  No light data found for ref: ${ref}`);
      return null;
    }
    // For now, return the first item. Later we can enhance this to show all variants
    return dataArray[0];
  };

  // Helper function to get all light data for a specific reference
  const getAllLightDataForRef = (ref: string) => {
    const dataArray = lightData[ref];
    if (!dataArray || dataArray.length === 0) {
      console.log(`⚠️  No light data found for ref: ${ref}`);
      return [];
    }
    return dataArray;
  };

  // Filter products by the selected position
  const filteredProducts = useMemo(() => {
    if (!userSelection.answers?.positionSlug) return products;
    
    return products.filter(product => {
      // Check if this product has the selected position in lightPositions array (API) or light_positions JSON (local DB)
      if (product.lightPositions && Array.isArray(product.lightPositions)) {
        // API format: lightPositions is already an array
        return product.lightPositions.some((pos: any) => {
          const positionSlug = Array.isArray(userSelection.answers?.positionSlug) 
            ? userSelection.answers.positionSlug[0] 
            : userSelection.answers?.positionSlug;
          const normalizedPositionSlug = positionSlug?.replace(/-/g, '_').replace(/_de_/g, '_');
          const normalizedCategory = pos.category?.replace(/-/g, '_');
          
          return pos.category === positionSlug || 
                 normalizedCategory === normalizedPositionSlug ||
                 pos.position?.toLowerCase().includes(positionSlug?.toLowerCase() || '') ||
                 positionSlug?.toLowerCase().includes(pos.category?.toLowerCase() || '');
        });
      } else if (product.light_positions) {
        // Local DB format: light_positions is a JSON string
        try {
          const positions = JSON.parse(product.light_positions);
          return positions.some((pos: any) => {
            const positionSlug = Array.isArray(userSelection.answers?.positionSlug) 
              ? userSelection.answers.positionSlug[0] 
              : userSelection.answers?.positionSlug;
            const normalizedPositionSlug = positionSlug?.replace(/-/g, '_').replace(/_de_/g, '_');
            const normalizedCategory = pos.category?.replace(/-/g, '_');
            
            return pos.category === positionSlug || 
                   normalizedCategory === normalizedPositionSlug ||
                   pos.position?.toLowerCase().includes(positionSlug?.toLowerCase() || '') ||
                   positionSlug?.toLowerCase().includes(pos.category?.toLowerCase() || '');
          });
        } catch (error) {
          console.warn('Error parsing light_positions in filter:', error);
          return false;
        }
      }
      return false;
    });
  }, [products, userSelection.answers?.positionSlug]);

  // Reset light data fetch flag when position changes
  useEffect(() => {
    lightDataFetchedRef.current = false;
  }, [userSelection.answers?.positionSlug]);

  // Fetch light data when products change
  useEffect(() => {
    if (products.length > 0) {
      fetchAllLightData();
    }
  }, [fetchAllLightData]);

  if (loadingProducts || loadingLightData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">
          {loadingProducts ? 'Chargement des produits...' : 'Chargement des détails des produits...'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-category mt-12 mb-20 leading-15"><span className='text-blue-title-bulbs-category capitalize-first-letter'>{userSelection.answers?.lightingType || 'compatibles'}</span> pour votre <span className='text-blue-title-bulbs-category capitalize-first-letter'>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span></h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
          <div className="">
            {(() => {
              console.log(`💡 Total products fetched: ${products.length}`);
              console.log(`💡 Filtered products for position: ${filteredProducts.length}`);
              console.log(`💡 Position slug: ${userSelection.answers?.positionSlug}`);
              return null;
            })()}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                // Find the matching light position ref from lightPositions array (API) or light_positions JSON (local DB)
                let positionRef = null;
                if (product.lightPositions && Array.isArray(product.lightPositions)) {
                  // API format: lightPositions is already an array
                  const matchingPosition = product.lightPositions.find((pos: any) => {
                    const positionSlug = Array.isArray(userSelection.answers?.positionSlug) 
                      ? userSelection.answers.positionSlug[0] 
                      : userSelection.answers?.positionSlug;
                    const normalizedPositionSlug = positionSlug?.replace(/-/g, '_').replace(/_de_/g, '_');
                    const normalizedCategory = pos.category?.replace(/-/g, '_');
                    
                    return pos.category === positionSlug || 
                           normalizedCategory === normalizedPositionSlug ||
                           pos.position?.toLowerCase().includes(positionSlug?.toLowerCase() || '') ||
                           positionSlug?.toLowerCase().includes(pos.category?.toLowerCase() || '');
                  });
                  positionRef = matchingPosition?.ref;
                } else if (product.light_positions) {
                  // Local DB format: light_positions is a JSON string
                  try {
                    const positions = JSON.parse(product.light_positions);
                    const matchingPosition = positions.find((pos: any) => {
                      const positionSlug = Array.isArray(userSelection.answers?.positionSlug) 
                        ? userSelection.answers.positionSlug[0] 
                        : userSelection.answers?.positionSlug;
                      const normalizedPositionSlug = positionSlug?.replace(/-/g, '_').replace(/_de_/g, '_');
                      const normalizedCategory = pos.category?.replace(/-/g, '_');
                      
                      return pos.category === positionSlug || 
                             normalizedCategory === normalizedPositionSlug ||
                             pos.position?.toLowerCase().includes(positionSlug?.toLowerCase() || '') ||
                             positionSlug?.toLowerCase().includes(pos.category?.toLowerCase() || '');
                    });
                    positionRef = matchingPosition?.ref;
                  } catch (error) {
                    console.warn('Error parsing light_positions in display:', error);
                  }
                }
                
                // Fallback to product ref if no position found
                if (!positionRef && product.ref && product.ref !== 'Multiple') {
                  positionRef = product.ref;
                }
                
                console.log(`💡 Product ${index + 1}/${filteredProducts.length}:`, {
                  productId: product.id,
                  typeConception: product.typeConception,
                  positionRef,
                  hasLightData: !!getLightDataForRef(positionRef)
                });
                
                // Show all products, even if they don't have light data
                if (!positionRef) {
                  console.log(`❌ Skipping product ${product.id} - no position ref`);
                  return null;
                }
                
                // Get all light data variants for this reference
                const allLightData = getAllLightDataForRef(positionRef);
                
                return (
                  <div key={`${product.id}-${positionRef}`}>
                    {allLightData.length > 0 ? (
                      // Show all light data variants for this reference
                      allLightData.map((lightDataItem, lightIndex) => (
                        <div
                          key={`${product.id}-${positionRef}-${lightDataItem.id}`}
                          className="bg-white rounded-lg flex items-center justify-between"
                        >
                          {/* Light Product Info */}
                          <div className="flex flex-row justify-center w-full border-b-1 border-[#E5E5E5] items-center">
                            <div className="w-full max-w-4xl">
                              <div className="ml-2 text-sm text-gray-700">
                                <div className="flex flex-row items-center ">
                                  {/* 1. Brand Image */}
                                  {lightDataItem.brandImg?.url ? (
                                    <img 
                                      src={lightDataItem.brandImg?.url ? `http://localhost:1338${lightDataItem.brandImg.url}` : '/assets/img/placeholder-brand.svg'}
                                      onError={(e) => {
                                        e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                      }}
                                      alt="Marque"
                                      className="w-32 h-16 object-contain ml-4"
                                    />
                                  ) : (
                                    <div className="w-32 h-16 ml-4 flex items-center justify-center text-gray-400 text-xs">
                                      Aucune image de marque
                                    </div>
                                  )}
                                  
                                  {/* 2. Description */}
                                  {lightDataItem.description ? (
                                    <div className="text-xl text-black flex-1 ml-4">
                                      {lightDataItem.description}
                                    </div>
                                  ) : (
                                    <div className="text-xl text-orange-600 italic flex-1 ml-4">
                                          Données d'éclairage non disponibles dans la base de données
                                    </div>
                                  )}
                                  
                                  {/* 3. Light Image */}
                                  {lightDataItem.img ? (
                                    <img 
                                      src={lightDataItem.img?.url ? `http://localhost:1338${lightDataItem.img.url}` : '/assets/img/placeholder-product.svg'}
                                      onError={(e) => {
                                        e.currentTarget.src = '/assets/img/placeholder-product.svg';
                                      }}
                                      alt="Ampoule"
                                      className="w-24 h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity ml-4"
                                      onClick={() => handleImageZoom(
                                        lightDataItem.img?.url ? `http://localhost:1338${lightDataItem.img.url}` : '/assets/img/placeholder-product.svg',
                                        `Light ${positionRef} - ${lightDataItem.description}`
                                      )}
                                    />
                                  ) : (
                                    <div className="w-24 h-24 ml-4 flex items-center justify-center text-gray-400 text-xs">
                                             Aucune image
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Fallback: show product without light data
                      <div
                        key={`${product.id}-${positionRef}-no-data`}
                        className="bg-white rounded-lg flex items-center justify-between"
                      >
                        <div className="flex flex-row justify-center w-full border-b-1 border-[#E5E5E5] items-center py-4">
                          <div className="w-full max-w-4xl">
                            <div className="ml-2 text-sm text-gray-700">
                              <div className="flex flex-row items-center p-3">
                                <div className="font-semibold text-lg">{positionRef}</div>
                                <div className="text-2xl text-orange-600 italic flex-1 ml-4">
                                          Données d'éclairage non disponibles dans la base de données
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-xl text-gray-600">Aucune ampoule trouvée pour ce véhicule.</p>
              </div>
            )}
          </div>
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

export default BulbProductsScreen; 