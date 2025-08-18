import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { ProductCategory } from '../types';
import { databaseService } from '../db/database';

import type { UserSelection } from '../types';

interface CategoryNavigationProps {
  selectedCategory?: ProductCategory | null;
  updateUserSelection?: (updates: Partial<UserSelection>) => void;
  userSelection?: UserSelection | null;
}

const CategoryNavigation = ({ selectedCategory, updateUserSelection, userSelection }: CategoryNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await databaseService.getProductCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (category: ProductCategory) => {
    // Update the user selection with the new category
    if (updateUserSelection) {
      updateUserSelection({ category });
    }
    
    // Check if we have a vehicle selected
    if (userSelection?.vehicle) {
      // If vehicle is selected, navigate to the next step based on the category
      if (category.slug === 'batteries') {
        navigate('/products');
      } else {
        navigate('/questions');
      }
    } else {
      // If no vehicle is selected, navigate to vehicle selection
      navigate('/vehicle');
    }
  };

  const handlePreviousClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    // Navigate to the next logical step based on current path
    if (location.pathname === '/category') {
      // If we have a selected category, navigate to questions or products
      if (selectedCategory) {
        if (selectedCategory.slug === 'batteries') {
          navigate('/products');
        } else {
          navigate('/questions');
        }
      }
    } else if (location.pathname === '/questions') {
      navigate('/products');
    }
  };

  // Don't show category navigation on home page or vehicle type selection
  if (location.pathname === '/' || location.pathname === '/vehicle-type' || location.pathname === '/vehicle') {
    return null;
  }

  if (loading) {
    return null;
  }

  return (
    <div className="bg-gray-100 border-t border-b border-gray-300 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Previous button */}
        <motion.button
          onClick={handlePreviousClick}
          className="flex items-center space-x-2 cursor-pointer hover:text-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-gray-500 font-medium">Précédent</span>
        </motion.button>

        {/* Separator line */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Center - Category navigation */}
        <div className="flex items-center space-x-8">
          {categories.map((category) => {
            const isSelected = selectedCategory?.id === category.id;
            const displayName = category.name === "Balais d'essuie-glace" ? "Balai essuie-glace" : 
                               category.name === "Eclairage" ? "Éclairage" : category.name;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`relative px-4 py-2 font-medium text-lg transition-colors ${
                  isSelected 
                    ? 'text-green-600 cursor-default' 
                    : 'text-gray-500 hover:text-gray-700 cursor-pointer'
                }`}
                whileHover={isSelected ? {} : { scale: 1.05 }}
                whileTap={isSelected ? {} : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {displayName}
                {/* Green underline for selected category */}
                {isSelected && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Separator line */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Right side - Next button */}
        <motion.button
          onClick={handleNextClick}
          className="flex items-center space-x-2 cursor-pointer hover:text-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-gray-500 font-medium">Suivant</span>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default CategoryNavigation;
