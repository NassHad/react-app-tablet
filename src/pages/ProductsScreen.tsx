import type { UserSelection } from '../types';

interface ProductsScreenProps {
  userSelection: UserSelection;
}

const ProductsScreen = ({ userSelection }: ProductsScreenProps) => {
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
      <div className="text-center">
        {userSelection.vehicleType}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Produits</h1>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Balai Bosch</h2>
            <p className="text-gray-600">24.99€</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Balai Valeo</h2>
            <p className="text-gray-600">19.99€</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsScreen; 