import type { Vehicle, ProductCategory } from '../../types';
import type { LightPosition, LightData } from '../../types/lights';
import carBulbsPage from '../../assets/img/car-bulbs-page.jpg';
import { useState, useEffect } from 'react';
import { HelpPageRouter } from '../help';
import { useLightsData } from '../../hooks/useLightsData';
import LightsErrorBoundary from '../../components/LightsErrorBoundary';
import LightsLoadingSpinner from '../../components/LightsLoadingSpinner';
import LightDataDisplay from '../../components/LightDataDisplay';
import { formatErrorForUser } from '../../utils/lightsApiUtils';
import { useNavigate } from 'react-router-dom';
// Import all bulb icons
import feuCroisement from '../../assets/img/icons/feu_de_croisement.png';
import feuRoute from '../../assets/img/icons/feu_de_route.png';
import eclairageJour from '../../assets/img/icons/eclairage_de_jour.png';
import feuPosition from '../../assets/img/icons/feu_de_position.png';
import feuxAntibrouillard from '../../assets/img/icons/feu_antibrouillard.png';
import clignotantArriere from '../../assets/img/icons/clignotant_arriere_voiture.png';
import feuxArrieres from '../../assets/img/icons/feu_arrieres.png';
import feuxStop from '../../assets/img/icons/feu_de_stop.png';
import feuxPlaque from '../../assets/img/icons/feux_plaque_immatriculation.png';
import eclairageInterieur from '../../assets/img/icons/eclairage_interieur.png';
import eclairageCoffre from '../../assets/img/icons/eclairage_coffre.png';
import feuxRouteSuppl from '../../assets/img/icons/feu_de_route_suppl.png';

