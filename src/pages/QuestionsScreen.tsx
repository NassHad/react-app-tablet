import { useNavigate } from 'react-router-dom';
import type { Vehicle, ProductCategory } from '../types';
import WipersQuestions from './questions/WipersQuestions';
import BatteriesQuestions from './questions/BatteriesQuestions';
import OilsQuestions from './questions/OilsQuestions';
import BulbsQuestions from './questions/BulbsQuestions';

interface QuestionsScreenProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const QuestionsScreen = ({ vehicle, category, onAnswersComplete }: QuestionsScreenProps) => {
  const navigate = useNavigate();

  const handleAnswersComplete = (answers: Record<string, string | string[]>) => {
    onAnswersComplete(answers);
    navigate('/products');
  };

  // Map category slugs to their respective question components
  const getQuestionsComponent = () => {
    switch (category.slug) {
      case 'wipers':
        return <WipersQuestions vehicle={vehicle} category={category} onAnswersComplete={handleAnswersComplete} />;
      case 'batteries':
        return <BatteriesQuestions vehicle={vehicle} category={category} onAnswersComplete={handleAnswersComplete} />;
      case 'oils':
        return <OilsQuestions vehicle={vehicle} category={category} onAnswersComplete={handleAnswersComplete} />;
      case 'bulbs':
        return <BulbsQuestions vehicle={vehicle} category={category} onAnswersComplete={handleAnswersComplete} />;
      default:
        // Fallback for unknown categories
        return (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Questions</h1>
              <div className="space-y-4">
                <button
                  onClick={() => handleAnswersComplete({ question1: 'Option 1' })}
                  className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all mx-auto"
                >
                  <h2 className="text-xl font-semibold">Option 1</h2>
                </button>
                <button
                  onClick={() => handleAnswersComplete({ question1: 'Option 2' })}
                  className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all mx-auto"
                >
                  <h2 className="text-xl font-semibold">Option 2</h2>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return getQuestionsComponent();
};

export default QuestionsScreen; 