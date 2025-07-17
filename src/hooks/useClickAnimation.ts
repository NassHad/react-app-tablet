import { useState } from 'react';

interface UseClickAnimationProps {
  onComplete: () => void;
  delay?: number;
}

export const useClickAnimation = ({ onComplete, delay = 500 }: UseClickAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return; // Prevent multiple clicks
    
    setIsAnimating(true);
    
    // Execute the navigation after the animation delay
    setTimeout(() => {
      onComplete();
      setIsAnimating(false);
    }, delay);
  };

  return {
    handleClick,
    isAnimating,
    animationProps: {
      whileTap: { scale: 0.85 },
      transition: { duration: 0.1 }
    }
  };
}; 