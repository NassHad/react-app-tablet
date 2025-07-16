import { useNavigate } from 'react-router-dom';
import type { VehicleType } from '../types';
import motorcycleIcon from '../assets/img/motorcycle.png';
import carIcon from '../assets/img/car.png';
import campingCarIcon from '../assets/img/camping-car.png';

interface VehicleTypeScreenProps {
  onVehicleTypeSelect: (vehicleType: VehicleType) => void;
}

const VehicleTypeScreen = ({ onVehicleTypeSelect }: VehicleTypeScreenProps) => {
  const navigate = useNavigate();

  const vehicleTypes = [
    {
      type: 'motorcycle' as VehicleType,
      name: 'Moto',
      icon: motorcycleIcon,
      description: 'Deux-roues motorisés'
    },
    {
      type: 'car' as VehicleType,
      name: 'Voiture',
      icon: carIcon,
      description: 'Véhicules particuliers'
    },
    {
      type: 'camping-car' as VehicleType,
      name: 'Camping-car',
      icon: campingCarIcon,
      description: 'Véhicules utilitaires'
    }
  ];

  const handleVehicleTypeSelect = (vehicleType: VehicleType) => {
    console.log('Vehicle type selected:', vehicleType);
    onVehicleTypeSelect(vehicleType);
    navigate('/category');
    console.log("After navigate");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trouvez vos pièces auto
          </h1>
          <p className="text-xl text-gray-600">
            Sélectionnez le type de votre véhicule
          </p>
        </div>

        {/* Vehicle Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicleTypes.map((vehicleType) => (
            <div
              key={vehicleType.type}
              onClick={() => handleVehicleTypeSelect(vehicleType.type)}
              style={{
                backgroundImage: `url(${vehicleType.icon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="group relative transition-all duration-300 p-8 text-center border-2 border-transparent h-48 w-72 rounded-2xl"
            >         
            
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-lg">
            Touchez le type de véhicule qui correspond au vôtre
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleTypeScreen; 