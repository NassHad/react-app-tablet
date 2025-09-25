// Environment configuration for Vite
export const ENV = {
  // API Configuration
  STRAPI_API_URL: import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1338/api',
  
  // Feature Flags
  USE_MOCK_LIGHTS_API: import.meta.env.VITE_USE_MOCK_LIGHTS_API === 'true' || false,
  MOCK_API_DELAYS: import.meta.env.VITE_MOCK_API_DELAYS === 'true' || false,
  
  // Development
  DEV: import.meta.env.DEV || false,
  PROD: import.meta.env.PROD || false,
  
  // Mode
  MODE: import.meta.env.MODE || 'development',
} as const;

// Type-safe environment variable access
export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  return value || defaultValue || '';
};

// Boolean environment variable helper
export const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
};

// Number environment variable helper
export const getNumberEnvVar = (key: string, defaultValue: number = 0): number => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export default ENV;