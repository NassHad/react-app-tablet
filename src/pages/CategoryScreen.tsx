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
        // Continue with normal flow
        if (category.slug === 'batteries') {
          navigate('/products');
        } else {
          navigate('/questions');
        }
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
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Catégories</h1>
        <div className="flex flex-row space-x-8 justify-center">
          {categories.map((category) => {
            const animation = getCategoryAnimation(category.name);
            return (
              <motion.button
                key={category.id}
                onClick={animation.handleClick}
                className="block w-64 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                {...animation.animationProps}
              >
                <div className="text-6xl mb-4">
                  {category.icon === 'wiper' && '🌧️'}
                  {category.icon === 'battery' && '🔋'}
                  {category.icon === 'oil' && '🛢️'}
                  {category.icon === 'bulb' && '💡'}
                  {category.icon === 'filter' && '🧰'}
                  {!category.icon && '📦'}
                </div>
                <h2 className="text-2xl font-semibold">{category.name}</h2>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen; 