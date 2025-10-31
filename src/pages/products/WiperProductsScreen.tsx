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
}

const WiperProductsScreen = ({ userSelection }: WiperProductsScreenProps) => {
  const navigate = useNavigate();
  
  // Use the wipers data hook to get the filtered products
  const {
    products,
    loadingProducts,
    error,
    fetchProductsBySlugsAndPosition
  } = useWipersData();

  // State for wiper data (stores arrays of wiper data per reference)
  const [wiperData, setWiperData] = useState<Record<string, WiperData[]>>({});
  const [loadingWiperData, setLoadingWiperData] = useState(false);

  console.log('🔍 products:', products);
  console.log('🔍 userSelection:', userSelection);
  console.log('🔍 loadingProducts:', loadingProducts);
  
  // Get the selected position from userSelection answers
  const selectedPosition = userSelection?.answers?.position;
  const positionName = userSelection?.answers?.positionName;

  // Function to fetch wiper data for a specific reference
  const fetchWiperDataByRef = async (ref: string): Promise<WiperData[]> => {
    try {
      console.log(`🔍 Searching for wiper data with ref: "${ref}"`);
      
       const searchStrategies = [
         { type: 'exact', query: `filters[ref][$eq]=${encodeURIComponent(ref)}&populate=brandImg,img` },
         { type: 'contains', query: `filters[ref][$contains]=${encodeURIComponent(ref)}&populate=brandImg,img` },
       ];

      // Try each search strategy
      for (const strategy of searchStrategies) {
        const response = await fetch(`http://localhost:1338/api/wipers-data?${strategy.query}`);
        const result = await response.json();

        if (result.data?.length > 0) {
          console.log(`✅ Found ${result.data.length} ${strategy.type} matches for "${ref}"`);
          return result.data;
        }
      }

       // Try clean ref as last resort
       const cleanRef = ref.replace(/[^a-zA-Z0-9]/g, '');
       if (cleanRef !== ref) {
         console.log(`🔍 Trying clean ref match for "${cleanRef}"`);
         const response = await fetch(`http://localhost:1338/api/wipers-data?filters[ref][$contains]=${encodeURIComponent(cleanRef)}&populate=brandImg,img`);
         const result = await response.json();
        
        if (result.data?.length > 0) {
          console.log(`✅ Found ${result.data.length} clean ref matches for "${cleanRef}"`);
          return result.data;
        }
      }
      
      console.log(`❌ No wiper data found for reference: "${ref}"`);
      return [];

    } catch (error) {
      console.error(`Error fetching wiper data for ${ref}:`, error);
      return [];
    }
  };

  // Function to get all wiper data to debug what's in the database
  const getAllWiperData = async () => {
    try {
      const response = await fetch('http://localhost:1338/api/wipers-data?populate=brandImg,img');
      const result = await response.json();
      console.log('🔍 All wiper data in database:', result.data);
      return result.data || [];
    } catch (error) {
      console.error('Error fetching all wiper data:', error);
      return [];
    }
  };

  // Function to fetch wiper data for all wiper references in products
  const fetchAllWiperData = useCallback(async () => {
    if (products.length === 0) return;
    
    setLoadingWiperData(true);
    const wiperDataMap: Record<string, WiperData[]> = {};
    
    // First, let's see what's in the database
    console.log('🔍 Getting all wiper data to debug...');
    await getAllWiperData();
    
    // Collect all unique wiper references from products
    const wiperRefs = new Set<string>();
    products.forEach(product => {
      console.log(`🔍 Processing wiper product: ${product.name}`);
      
      // Extract refs from wipersPositions array
      if (product.wipersPositions && Array.isArray(product.wipersPositions)) {
        product.wipersPositions.forEach((pos: any) => {
          // Match position by slug
          const selectedPos = Array.isArray(selectedPosition) ? selectedPosition[0] : selectedPosition;
          if (pos.slug === selectedPos || pos.name.toLowerCase() === selectedPos?.toLowerCase()) {
            wiperRefs.add(pos.ref);
            console.log(`   Adding wiper ref: ${pos.ref} for position ${pos.position} (${pos.category})`);
          }
        });
      }
      
      // Fallback: use product ref if no wipersPositions
      if (product.ref && product.ref !== 'Multiple') {
        wiperRefs.add(product.ref);
        console.log(`   Adding product ref as fallback: ${product.ref}`);
      }
    });
    
    console.log('🔍 Fetching wiper data for refs:', Array.from(wiperRefs));
    
    // Fetch data for each wiper reference
    const promises = Array.from(wiperRefs).map(async (ref) => {
      console.log(`🔍 Fetching data for wiper ref: ${ref}`);
      const dataArray = await fetchWiperDataByRef(ref);
      if (dataArray && dataArray.length > 0) {
        console.log(`✅ Found ${dataArray.length} wiper data entries for ${ref}:`, dataArray);
        wiperDataMap[ref] = dataArray;
      } else {
        console.log(`❌ No data found for ${ref}`);
        wiperDataMap[ref] = [];
      }
    });
    
    await Promise.all(promises);
    
    console.log('🔍 Wiper data fetched:', wiperDataMap);
    setWiperData(wiperDataMap);
    setLoadingWiperData(false);
  }, [products, selectedPosition]);

  // Helper function to get wiper data for a specific reference (returns first item)
  const getWiperDataForRef = (ref: string) => {
    const dataArray = wiperData[ref];
    if (!dataArray || dataArray.length === 0) {
      console.log(`⚠️  No wiper data found for ref: ${ref}`);
      return null;
    }
    return dataArray[0];
  };

  // Helper function to get all wiper data for a specific reference
  const getAllWiperDataForRef = (ref: string) => {
    const dataArray = wiperData[ref];
    if (!dataArray || dataArray.length === 0) {
      console.log(`⚠️  No wiper data found for ref: ${ref}`);
      return [];
    }
    return dataArray;
  };
  
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

  // Fetch wiper data when products change
  useEffect(() => {
    if (products.length > 0) {
      fetchAllWiperData();
    }
  }, [fetchAllWiperData]);

  const handleProductDetails = (productId: string) => {
    navigate(`/product-details/${productId}`);
  };

  if (loadingProducts || loadingWiperData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">
          {loadingProducts ? 'Chargement des produits...' : 'Chargement des détails des produits...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/4">
        <img src="/src/assets/img/categories/wiper/beg_classique.png" alt="Wiper" className="max-w-3xl h-auto object-contain m-[-5rem]" />
      </div>
      <div className="text-center w-1/2 flex flex-col">
        <h1 className="text-5xl font-bold text-gray-category mb-8 leading-15">
          Balais d'essuie-glace pour {positionName || 'position sélectionnée'}
        </h1>
        <p className="text-2xl text-gray-600 mb-12">
          Compatible avec votre <span className='text-blue-wiper-category capitalize-first-letter'>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span>
        </p>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
          <div className="">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Aucun produit trouvé pour cette position.</p>
              </div>
            ) : (
              products.map((product: WipersProduct) => {
                // Find the matching wiper position from wipersPositions array
                let positionRef = null;
                let positionData = null;
                
                if (product.wipersPositions && Array.isArray(product.wipersPositions)) {
                  // Find the position that matches the selected position
                  const matchingPosition = product.wipersPositions.find((pos: any) => {
                    const selectedPos = Array.isArray(selectedPosition) ? selectedPosition[0] : selectedPosition;
                    return pos.slug === selectedPos || pos.name.toLowerCase() === selectedPos?.toLowerCase();
                  });
                  console.log('🔍 matchingPosition:', matchingPosition);
                  positionRef = matchingPosition?.ref;
                  positionData = matchingPosition;
                }
                
                // Fallback to product ref if no position found
                if (!positionRef && product.ref) {
                  positionRef = product.ref;
                }
                
                console.log(`🔍 Product ${product.id}:`, {
                  productName: product.name,
                  positionRef,
                  hasPositionData: !!positionData,
                  wipersPositions: product.wipersPositions
                });
                
                // Get all wiper data variants for this reference
                const allWiperData = positionRef ? getAllWiperDataForRef(positionRef) : [];
                console.log('🔍 allWiperData:', allWiperData);
                
                return (
                  <div key={product.id}>
                    {allWiperData.length > 0 ? (
                      // Show all wiper data variants for this reference
                      allWiperData.map((wiperDataItem, wiperIndex) => (
                        <div
                          key={`${product.id}-${positionRef}-${wiperDataItem.id}`}
                          className="bg-white rounded-lg flex items-center justify-between"
                        >
                          {/* Wiper Product Info */}
                          <div className="flex flex-row justify-center w-full border-b-1 border-[#E5E5E5] items-center">
                            <div className="w-full max-w-4xl ml-2 text-sm text-gray-700 flex flex-row items-center">
                                    {/* 1. Brand Image */}
                                    <div className="w-32 h-16 ml-4 flex items-center justify-center">
                                      {wiperDataItem.brandImg?.url ? (
                                        <img 
                                          src={`http://localhost:1338${wiperDataItem.brandImg.url}`}
                                          alt={`${wiperDataItem.brand} Logo`}
                                          className="w-32 h-16 object-contain"
                                          onError={(e) => {
                                            e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                          }}
                                        />
                                      ) : (
                                        <div className="w-32 h-16 flex items-center justify-center text-gray-400 text-xs">
                                          {wiperDataItem.brand}
                                        </div>
                                      )}
                                    </div>
                                  
                                  {/* 2. Description */}
                                  <div className="text-xl text-black flex-1 ml-4">
                                    {wiperDataItem.ref}
                                  </div>
                                  
                                  {/* 3. Reference */}
                                  <div className="w-24 h-24 ml-4 flex items-center justify-center text-xl text-black">
                                    {wiperDataItem.size}
                                  </div>

                                  <div className="w-24 h-24 ml-4 flex items-center justify-center text-xl text-black">
                                  {wiperDataItem.img?.url ? (
                                        <img 
                                          src={`http://localhost:1338${wiperDataItem.img.url}`}
                                          alt={`Image de l'essuie-glace ${wiperDataItem.ref}`}
                                          className="w-24 h-24 object-contain"
                                          onError={(e) => {
                                            e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                          }}
                                        />
                                      ) : (
                                        <div className="w-24 h-24 flex items-center justify-center text-gray-400 text-xs">
                                          Aucune image disponible
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                      ))
                    ) : (
                      // Fallback: show product without wiper data
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
                                  Données d'essuie-glace non disponibles dans la base de données
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
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 text-gray-500 text-lg leading-2">
          ↑ Faites glisser pour voir plus de produits ↓
        </div>
      </div>
      <div className="w-1/4">
        <img src="/src/assets/img/categories/wiper/beg_plat.png" alt="Wiper" className="max-w-3xl h-auto object-contain ml-[-15rem]" />
      </div>
    </div>
  );
};

export default WiperProductsScreen;