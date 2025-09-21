import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClickAnimation } from '../hooks/useClickAnimation';
import type { VehicleType } from '../types';
import { FLOW_CONFIG } from '../config/flowConfig';
import { databaseService } from '../db/database';
import { useEffect } from 'react';

// Import vehicle images
import motoImage from '../assets/img/homepage/moto.png';
import carImage from '../assets/img/homepage/car.png';
import vanImage from '../assets/img/homepage/van.png';

interface HomePageProps {
  onVehicleTypeSelect: (vehicleType: VehicleType) => void;
}

const HomePage = ({ onVehicleTypeSelect }: HomePageProps) => {
  const navigate = useNavigate();

  // Initialize database when homepage loads
  useEffect(() => {
    const initDatabase = async () => {
      console.log('🏠 HomePage: Initializing database...');
      try {
        await databaseService.initialize();
        console.log('🏠 HomePage: Database initialization completed');
      } catch (error) {
        console.error('🏠 HomePage: Database initialization failed:', error);
      }
    };

    initDatabase();
  }, []);

  const handleVehicleTypeSelect = (vehicleType: VehicleType) => {
    onVehicleTypeSelect(vehicleType);
    // Always navigate to vehicle selection first in the enhanced flow
    navigate('/vehicle-selection');
  };

  const motoAnimation = useClickAnimation({
    onComplete: () => handleVehicleTypeSelect('motorcycle')
  });

  const carAnimation = useClickAnimation({
    onComplete: () => handleVehicleTypeSelect('car')
  });

  const campingCarAnimation = useClickAnimation({
    onComplete: () => handleVehicleTypeSelect('truck')
  });

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-6">
        {/* Welcome title */}
        
        {/* Prompt text */}
        <div className="text-center mb-32">
          <h2 className="text-5xl text-[#1290AD]">
            <span className="">Choisissez votre </span>
            <span className="font-bold">type</span>
            <span className=""> de véhicule</span>
          </h2>
        </div>

        {/* Vehicle selection cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {/* Moto Card */}
          <motion.div
            onClick={motoAnimation.handleClick}
            className="relative cursor-pointer overflow-hidden shadow-lg"
            {...motoAnimation.animationProps}
          >
                <img 
                  src={motoImage} 
                  alt="Motorcycle"
                />

            
            {/* Bottom bar */}
            <div className="h-26 bg-[#FF9E00] flex items-center justify-center">
              <span className="text-white font-bold text-4xl uppercase text-shadow-lg">Moto</span>
            </div>
          </motion.div>

          {/* Voiture Card */}
          <motion.div
            onClick={carAnimation.handleClick}
            className="relative cursor-pointer overflow-hidden shadow-lg"
            {...carAnimation.animationProps}
          >

                <img 
                  src={carImage} 
                  alt="Car" 
                />

            {/* Bottom bar */}
            <div className="h-26 bg-[#0EA6BB] flex items-center justify-center px-4">
              <span className="text-white font-bold text-4xl uppercase text-shadow-lg">Voiture</span>
            </div>
          </motion.div>

          {/* Camping-car Card */}
          <motion.div
            onClick={campingCarAnimation.handleClick}
            className="relative cursor-pointer overflow-hidden shadow-lg"
            {...campingCarAnimation.animationProps}
          >

                <img 
                  src={vanImage} 
                  alt="Camping Car" 
                />

            
            {/* Bottom bar */}
            <div className="h-26 bg-[#908008] flex items-center justify-center px-4">
              <span className="text-white font-bold text-4xl uppercase text-shadow-lg">Camping-car</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-blue-300"></div>
    </div>
  );
};

export default HomePage;
