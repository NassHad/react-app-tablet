import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { ProductCategory } from '../types';
import { dataService } from '../services/dataService';
import { useCategoryNavigation } from '../hooks/useClickAnimation';

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
  
  // Use the new category navigation hook
  const { handleCategoryNavigation } = useCategoryNavigation({
    updateUserSelection,
    userSelection,
    navigate
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await dataService.getProductCategories();
        
        // Filter only active categories
        const activeCategories = categoriesData.filter(category => category.active);
        setCategories(activeCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (category: ProductCategory) => {
    console.log('Category clicked:', category, 'Current userSelection:', userSelection);
    handleCategoryNavigation(category);
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

  // Function to get category-specific colors
  const getCategoryColors = (categorySlug: string) => {
    const colorMap: Record<string, { text: string; underline: string; hover: string }> = {
      'wipers': { text: 'text-[#93C452]', underline: 'bg-[#93C452]', hover: 'hover:text-[#93C452]' },
      'lights': { text: 'text-[#385383]', underline: 'bg-[#385383]', hover: 'hover:text-[#385383]' },
      'batteries': { text: 'text-[#FD171E]', underline: 'bg-[#FD171E]', hover: 'hover:text-[#FD171E]' },
      'filters': { text: 'text-orange-600', underline: 'bg-orange-600', hover: 'hover:text-orange-700' },
      'oil': { text: 'text-yellow-600', underline: 'bg-yellow-600', hover: 'hover:text-yellow-700' },
    };
    
    return colorMap[categorySlug] || { text: 'text-gray-600', underline: 'bg-gray-600', hover: 'hover:text-gray-700' };
  };

  // Don't show category navigation on home page or vehicle type selection
  if (location.pathname === '/' || location.pathname === '/vehicle-type' || location.pathname === '/vehicle') {
    return null;
  }

  if (loading) {
    return null;
  }

  return (
    <div className="flex items-center justify-center text-center w-full h-20">
      {/* Left side - Previous button - Hidden */}
      {/* <motion.button
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
      </motion.button> */}

      {/* Separator line - Hidden */}
      {/* <div className="w-px h-6 bg-gray-300 mx-4"></div> */}

      {/* Center - Category navigation */}
      <div className="flex items-center space-x-8">
        {categories.map((category) => {
          const isSelected = selectedCategory?.id === category.id;
          const displayName = category.name === "Balais d'essuie-glace" ? "Balai essuie-glace" : 
                             category.name === "Eclairage" ? "Éclairage" : category.name;
          const colors = getCategoryColors(category.slug);
          const isDisabled = category.slug === 'oil' || category.name.toLowerCase().includes('huile');
          
          return (
            <motion.button
              key={category.id}
              onClick={isDisabled ? undefined : () => handleCategoryClick(category)}
              className={`relative px-4 py-2 font-medium text-lg transition-colors ${
                isDisabled
                  ? 'text-gray-300 cursor-not-allowed opacity-70'
                  : isSelected 
                    ? `${colors.text} cursor-default` 
                    : `text-gray-500 ${colors.hover} cursor-pointer`
              }`}
              whileHover={isDisabled || isSelected ? {} : { scale: 1.05 }}
              whileTap={isDisabled || isSelected ? {} : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {displayName}
              {/* Category-specific colored underline for selected category */}
              {isSelected && !isDisabled && (
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${colors.underline}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Separator line - Hidden */}
      {/* <div className="w-px h-6 bg-gray-300 mx-4"></div> */}

      {/* Right side - Next button - Hidden */}
      {/* <motion.button
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
      </motion.button> */}
    </div>
  );
};

export default CategoryNavigation;
