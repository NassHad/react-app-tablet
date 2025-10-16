import { useState, useCallback } from 'react';
import type { UserSelection } from '../types';

interface UseClickAnimationProps {
  onComplete?: () => void;
}

export const useClickAnimation = ({ onComplete }: UseClickAnimationProps = {}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    // Simulate animation duration
    setTimeout(() => {
      setIsAnimating(false);
      onComplete?.();
    }, 200);
  }, [isAnimating, onComplete]);

  const animationProps = {
    animate: isAnimating ? { scale: 0.95 } : { scale: 1 },
    transition: { duration: 0.1 }
  };

  return {
    isAnimating,
    handleClick,
    animationProps
  };
};

// New hook for handling category navigation with proper state management
interface UseCategoryNavigationProps {
  updateUserSelection?: (updates: Partial<UserSelection>) => void;
  userSelection?: UserSelection | null;
  navigate: (path: string) => void;
}

export const useCategoryNavigation = ({ 
  updateUserSelection, 
  userSelection, 
  navigate 
}: UseCategoryNavigationProps) => {
  
  const handleCategoryNavigation = useCallback(async (category: any) => {
    console.log('useCategoryNavigation - Category clicked:', category, 'Current userSelection:', userSelection);
    
    // Update the user selection with the new category
    if (updateUserSelection) {
      updateUserSelection({ category });
    }
    
    // Wait for state to be updated
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Determine the target path based on current state
    let targetPath: string;
    
    // Check if we have a vehicle selected
    if (userSelection?.vehicle) {
      // If vehicle is selected, navigate to the next step based on the category
      if (category.slug === 'batteries') {
        targetPath = '/products';
      } else if (category.slug === 'wipers' || category.slug === 'beg' || category.name.toLowerCase().includes('essuie-glace') || category.name.toLowerCase().includes('balais')) {
        targetPath = '/questions';
      } else {
        targetPath = '/questions';
      }
    } else {
      // If no vehicle is selected, navigate to vehicle selection
      targetPath = '/vehicle';
    }
    
    console.log('Navigating to:', targetPath, 'with category:', category);
    
    // Add a small additional delay to ensure React has processed the state update
    setTimeout(() => {
      navigate(targetPath);
    }, 50);
  }, [updateUserSelection, userSelection, navigate]);

  return {
    handleCategoryNavigation
  };
}; 