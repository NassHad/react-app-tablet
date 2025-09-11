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
      
      // Filter only active categories
      const activeCategories = categories.filter(category => category.active);
      
      console.log('📊 Categories loaded from Strapi:', categories.length);
      console.log('📊 Active categories from Strapi:', activeCategories.length);
      console.log('📋 Active categories data:', activeCategories);
      
      // If no active categories from Strapi, use mock data
      if (activeCategories.length === 0) {
        console.log('📦 No active categories found in Strapi, using mock data...');
        return this.getMockCategories();
      }
      
      return activeCategories;
    } catch (error: any) {
      console.error('❌ Failed to load categories from Strapi:', error);
      console.log('📦 Falling back to mock categories...');
      
      // Log more details about the error
      if (error.response) {
        console.error('📡 Response status:', error.response.status);
        console.error('📡 Response data:', error.response.data);
        console.error('📡 Response headers:', error.response.headers);
      }
      
      // Return mock data instead of throwing error
      return this.getMockCategories();
    }
  }

  // Get products by category with optional filters
  async getProducts(category: string, filters?: Record<string, any>): Promise<Product[]> {
    try {
      console.log(`🌐 Attempting to fetch products for ${category} from Strapi...`);
      console.log(`🌐 Filters provided:`, filters);
      
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
      
      // If no products from Strapi, use mock data
      if (filteredProducts.length === 0) {
        console.log(`📦 No products found in Strapi for ${category}, using mock data...`);
        return this.getMockProducts(category, filters);
      }
      
      console.log(`📊 Products loaded from Strapi for ${category}:`, filteredProducts.length);
      return filteredProducts;
    } catch (error: any) {
      console.error(`❌ Failed to load products for ${category} from Strapi:`, error);
      console.log(`📦 Falling back to mock data for ${category}...`);
      
      // Log more details about the error
      if (error.response) {
        console.error('📡 Response status:', error.response.status);
        console.error('📡 Response data:', error.response.data);
        console.error('📡 Response headers:', error.response.headers);
      }
      
      // Return mock data instead of throwing error
      return this.getMockProducts(category, filters);
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
        await strapiClient.get('/');
        console.log('✅ Strapi API endpoint accessible');
      } catch (apiError: any) {
        console.log('⚠️ API endpoint test failed:', apiError?.response?.status || 'Unknown error');
      }
      
      // Then test categories endpoint
      try {
        await strapiClient.get('/categories');
        console.log('✅ Categories endpoint accessible');
        return true;
      } catch (categoriesError: any) {
        console.log('⚠️ Categories endpoint test failed:', categoriesError?.response?.status || 'Unknown error');
        
        // Try products endpoint as fallback
        try {
          await strapiClient.get('/products');
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

  // Mock categories data for fallback
  private getMockCategories(): ProductCategory[] {
    console.log('🎭 Using mock categories');
    
    return [
      {
        id: 1,
        name: 'Batterie',
        slug: 'battery',
        icon: 'battery-icon',
        active: true
      },
      {
        id: 2,
        name: 'Éclairage',
        slug: 'lights',
        icon: 'bulb-icon',
        active: true
      },
      {
        id: 3,
        name: 'Huile',
        slug: 'oil',
        icon: 'oil-icon',
        active: true
      },
      {
        id: 4,
        name: 'Filtration',
        slug: 'filtration',
        icon: 'filter-icon',
        active: true
      },
      {
        id: 5,
        name: 'Balais essuie-glace',
        slug: 'beg',
        icon: 'wiper-icon',
        active: true
      }
    ];
  }

  // Mock products data for fallback
  private getMockProducts(category: string, filters?: Record<string, any>): Product[] {
    console.log(`🎭 Using mock products for category: ${category}`);
    
    let mockProducts: Product[] = [];
    
    switch (category) {
      case 'battery':
        mockProducts = [
          {
            id: 1,
            brand: 'Varta',
            type: 'Blue Dynamic',
            category: 'battery',
            battery_type: 'standard',
            power: '74Ah',
            tension: '12V',
            voltage: '12V',
            reference: '574012068',
            size: '242x175x190mm'
          },
          {
            id: 2,
            brand: 'Bosch',
            type: 'S4 Silver',
            category: 'battery',
            battery_type: 'standard',
            power: '70Ah',
            tension: '12V',
            voltage: '12V',
            reference: 'S4 007',
            size: '242x175x190mm'
          },
          {
            id: 3,
            brand: 'Exide',
            type: 'Premium',
            category: 'battery',
            battery_type: 'efb',
            power: '70Ah',
            tension: '12V',
            voltage: '12V',
            reference: 'E700',
            size: '242x175x190mm'
          },
          {
            id: 4,
            brand: 'ACDelco',
            type: 'Professional',
            category: 'battery',
            battery_type: 'agm',
            power: '80Ah',
            tension: '12V',
            voltage: '12V',
            reference: 'ACD-80',
            size: '242x175x190mm'
          },
          {
            id: 5,
            brand: 'Yuasa',
            type: 'Silver',
            category: 'battery',
            battery_type: 'standard',
            power: '65Ah',
            tension: '12V',
            voltage: '12V',
            reference: 'YS-65',
            size: '242x175x190mm'
          }
        ];
        break;
        
      case 'lights':
        mockProducts = [
          {
            id: 4,
            brand: 'Osram',
            number: '1',
            type: 'Night Breaker Laser',
            category: 'lights',
            lighting_type: 'feu_croisement',
            power: '55W',
            voltage: '12V',
            reference: 'H7',
            size: 'H7'
          },
          {
            id: 5,
            brand: 'Philips',
            number: '2',
            type: 'Vision Plus',
            category: 'lights',
            lighting_type: 'feu_croisement',
            power: '55W',
            voltage: '12V',
            reference: 'H7',
            size: 'H7'
          },
          {
            id: 6,
            brand: 'Bosch',
            number: '1',
            type: 'Ultra Life',
            category: 'lights',
            lighting_type: 'feu_route',
            power: '55W',
            voltage: '12V',
            reference: 'H7',
            size: 'H7'
          },
          {
            id: 7,
            brand: 'Valeo',
            number: '1',
            type: 'Vision',
            category: 'lights',
            lighting_type: 'feu_position',
            power: '5W',
            voltage: '12V',
            reference: 'W5W',
            size: 'W5W'
          },
          {
            id: 8,
            brand: 'Hella',
            number: '1',
            type: 'Rallye',
            category: 'lights',
            lighting_type: 'feux_antibrouillard',
            power: '55W',
            voltage: '12V',
            reference: 'H3',
            size: 'H3'
          },
          {
            id: 9,
            brand: 'Osram',
            number: '1',
            type: 'LEDriving',
            category: 'lights',
            lighting_type: 'eclairage_jour',
            power: 'LED',
            voltage: '12V',
            reference: 'LED',
            size: 'LED'
          }
        ];
        break;
        
      case 'oil':
        mockProducts = [
          {
            id: 6,
            brand: 'Total',
            type: 'Quartz 9000',
            category: 'oil',
            power: '5W-30',
            quantity: '5L',
            reference: '9000 5W-30',
            size: '5L'
          },
          {
            id: 7,
            brand: 'Castrol',
            type: 'GTX',
            category: 'oil',
            power: '10W-40',
            quantity: '4L',
            reference: 'GTX 10W-40',
            size: '4L'
          }
        ];
        break;
        
      case 'filtration':
        mockProducts = [
          {
            id: 8,
            brand: 'Mann-Filter',
            type: 'C 25 001',
            category: 'filtration',
            reference: 'C 25 001',
            size: 'Standard'
          },
          {
            id: 9,
            brand: 'Bosch',
            type: 'F 026 400 043',
            category: 'filtration',
            reference: 'F 026 400 043',
            size: 'Standard'
          }
        ];
        break;
        
      case 'beg':
        mockProducts = [
          {
            id: 10,
            brand: 'Valeo',
            type: 'Silencio XTR',
            category: 'beg',
            size: '60cm',
            reference: 'V60'
          },
          {
            id: 11,
            brand: 'Bosch',
            type: 'Aerotwin',
            category: 'beg',
            size: '65cm',
            reference: 'A65'
          }
        ];
        break;
        
      default:
        mockProducts = [];
    }
    
    // Apply filters if provided
    if (filters) {
      console.log(`🔍 Applying filters to mock products:`, filters);
      console.log(`🔍 Mock products before filtering:`, mockProducts.length);
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          console.log(`🔍 Filtering by ${key} = ${value}`);
          const beforeCount = mockProducts.length;
          mockProducts = mockProducts.filter(product => {
            const productValue = product[key as keyof Product];
            const matches = productValue === value;
            console.log(`🔍 Product ${product.id} (${product.brand}): ${key} = "${productValue}" === "${value}" = ${matches}`);
            return matches;
          });
          console.log(`🔍 After filtering by ${key}: ${beforeCount} -> ${mockProducts.length} products`);
        }
      });
    }
    
    console.log(`🎭 Mock products for ${category}:`, mockProducts.length);
    
    // If no products match the filter, return all products for the category
    if (mockProducts.length === 0 && filters && Object.keys(filters).length > 0) {
      console.log(`⚠️ No products match the filter, returning all products for ${category}`);
      return this.getMockProducts(category, {}); // Call without filters
    }
    
    return mockProducts;
  }
}

export const strapiService = new StrapiService();