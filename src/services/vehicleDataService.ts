import { shouldUseStrapi } from '../config/dataSource';
import type { Brand, Model, DateRange } from '../utils/vehicleData';

// Import the original local data functions as fallback
import { 
  getBrands as getLocalBrands, 
  getModelsByBrand as getLocalModelsByBrand, 
  getDateRangesByModel as getLocalDateRangesByModel,
  getBrandById as getLocalBrandById,
  getModelById as getLocalModelById
} from '../utils/vehicleData';

class VehicleDataService {
  private strapiDataCache: {
    brands: Brand[];
    models: Model[];
    dateRanges: DateRange[];
    lastFetch: number;
  } | null = null;
  
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // No longer need StrapiService since we use direct fetch calls
  }





  // Check if cache is still valid
  private isCacheValid(): boolean {
    if (!this.strapiDataCache) return false;
    return Date.now() - this.strapiDataCache.lastFetch < this.CACHE_DURATION;
  }

  // Get brands with Strapi integration and local fallback
  async getBrands(): Promise<Brand[]> {
    try {
      if (shouldUseStrapi()) {
        console.log('🔄 Fetching brands from Strapi...');
        
        // Check cache first
        if (this.isCacheValid() && this.strapiDataCache?.brands) {
          console.log('📦 Using cached brands from Strapi');
          return this.strapiDataCache.brands;
        }

        try {
          // Use the lights-selection brands endpoint - more reliable as it's from actual products
          const response = await fetch('http://localhost:1338/api/lights-selection/brands');
          if (response.ok) {
            const data = await response.json();
            const brands = data.map((brand: any) => ({
              id: brand.id,
              name: brand.name,
              slug: brand.slug,
              isActive: brand.isActive
            }));
            
            // Update cache
            this.strapiDataCache = {
              brands,
              models: this.strapiDataCache?.models || [],
              dateRanges: this.strapiDataCache?.dateRanges || [],
              lastFetch: Date.now()
            };

            console.log('✅ Brands loaded from lights-selection API:', brands.length);
            return brands;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error('❌ Failed to load brands from lights-selection API, falling back to local data:', error);
          // Fallback to local data
          const localBrands = getLocalBrands();
          console.log('📦 Using local brands as fallback:', localBrands.length);
          return localBrands;
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch brands from Strapi, falling back to local data:', error);
    }

    // Fallback to local data
    console.log('🔄 Using local brands data');
    return getLocalBrands();
  }

  // Get models by brand with Strapi integration and local fallback
  async getModelsByBrand(brandId: number, _vehicleTypeId?: number): Promise<Model[]> {
    try {
      if (shouldUseStrapi()) {
        console.log(`🔄 Fetching models for brand ${brandId} from Strapi...`);
        
        // Check cache first
        if (this.isCacheValid() && this.strapiDataCache?.models) {
          const cachedModels = this.strapiDataCache.models.filter(model => model.brandId === brandId);
          if (cachedModels.length > 0) {
            console.log('📦 Using cached models from Strapi');
            return cachedModels;
          }
        }

        // Get all models and filter by brandId
        const allModels = await this.getAllModels();
        const brandModels = allModels.filter(model => model.brandId === brandId);
        
        console.log('✅ Models loaded from Strapi for brand:', brandModels.length);
        return brandModels;
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch models from Strapi, falling back to local data:', error);
    }

    // Fallback to local data
    console.log('🔄 Using local models data');
    return getLocalModelsByBrand(brandId);
  }

  // Get date ranges by model with Strapi integration and local fallback
  async getDateRangesByModel(modelId: number): Promise<DateRange[]> {
    try {
      if (shouldUseStrapi()) {
        console.log(`🔄 Fetching date ranges for model ${modelId} from Strapi...`);
        
        // Check cache first
        if (this.isCacheValid() && this.strapiDataCache?.dateRanges) {
          const cachedDateRanges = this.strapiDataCache.dateRanges.filter((dr: DateRange) => dr.modelId === modelId);
          if (cachedDateRanges.length > 0) {
            console.log('📦 Using cached date ranges from Strapi');
            return cachedDateRanges;
          }
        }

        // For now, return empty array since the new API doesn't have date ranges
        // This method is mainly used by the battery form which has its own logic
        console.log('⚠️ Date ranges not available in new API, returning empty array');
        return [];
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch date ranges from Strapi, falling back to local data:', error);
    }

    // Fallback to local data
    console.log('🔄 Using local date ranges data');
    return getLocalDateRangesByModel(modelId);
  }

  // Get brand by ID with Strapi integration and local fallback
  async getBrandById(brandId: number): Promise<Brand | undefined> {
    try {
      if (shouldUseStrapi()) {
        const brands = await this.getBrands();
        return brands.find(brand => brand.id === brandId);
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch brand from Strapi, falling back to local data:', error);
    }

    // Fallback to local data
    return getLocalBrandById(brandId);
  }

  // Get model by ID with Strapi integration and local fallback
  async getModelById(modelId: number): Promise<Model | undefined> {
    try {
      if (shouldUseStrapi()) {
        // We need to search through all models in cache or fetch them
        if (this.strapiDataCache?.models) {
          return this.strapiDataCache.models.find(model => model.id === modelId);
        }
        
        // If not in cache, we'd need to fetch all vehicles and process them
        // For now, fall back to local data
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch model from Strapi, falling back to local data:', error);
    }

    // Fallback to local data
    return getLocalModelById(modelId);
  }

  // Clear cache (useful for testing or when data needs to be refreshed)
  clearCache(): void {
    this.strapiDataCache = null;
    console.log('🗑️ Vehicle data cache cleared');
  }

  // Get models by brand slug with new API integration
  async getModelsByBrandSlug(brandSlug: string): Promise<Model[]> {
    try {
      if (shouldUseStrapi()) {
        console.log(`🔄 Fetching models for brand ${brandSlug} from Strapi...`);
        
        // Check cache first
        if (this.isCacheValid() && this.strapiDataCache?.models) {
          const cachedModels = this.strapiDataCache.models.filter(model => model.brandSlug === brandSlug);
          if (cachedModels.length > 0) {
            console.log('📦 Using cached models from Strapi');
            return cachedModels;
          }
        }

        try {
          // Use the new models-from-products endpoint - more reliable as it extracts from actual products
          const response = await fetch(`http://localhost:1338/api/lights-selection/models-from-products?brandSlug=${brandSlug}`);
          if (response.ok) {
            const responseData = await response.json();
            const data = responseData.data || responseData; // Handle both wrapped and direct responses
            const models = data.map((model: any) => ({
              id: model.id,
              name: model.name,
              brandSlug: model.brand?.slug || brandSlug,
              modelSlug: model.slug,
              brand: model.brand?.name || '',
              brandId: model.brand?.id || 0
            }));
            
            // Update cache
            if (this.strapiDataCache) {
              // Remove existing models for this brand and add new ones
              this.strapiDataCache.models = [
                ...this.strapiDataCache.models.filter(m => m.brandSlug !== brandSlug),
                ...models
              ];
            }

            console.log(`✅ Models loaded from products API for brand ${brandSlug}:`, models.length);
            return models;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error(`❌ Failed to load models for brand ${brandSlug} from products API:`, error);
          throw error;
        }
      }
    } catch (error) {
      console.warn(`⚠️ Failed to fetch models for brand ${brandSlug} from Strapi:`, error);
    }

    // Fallback to empty array
    console.log(`🔄 Using empty models array as fallback for brand ${brandSlug}`);
    return [];
  }

  // Get all models with new API integration (for backward compatibility)
  async getAllModels(): Promise<Model[]> {
    try {
      if (shouldUseStrapi()) {
        console.log('🔄 Fetching all models from Strapi...');
        
        // Check cache first
        if (this.isCacheValid() && this.strapiDataCache?.models) {
          console.log('📦 Using cached models from Strapi');
          return this.strapiDataCache.models;
        }

        try {
          // Try new API endpoints - fetch all models by setting large page size
          const response = await fetch('http://localhost:1338/api/models?populate=*&sort[0]=name:asc&pagination[pageSize]=1000');
          if (response.ok) {
            const data = await response.json();
            const models = data.data.map((model: any) => ({
              id: model.id,
              name: model.name,
              brandSlug: model.brand?.slug || '',
              modelSlug: model.slug,
              brand: model.brand?.name || '',
              brandId: model.brand?.id || 0
            }));
            
            // Update cache
            this.strapiDataCache = {
              brands: this.strapiDataCache?.brands || [],
              models,
              dateRanges: this.strapiDataCache?.dateRanges || [],
              lastFetch: Date.now()
            };

            console.log('✅ Models loaded from new API:', models.length);
            return models;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error('❌ Failed to load models from new API:', error);
          throw error;
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch models from Strapi:', error);
    }

    // Fallback to empty array
    console.log('🔄 Using empty models array as fallback');
    return [];
  }

  // Get cache status
  getCacheStatus(): { hasCache: boolean; isValid: boolean; lastFetch?: number } {
    return {
      hasCache: this.strapiDataCache !== null,
      isValid: this.isCacheValid(),
      lastFetch: this.strapiDataCache?.lastFetch
    };
  }
}

// Export singleton instance
export const vehicleDataService = new VehicleDataService();

// Export the class for testing
export { VehicleDataService };
