import type { Vehicle, ProductCategory } from '../../types';

interface BulbsQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const BulbsQuestions = ({ onAnswersComplete }: BulbsQuestionsProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Questions - Eclairage</h1>
        
        {/* Question 1: Type d'ampoule */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Type d'eclairage</h2>
          <div className="flex flex-row space-x-8 justify-center">
            <button
              onClick={() => onAnswersComplete({ bulbType: 'phare' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold">Phare</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ bulbType: 'feu' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold">Feu arrière</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ bulbType: 'clignotant' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold">Clignotant</h3>
            </button>
          </div>
        </div>

        {/* Question 2: Position */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Position</h2>
          <div className="flex flex-row space-x-8 justify-center">
            <button
              onClick={() => onAnswersComplete({ bulbType: 'phare', position: 'avant_gauche' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold">Avant gauche</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ bulbType: 'phare', position: 'avant_droite' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold">Avant droite</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ bulbType: 'phare', position: 'arriere_gauche' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold">Arrière gauche</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ bulbType: 'phare', position: 'arriere_droite' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold">Arrière droite</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulbsQuestions; 