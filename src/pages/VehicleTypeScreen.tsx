import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { VehicleType } from '../types';
import { useClickAnimation } from '../hooks/useClickAnimation';

interface VehicleTypeScreenProps {
  onVehicleTypeSelect: (vehicleType: VehicleType) => void;
}

const VehicleTypeScreen = ({ onVehicleTypeSelect }: VehicleTypeScreenProps) => {
  const navigate = useNavigate();

  const handleVehicleTypeSelect = (vehicleType: VehicleType) => {
    onVehicleTypeSelect(vehicleType);
    navigate('/category');
  };

  const carAnimation = useClickAnimation({
    onComplete: () => handleVehicleTypeSelect('car')
  });

  const truckAnimation = useClickAnimation({
    onComplete: () => handleVehicleTypeSelect('truck')
  });

  const motorcycleAnimation = useClickAnimation({
    onComplete: () => handleVehicleTypeSelect('motorcycle')
  });

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Type de véhicule</h1>
        <div className="flex flex-row space-x-8 justify-center">
          <motion.button
            onClick={carAnimation.handleClick}
            className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            {...carAnimation.animationProps}
          >
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-2xl font-semibold">Voiture</h2>
          </motion.button>
          <motion.button
            onClick={truckAnimation.handleClick}
            className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            {...truckAnimation.animationProps}
          >
            <div className="text-6xl mb-4">🚛</div>
            <h2 className="text-2xl font-semibold">Camion</h2>
          </motion.button>
          <motion.button
            onClick={motorcycleAnimation.handleClick}
            className="block w-48 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            {...motorcycleAnimation.animationProps}
          >
            <div className="text-6xl mb-4">🏍️</div>
            <h2 className="text-2xl font-semibold">Moto</h2>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VehicleTypeScreen; 