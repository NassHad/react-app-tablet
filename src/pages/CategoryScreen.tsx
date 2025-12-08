import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { ProductCategory, Vehicle } from '../types';
import { dataService } from '../services/dataService';
import { useClickAnimation } from '../hooks/useClickAnimation';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log("CategoryScreen - Loading categories");
        const categoriesData = await dataService.getProductCategories();
        console.log("Categories loaded:", categoriesData);
        
        // Filter only active categories
        const activeCategories = categoriesData.filter(category => category.active);
        
        // Sort categories: available first, then disabled
        const sortedCategories = activeCategories.sort((a, b) => {
          const aDisabled = a.slug === 'wipers' || a.slug === 'oil' || a.slug === 'filters' ||
                           a.name.toLowerCase().includes('balai') || 
                           a.name.toLowerCase().includes('huile') ||
                           a.name.toLowerCase().includes('filtration');
          const bDisabled = b.slug === 'wipers' || b.slug === 'oil' || b.slug === 'filters' ||
                           b.name.toLowerCase().includes('balai') || 
                           b.name.toLowerCase().includes('huile') ||
                           b.name.toLowerCase().includes('filtration');
          
          // Available categories (not disabled) come first
          if (!aDisabled && bDisabled) return -1;
          if (aDisabled && !bDisabled) return 1;
          return 0; // Keep original order for same type
        });
        
        console.log("Active categories:", sortedCategories);
        console.log("Categories count:", sortedCategories.length);
        console.log("Categories IDs:", sortedCategories.map(c => c.id));
        
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Check scroll state
  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Update scroll state when categories change
  useEffect(() => {
    checkScrollState();
    const handleResize = () => checkScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories]);

  // Add scroll event listener with throttling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let timeoutId: NodeJS.Timeout;
    const throttledCheckScrollState = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScrollState, 10);
    };

    scrollContainer.addEventListener('scroll', throttledCheckScrollState, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', throttledCheckScrollState);
      clearTimeout(timeoutId);
    };
  }, [categories]);

  const handleCategorySelect = async (category: ProductCategory) => {
    console.log('Category selected:', category);
    console.log('Vehicle data from props:', vehicle);
    onCategorySelect(category);
    
    // Check if we have vehicle data from props
    if (vehicle && vehicle.type && vehicle.brand && vehicle.model) {
      // We have vehicle data, check if category needs specific form
      if (category.slug === 'batteries' || category.name.toLowerCase().includes('batterie')) {
        // Navigate to battery-specific form
        navigate('/category-specific');
      } else if (category.slug === 'lights' || category.name.toLowerCase().includes('éclairage')) {
        // Navigate directly to questions page for lights
        navigate('/questions');
      } else if (category.slug === 'wipers' || category.slug === 'beg' || category.name.toLowerCase().includes('essuie-glace') || category.name.toLowerCase().includes('balais') || category.slug === 'filters' || category.name.toLowerCase().includes('filtration')) {
        // Navigate directly to questions page for wipers
        navigate('/questions');
      } else if (category.slug === 'oil' || category.name.toLowerCase().includes('huile')) {
        // Navigate to oil-specific form
        navigate('/category-specific');
      } else {
        // Navigate directly to products for other categories
        navigate('/products');
      }
    } else {
      // No vehicle data, navigate to vehicle selection
      navigate('/vehicle-selection');
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
      case "Essuie-glaces":
        return wiperAnimation;
      case 'Batterie':
      case 'Batteries':
        return batteryAnimation;
      case 'Huile':
      case 'Huiles':
        return oilAnimation;
      case 'Éclairage':
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
      case "Balais essuie-glace":
      case "Essuie-glaces":
        return begImage; // Wiper blades image
      case 'Batterie':
      case 'Batteries':
        return batteryImage; // Battery image
      case 'Huile':
      case 'Huiles':
        return oilImage; // Oil image
      case 'Éclairage':
      case 'Eclairage':
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
      case "Essuie-glaces":
        return 'bg-[#93C452]'; // Green for wipers
      case 'Batterie':
      case 'Batteries':
        return 'bg-[#FD171F]'; // Red for batteries
      case 'Huile':
      case 'Huiles':
        return 'bg-[#F3B11F]'; // Orange/Yellow for oil
      case 'Éclairage':
      case 'Eclairage':
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Previous button - Only shown on category page */}
      <div className="absolute top-4 left-4 z-20">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 cursor-pointer py-2 px-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6 text-gray-600"
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
          <span className="text-gray-600 font-medium text-lg">Précédent</span>
        </motion.button>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6 tablet-main-content">
        {/* Instruction text */}
        <div className="text-center mb-16 mt-8">
          <h2 className="text-5xl text-gray-500 tablet-title">
            Choisissez une catégorie
          </h2>
        </div>

        {/* Category selection cards */}
        <div className="relative w-full max-w-full tablet-category-container">
          {/* Left scroll button */}
          {canScrollLeft && (
            <motion.button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}

          {/* Right scroll button */}
          {canScrollRight && (
            <motion.button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}

          <div 
            ref={scrollContainerRef}
            className="w-full max-w-full overflow-x-auto category-scroll-container"
          >
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center min-w-max px-4 md:px-0 category-cards-container tablet-category-cards">
              {(() => { console.log("Rendering categories:", categories.map(c => ({ id: c.id, name: c.name }))); return null; })()}
              {categories.map((category) => {
                const animation = getCategoryAnimation(category.name);
                const imageSrc = getCategoryImage(category.name);
                const bgColor = getCategoryColor(category.name);
                
                // Check if category should be disabled
                const isDisabled = category.slug === 'oil' ||category.name.toLowerCase().includes('huile');
                
                return (
                  <motion.div
                    key={category.id}
                    onClick={isDisabled ? undefined : () => handleCategorySelect(category)}
                    className={`relative w-80 h-102 rounded-lg shadow-lg overflow-hidden flex-shrink-0 category-card tablet-category-card ${
                      isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                    }`}
                    {...(isDisabled ? {} : animation.animationProps)}
                  >
                    {/* Image */}
                    <img 
                      src={imageSrc} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Bottom bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-16 ${bgColor} flex items-center justify-center`}>
                      <span className="text-white font-bold text-2xl uppercase text-shadow-lg">
                        {category.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h4 className="text-5xl text-gray-500 mt-14 leading-12 tablet-subtitle">
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