import { useNavigate } from 'react-router-dom';
import type { UserSelection } from '../../types';

interface BatteryProductsScreenProps {
  userSelection: UserSelection;
}

// Mock battery products data
const MOCK_BATTERY_PRODUCTS = [
  { id: 1, brand: 'Bosch', type: 'E43 Blue Dynamic', power: '72 Ah', tension: '470 A' },
  { id: 2, brand: 'Varta', type: 'Silver Dynamic', power: '60 Ah', tension: '540 A' },
  { id: 3, brand: 'Bosch', type: 'S4 Silver', power: '80 Ah', tension: '800 A' },
  { id: 4, brand: 'Varta', type: 'Blue Dynamic', power: '70 Ah', tension: '660 A' },
  { id: 5, brand: 'Bosch', type: 'S5 Silver', power: '95 Ah', tension: '850 A' },
  { id: 6, brand: 'Varta', type: 'Silver Dynamic', power: '65 Ah', tension: '600 A' },
  { id: 7, brand: 'Bosch', type: 'E44 Blue Dynamic', power: '74 Ah', tension: '680 A' },
  { id: 8, brand: 'Varta', type: 'Blue Dynamic', power: '55 Ah', tension: '480 A' },
  { id: 9, brand: 'Bosch', type: 'S6 Silver', power: '110 Ah', tension: '1000 A' },
  { id: 10, brand: 'Varta', type: 'Silver Dynamic', power: '75 Ah', tension: '700 A' },
  { id: 11, brand: 'Bosch', type: 'E45 Blue Dynamic', power: '77 Ah', tension: '720 A' },
  { id: 12, brand: 'Varta', type: 'Blue Dynamic', power: '50 Ah', tension: '440 A' },
];

const BatteryProductsScreen = ({ userSelection }: BatteryProductsScreenProps) => {
  const navigate = useNavigate();

  const handleProductDetails = (productId: number) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-category mt-12 mb-20 leading-15">Liste des batteries <span className='text-green-battery-category capitalize-first-letter'>{userSelection.answers?.batteryType}</span> compatible avec votre véhicule {userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</h1>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
          <div className="">
            {MOCK_BATTERY_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg flex items-center justify-between"
              >
                {/* Product Info - All on same row */}
                <div className="flex flex-row justify-between w-full border-b-1 border-[#E5E5E5] items-center py-1">
                  <div className="w-1/5">
                    <span className="ml-2 text-xl font-bold text-gray-900">{product.brand}</span>
                  </div>
                  
                  <div className="w-1/5">
                    <span className="ml-2 text-xl font-semibold text-gray-900 text-left">{product.type}</span>
                  </div>
                  
                  <div className="w-1/5">
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.power}</span>
                  </div>

                  <div className="w-1/5">
                    <span className="ml-2 text-xl font-semibold text-gray-900">{product.tension}</span>
                  </div>
                  <button
                    onClick={() => handleProductDetails(product.id)}
                    className="bg-green-battery-category text-white py-1 rounded-lg hover:opacity-80 transition-colors text-lg font-semibold ml-8 w-1/5"
                  >
                    Plus d'infos
                  </button>
                </div>

                {/* Action Button */}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 text-gray-500 text-lg leading-2">
          ↑ Faites glisser pour voir plus de produits ↓
        </div>
      </div>
    </div>
  );
};

export default BatteryProductsScreen; 