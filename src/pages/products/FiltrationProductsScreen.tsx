import { useNavigate } from 'react-router-dom';
import type { UserSelection } from '../../types';

interface FiltrationProductsScreenProps {
  userSelection: UserSelection;
}

// Mock filtration products data
const MOCK_FILTRATION_PRODUCTS = [
  { id: 1, brand: 'Purflux', type: 'Filtre à gazole', reference: 'C123', compatible: true },
  { id: 2, brand: 'Mann', type: 'Filtre à air', reference: 'A456', compatible: true },
  { id: 3, brand: 'Bosch', type: 'Filtre d\'habitacle', reference: 'B789', compatible: true },
  { id: 4, brand: 'Purflux', type: 'Filtre à huile', reference: 'H101', compatible: true },
];

const FiltrationProductsScreen = ({ userSelection }: FiltrationProductsScreenProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-900 mt-12 mb-20">Filtration</h1>
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-112 pb-8">
          <div className="space-y-4 px-8">
            {MOCK_FILTRATION_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between"
              >
                {/* Product Info - All on same row */}
                <div className="flex items-center space-x-8">
                  <div className="text-left">
                    <span className="text-gray-600 text-lg">Marque:</span>
                    <span className="ml-2 text-xl font-bold text-gray-900">{product.brand}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-gray-600 text-lg">Type:</span>
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.type}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-gray-600 text-lg">Référence:</span>
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.reference}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="mt-8 text-gray-500 text-lg">
          ↑ Faites glisser pour voir plus de produits ↓
        </div>
      </div>
    </div>
  );
};

export default FiltrationProductsScreen; 