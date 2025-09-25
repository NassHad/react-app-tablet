import { ENV } from '../config/environment';

export interface BatteryMotorisation {
  id: string;
  motorisation: string;
  fuel: string;
  startDate: string;
  endDate: string;
  batteryModelId: number;
  batteryModelSlug: string;
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
  batteryModel: {
    id: number;
    name: string;
    slug: string;
    modelSlug: string;
  };
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
        throw new Error(`HTTP error! status: ${response.status}`);
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

  async getMotorisationsByBrandAndModel(brandSlug: string, modelSlug: string): Promise<BatteryApiResponse<BatteryMotorisation[]>> {
    const endpoint = `/battery-selection/motorisations?brandSlug=${encodeURIComponent(brandSlug)}&modelSlug=${encodeURIComponent(modelSlug)}`;
    return this.makeRequest<BatteryMotorisation[]>(endpoint);
  }

  async getBatteryModelsByBrandModelAndMotorisation(brandSlug: string, modelSlug: string, motorisation: string): Promise<BatteryApiResponse<BatteryModel[]>> {
    const endpoint = `/battery-selection/models?brandSlug=${encodeURIComponent(brandSlug)}&modelSlug=${encodeURIComponent(modelSlug)}&motorisation=${encodeURIComponent(motorisation)}`;
    return this.makeRequest<BatteryModel[]>(endpoint);
  }
}

export const batteryApiService = new BatteryApiService();
