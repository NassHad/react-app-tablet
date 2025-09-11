
// import { useNavigate } from 'react-router-dom';
import type { UserSelection } from '../types';
import {
  WiperProductsScreen,
  BatteryProductsScreen,
  BulbProductsScreen,
  OilProductsScreen,
  FiltrationProductsScreen
} from './products';

interface ProductsScreenProps {
  userSelection: UserSelection;
}

const ProductsScreen = ({ userSelection }: ProductsScreenProps) => {
  // const _navigate = useNavigate();

  // Determine which product screen to show based on the selected category
  const renderProductScreen = () => {
    if (!userSelection.category) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg text-gray-600">Aucune catégorie sélectionnée</p>
          </div>
        </div>
      );
    }

    switch (userSelection.category.slug) {
      case 'beg':
        return <WiperProductsScreen userSelection={userSelection} />;
      case 'battery':
        return <BatteryProductsScreen userSelection={userSelection} />;
      case 'lights':
        return <BulbProductsScreen userSelection={userSelection} />;
      case 'oil':
        return <OilProductsScreen userSelection={userSelection} />;
      case 'filtration':
        return <FiltrationProductsScreen userSelection={userSelection} />;
      default:
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-lg text-gray-600">Catégorie non reconnue</p>
            </div>
          </div>
        );
    }
  };

  return renderProductScreen();
};

export default ProductsScreen; 