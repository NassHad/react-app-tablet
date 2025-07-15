import type { Vehicle, ProductCategory } from '../types';

interface QuestionsScreenProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const QuestionsScreen = ({ onAnswersComplete }: QuestionsScreenProps) => {
  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Questions</h1>
        <div className="space-y-4">
          <button
            onClick={() => onAnswersComplete({ question1: 'Avant' })}
            className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold">Avant</h2>
          </button>
          <button
            onClick={() => onAnswersComplete({ question1: 'Arrière' })}
            className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold">Arrière</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsScreen; 