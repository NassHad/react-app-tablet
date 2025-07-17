import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedLayoutProps {
  children: ReactNode;
}

const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
  return (
    <div className="relative overflow-hidden" style={{ height: '100vh' }}>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedLayout; 