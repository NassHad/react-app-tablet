import { useState } from 'react';
import type { Vehicle, ProductCategory } from '../../types';
import standardBattery from '../../assets/img/standard-battery.png';
import efbBattery from '../../assets/img/efb-battery.png';
import agmBattery from '../../assets/img/agm-battery.png';
import { HelpPageRouter } from '../help';

interface BatteriesQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const BatteriesQuestions = ({ vehicle, category, onAnswersComplete }: BatteriesQuestionsProps) => {
  const [showHelp, setShowHelp] = useState(false);
  const batteryTypes = [
    { id: 'standard', name: 'Standard', color: '#93c452', image: standardBattery },
    { id: 'efb', name: 'EFB', color: '#fe6f28', image: efbBattery },
    { id: 'agm', name: 'AGM', color: '#fd171f', image: agmBattery }
  ];

  const handleBatteryTypeSelect = (batteryType: string) => {
    onAnswersComplete({ batteryType });
  };

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center min-h-screen p-8 mt-12">
          {/* Header */}
          <div className="text-center mb-24">
            <h1 className="text-6xl font-extrabold text-red-600 mb-2">
              Trouver la bonne batterie
            </h1>
            <p className="text-5xl text-gray-600">
              pour votre véhicule <span className='text-red-600'>{vehicle.brand} {vehicle.model}</span>
            </p>
          </div>

          {/* Battery Type Selection */}
          <div className="flex flex-row space-x-12 justify-around items-center mb-16 w-full">
            {batteryTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleBatteryTypeSelect(type.id)}
                className="flex flex-col items-center space-y-4 group hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                {/* Battery Image */}
                <div className="relative w-60 h-45">
                  {/* Battery Image */}
                    <img
                      src={type.image}
                      alt={`${type.name} battery`}
                      className="drop-shadow-lg"
                    />
                </div>
                
                {/* Battery Label */}
                <span 
                  className="text-3xl font-bold text-center"
                  style={{ color: type.color }}
                >
                  {type.name}
                </span>
              </button>
            ))}
          </div>

          {/* Help Section */}
          <div className="flex w-full justify-center flex-col items-center">
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
      </div>

      {/* Help Page Modal */}
      {showHelp && (
        <HelpPageRouter 
          category={category} 
          onClose={() => setShowHelp(false)} 
        />
      )}
    </>
  );
};

export default BatteriesQuestions; 