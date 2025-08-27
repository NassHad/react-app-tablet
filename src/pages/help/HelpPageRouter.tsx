import type { ProductCategory } from '../../types';
import { 
  BatteryHelpPage, 
  OilHelpPage, 
  BulbHelpPage, 
  FiltrationHelpPage, 
  WiperHelpPage 
} from './index';

interface HelpPageRouterProps {
  category: ProductCategory;
  onClose: () => void;
}

const HelpPageRouter = ({ category, onClose }: HelpPageRouterProps) => {
  console.log('category', category);
  const renderHelpPage = () => {
    switch (category.slug) {
      case 'batteries':
        return <BatteryHelpPage category={category} onClose={onClose} />;
      case 'oils':
        return <OilHelpPage category={category} onClose={onClose} />;
      case 'bulbs':
        return <BulbHelpPage category={category} onClose={onClose} />;
      case 'filtration':
        return <FiltrationHelpPage category={category} onClose={onClose} />;
      case 'wipers':
        return <WiperHelpPage category={category} onClose={onClose} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
              <h2 className="text-3xl font-bold text-gray-600 mb-4">
                Page d'aide non trouvée
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Aucune page d'aide disponible pour cette catégorie.
              </p>
              <button
                onClick={onClose}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        );
    }
  };

  return renderHelpPage();
};

export default HelpPageRouter;
