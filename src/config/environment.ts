// Configuration des variables d'environnement
export const config = {
  // Configuration Strapi
  strapi: {
    url: import.meta.env.VITE_STRAPI_URL || 'https://your-strapi-instance.com',
    apiToken: import.meta.env.VITE_STRAPI_API_TOKEN || 'your-api-token',
  },

  // Configuration de l'application
  app: {
    name: import.meta.env.VITE_APP_NAME || 'AutoParts Kiosk',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },

  // Configuration de développement
  development: {
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    mockData: import.meta.env.VITE_MOCK_DATA === 'true',
  },

  // Configuration de synchronisation
  sync: {
    interval: parseInt(import.meta.env.VITE_SYNC_INTERVAL || '3600000'), // 1 heure par défaut
    offlineMode: import.meta.env.VITE_OFFLINE_MODE === 'true',
  },

  // Configuration de la base de données
  database: {
    name: 'autoparts_kiosk.db',
    version: 1,
  },
};

// Fonction pour vérifier si l'application est en mode développement
export const isDevelopment = () => {
  return import.meta.env.DEV;
};

// Fonction pour vérifier si l'application est en mode production
export const isProduction = () => {
  return import.meta.env.PROD;
};

// Fonction pour obtenir la configuration selon l'environnement
export const getConfig = () => {
  if (isDevelopment()) {
    return {
      ...config,
      development: {
        ...config.development,
        debugMode: true,
        mockData: true,
      },
    };
  }

  return config;
}; 