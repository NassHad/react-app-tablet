import { ENV } from './environment';

// API Configuration for Lights Integration
export const API_BASE_URL = ENV.STRAPI_API_URL;

// Feature flags
export const USE_MOCK_API = ENV.USE_MOCK_LIGHTS_API;

// API Endpoints
export const LIGHTS_API_ENDPOINTS = {
  BRANDS: '/lights-selection/brands',
  MODELS_BY_BRAND: '/lights-selection/models-by-brand',
  POSITIONS_BY_MODEL: '/lights-selection/model',
  LIGHT_DATA_BY_POSITION: '/lights-selection/model',
  SEARCH_MODEL: '/lights-selection/search',
  POSITIONS_BY_SLUGS: '/lights-selection/positions'
} as const;

// Request timeout (in milliseconds)
export const API_TIMEOUT = 10000;

// Retry configuration
export const API_RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  RETRY_BACKOFF_MULTIPLIER: 2
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  BRANDS_TTL: 5 * 60 * 1000, // 5 minutes
  MODELS_TTL: 3 * 60 * 1000, // 3 minutes
  POSITIONS_TTL: 2 * 60 * 1000, // 2 minutes
  LIGHT_DATA_TTL: 1 * 60 * 1000 // 1 minute
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre connexion internet.',
  TIMEOUT_ERROR: 'La requête a pris trop de temps. Veuillez réessayer.',
  SERVER_ERROR: 'Erreur du serveur. Veuillez réessayer plus tard.',
  NOT_FOUND: 'Aucune donnée trouvée.',
  UNAUTHORIZED: 'Accès non autorisé.',
  FORBIDDEN: 'Accès interdit.',
  VALIDATION_ERROR: 'Données invalides.',
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite.'
} as const;

// Development helpers
export const DEV_CONFIG = {
  ENABLE_LOGGING: import.meta.env.DEV || false,
  ENABLE_MOCK_DELAYS: import.meta.env.VITE_MOCK_API_DELAYS === 'true' || false,
  MOCK_DELAY_MIN: 200,
  MOCK_DELAY_MAX: 800
} as const;