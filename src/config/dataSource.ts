export const DataSource = {
  LOCAL_DATABASE: 'local_database',
  STRAPI: 'strapi'
} as const;

export type DataSource = typeof DataSource[keyof typeof DataSource];

export interface DataSourceConfig {
  currentSource: DataSource;
  strapi: {
    baseUrl: string;
    apiUrl: string;
    timeout: number;
  };
  localDatabase: {
    enabled: boolean;
    fallbackToMock: boolean;
  };
}

// Configuration to easily switch between data sources
export const DATA_SOURCE_CONFIG: DataSourceConfig = {
  currentSource: DataSource.STRAPI, // Change this to switch between sources
  
  strapi: {
    baseUrl: 'http://localhost:1338',
    apiUrl: 'http://localhost:1338/api',
    timeout: 10000,
  },
  
  localDatabase: {
    enabled: true, // Keep local DB as fallback
    fallbackToMock: true,
  }
};

// Helper function to check if we should use Strapi
export const shouldUseStrapi = (): boolean => {
  return DATA_SOURCE_CONFIG.currentSource === DataSource.STRAPI;
};

// Helper function to check if we should use local database
export const shouldUseLocalDatabase = (): boolean => {
  return DATA_SOURCE_CONFIG.currentSource === DataSource.LOCAL_DATABASE;
};

// Helper function to check if local database should be enabled as fallback
export const shouldEnableLocalDatabaseFallback = (): boolean => {
  return DATA_SOURCE_CONFIG.localDatabase.enabled;
};
