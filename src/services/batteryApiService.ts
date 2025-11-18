import { ENV } from '../config/environment';

export interface BatteryTypes {
  AGM: string | null;
  EFB: string | null;
  Conventional: string | null;
}

export interface BatteryMotorisation {
  id: string;
  motorisation: string;
  fuel: string;
  startDate: string;
  endDate: string;
  batteryTypes?: BatteryTypes; // Optional since fallback endpoint doesn't have this
  batteryProductId?: number;
  batteryProductSlug?: string;
  batteryModelId?: number; // From fallback endpoint
  batteryModelSlug?: string; // From fallback endpoint
}

export interface BatteryProduct {
  id: number;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  modelName: string;
  modelSlug: string;
  motorisations?: Array<{
    motorisation: string;
    fuel: string;
    startDate: string;
    endDate: string;
    batteryAGM: string;
    batteryEFB: string;
    batteryConventional: string;
  }>;
  isActive?: boolean;
  source?: string;
  category?: string;
}

export interface BatteryModel {
  id: number;
  name: string;
  slug: string;
  modelSlug: string;
  batteryBrand: {
    id: number;
    name: string;
    slug: string;
  };
  model: {
    id: number;
    name: string;
    slug: string;
    brand: {
      id: number;
      name: string;
      slug: string;
    };
  };
  motorisations: BatteryMotorisation[];
  isActive: boolean;
}

export interface BatteryMotorisationsResponse {
  data: BatteryMotorisation[];
  success: boolean;
  message: string;
  // product: BatteryProduct;
}

export interface BatteryModelsResponse {
  data: BatteryModel[];
  success: boolean;
  message: string;
}

export interface BatteryApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class BatteryApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = ENV.STRAPI_API_URL;
  }

  private async makeRequest<T>(endpoint: string): Promise<BatteryApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log(`🔋 Battery API Call: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.log(`🔋 API returned ${response.status} for ${endpoint}`);
        return {
          data: null as T,
          success: false,
          message: `HTTP error! status: ${response.status}`
        };
      }
      
      const data = await response.json();
      console.log(`🔋 Battery API Response:`, data);
      
      return {
        data: data.data || data,
        success: data.success !== false,
        message: data.message
      };
    } catch (error) {
      console.error('🔋 Battery API Error:', error);
      return {
        data: null as T,
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getBatteryProductsBySlugs(brandSlug: string, modelSlug: string): Promise<BatteryApiResponse<BatteryMotorisation[]>> {
    // Try the custom endpoint first (if available)
    const customEndpoint = `/battery-products/by-slugs?brandSlug=${encodeURIComponent(brandSlug)}&modelSlug=${encodeURIComponent(modelSlug)}`;
    const customResponse = await this.makeRequest<BatteryMotorisation[]>(customEndpoint);
    
    if (customResponse.success) {
      return customResponse;
    } else {
      console.log('Custom endpoint not available, using fallback');
    }

    // Fallback: Get all battery products and filter by brand/model
    const allProductsResponse = await this.makeRequest<BatteryProduct[]>(`/battery-products`);
    
    if (!allProductsResponse.success || !allProductsResponse.data) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch battery products'
      };
    }

    // Filter products by brand and model
    const matchingProducts = allProductsResponse.data.filter(product => 
      product.brandSlug?.toLowerCase() === brandSlug.toLowerCase() &&
      product.modelSlug?.toLowerCase() === modelSlug.toLowerCase()
    );

    if (matchingProducts.length === 0) {
      return {
        data: [],
        success: true,
        message: `No battery products found for ${brandSlug} ${modelSlug}`
      };
    }

    // Convert battery products to motorisations format
    const motorisations: BatteryMotorisation[] = [];
    matchingProducts.forEach((product, productIndex) => {
      if (product.motorisations && Array.isArray(product.motorisations)) {
        product.motorisations.forEach((motor, motorIndex) => {
          motorisations.push({
            id: `${product.id}-${motorIndex}`,
            motorisation: motor.motorisation,
            fuel: motor.fuel,
            startDate: motor.startDate,
            endDate: motor.endDate,
            batteryTypes: {
              AGM: motor.batteryAGM || null,
              EFB: motor.batteryEFB || null,
              Conventional: motor.batteryConventional || null,
            },
            batteryProductId: product.id,
            batteryProductSlug: product.slug,
          });
        });
      }
    });

    return {
      data: motorisations,
      success: true,
      message: `Found ${motorisations.length} motorisation(s) with battery types for ${brandSlug} ${modelSlug}`
    };
  }

  async getBatteryProductsByBrand(brandSlug: string): Promise<BatteryApiResponse<BatteryProduct[]>> {
    const endpoint = `/battery-products/by-brand?brandSlug=${encodeURIComponent(brandSlug)}`;
    return this.makeRequest<BatteryProduct[]>(endpoint);
  }

  async getBatteryTypesSummary(): Promise<BatteryApiResponse<any>> {
    const endpoint = `/battery-products/battery-types-summary`;
    return this.makeRequest<any>(endpoint);
  }

  async getBatteryModelsByBrandModelAndMotorisation(brandSlug: string, modelSlug: string, motorisation: string): Promise<BatteryApiResponse<BatteryModel[]>> {
    const endpoint = `/battery-selection/models?brandSlug=${encodeURIComponent(brandSlug)}&modelSlug=${encodeURIComponent(modelSlug)}&motorisation=${encodeURIComponent(motorisation)}`;
    return this.makeRequest<BatteryModel[]>(endpoint);
  }
}

export const batteryApiService = new BatteryApiService();
