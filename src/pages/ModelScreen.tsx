import type { VehicleType } from '../types';

interface ModelScreenProps {
  vehicleType: VehicleType;
  brand: string;
  onModelSelect: (model: string) => void;
}

const ModelScreen = ({ brand, onModelSelect }: ModelScreenProps) => {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Modèles {brand}</h1>
        <div className="space-y-4">
          <button
            onClick={() => onModelSelect('Clio')}
            className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold">Clio</h2>
          </button>
          <button
            onClick={() => onModelSelect('Megane')}
            className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold">Megane</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelScreen; 