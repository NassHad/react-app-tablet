import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Vehicle, ProductCategory } from '../types';
import { getCategoryDisplayName, getVehicleDisplayName } from '../utils/productAvailability';
import { useClickAnimation } from '../hooks/useClickAnimation';

interface NoProductsAvailableScreenProps {
  vehicle: Vehicle;
  category: ProductCategory;
}

const NoProductsAvailableScreen = ({ vehicle, category }: NoProductsAvailableScreenProps) => {
  const navigate = useNavigate();
  
  const backAnimation = useClickAnimation({
    onComplete: () => {
      navigate('/category');
    }
  });

  const homeAnimation = useClickAnimation({
    onComplete: () => {
      navigate('/vehicle-type');
    }
  });

  const categoryName = getCategoryDisplayName(category);
  const vehicleName = getVehicleDisplayName(vehicle);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center w-full max-w-4xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-12"
        >
          {/* Icon */}
          <div className="text-8xl mb-8">😔</div>
          
          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Aucun produit disponible
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Nous ne disposons pas de <strong>{categoryName}</strong> pour votre véhicule{' '}
            <strong>{vehicleName}</strong>.
          </p>
          
          <p className="text-lg text-gray-500 mb-12">
            Merci de votre compréhension.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={backAnimation.handleClick}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              {...backAnimation.animationProps}
            >
              Choisir une autre catégorie
            </motion.button>
            
            <motion.button
              onClick={homeAnimation.handleClick}
              className="px-8 py-4 bg-gray-600 text-white rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors"
              {...homeAnimation.animationProps}
            >
              Recommencer
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoProductsAvailableScreen;