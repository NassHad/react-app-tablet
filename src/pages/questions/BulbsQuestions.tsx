import type { Vehicle, ProductCategory } from '../../types';
import carBulbsPage from '../../assets/img/car-bulbs-page.jpg';
import { useState } from 'react';
import { HelpPageRouter } from '../help';
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
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();
  const lightingTypes = [
    { id: 'feu_croisement', name: 'Feu de croisement', icon: feuCroisement },
    { id: 'feu_route', name: 'Feu de route', icon: feuRoute },
    { id: 'eclairage_jour', name: 'Éclairage de jour', icon: eclairageJour },
    { id: 'feu_position', name: 'Feu de position', icon: feuPosition },
    { id: 'feux_antibrouillard', name: 'Feux antibrouillard', icon: feuxAntibrouillard },
    { id: 'clignotant_avant', name: 'Clignotant avant voiture', icon: clignotantArriere },
    { id: 'clignotant_arriere', name: 'Clignotant arrière voiture', icon: clignotantArriere },
    { id: 'feux_arrieres', name: 'Feux arrières', icon: feuxArrieres },
    { id: 'feux_stop', name: 'Feux de stop', icon: feuxStop },
    { id: 'feux_plaque', name: 'Feux Plaque d\'immatriculation', icon: feuxPlaque },
    { id: 'eclairage_interieur', name: 'Éclairage intérieur', icon: eclairageInterieur },
    { id: 'eclairage_coffre', name: 'Éclairage de coffre', icon: eclairageCoffre },
    { id: 'feux_route_suppl', name: 'Feux de route supplémentaires', icon: feuxRouteSuppl }
  ];

  const handleLightingTypeSelect = (lightingType: string) => {
    // Navigate to the products page with bulbs category
    navigate('/products', { 
      state: { 
        vehicle, 
        category,
        selectedLightingType: lightingType 
      } 
    });
  };

  return (
    <>
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

          {/* Lighting Types List */}
          <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
            {lightingTypes.map((type, index) => (
              <button
                key={type.id}
                onClick={() => handleLightingTypeSelect(type.id)}
                className="w-full py-3 border-b border-b-2 border-b-[#EE5F00] hover:bg-gray-50 flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={type.icon} 
                    alt={type.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-blue-bulbs-category font-bold">{type.name}</span>
                </div>
                <svg className="w-8 h-8 text-orange-bulbs-category" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
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
    </>
  );
};

export default BulbsQuestions; 