import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types locally to avoid import issues
export interface SimpleVehicleContextData {
  vehicleType: string | null;
  brand: string;
  model: string;
  dateCirculation: string;
  motorisation?: string;
  position?: string;
  viscosity?: string;
  selectedCategory: any | null;
}

interface SimpleVehicleContextType {
  vehicleData: SimpleVehicleContextData;
  updateVehicleData: (data: Partial<SimpleVehicleContextData>) => void;
  resetVehicleData: () => void;
  setCategory: (category: any | null) => void;
}

const SimpleVehicleContext = createContext<SimpleVehicleContextType | undefined>(undefined);

const initialVehicleData: SimpleVehicleContextData = {
  vehicleType: null,
  brand: '',
  model: '',
  dateCirculation: '',
  selectedCategory: null,
};

export const SimpleVehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicleData, setVehicleData] = useState<SimpleVehicleContextData>(initialVehicleData);

  const updateVehicleData = (data: Partial<SimpleVehicleContextData>) => {
    setVehicleData(prev => ({ ...prev, ...data }));
  };

  const resetVehicleData = () => {
    setVehicleData(initialVehicleData);
  };

  const setCategory = (category: any | null) => {
    setVehicleData(prev => ({ ...prev, selectedCategory: category }));
  };

  return (
    <SimpleVehicleContext.Provider value={{
      vehicleData,
      updateVehicleData,
      resetVehicleData,
      setCategory,
    }}>
      {children}
    </SimpleVehicleContext.Provider>
  );
};

export const useSimpleVehicleContext = () => {
  const context = useContext(SimpleVehicleContext);
  if (context === undefined) {
    throw new Error('useSimpleVehicleContext must be used within a SimpleVehicleProvider');
  }
  return context;
};
