// Environment configuration for Vite
export const ENV = {
  // API Configuration
  STRAPI_API_URL: import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1338/api',
  STRAPI_BASE_URL: import.meta.env.VITE_STRAPI_BASE_URL || 'http://localhost:1338',

  // Environment info
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',

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

// Helper function to construct full image URL
export const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return '/assets/img/placeholder-product.svg';

  // If path is already absolute, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Construct full URL using base URL
  return `${ENV.STRAPI_BASE_URL}${imagePath}`;
};

// Helper function for brand image URLs
export const getBrandImageUrl = (imagePath?: string): string => {
  if (!imagePath) return '/assets/img/placeholder-brand.svg';

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  return `${ENV.STRAPI_BASE_URL}${imagePath}`;
};

// Log environment info on initialization (only in development)
if (ENV.DEV) {
  console.log('%c🚀 Environment Configuration', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
  console.log(`%c📍 Environment: ${ENV.ENVIRONMENT}`, 'color: #10b981; font-weight: bold;');
  console.log(`%c🔗 API URL: ${ENV.STRAPI_API_URL}`, 'color: #8b5cf6;');
  console.log(`%c🖼️  Base URL: ${ENV.STRAPI_BASE_URL}`, 'color: #8b5cf6;');
  console.log(`%c🔧 Mode: ${ENV.MODE}`, 'color: #f59e0b;');
  console.log(`%c💾 Build: ${ENV.PROD ? 'PRODUCTION' : 'DEVELOPMENT'}`, 'color: #ef4444;');
}

export default ENV;