interface BulbsQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const BulbsQuestions = ({ vehicle, category, onAnswersComplete }: BulbsQuestionsProps) => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<LightPosition | null>(null);
  const [lightData, setLightData] = useState<LightData | null>(null);
  
  // Use the lights data hook
  const {
    positions,
    lightData: fetchedLightData,
    loadingPositions,
    loadingProducts,
    loadingLightData,
    error,
    fetchAllMasterPositions,
    fetchProductsBySlugsAndPosition,
    clearError
  } = useLightsData();

  // Icon mapping for light positions
  const iconMap: Record<string, string> = {
    'feu_croisement': feuCroisement,
    'feu_route': feuRoute,
    'eclairage_jour': eclairageJour,
    'feu_position': feuPosition,
    'feux_antibrouillard': feuxAntibrouillard,
    'clignotant_avant': clignotantArriere,
    'clignotant_arriere': clignotantArriere,
    'feux_arrieres': feuxArrieres,
    'feux_stop': feuxStop,
    'feux_plaque': feuxPlaque,
    'eclairage_interieur': eclairageInterieur,
    'eclairage_coffre': eclairageCoffre,
    'feux_route_suppl': feuxRouteSuppl
  };

  // Fetch master positions when component mounts
  useEffect(() => {
    console.log('🔍 Fetching all master light positions...');
    fetchAllMasterPositions();
  }, [fetchAllMasterPositions]);

  // Update local lightData when fetchedLightData changes
  useEffect(() => {
    if (fetchedLightData) {
      setLightData(fetchedLightData);
    }
  }, [fetchedLightData]);


  const handleLightingTypeSelect = async (position: LightPosition) => {
    setSelectedPosition(position);
    
    try {
      // Fetch products for the selected position using stored vehicle data
      if (vehicle.brandSlug && vehicle.modelSlug) {
        // Fetch products using the API
        await fetchProductsBySlugsAndPosition(vehicle.brandSlug, vehicle.modelSlug, position.slug);
        
        // Call onAnswersComplete with the selected position
        onAnswersComplete({
          lightingType: position.name,
          positionSlug: position.slug,
          positionId: position.id
        });
        
        // Navigate to products page
        navigate('/products');
      } else {
        console.error('Missing required vehicle data:', {
          brandSlug: vehicle.brandSlug,
          modelSlug: vehicle.modelSlug,
          year: vehicle.year
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <LightsErrorBoundary>
      
      <div className="flex">
        {/* Left/Center Area */}
        <div className="flex w-full flex-col items-center mt-10">
          {/* Header */}
          <div className="mb-8 text-center flex flex-col items-center">
            <h1 className="text-6xl font-bold text-blue-title-bulbs-category mb-2">
              Liste des ampoules compatibles
            </h1>
            <p className="text-5xl text-gray-600">
              pour votre <span className='text-orange-bulbs-category'>{vehicle.brand} {vehicle.model}</span>
            </p>
            <img src={carBulbsPage} alt="Car Bulbs Page" className='mt-12' />
            <div className="bg-stone-200 size-fit p-4 rounded-2xl mt-8">
                <p className='text-center mb-2'>Besoin d'aide ?</p>
                <button 
                  onClick={() => setShowHelp(!showHelp)}
                  className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer'
                >
                  Cliquez ici
                </button>
            </div> 
          </div>

          {/* Light Data Display */}
          {lightData && selectedPosition && (
            <div className="mt-8 w-full max-w-2xl">
              <LightDataDisplay lightData={lightData} />
            </div>
          )}



        </div>

        {/* Right Sidebar */}
        <div className="w-128 mt-4 mr-10">
          {/* Header */}
          <div className="text-white p-4 rounded-3xl flex items-center justify-between gradient-background ">
            <span className="font-bold text-lg">Choisissez le type d'ampoule</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Content Area */}
          <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
            {/* Error State */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg m-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-800 font-medium">Erreur de chargement</p>
                    <p className="text-red-600 text-sm">{formatErrorForUser(error)}</p>
                  </div>
                  <button
                    onClick={clearError}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {(loadingPositions || loadingProducts) && (
              <div className="p-4">
                <LightsLoadingSpinner 
                  message={
                    loadingPositions 
                      ? "Chargement des positions d'éclairage..." 
                      : loadingProducts 
                        ? "Chargement des produits..." 
                        : "Chargement..."
                  } 
                  size="medium"
                />
              </div>
            )}

            {/* Positions List */}
            {!loadingPositions && !error && positions.length > 0 && (
              <>
                {positions.map((position) => (
                  <button
                    key={position.id}
                    onClick={() => handleLightingTypeSelect(position)}
                    disabled={loadingLightData}
                    className={`w-full py-3 border-b border-b-2 border-b-[#EE5F00] hover:bg-gray-50 flex items-center justify-between text-left ${
                      selectedPosition?.id === position.id ? 'bg-blue-50' : ''
                    } ${loadingLightData ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={iconMap[position.category] || iconMap['feu_croisement']} 
                        alt={position.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="flex flex-col">
                        <span className="text-blue-bulbs-category font-bold">{position.name}</span>
                        {position.ref && (
                          <span className="text-gray-500 text-sm">Réf: {position.ref}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {loadingLightData && selectedPosition?.id === position.id && (
                        <LightsLoadingSpinner size="small" message="" />
                      )}
                      <svg className="w-8 h-8 text-orange-bulbs-category" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </>
            )}

            {/* No Positions State */}
            {!loadingPositions && !error && positions.length === 0 && (
              <div className="p-6 text-center bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Aucune donnée d'éclairage disponible
                </h3>
                <p className="text-yellow-700 mb-4">
                  Aucune position d'éclairage n'a été trouvée pour <strong>{vehicle.brand} {vehicle.model}</strong>.
                </p>
                <div className="text-sm text-yellow-600">
                  <p>Vérifiez que :</p>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>Le véhicule est correctement sélectionné</li>
                    <li>Les données d'éclairage sont disponibles pour ce modèle</li>
                    <li>Le backend contient les informations nécessaires</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Help Modal */}
      {showHelp && (
        <HelpPageRouter
          category={category}
          onClose={() => setShowHelp(false)}
        />
      )}
    </LightsErrorBoundary>
  );
};

export default BulbsQuestions; 