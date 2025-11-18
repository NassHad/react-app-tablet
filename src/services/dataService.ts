import { strapiService } from './strapiService';
import { databaseService } from '../db/database';
import { shouldUseStrapi, shouldUseLocalDatabase, shouldEnableLocalDatabaseFallback } from '../config/dataSource';
import type { ProductCategory } from '../types';
import type { Product } from './strapiService';

export interface DataServiceInterface {
  getProductCategories(): Promise<ProductCategory[]>;
  getProducts(category: string, filters?: Record<string, any>): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  searchProducts(query: string, category?: string): Promise<Product[]>;
  testConnection(): Promise<boolean>;
  getStatus(): { source: string; isConnected: boolean; baseUrl?: string };
}

class DataService implements DataServiceInterface {
  private currentSource: 'strapi' | 'local' = 'strapi';

  constructor() {
    this.currentSource = shouldUseStrapi() ? 'strapi' : 'local';
    console.log(`🔧 DataService initialized with source: ${this.currentSource}`);
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    try {
      if (shouldUseStrapi()) {
        console.log('📡 Fetching categories from Strapi...');
        const categories = await strapiService.getProductCategories();
        this.currentSource = 'strapi';
        return categories;
      } else if (shouldUseLocalDatabase()) {
        console.log('🗄️ Fetching categories from local database...');
        await databaseService.initialize();
        const categories = await databaseService.getProductCategories();
        this.currentSource = 'local';
        return categories;
      }
    } catch (error) {
      console.error('❌ Primary data source failed, trying fallback...', error);
      
      // Fallback to local database if Strapi fails
      if (shouldUseStrapi() && shouldEnableLocalDatabaseFallback()) {
        try {
          console.log('🔄 Falling back to local database...');
          await databaseService.initialize();
          const categories = await databaseService.getProductCategories();
          this.currentSource = 'local';
          return categories;
        } catch (fallbackError) {
          console.error('❌ Fallback also failed:', fallbackError);
          throw fallbackError;
        }
      }
      
      throw error;
    }
    
    throw new Error('No data source available');
  }

  async getProducts(category: string, filters?: Record<string, any>): Promise<Product[]> {
    try {
      if (shouldUseStrapi()) {
        console.log('📡 Fetching products from Strapi...');
        const products = await strapiService.getProducts(category, filters);
        this.currentSource = 'strapi';
        return products;
      } else if (shouldUseLocalDatabase()) {
        console.log('🗄️ Fetching products from local database...');
        await databaseService.initialize();
        const products = await databaseService.getProducts(category, filters);
        this.currentSource = 'local';
        return products;
      }
    } catch (error) {
      console.error('❌ Primary data source failed, trying fallback...', error);
      
      // Fallback to local database if Strapi fails
      if (shouldUseStrapi() && shouldEnableLocalDatabaseFallback()) {
        try {
          console.log('🔄 Falling back to local database...');
          await databaseService.initialize();
          const products = await databaseService.getProducts(category, filters);
          this.currentSource = 'local';
          return products;
        } catch (fallbackError) {
          console.error('❌ Fallback also failed:', fallbackError);
          throw fallbackError;
        }
      }
      
      throw error;
    }
    
    throw new Error('No data source available');
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      if (shouldUseStrapi()) {
        console.log('📡 Fetching product from Strapi...');
        const product = await strapiService.getProductById(id);
        this.currentSource = 'strapi';
        return product;
      } else if (shouldUseLocalDatabase()) {
        console.log('🗄️ Fetching product from local database...');
        await databaseService.initialize();
        const product = await databaseService.getProductById(id);
        this.currentSource = 'local';
        return product;
      }
    } catch (error) {
      console.error('❌ Primary data source failed, trying fallback...', error);
      
      // Fallback to local database if Strapi fails
      if (shouldUseStrapi() && shouldEnableLocalDatabaseFallback()) {
        try {
          console.log('🔄 Falling back to local database...');
          await databaseService.initialize();
          const product = await databaseService.getProductById(id);
          this.currentSource = 'local';
          return product;
        } catch (fallbackError) {
          console.error('❌ Fallback also failed:', fallbackError);
          throw fallbackError;
        }
      }
      
      throw error;
    }
    
    throw new Error('No data source available');
  }

  async searchProducts(query: string, category?: string): Promise<Product[]> {
    try {
      if (shouldUseStrapi()) {
        console.log('📡 Searching products in Strapi...');
        const products = await strapiService.searchProducts(query, category);
        this.currentSource = 'strapi';
        return products;
      } else if (shouldUseLocalDatabase()) {
        console.log('🗄️ Searching products in local database...');
        await databaseService.initialize();
        // Note: You might need to implement search in your local database service
        const allProducts = await databaseService.getProducts(category || '');
        const filteredProducts = allProducts.filter(product => 
          product.brand?.toLowerCase().includes(query.toLowerCase()) ||
          product.type?.toLowerCase().includes(query.toLowerCase())
        );
        this.currentSource = 'local';
        return filteredProducts;
      }
    } catch (error) {
      console.error('❌ Primary data source failed, trying fallback...', error);
      
      // Fallback to local database if Strapi fails
      if (shouldUseStrapi() && shouldEnableLocalDatabaseFallback()) {
        try {
          console.log('🔄 Falling back to local database...');
          await databaseService.initialize();
          const allProducts = await databaseService.getProducts(category || '');
          const filteredProducts = allProducts.filter(product => 
            product.brand?.toLowerCase().includes(query.toLowerCase()) ||
            product.type?.toLowerCase().includes(query.toLowerCase())
          );
          this.currentSource = 'local';
          return filteredProducts;
        } catch (fallbackError) {
          console.error('❌ Fallback also failed:', fallbackError);
          throw fallbackError;
        }
      }
      
      throw error;
    }
    
    throw new Error('No data source available');
  }

  async testConnection(): Promise<boolean> {
    try {
      if (shouldUseStrapi()) {
        console.log('🧪 Testing Strapi connection...');
        const isConnected = await strapiService.testConnection();
        if (isConnected) {
          this.currentSource = 'strapi';
          return true;
        }
      }
      
      if (shouldUseLocalDatabase() || shouldEnableLocalDatabaseFallback()) {
        console.log('🧪 Testing local database connection...');
        const isConnected = await databaseService.testConnection();
        if (isConnected) {
          this.currentSource = 'local';
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
  }

  getStatus(): { source: string; isConnected: boolean; baseUrl?: string } {
    if (this.currentSource === 'strapi') {
      const strapiStatus = strapiService.getStatus();
      return {
        source: 'Strapi Backend',
        isConnected: false, // This will be updated when we test the connection
        baseUrl: strapiStatus.baseUrl
      };
    } else {
      return {
        source: 'Local Database',
        isConnected: false, // This will be updated when we test the connection
      };
    }
  }

  // Method to manually switch data source
  switchDataSource(source: 'strapi' | 'local'): void {
    this.currentSource = source;
    console.log(`🔄 Data source switched to: ${source}`);
  }

  // Get current data source
  getCurrentSource(): string {
    return this.currentSource;
  }
}

export const dataService = new DataService();
