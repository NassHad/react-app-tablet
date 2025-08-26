import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { VehicleType, ProductCategory, Vehicle } from '../types';
import { databaseService } from '../db/database';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { FLOW_CONFIG } from '../config/flowConfig';
import { checkProductAvailability } from '../utils/productAvailability';

interface CategoryScreenProps {
  vehicleType: VehicleType;
  vehicle?: Vehicle; // For new flow where vehicle is already selected
  onCategorySelect: (category: ProductCategory) => void;
}

const CategoryScreen = ({ vehicleType, vehicle, onCategorySelect }: CategoryScreenProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log("CategoryScreen - Loading categories");
        const categoriesData = await databaseService.getProductCategories();
        console.log("Categories loaded:", categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategorySelect = async (category: ProductCategory) => {
    console.log('Category selected:', category);
    onCategorySelect(category);
    
    if (FLOW_CONFIG.SELECT_VEHICLE_FIRST && vehicle) {
      // New flow: vehicle is already selected, check availability and navigate accordingly
      const productsAvailable = await checkProductAvailability(vehicle, category);
      
      if (!productsAvailable) {
        // Redirect to no products available page
        navigate('/no-products-available', { 
          state: { vehicle, category } 
        });
      } else {
        // Continue with normal flow - all categories go to questions first
        navigate('/questions');
      }
    } else {
      // Original flow: navigate to vehicle selection
      navigate('/vehicle');
    }
  };

  // Create animation hooks for each category at the top level
  const wiperAnimation = useClickAnimation({
    onComplete: () => {
      const category = categories.find(c => c.name === 'Balais d\'essuie-glace');
      if (category) {
        handleCategorySelect(category);
      }
    }
  });

  const batteryAnimation = useClickAnimation({
    onComplete: () => {
      const category = categories.find(c => c.name === 'Batteries');
      if (category) {
        handleCategorySelect(category);
      }
    }
  });

  const oilAnimation = useClickAnimation({
    onComplete: () => {
      const category = categories.find(c => c.name === 'Huiles');
      if (category) {
        handleCategorySelect(category);
      }
    }
  });

  const bulbAnimation = useClickAnimation({
    onComplete: () => {
      const category = categories.find(c => c.name === 'Eclairage');
      if (category) {
        handleCategorySelect(category);
      }
    }
  });

  const filtrationAnimation = useClickAnimation({
    onComplete: () => {
      const category = categories.find(c => c.name === 'Filtration');
      if (category) {
        handleCategorySelect(category);
      }
    }
  });

  // Create a mapping of category names to their animations
  const getCategoryAnimation = (categoryName: string) => {
    switch (categoryName) {
      case "Balais d'essuie-glace":
        return wiperAnimation;
      case 'Batteries':
        return batteryAnimation;
      case 'Huiles':
        return oilAnimation;
      case 'Eclairage':
        return bulbAnimation;
      case 'Filtration':
        return filtrationAnimation;
      default:
        return wiperAnimation; // fallback
    }
  };

  // Get the appropriate image for each category
  const getCategoryImage = (categoryName: string) => {
    switch (categoryName) {
      case "Balais d'essuie-glace":
        return '/assets/img/car.png'; // Using car.png as sample, should be wiper image
      case 'Batteries':
        return '/assets/img/car.png'; // Using car.png as placeholder for battery image
      case 'Huiles':
        return '/assets/img/car.png'; // Should be oil image
      case 'Eclairage':
        return '/assets/img/car.png'; // Should be lighting image
      case 'Filtration':
        return '/assets/img/car.png'; // Should be filter image
      default:
        return '/assets/img/car.png';
    }
  };

  // Get the appropriate background color for each category
  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case "Balais d'essuie-glace":
        return 'bg-green-500'; // Green for wipers
      case 'Batteries':
        return 'bg-red-500'; // Red for batteries
      case 'Huiles':
        return 'bg-yellow-500'; // Orange/Yellow for oil
      case 'Eclairage':
        return 'bg-blue-600'; // Dark blue for lighting
      case 'Filtration':
        return 'bg-blue-400'; // Light blue for filtration
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

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
        {/* Main title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#1290AD] mb-4">Que recherchez-vous ?</h1>
        </div>
        
        {/* Instruction text */}
        <div className="text-center mb-16">
          <h2 className="text-2xl text-gray-500">
            Cliquez sur une catégorie pour voir les produits
          </h2>
        </div>

        {/* Category selection cards */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {categories.map((category) => {
            const animation = getCategoryAnimation(category.name);
            const imageSrc = getCategoryImage(category.name);
            const bgColor = getCategoryColor(category.name);
            
            return (
              <motion.div
                key={category.id}
                onClick={animation.handleClick}
                className="relative w-80 h-96 bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300"
                {...animation.animationProps}
              >
                {/* Image */}
                <div className="w-full h-64 relative overflow-hidden">
                  <img 
                    src={imageSrc} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                {/* Bottom bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-16 ${bgColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl uppercase">
                    {category.name === "Balais d'essuie-glace" ? "Balai essuie-glace" : 
                     category.name === "Eclairage" ? "Éclairage" : category.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-blue-300"></div>
    </div>
  );
};

export default CategoryScreen; 