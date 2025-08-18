import { useNavigate } from 'react-router-dom';
import type { UserSelection } from '../../types';

interface OilProductsScreenProps {
  userSelection: UserSelection;
}

// Mock oil products data
const MOCK_OIL_PRODUCTS = [
  { id: 1, brand: 'Total', type: '5W-30', quantity: '5L' },
  { id: 2, brand: 'Mobil', type: '10W-40', quantity: '4L' },
  { id: 3, brand: 'Castrol', type: '5W-40', quantity: '5L' },
  { id: 4, brand: 'Total', type: '15W-40', quantity: '4L' },
  { id: 5, brand: 'Mobil', type: '0W-20', quantity: '5L' },
  { id: 6, brand: 'Castrol', type: '10W-30', quantity: '4L' },
  { id: 7, brand: 'Total', type: '5W-30', quantity: '1L' },
  { id: 8, brand: 'Mobil', type: '10W-40', quantity: '1L' },
  { id: 9, brand: 'Castrol', type: '5W-40', quantity: '1L' },
  { id: 10, brand: 'Total', type: '15W-40', quantity: '1L' },
  { id: 11, brand: 'Mobil', type: '0W-20', quantity: '1L' },
  { id: 12, brand: 'Castrol', type: '10W-30', quantity: '1L' },
];

const OilProductsScreen = ({ userSelection }: OilProductsScreenProps) => {
  const navigate = useNavigate();

  const handleProductDetails = (productId: number) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-900 mt-12 mb-20">Huiles moteur</h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-112 pb-8">
          <div className="space-y-4 px-8">
            {MOCK_OIL_PRODUCTS.map((product) => (
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
                    <span className="text-gray-600 text-lg">Quantité:</span>
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.quantity}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleProductDetails(product.id)}
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold ml-8"
                >
                  Plus d'infos
                </button>
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

export default OilProductsScreen; 