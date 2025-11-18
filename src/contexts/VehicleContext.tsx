import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { VehicleType, ProductCategory } from '../types';

export interface VehicleContextData {
  vehicleType: VehicleType | null;
  brand: string;
  model: string;
  dateCirculation: string;
  // Category-specific data
  motorisation?: string;
  position?: string;
  viscosity?: string;
  // Category selection
  selectedCategory: ProductCategory | null;
}

interface VehicleContextType {
  vehicleData: VehicleContextData;
  updateVehicleData: (data: Partial<VehicleContextData>) => void;
  resetVehicleData: () => void;
  setCategory: (category: ProductCategory | null) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

const initialVehicleData: VehicleContextData = {
  vehicleType: null,
  brand: '',
  model: '',
  dateCirculation: '',
  selectedCategory: null,
};

export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicleData, setVehicleData] = useState<VehicleContextData>(initialVehicleData);

  const updateVehicleData = (data: Partial<VehicleContextData>) => {
    setVehicleData(prev => ({ ...prev, ...data }));
  };

  const resetVehicleData = () => {
    setVehicleData(initialVehicleData);
  };

  const setCategory = (category: ProductCategory | null) => {
    setVehicleData(prev => ({ ...prev, selectedCategory: category }));
  };

  return (
    <VehicleContext.Provider value={{
      vehicleData,
      updateVehicleData,
      resetVehicleData,
      setCategory,
    }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicleContext must be used within a VehicleProvider');
  }
  return context;
};
