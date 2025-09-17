import { StrapiService } from './strapiService';
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
  private strapiService: StrapiService;
  private strapiDataCache: {
    brands: Brand[];
    models: Model[];
    dateRanges: DateRange[];
    lastFetch: number;
  } | null = null;
  
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.strapiService = new StrapiService();
  }

  // Convert Strapi battery brands to local format
  private convertStrapiBatteryBrandsToLocal(strapiBrands: any[]): Brand[] {
    return strapiBrands.map((brand) => ({
      id: brand.id,
      name: brand.name
    }));
  }

  // Convert Strapi battery models to local format
  private convertStrapiBatteryModelsToLocal(strapiModels: any[]): { models: Model[], dateRanges: DateRange[] } {
    const models: Model[] = [];
    const dateRanges: DateRange[] = [];
    let modelId = 1;
    let dateRangeId = 1;

    strapiModels.forEach((batteryModel) => {
      // Create model entry
      const model: Model = {
        id: modelId,
        brandId: batteryModel.batteryBrand.id,
        name: batteryModel.name
      };
      models.push(model);

      // Create date range entry from startDate and endDate
      const dateRange = this.formatDateRange(batteryModel.startDate, batteryModel.endDate);
      dateRanges.push({
        id: dateRangeId,
        modelId: modelId,
        range: dateRange
      });

      modelId++;
      dateRangeId++;
    });

    return { models, dateRanges };
  }

  private formatDateRange(startDate: string, endDate: string): string {
    if (!startDate || !endDate) {
      return 'Date non spécifiée';
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}`;
    };
    
    return `de ${formatDate(start)} à ${formatDate(end)}`;
  }

  private convertStrapiVehiclesToLocal(strapiVehicles: any[], vehicleTypeId: number): { models: Model[], dateRanges: DateRange[] } {
    const models: Model[] = [];
    const dateRanges: DateRange[] = [];
    const modelMap = new Map<string, number>();
    let modelId = 1;
    let dateRangeId = 1;

    // Filter vehicles by vehicle type and process them
    const filteredVehicles = strapiVehicles.filter(vehicle => 
      vehicle.vehicle_type?.id === vehicleTypeId
    );

    filteredVehicles.forEach(vehicle => {
      // Create model entry
      const modelKey = `${vehicle.id_brand}-${vehicle.id_model}`;
      if (!modelMap.has(modelKey)) {
        modelMap.set(modelKey, modelId);
        models.push({
          id: modelId,
          brandId: vehicle.id_brand,
          name: `Model ${vehicle.id_model}` // Since we don't have model names in Strapi
        });
        modelId++;
      }

      const currentModelId = modelMap.get(modelKey)!;

      // Create date range entry
      const yearRange = this.formatYearToRange(vehicle.year);
      dateRanges.push({
        id: dateRangeId,
        modelId: currentModelId,
        range: yearRange
      });
      dateRangeId++;
    });

    return { models, dateRanges };
  }

  private formatYearToRange(year: number): string {
    const startYear = year;
    const endYear = year + 1;
    return `de ${startYear}-01 à ${endYear}-12`;
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
        console.log('🔄 Fetching battery brands from Strapi...');
        
        // Check cache first
        if (this.isCacheValid() && this.strapiDataCache?.brands) {
          console.log('📦 Using cached brands from Strapi');
          return this.strapiDataCache.brands;
        }

        try {
          const strapiBrands = await this.strapiService.getBatteryBrands();
          const brands = this.convertStrapiBatteryBrandsToLocal(strapiBrands);
          
          // Update cache
          this.strapiDataCache = {
            brands,
            models: this.strapiDataCache?.models || [],
            dateRanges: this.strapiDataCache?.dateRanges || [],
            lastFetch: Date.now()
          };

          console.log('✅ Battery brands loaded from Strapi:', brands.length);
          return brands;
        } catch (error) {
          console.error('❌ Failed to load brands from Strapi, falling back to local data:', error);
          // Fallback to local data
          const localBrands = getBrands();
          console.log('📦 Using local brands as fallback:', localBrands.length);
          return localBrands;
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch battery brands from Strapi, falling back to local data:', error);
    }

    // Fallback to local data
    console.log('🔄 Using local brands data');
    return getLocalBrands();
  }

  // Get models by brand with Strapi integration and local fallback
  async getModelsByBrand(brandId: number, vehicleTypeId?: number): Promise<Model[]> {
    try {
      if (shouldUseStrapi()) {
        console.log(`🔄 Fetching battery models for brand ${brandId} from Strapi...`);
        
        // Check cache first
        if (this.isCacheValid() && this.strapiDataCache?.models) {
          const cachedModels = this.strapiDataCache.models.filter(model => model.brandId === brandId);
          if (cachedModels.length > 0) {
            console.log('📦 Using cached models from Strapi');
            return cachedModels;
          }
        }

        // Fetch fresh data from Strapi using battery models
        try {
          const strapiBatteryModels = await this.strapiService.getBatteryModelsByBrand(brandId);
          const { models } = this.convertStrapiBatteryModelsToLocal(strapiBatteryModels);
          
          // Update cache
          if (this.strapiDataCache) {
            this.strapiDataCache.models = [
              ...this.strapiDataCache.models.filter(m => m.brandId !== brandId),
              ...models
            ];
          }

          console.log('✅ Battery models loaded from Strapi:', models.length);
          return models;
        } catch (error) {
          console.error('❌ Failed to load models from Strapi, falling back to local data:', error);
          // Fallback to local data
          const localModels = getModelsByBrand(brandId);
          console.log('📦 Using local models as fallback:', localModels.length);
          return localModels;
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch battery models from Strapi, falling back to local data:', error);
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
          const cachedDateRanges = this.strapiDataCache.dateRanges.filter(dr => dr.modelId === modelId);
          if (cachedDateRanges.length > 0) {
            console.log('📦 Using cached date ranges from Strapi');
            return cachedDateRanges;
          }
        }

        // For battery models, date ranges are created when we fetch models
        // So we need to get all battery models and find the one matching our modelId
        const strapiBatteryModels = await this.strapiService.getAllBatteryModels();
        const { dateRanges } = this.convertStrapiBatteryModelsToLocal(strapiBatteryModels);
        
        // Update cache
        if (this.strapiDataCache) {
          this.strapiDataCache.dateRanges = [
            ...this.strapiDataCache.dateRanges.filter(dr => dr.modelId !== modelId),
            ...dateRanges.filter(dr => dr.modelId === modelId)
          ];
        }

        const modelDateRanges = dateRanges.filter(dr => dr.modelId === modelId);
        console.log('✅ Date ranges loaded from Strapi:', modelDateRanges.length);
        return modelDateRanges;
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
