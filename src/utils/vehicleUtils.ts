import type { VehicleType } from '../types';

/**
 * Converts vehicle type internal values to French display names
 * @param vehicleType - The internal vehicle type value
 * @returns The French display name for the vehicle type
 */
export const getVehicleTypeDisplayName = (vehicleType: VehicleType): string => {
  switch (vehicleType) {
    case 'car':
      return 'Voiture';
    case 'truck':
      return 'Camion';
    case 'motorcycle':
      return 'Moto';
    default:
      return vehicleType;
  }
};

/**
 * Converts vehicle type internal values to English display names
 * @param vehicleType - The internal vehicle type value
 * @returns The English display name for the vehicle type
 */
export const getVehicleTypeDisplayNameEn = (vehicleType: VehicleType): string => {
  switch (vehicleType) {
    case 'car':
      return 'Car';
    case 'truck':
      return 'Truck';
    case 'motorcycle':
      return 'Motorcycle';
    default:
      return vehicleType;
  }
};

/**
 * Gets all available vehicle types with their display names
 * @returns Array of vehicle types with French and English names
 */
export const getVehicleTypesWithNames = () => [
  { value: 'car' as VehicleType, nameFr: 'Voiture', nameEn: 'Car' },
  { value: 'truck' as VehicleType, nameFr: 'Camion', nameEn: 'Truck' },
  { value: 'motorcycle' as VehicleType, nameFr: 'Moto', nameEn: 'Motorcycle' },
];
