import type { Vehicle, ProductCategory } from '../../types';
import carBulbsPage from '../../assets/img/car-bulbs-page.jpg';
import { useState } from 'react';

interface BulbsQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const BulbsQuestions = ({ vehicle, onAnswersComplete }: BulbsQuestionsProps) => {
  const [showHelp, setShowHelp] = useState(false);
  const lightingTypes = [
    { id: 'feu_croisement', name: 'Feu de croisement', icon: '💡' },
    { id: 'feu_route', name: 'Feu de route', icon: '💡' },
    { id: 'eclairage_jour', name: 'Éclairage de jour', icon: '☀️' },
    { id: 'feu_position', name: 'Feu de position', icon: '⭐' },
    { id: 'feux_antibrouillard', name: 'Feux antibrouillard', icon: '🌫️' },
    { id: 'clignotant_avant', name: 'Clignotant avant voiture', icon: '⬅️' },
    { id: 'clignotant_arriere', name: 'Clignotant arrière voiture', icon: '➡️' },
    { id: 'feux_arrieres', name: 'Feux arrières', icon: '🔴' },
    { id: 'feux_stop', name: 'Feux de stop', icon: '🛑' },
    { id: 'feux_plaque', name: 'Feux Plaque d\'immatriculation', icon: '📋' },
    { id: 'eclairage_interieur', name: 'Éclairage intérieur', icon: '💡' },
    { id: 'eclairage_coffre', name: 'Éclairage de coffre', icon: '📦' }
  ];

  const handleLightingTypeSelect = (lightingType: string) => {
    onAnswersComplete({ lightingType });
  };

  return (
    <div className="flex">
      {/* Left/Center Area */}
      <div className="flex w-full justify-center flex-col items-center">
        {/* Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <h1 className="text-6xl font-bold text-blue-title-bulbs-category mb-2">
            Liste des ampoules compatibles
          </h1>
          <p className="text-5xl text-gray-600">
            pour votre <span className='text-orange-bulbs-category'>{vehicle.brand} {vehicle.model}</span>
          </p>
          <img src={carBulbsPage} alt="Car Bulbs Page" className='mt-20' />
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

      {/* Right Sidebar */}
      <div className="w-128 mt-10 mr-10">
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
              className="w-full p-4 border-b border-b-2 border-b-[#EE5F00] hover:bg-gray-50 flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{type.icon}</span>
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
  );
};

export default BulbsQuestions; 