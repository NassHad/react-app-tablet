import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  direction: 'forward' | 'backward';
}

const PageTransition = ({ children, direction }: PageTransitionProps) => {
  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'forward' | 'backward') => ({
      zIndex: 0,
      x: direction === 'forward' ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      key={Math.random()} // Force re-render for each page
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 