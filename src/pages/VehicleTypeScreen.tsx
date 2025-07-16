import { useNavigate } from 'react-router-dom';
import type { VehicleType } from '../types';

interface VehicleTypeScreenProps {
  onVehicleTypeSelect: (vehicleType: VehicleType) => void;
}

const VehicleTypeScreen = ({ onVehicleTypeSelect }: VehicleTypeScreenProps) => {
  const navigate = useNavigate();

  const handleVehicleTypeSelect = (vehicleType: VehicleType) => {
    onVehicleTypeSelect(vehicleType);
    navigate('/category');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Type de véhicule</h1>
        <div className="flex flex-row space-x-8 justify-center">
          <button
            onClick={() => handleVehicleTypeSelect('car')}
            className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-2xl font-semibold">Voiture</h2>
          </button>
          <button
            onClick={() => handleVehicleTypeSelect('truck')}
            className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-6xl mb-4">🚛</div>
            <h2 className="text-2xl font-semibold">Camion</h2>
          </button>
          <button
            onClick={() => handleVehicleTypeSelect('motorcycle')}
            className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-6xl mb-4">🏍️</div>
            <h2 className="text-2xl font-semibold">Moto</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleTypeScreen; 