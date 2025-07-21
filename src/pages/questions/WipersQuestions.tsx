import type { Vehicle, ProductCategory } from '../../types';
import { useState } from 'react';

interface WipersQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const WipersQuestions = ({ onAnswersComplete }: WipersQuestionsProps) => {
  const [wiperType, setWiperType] = useState<string | null>(null);

  const handleWiperTypeSelect = (type: string) => {
    setWiperType(type);
  };

  const handlePositionSelect = (position: string) => {
    if (wiperType) {
      onAnswersComplete({ wiperType, position });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Balais d'essuie-glace</h1>
        {/* Question 1: Type de balai */}
        {!wiperType && (
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Type de balai</h2>
            <div className="flex flex-row space-x-8 justify-center">
              <button
                onClick={() => handleWiperTypeSelect('universel')}
                className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-2xl font-semibold">Universel</h3>
              </button>
              <button
                onClick={() => handleWiperTypeSelect('plat_origine')}
                className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4">🪛</div>
                <h3 className="text-2xl font-semibold">Plat origine</h3>
              </button>
              <button
                onClick={() => handleWiperTypeSelect('plat_retrofit')}
                className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4">⚙️</div>
                <h3 className="text-2xl font-semibold">Plat Retrofit</h3>
              </button>
            </div>
          </div>
        )}
        {/* Question 2: Position */}
        {wiperType && (
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Indiquez l’emplacement de l’essuie-glace souhaité</h2>
            <div className="flex flex-row space-x-8 justify-center">
              <button
                onClick={() => handlePositionSelect('conducteur')}
                className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-semibold">Conducteur</h3>
              </button>
              <button
                onClick={() => handlePositionSelect('passager')}
                className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-semibold">Passager</h3>
              </button>
              <button
                onClick={() => handlePositionSelect('arriere')}
                className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-semibold">Arrière</h3>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WipersQuestions; 