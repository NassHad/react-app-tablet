import type { ProductCategory } from '../../types';

interface BulbHelpPageProps {
  category: ProductCategory;
  onClose: () => void;
}

const BulbHelpPage = ({ category, onClose }: BulbHelpPageProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-yellow-50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="wavy-yellow" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q5,5 10,10 T20,10" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#wavy-yellow)"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Guide des ampoules
          </h1>
          <p className="text-2xl text-gray-600">
            Choisissez l'ampoule adaptée à votre véhicule
          </p>
        </div>

        {/* Content Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">
              Guide des ampoules
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contenu spécifique aux ampoules à venir...
            </p>
            <div className="text-6xl mb-6">💡</div>
            <p className="text-lg text-gray-500">
              Cette page sera personnalisée avec les informations spécifiques aux ampoules
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulbHelpPage;
