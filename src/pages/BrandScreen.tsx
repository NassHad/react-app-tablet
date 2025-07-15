import type { VehicleType, ProductCategory } from '../types';

interface BrandScreenProps {
  vehicleType: VehicleType;
  category: ProductCategory;
  onBrandSelect: (brand: string) => void;
}

const BrandScreen = ({ onBrandSelect }: BrandScreenProps) => {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Marques</h1>
        <div className="space-y-4">
          <button
            onClick={() => onBrandSelect('Renault')}
            className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold">Renault</h2>
          </button>
          <button
            onClick={() => onBrandSelect('Peugeot')}
            className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold">Peugeot</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandScreen; 