import type { ProductCategory } from '../../types';
import carBulbsNeedHelp from '../../assets/img/car-bulbs-need-help.JPG';

interface BulbHelpPageProps {
  category: ProductCategory;
  onClose: () => void;
}

const BulbHelpPage = ({ category, onClose }: BulbHelpPageProps) => {
  return (
    <div className="fixed inset-0 z-50 min-h-screen overflow-auto bg-white">
      {/* Full page image */}
      <div className="relative w-full h-full">
        <img
          src={carBulbsNeedHelp}
          alt="Guide des ampoules"
          className="w-full h-full object-contain"
        />
        
        {/* Close Button - positioned absolutely over the image */}
        <div className="absolute bottom-18 right-24 opacity-0">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg shadow-lg cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulbHelpPage;
