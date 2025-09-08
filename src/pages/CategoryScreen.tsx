import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ProductCategory, Vehicle } from '../types';
import { dataService } from '../services/dataService';
import { useClickAnimation } from '../hooks/useClickAnimation';
import { FLOW_CONFIG } from '../config/flowConfig';
import { checkProductAvailability } from '../utils/productAvailability';

// Import category images
import batteryImage from '../assets/img/categories/battery.png';
import begImage from '../assets/img/categories/beg.png';
import filtrationImage from '../assets/img/categories/filtration.png';
import lightsImage from '../assets/img/categories/lights.png';
import oilImage from '../assets/img/categories/oil.png';

interface CategoryScreenProps {
  vehicle?: Vehicle; // For new flow where vehicle is already selected
  onCategorySelect: (category: ProductCategory) => void;
}

const CategoryScreen = ({ vehicle, onCategorySelect }: CategoryScreenProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log("CategoryScreen - Loading categories");
        const categoriesData = await dataService.getProductCategories();
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
      const category = categories.find(c => c.name === 'Balais essuie-glace');
      if (category) {
        handleCategorySelect(category);
      }
    }
  });

  const batteryAnimation = useClickAnimation({
    onComplete: () => {
      const category = categories.find(c => c.name === 'Batterie');
      if (category) {
        handleCategorySelect(category);
      }
    }
  });

  const oilAnimation = useClickAnimation({
    onComplete: () => {
      const category = categories.find(c => c.name === 'Huile');
      if (category) {
        handleCategorySelect(category);
      }
    }
  });

  const bulbAnimation = useClickAnimation({
    onComplete: () => {
      const category = categories.find(c => c.name === 'Éclairage');
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
      case "Balais essuie-glace":
        return wiperAnimation;
      case 'Batterie':
        return batteryAnimation;
      case 'Huile':
        return oilAnimation;
      case 'Éclairage':
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
      case "Balais essuie-glace":
        return begImage; // Wiper blades image
      case 'Batterie':
        return batteryImage; // Battery image
      case 'Huile':
        return oilImage; // Oil image
      case 'Éclairage':
        return lightsImage; // Lighting image
      case 'Filtration':
        return filtrationImage; // Filter image
      default:
        return batteryImage; // Default to battery image
    }
  };

  // Get the appropriate background color for each category
  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case "Balais essuie-glace":
        return 'bg-[#93C452]'; // Green for wipers
      case 'Batterie':
        return 'bg-[#FD171F]'; // Red for batteries
      case 'Huile':
        return 'bg-[#F3B11F]'; // Orange/Yellow for oil
      case 'Éclairage':
        return 'bg-[#235387]'; // Dark blue for lighting
      case 'Filtration':
        return 'bg-[#96A7B9]'; // Light gray for filtration
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
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6 bg-waves-hp">
        {/* Instruction text */}
        <div className="text-center mb-16 mt-16">
          <h2 className="text-5xl text-gray-500">
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
                className="relative w-80 h-102 rounded-lg shadow-lg cursor-pointer overflow-hidden "
                {...animation.animationProps}
              >
                {/* Image */}

                  <img 
                    src={imageSrc} 
                    alt={category.name}
                    className="w-full h-full"
                  />
                
                {/* Bottom bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-16 ${bgColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl uppercase text-shadow-lg">
                    {category.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mb-16">
          <h4 className="text-4xl text-gray-500 mt-14 leading-12">
            Nos produits sont approuvés par les principaux <br /><span className="font-bold text-[#1290AD]">constructeurs automobiles</span>
          </h4>
        </div>
      </main>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-blue-300"></div>
    </div>
  );
};

export default CategoryScreen; 