import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClickAnimation } from '../hooks/useClickAnimation';
import type { VehicleType } from '../types';
import { FLOW_CONFIG } from '../config/flowConfig';

interface HomePageProps {
  onVehicleTypeSelect: (vehicleType: VehicleType) => void;
}

const HomePage = ({ onVehicleTypeSelect }: HomePageProps) => {
  const navigate = useNavigate();

  const handleVehicleTypeSelect = (vehicleType: VehicleType) => {
    onVehicleTypeSelect(vehicleType);
    // Navigate based on flow configuration - skip vehicle-type screen
    const nextRoute = FLOW_CONFIG.SELECT_VEHICLE_FIRST ? '/vehicle' : '/category';
    navigate(nextRoute);
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
      {/* Background waves effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Wave shapes - using CSS gradients to create abstract curved shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl transform rotate-12"></div>
            <div className="absolute top-40 right-20 w-80 h-80 bg-gray-200 rounded-full blur-3xl transform -rotate-6"></div>
            <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl transform rotate-45"></div>
            <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gray-200 rounded-full blur-3xl transform -rotate-12"></div>
            <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-white rounded-full blur-3xl transform rotate-30"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Welcome title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">Bienvenue dans l'expérience.</h1>
        </div>
        
        {/* Prompt text */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold">
            <span className="text-gray-500">Choisissez votre </span>
            <span className="text-[#1290AD]">type</span>
            <span className="text-gray-500"> de véhicule</span>
          </h2>
        </div>

        {/* Vehicle selection cards */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Moto Card */}
          <motion.div
            onClick={motoAnimation.handleClick}
            className="relative w-80 h-96 bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300"
            {...motoAnimation.animationProps}
          >
            {/* Image */}
            <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-blue-700/80"></div>
              {/* Motorcycle silhouette */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <svg className="w-32 h-32 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z"/>
                </svg>
              </div>
              {/* Road effect */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800/60 to-transparent"></div>
            </div>
            
            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#FF9E00] flex items-center justify-center">
              <span className="text-white font-bold text-xl uppercase">Moto</span>
            </div>
          </motion.div>

          {/* Voiture Card */}
          <motion.div
            onClick={carAnimation.handleClick}
            className="relative w-80 h-96 bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300"
            {...carAnimation.animationProps}
          >
            {/* Image */}
            <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-800/80"></div>
              {/* Car silhouette */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <svg className="w-32 h-32 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              {/* Road effect */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800/60 to-transparent"></div>
            </div>
            
            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0EA6BB] flex items-center justify-center">
              <span className="text-white font-bold text-xl uppercase">Voiture</span>
            </div>
          </motion.div>

          {/* Camping-car Card */}
          <motion.div
            onClick={campingCarAnimation.handleClick}
            className="relative w-80 h-96 bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300"
            {...campingCarAnimation.animationProps}
          >
            {/* Image */}
            <div className="w-full h-64 bg-gradient-to-br from-green-400 to-green-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/80 to-green-700/80"></div>
              {/* Camper van silhouette */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <svg className="w-32 h-32 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 5H3c-1.1 0-2 .9-2 2v9h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-6-6zM6 15.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-7l-3 3V9h-2V7.5l3-3H19.5z"/>
                </svg>
              </div>
              {/* Nature effect */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-800/60 to-transparent"></div>
            </div>
            
            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#908008] flex items-center justify-center">
              <span className="text-white font-bold text-xl uppercase">Camping-car</span>
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
