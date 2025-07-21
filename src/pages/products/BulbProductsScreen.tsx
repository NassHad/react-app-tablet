import { useNavigate } from 'react-router-dom';
import type { UserSelection } from '../../types';

interface BulbProductsScreenProps {
  userSelection: UserSelection;
}

// Mock bulb products data
const MOCK_BULB_PRODUCTS = [
  { id: 1, brand: 'OSRAM', number: '2', type: 'H4', voltage: '12V' },
  { id: 2, brand: 'Philips', number: '2', type: 'H7', voltage: '12V' },
  { id: 3, brand: 'OSRAM', number: '4', type: 'H1', voltage: '12V' },
  { id: 4, brand: 'Philips', number: '2', type: 'H3', voltage: '12V' },
  { id: 5, brand: 'OSRAM', number: '2', type: 'H11', voltage: '12V' },
  { id: 6, brand: 'Philips', number: '2', type: 'H4', voltage: '12V' },
  { id: 7, brand: 'OSRAM', number: '2', type: 'H8', voltage: '12V' },
  { id: 8, brand: 'Philips', number: '4', type: 'H7', voltage: '12V' },
  { id: 9, brand: 'OSRAM', number: '2', type: 'H9', voltage: '12V' },
  { id: 10, brand: 'Philips', number: '2', type: 'H1', voltage: '12V' },
  { id: 11, brand: 'OSRAM', number: '2', type: 'H4', voltage: '24V' },
  { id: 12, brand: 'Philips', number: '2', type: 'H7', voltage: '24V' },
];

const BulbProductsScreen = ({ userSelection }: BulbProductsScreenProps) => {
  const navigate = useNavigate();

  const handleProductDetails = (productId: number) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Eclairage</h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-112 pb-8">
          <div className="space-y-4 px-8">
            {MOCK_BULB_PRODUCTS.map((product) => (
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
                    <span className="text-gray-600 text-lg">Nombre:</span>
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.number}</span>
                  </div>
                  
                  <div className="text-left">
                    <span className="text-gray-600 text-lg">Type:</span>
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.type}</span>
                  </div>

                  <div className="text-left">
                    <span className="text-gray-600 text-lg">Tension:</span>
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.voltage}</span>
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

export default BulbProductsScreen; 