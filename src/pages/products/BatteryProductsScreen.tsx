import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { ProductCategory, UserSelection } from '../../types';
import { useBatteryData } from '../../hooks/useBatteryData';
import { HelpPageRouter } from '../help';

interface BatteryProductsScreenProps {
  userSelection: UserSelection;
  category: ProductCategory;
}

interface BatteryData {
  id: number;
  ref: string;
  brand: string;
  img?: string; // JSON string from database
  brandImg?: string; // JSON string from database
  isActive: boolean;
  description?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const BatteryProductsScreen = ({ userSelection, category }: BatteryProductsScreenProps) => {
  const { 
    motorisations, 
    loadingMotorisations, 
    fetchBatteryProductsBySlugs
  } = useBatteryData();
  const hasLoadedRef = useRef(false);
  const batteryDataFetchedRef = useRef(false);
  const [showHelp, setShowHelp] = useState(false);
  
  // State to control whether products should be displayed - always true for battery products
  const [showProducts, setShowProducts] = useState(true);
  
  // State for battery data (now stores arrays of battery data per reference)
  const [batteryData, setBatteryData] = useState<Record<string, BatteryData[]>>({});
  const [loadingBatteryData, setLoadingBatteryData] = useState(false);
  
  // State for image zoom modal
  const [zoomedImage, setZoomedImage] = useState<{url: string, alt: string} | null>(null);

  useEffect(() => {
    // Only fetch motorisations if we have all required data and haven't loaded yet
    if (userSelection?.vehicle?.brandSlug && 
        userSelection?.vehicle?.modelSlug &&
        !hasLoadedRef.current) {
      
      console.log('🔋 Fetching battery motorisations for:', {
        brandSlug: userSelection.vehicle.brandSlug,
        modelSlug: userSelection.vehicle.modelSlug
      });
      
      hasLoadedRef.current = true;
      fetchBatteryProductsBySlugs(
        userSelection.vehicle.brandSlug,
        userSelection.vehicle.modelSlug
      );
    }
  }, [userSelection?.vehicle?.brandSlug, userSelection?.vehicle?.modelSlug, fetchBatteryProductsBySlugs]);


  // Function to handle image zoom
  const handleImageZoom = (imageUrl: string, alt: string) => {
    setZoomedImage({ url: imageUrl, alt });
  };

  // Function to close zoom modal
  const closeZoomModal = () => {
    setZoomedImage(null);
  };

  // Function to handle showing products - no longer needed since products show automatically
  // const handleShowProducts = () => {
  //   setShowProducts(true);
  // };

  // Function to fetch battery data for a specific reference (now returns array)
  const fetchBatteryDataByRef = async (ref: string): Promise<BatteryData[]> => {
    try {
      const { databaseService } = await import('../../db/database');
      const batteryData = await databaseService.getBatteryDataByRef(ref);
      console.log(`🔋 Battery data loaded for ref ${ref}:`, batteryData.length);
      return batteryData;
    } catch (error) {
      console.error(`Error fetching battery data for ${ref}:`, error);
      return [];
    }
  };

  // Filter motorisations to show only the selected one
  const selectedMotorisation = userSelection?.vehicle?.motorisation;
  const filteredMotorisations = useMemo(() => {
    if (!selectedMotorisation) return motorisations;
    
    return motorisations.filter(motor => {
      const motorisationMatch = motor.motorisation.toLowerCase().includes(selectedMotorisation.toLowerCase()) ||
                               selectedMotorisation.toLowerCase().includes(motor.motorisation.toLowerCase());
      const fuelMatch = motor.fuel.toLowerCase().includes(selectedMotorisation.toLowerCase()) ||
                       selectedMotorisation.toLowerCase().includes(motor.fuel.toLowerCase());
      return motorisationMatch || fuelMatch;
    });
  }, [motorisations, selectedMotorisation]);

  // Function to fetch battery data for all battery types in filtered motorisations
  const fetchAllBatteryData = useCallback(async () => {
    if (filteredMotorisations.length === 0 || batteryDataFetchedRef.current) return;
    
    batteryDataFetchedRef.current = true;
    setLoadingBatteryData(true);
    const batteryDataMap: Record<string, BatteryData[]> = {};
    
    // Collect all unique battery types
    const batteryTypes = new Set<string>();
    filteredMotorisations.forEach(motor => {
      console.log(`🔋 Processing motorisation: ${motor.motorisation}`);
      console.log(`   Full motor object:`, motor);
      console.log(`   Battery types:`, motor.batteryTypes);
      
      if (motor.batteryTypes?.EFB) {
        console.log(`   Adding EFB: ${motor.batteryTypes.EFB}`);
        batteryTypes.add(motor.batteryTypes.EFB);
      }
      if (motor.batteryTypes?.Conventional) {
        console.log(`   Adding Conventional: ${motor.batteryTypes.Conventional}`);
        batteryTypes.add(motor.batteryTypes.Conventional);
      }
      if (motor.batteryTypes?.AGM) {
        console.log(`   Adding AGM: ${motor.batteryTypes.AGM}`);
        batteryTypes.add(motor.batteryTypes.AGM);
      }
    });
    
    console.log('🔋 Fetching battery data for types:', Array.from(batteryTypes));
    
    // Fetch data for each battery type
    const promises = Array.from(batteryTypes).map(async (ref) => {
      console.log(`🔋 Fetching data for battery type: ${ref}`);
      const dataArray = await fetchBatteryDataByRef(ref);
      if (dataArray && dataArray.length > 0) {
        console.log(`✅ Found ${dataArray.length} battery data entries for ${ref}:`, dataArray);
        batteryDataMap[ref] = dataArray;
      } else {
        console.log(`❌ No data found for ${ref}`);
        batteryDataMap[ref] = [];
      }
    });
    
    await Promise.all(promises);
    
    console.log('🔋 Battery data fetched:', batteryDataMap);
    setBatteryData(batteryDataMap);
    setLoadingBatteryData(false);
  }, [filteredMotorisations]);

  console.log('🔋 Motorisation filtering:', {
    selectedMotorisation,
    totalMotorisations: motorisations.length,
    filteredMotorisations: filteredMotorisations.length,
    filtered: filteredMotorisations.map(m => m.motorisation),
    batteryDataFetched: batteryDataFetchedRef.current
  });

  // Reset battery data fetch flag when motorisation changes
  useEffect(() => {
    batteryDataFetchedRef.current = false;
  }, [selectedMotorisation]);

  // Fetch battery data when filtered motorisations change and showProducts is true
  useEffect(() => {
    if (filteredMotorisations.length > 0 && showProducts) {
      fetchAllBatteryData();
    }
  }, [fetchAllBatteryData, showProducts]);

  // Helper function to get battery data for a specific type (returns first item)
  // const getBatteryDataForType = (batteryType: string) => {
  //   const dataArray = batteryData[batteryType];
  //   if (!dataArray || dataArray.length === 0) {
  //     console.log(`⚠️  No battery data found for type: ${batteryType}`);
  //     return null;
  //   }
  //   // For now, return the first item. Later we can enhance this to show all variants
  //   return dataArray[0];
  // };

  // Helper function to get all battery data for a specific type
  const getAllBatteryDataForType = (batteryType: string) => {
    const dataArray = batteryData[batteryType];
    if (!dataArray || dataArray.length === 0) {
      console.log(`⚠️  No battery data found for type: ${batteryType}`);
      return [];
    }
    return dataArray;
  };

  // Helper function to check if a motorisation has any available batteries
  const hasAvailableBatteries = (motorisation: any): boolean => {
    if (!motorisation.batteryTypes) return false;
    
    const agmBatteries = motorisation.batteryTypes.AGM ? getAllBatteryDataForType(motorisation.batteryTypes.AGM) : [];
    const efbBatteries = motorisation.batteryTypes.EFB ? getAllBatteryDataForType(motorisation.batteryTypes.EFB) : [];
    const conventionalBatteries = motorisation.batteryTypes.Conventional ? getAllBatteryDataForType(motorisation.batteryTypes.Conventional) : [];
    
    return agmBatteries.length > 0 || efbBatteries.length > 0 || conventionalBatteries.length > 0;
  };

  // Helper function to check if any motorisation has available batteries
  const hasAnyAvailableBatteries = (): boolean => {
    return filteredMotorisations.some(motorisation => hasAvailableBatteries(motorisation));
  };

  if (loadingMotorisations || loadingBatteryData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">
          {loadingMotorisations ? 'Chargement des batteries...' : 'Chargement des détails des batteries...'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-category mt-12 mb-8 leading-15">
          Batteries compatibles <br />
          pour votre<br/>
          <span className="text-red-600 capitalize-first-letter">
            {userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}
          </span>
        </h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
        <div className="">
          {filteredMotorisations.length > 0 ? (
            // Show products directly
            hasAnyAvailableBatteries() ? (
                filteredMotorisations
                  .filter(motorisation => hasAvailableBatteries(motorisation))
                  .map((motorisation, index) => {
                    return (
                <div
                  key={`motor-${motorisation.id}-${index}`}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 mb-4"
                >
                  {/* Battery Product Info */}
                  <div className="flex flex-row justify-center w-full border-b-1 border-[#E5E5E5] items-center">
                    <div className="w-full max-w-4xl">
                      <div className="ml-2 text-sm text-gray-700">
                        {motorisation.batteryTypes ? (
                          <div className="">
                            {/* AGM Battery Type */}
                            {motorisation.batteryTypes?.AGM && getAllBatteryDataForType(motorisation.batteryTypes?.AGM).length > 0 && (
                              <div>
                                {getAllBatteryDataForType(motorisation.batteryTypes?.AGM).map((batteryDataItem, index) => (
                                  <div key={`agm-${motorisation.batteryTypes?.AGM}-${batteryDataItem.id}`} className="flex flex-row items-center p-3">
                                    {/* 1. Brand Image */}
                                    {(() => {
                                      try {
                                        const brandImgData = batteryDataItem.brandImg ? JSON.parse(batteryDataItem.brandImg) : null;
                                        return brandImgData?.url ? (
                                          <img 
                                            src={`/assets/img/products/brand_${brandImgData.url.split('/').pop()}`}
                                            alt="Marque"
                                            className="w-32 h-16 object-contain ml-4"
                                            onError={(e) => {
                                              e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                            }}
                                          />
                                        ) : (
                                          <div className="w-32 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Marque
                                          </div>
                                        );
                                      } catch (error) {
                                        return (
                                          <div className="w-32 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Marque
                                          </div>
                                        );
                                      }
                                    })()}
                                    
                                    {/* 2. Description */}
                                    {batteryDataItem.description && (
                                      <div className="text-xl text-black flex-1 ml-4">
                                        {batteryDataItem.description}
                                      </div>
                                    )}
                                    
                                    {/* 3. Battery Image */}
                                    {(() => {
                                      try {
                                        const imgData = batteryDataItem.img ? JSON.parse(batteryDataItem.img) : null;
                                        return imgData?.url ? (
                                          <img 
                                            src={`/assets/img/products/battery_${imgData.url.split('/').pop()}`}
                                            alt="Batterie"
                                            className="w-24 h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity ml-4"
                                            onClick={() => handleImageZoom(
                                              `/assets/img/products/battery_${imgData.url.split('/').pop()}`,
                                              `AGM Battery ${motorisation.batteryTypes?.AGM} - ${batteryDataItem.description}`
                                            )}
                                            onError={(e) => {
                                              e.currentTarget.src = '/assets/img/placeholder-product.svg';
                                            }}
                                          />
                                        ) : (
                                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Image
                                          </div>
                                        );
                                      } catch (error) {
                                        return (
                                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Image
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* EFB Battery Type */}
                            {motorisation.batteryTypes?.EFB && getAllBatteryDataForType(motorisation.batteryTypes?.EFB).length > 0 && (
                              <div>
                                {getAllBatteryDataForType(motorisation.batteryTypes?.EFB).map((batteryDataItem, index) => (
                                  <div key={`efb-${motorisation.batteryTypes?.EFB}-${batteryDataItem.id}`} className="flex flex-row items-center p-3">
                                    {/* 1. Brand Image */}
                                    {(() => {
                                      try {
                                        const brandImgData = batteryDataItem.brandImg ? JSON.parse(batteryDataItem.brandImg) : null;
                                        return brandImgData?.url ? (
                                          <img 
                                            src={`/assets/img/products/brand_${brandImgData.url.split('/').pop()}`}
                                            alt="Marque"
                                            className="w-32 h-16 object-contain ml-4"
                                            onError={(e) => {
                                              e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                            }}
                                          />
                                        ) : (
                                          <div className="w-32 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Marque
                                          </div>
                                        );
                                      } catch (error) {
                                        return (
                                          <div className="w-32 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Marque
                                          </div>
                                        );
                                      }
                                    })()}
                                    
                                    {/* 2. Description */}
                                    {batteryDataItem.description && (
                                      <div className="text-xl text-black flex-1 ml-4">
                                        {batteryDataItem.description}
                                      </div>
                                    )}
                                    
                                    {/* 3. Battery Image */}
                                    {(() => {
                                      try {
                                        const imgData = batteryDataItem.img ? JSON.parse(batteryDataItem.img) : null;
                                        return imgData?.url ? (
                                          <img 
                                            src={`/assets/img/products/battery_${imgData.url.split('/').pop()}`}
                                            alt="Batterie"
                                            className="w-24 h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity ml-4"
                                            onClick={() => handleImageZoom(
                                              `/assets/img/products/battery_${imgData.url.split('/').pop()}`,
                                              `EFB Battery ${motorisation.batteryTypes?.EFB} - ${batteryDataItem.description}`
                                            )}
                                          />
                                        ) : (
                                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Image
                                          </div>
                                        );
                                      } catch (error) {
                                        return (
                                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Image
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Conventional Battery Type */}
                            {motorisation.batteryTypes?.Conventional && getAllBatteryDataForType(motorisation.batteryTypes?.Conventional).length > 0 && (
                              <div>
                                {getAllBatteryDataForType(motorisation.batteryTypes?.Conventional).map((batteryDataItem, index) => (
                                  <div key={`conventional-${motorisation.batteryTypes?.Conventional}-${batteryDataItem.id}`} className="flex flex-row items-center p-3">
                                    {/* 1. Brand Image */}
                                    {(() => {
                                      try {
                                        const brandImgData = batteryDataItem.brandImg ? JSON.parse(batteryDataItem.brandImg) : null;
                                        return brandImgData?.url ? (
                                          <img 
                                            src={`/assets/img/products/brand_${brandImgData.url.split('/').pop()}`}
                                            alt="Marque"
                                            className="w-32 h-16 object-contain ml-4"
                                            onError={(e) => {
                                              e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                            }}
                                          />
                                        ) : (
                                          <div className="w-32 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Marque
                                          </div>
                                        );
                                      } catch (error) {
                                        return (
                                          <div className="w-32 h-16 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Marque
                                          </div>
                                        );
                                      }
                                    })()}
                                    
                                    {/* 2. Description */}
                                    {batteryDataItem.description && (
                                      <div className="text-xl text-black flex-1 ml-4">
                                        {batteryDataItem.description}
                                      </div>
                                    )}
                                    
                                    {/* 3. Battery Image */}
                                    {(() => {
                                      try {
                                        const imgData = batteryDataItem.img ? JSON.parse(batteryDataItem.img) : null;
                                        return imgData?.url ? (
                                          <img 
                                            src={`/assets/img/products/battery_${imgData.url.split('/').pop()}`}
                                            alt="Batterie"
                                            className="w-24 h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity ml-4"
                                            onClick={() => handleImageZoom(
                                              `/assets/img/products/battery_${imgData.url.split('/').pop()}`,
                                              `Conventional Battery ${motorisation.batteryTypes?.Conventional} - ${batteryDataItem.description}`
                                            )}
                                          />
                                        ) : (
                                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Image
                                          </div>
                                        );
                                      } catch (error) {
                                        return (
                                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs ml-4">
                                            Image
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-gray-500 italic">
                            Battery types not available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })
            ) : (
              <div className="text-center py-8">
                <div className="bg-motorisation rounded-lg p-6">
                  <p className="text-black text-xl">
                    Aucune batterie disponible pour ce véhicule
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Aucune batterie trouvée pour ce véhicule.</p>
            </div>
          )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 text-gray-500 text-lg leading-2">
          ↑ Faites glisser pour voir plus de produits ↓
        </div>
        <div className="flex w-full justify-center flex-col items-center mt-12">
          <div className='relative w-8 h-8 bg-stone-200 rotate-45 top-[15px]'></div>
            <div className="bg-stone-200 size-fit p-4 rounded-2xl">
              <p className='text-center mb-2'>Besoin d'aide ?</p>
              <button 
                onClick={() => setShowHelp(!showHelp)}
                className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer'
              >
                Cliquez ici
              </button>
            </div> 
          </div>
      </div>

      

      {/* Help Page Modal */}
      {showHelp && (
        <HelpPageRouter 
          category={category} 
          onClose={() => setShowHelp(false)} 
        />
      )}

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

export default BatteryProductsScreen; 