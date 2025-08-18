import type { Vehicle, ProductCategory } from '../../types';

interface FiltrationQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const FiltrationQuestions = ({ onAnswersComplete }: FiltrationQuestionsProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mt-12 mb-20">Questions - Filtration</h1>
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Type de filtre</h2>
          <div className="flex flex-row space-x-8 justify-center">
            <button
              onClick={() => onAnswersComplete({ filterType: 'gazole' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">⛽</div>
              <h3 className="text-2xl font-semibold">Filtres à gazole</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ filterType: 'air' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🌬️</div>
              <h3 className="text-2xl font-semibold">Filtres à Air</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ filterType: 'habitacle' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-semibold">Filtres d'Habitacle</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ filterType: 'huile' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🛢️</div>
              <h3 className="text-2xl font-semibold">Filtres à huile</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltrationQuestions; 