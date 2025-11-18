import type { Vehicle, ProductCategory } from '../types';

// Mock function to check if products are available for a vehicle and category
// In a real implementation, this would query the database
export const checkProductAvailability = async (
  vehicle: Vehicle,
  category: ProductCategory
): Promise<boolean> => {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Mock logic - for demonstration purposes
  // In reality, this would check the database for compatible products
  
  // Example: No batteries for motorcycles
  if (category.slug === 'batteries' && vehicle.type === 'motorcycle') {
    return false;
  }
  
  // Example: No wipers for trucks older than 2010
  if (category.slug === 'wipers' && vehicle.type === 'truck' && vehicle.year && vehicle.year < 2010) {
    return false;
  }
  
  // Example: No oils for Renault Clio (mock example)
  if (category.slug === 'oils' && vehicle.brand === 'Renault' && vehicle.model === 'Clio') {
    return false;
  }
  
  // Default: products are available
  return true;
};

// Get the display name for a category
export const getCategoryDisplayName = (category: ProductCategory): string => {
  const categoryNames: Record<string, string> = {
    'wipers': 'balais d\'essuie-glace',
    'batteries': 'batteries',
    'oils': 'huiles',
    'bulbs': 'éclairage',
    'filtration': 'filtration'
  };
  
  return categoryNames[category.slug] || category.name;
};

// Get the vehicle display name
export const getVehicleDisplayName = (vehicle: Vehicle): string => {
  return `${vehicle.brand} ${vehicle.model}${vehicle.version ? ` ${vehicle.version}` : ''}`;
};