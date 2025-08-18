import type { UserSelection } from '../types';

interface ProductDetailsScreenProps {
  userSelection: UserSelection | null;
}

const ProductDetailsScreen = ({ userSelection }: ProductDetailsScreenProps) => {
  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="text-center">
        {userSelection?.vehicleType}
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Détails Produit</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Balai Bosch AeroTwin</h2>
          <p className="text-gray-600 mb-4">Balai d'essuie-glace avant pour Renault Clio</p>
          <p className="text-3xl font-bold text-green-600 mb-6">24.99€</p>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Demander à un vendeur
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen; 