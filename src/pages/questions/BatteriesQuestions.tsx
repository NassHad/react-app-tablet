import type { Vehicle, ProductCategory } from '../../types';

interface BatteriesQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const BatteriesQuestions = ({ onAnswersComplete }: BatteriesQuestionsProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mt-12 mb-20">Questions - Batteries</h1>
        
        {/* Question 1: Type de batterie */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Type de batterie</h2>
          <div className="flex flex-row space-x-8 justify-center">
            <button
              onClick={() => onAnswersComplete({ batteryType: 'plomb' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🔋</div>
              <h3 className="text-2xl font-semibold">Plomb</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ batteryType: 'gel' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🔋</div>
              <h3 className="text-2xl font-semibold">Gel</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ batteryType: 'agm' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">🔋</div>
              <h3 className="text-2xl font-semibold">AGM</h3>
            </button>
          </div>
        </div>

        {/* Question 2: Capacité */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Capacité (Ah)</h2>
          <div className="flex flex-row space-x-8 justify-center">
            <button
              onClick={() => onAnswersComplete({ batteryType: 'plomb', capacity: '45' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">45 Ah</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ batteryType: 'plomb', capacity: '60' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">60 Ah</h3>
            </button>
            <button
              onClick={() => onAnswersComplete({ batteryType: 'plomb', capacity: '70' })}
              className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold">70 Ah</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteriesQuestions; 