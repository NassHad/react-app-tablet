// Vehicle type mapping for Strapi integration
// This maps your frontend vehicle types to Strapi vehicle type IDs

export const VEHICLE_TYPE_MAPPING = {
  car: 1,      // Map 'car' to Strapi vehicle type ID 1
  truck: 2,    // Map 'truck' to Strapi vehicle type ID 2  
  motorcycle: 3 // Map 'motorcycle' to Strapi vehicle type ID 3
} as const;

export type VehicleTypeKey = keyof typeof VEHICLE_TYPE_MAPPING;

// Helper function to get Strapi vehicle type ID
export const getStrapiVehicleTypeId = (vehicleType: string): number => {
  return VEHICLE_TYPE_MAPPING[vehicleType as VehicleTypeKey] || 1; // Default to car
};

// Helper function to get frontend vehicle type from Strapi ID
export const getFrontendVehicleType = (strapiId: number): string => {
  const entry = Object.entries(VEHICLE_TYPE_MAPPING).find(([_, id]) => id === strapiId);
  return entry ? entry[0] : 'car'; // Default to car
};
