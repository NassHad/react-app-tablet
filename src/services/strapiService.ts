import axios from 'axios';
import { DATA_SOURCE_CONFIG } from '../config/dataSource';
import type { ProductCategory } from '../types';

// Configure axios with default settings
const strapiClient = axios.create({
  baseURL: DATA_SOURCE_CONFIG.strapi.apiUrl,
  timeout: DATA_SOURCE_CONFIG.strapi.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
strapiClient.interceptors.request.use(
  (config) => {
    console.log('🌐 Strapi Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Strapi Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
strapiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Strapi Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Strapi Response Error:', error.response?.status, error.config?.url, error.message);
    return Promise.reject(error);
  }
);

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

// ProductCategory interface is now imported from ../types

// Strapi-specific interface that matches the actual response
export interface StrapiProductCategory {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  id: number;
  brand: string;
  type: string;
  category: string;
  battery_type?: string;
  lighting_type?: string;
  power?: string;
  tension?: string;
  quantity?: string;
  voltage?: string;
  number?: string;
  reference?: string;
  size?: string;
}

class StrapiService {
  // Get all product categories
  async getProductCategories(): Promise<ProductCategory[]> {
    try {
      // First, try a simple request to see what's available
      console.log('🌐 Attempting to fetch categories from Strapi...');
      
      // Try different query approaches
      let response;
      
      // Approach 1: Simple request without filters
      try {
        console.log('🔍 Trying simple categories request...');
        response = await strapiClient.get<{ data: StrapiProductCategory[] }>('/categories');
        console.log('✅ Simple request successful');
      } catch (simpleError: any) {
        console.log('⚠️ Simple request failed, trying with basic filters...');
        
        // Approach 2: Basic filter syntax
        try {
          response = await strapiClient.get<{ data: StrapiProductCategory[] }>('/categories?filters[isActive]=true');
          console.log('✅ Basic filter request successful');
        } catch (basicError: any) {
          console.log('⚠️ Basic filter failed, trying without filters...');
          
          // Approach 3: No filters at all
          response = await strapiClient.get<{ data: StrapiProductCategory[] }>('/categories');
          console.log('✅ No-filter request successful');
        }
      }
      
      // Transform Strapi response to match your existing interface
      const categories = response.data.data.map((item: StrapiProductCategory) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        icon: item.icon || undefined, // Convert null to undefined to match interface
        active: item.isActive // Map isActive to active
      }));
      
      console.log('📊 Categories loaded from Strapi:', categories.length);
      console.log('📋 Categories data:', categories);
      return categories;
    } catch (error: any) {
      console.error('❌ Failed to load categories from Strapi:', error);
      
      // Log more details about the error
      if (error.response) {
        console.error('📡 Response status:', error.response.status);
        console.error('📡 Response data:', error.response.data);
        console.error('📡 Response headers:', error.response.headers);
      }
      
      throw error;
    }
  }

  // Get products by category with optional filters
  async getProducts(category: string, filters?: Record<string, any>): Promise<Product[]> {
    try {
      console.log(`🌐 Attempting to fetch products for ${category} from Strapi...`);
      
      // Try different query approaches
      let response;
      
      // Approach 1: Simple category filter
      try {
        console.log(`🔍 Trying simple products request for ${category}...`);
        response = await strapiClient.get<{ data: any[] }>(`/products?filters[category]=${category}`);
        console.log('✅ Simple category filter request successful');
      } catch (simpleError: any) {
        console.log(`⚠️ Simple category filter failed, trying without filters...`);
        
        // Approach 2: No filters
        response = await strapiClient.get<{ data: any[] }>('/products');
        console.log('✅ No-filter request successful');
      }
      
      // Transform Strapi response
      const products = response.data.data.map((item: any) => ({
        id: item.id,
        brand: item.brand || item.Brand || '',
        type: item.type || item.Type || '',
        category: item.category || item.Category || '',
        battery_type: item.battery_type || item.batteryType || null,
        lighting_type: item.lighting_type || item.lightingType || null,
        power: item.power || item.Power || null,
        tension: item.tension || item.Tension || null,
        quantity: item.quantity || item.Quantity || null,
        voltage: item.voltage || item.Voltage || null,
        number: item.number || item.Number || null,
        reference: item.reference || item.Reference || null,
        size: item.size || item.Size || null
      }));
      
      // If we got all products, filter by category locally
      let filteredProducts = products;
      if (response.data.data.length > 0 && !response.config.url?.includes('filters[category]')) {
        console.log(`🔍 Filtering ${products.length} products locally by category: ${category}`);
        filteredProducts = products.filter(product => product.category === category);
      }
      
      console.log(`📊 Products loaded from Strapi for ${category}:`, filteredProducts.length);
      return filteredProducts;
    } catch (error: any) {
      console.error(`❌ Failed to load products for ${category} from Strapi:`, error);
      
      // Log more details about the error
      if (error.response) {
        console.error('📡 Response status:', error.response.status);
        console.error('📡 Response data:', error.response.data);
        console.error('📡 Response headers:', error.response.headers);
      }
      
      throw error;
    }
  }

  // Get a single product by ID
  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await strapiClient.get<StrapiResponse<StrapiData<Product>>>(`/products/${id}`);
      
      const product = {
        ...response.data.data.attributes,
        id: response.data.data.id
      };
      
      console.log('📊 Product loaded from Strapi:', product.id);
      return product;
    } catch (error) {
      console.error(`❌ Failed to load product ${id} from Strapi:`, error);
      return null;
    }
  }

  // Search products
  async searchProducts(query: string, category?: string): Promise<Product[]> {
    try {
      let apiQuery = `/products?filters[$or][0][brand][$containsi]=${query}&filters[$or][1][type][$containsi]=${query}`;
      
      if (category) {
        apiQuery += `&filters[category][$eq]=${category}`;
      }
      
      const response = await strapiClient.get<StrapiResponse<StrapiData<Product>[]>>(apiQuery);
      
      const products = response.data.data.map(item => ({
        ...item.attributes,
        id: item.id
      }));
      
      console.log(`�� Search results for "${query}":`, products.length);
      return products;
    } catch (error) {
      console.error('❌ Search failed:', error);
      return [];
    }
  }

  // Test Strapi connection
  async testConnection(): Promise<boolean> {
    try {
      console.log('🧪 Testing Strapi connection...');
      
      // First test the base API endpoint
      try {
        const apiResponse = await strapiClient.get('/');
        console.log('✅ Strapi API endpoint accessible');
      } catch (apiError: any) {
        console.log('⚠️ API endpoint test failed:', apiError?.response?.status || 'Unknown error');
      }
      
      // Then test categories endpoint
      try {
        const response = await strapiClient.get('/categories');
        console.log('✅ Categories endpoint accessible');
        return true;
      } catch (categoriesError: any) {
        console.log('⚠️ Categories endpoint test failed:', categoriesError?.response?.status || 'Unknown error');
        
        // Try products endpoint as fallback
        try {
          const productsResponse = await strapiClient.get('/products');
          console.log('✅ Products endpoint accessible');
          return true;
        } catch (productsError: any) {
          console.log('⚠️ Products endpoint test failed:', productsError?.response?.status || 'Unknown error');
          return false;
        }
      }
    } catch (error: any) {
      console.error('❌ Strapi connection test failed:', error);
      
      if (error.response) {
        console.error('📡 Response status:', error.response.status);
        console.error('📡 Response data:', error.response.data);
      }
      
      return false;
    }
  }

  // Get Strapi status
  getStatus(): { baseUrl: string; isConnected: boolean } {
    return {
      baseUrl: DATA_SOURCE_CONFIG.strapi.baseUrl,
      isConnected: false // This will be updated when we test the connection
    };
  }
}

export const strapiService = new StrapiService();