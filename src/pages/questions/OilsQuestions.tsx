import type { Vehicle, ProductCategory } from '../../types';

interface OilsQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const OilsQuestions = ({ onAnswersComplete }: OilsQuestionsProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Questions - Huiles</h1>
        
        {/* Question 1: Type d'huile */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Type d'huile</h2>
          <div className="flex flex-row space-x-8 justify-center">
            <button
              onClick={() => onAnswersComplete({ oilType: 'moteur' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🛢️</div>
              <h3 className="text-2xl font-semibold">Huile moteur</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ oilType: 'transmission' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🛢️</div>
              <h3 className="text-2xl font-semibold">Huile transmission</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ oilType: 'direction' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🛢️</div>
              <h3 className="text-2xl font-semibold">Huile direction</h3>
            </button>
          </div>
        </div>

        {/* Question 2: Viscosité */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Viscosité</h2>
          <div className="flex flex-row space-x-8 justify-center">
            <button
              onClick={() => onAnswersComplete({ oilType: 'moteur', viscosity: '5w30' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold">5W-30</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ oilType: 'moteur', viscosity: '5w40' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold">5W-40</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ oilType: 'moteur', viscosity: '10w40' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold">10W-40</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OilsQuestions; 