import { useNavigate } from 'react-router-dom';
import type { UserSelection } from '../../types';

interface WiperProductsScreenProps {
  userSelection: UserSelection;
}

// Mock wiper products data
const MOCK_WIPER_PRODUCTS = [
  { id: 1, brand: 'Valeo', type: 'VS70', size: '350mm' },
  { id: 2, brand: 'Bosch', type: 'Aerotwin', size: '400mm' },
  { id: 3, brand: 'Valeo', type: 'VS80', size: '380mm' },
  { id: 4, brand: 'Bosch', type: 'Aerotwin', size: '350mm' },
  { id: 5, brand: 'Valeo', type: 'VS60', size: '320mm' },
  { id: 6, brand: 'Bosch', type: 'Aerotwin', size: '420mm' },
  { id: 7, brand: 'Valeo', type: 'VS90', size: '450mm' },
  { id: 8, brand: 'Bosch', type: 'Aerotwin', size: '380mm' },
  { id: 9, brand: 'Valeo', type: 'VS100', size: '500mm' },
  { id: 10, brand: 'Bosch', type: 'Aerotwin', size: '360mm' },
  { id: 11, brand: 'Valeo', type: 'VS50', size: '300mm' },
  { id: 12, brand: 'Bosch', type: 'Aerotwin', size: '440mm' },
];

const WiperProductsScreen = ({ userSelection }: WiperProductsScreenProps) => {
  const navigate = useNavigate();

  const handleProductDetails = (productId: number) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-900 mt-12 mb-20">Balais d'essuie-glace</h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-112 pb-8">
          <div className="space-y-4 px-8">
            {MOCK_WIPER_PRODUCTS.map((product) => (
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
                    <span className="text-gray-600 text-lg">Taille:</span>
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.size}</span>
                  </div>
                </div>

                {/* Action Button */}
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

export default WiperProductsScreen; 