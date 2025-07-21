import type { Vehicle, ProductCategory } from '../../types';

interface WipersQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const WipersQuestions = ({ onAnswersComplete }: WipersQuestionsProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Indiquez l’emplacement de l’essuie-glace souhaité</h1>
        
        {/* Question 1: Position */}
        <div className="mb-12">
          
          <div className="flex flex-row space-x-8 justify-center">
            <button
              onClick={() => onAnswersComplete({ position: 'avant' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold">Conducteur</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ position: 'arriere' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold">Passager</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ position: 'arriere' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold">Arrière</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WipersQuestions; 