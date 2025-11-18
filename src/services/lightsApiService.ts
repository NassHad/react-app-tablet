import type { 
  LightPosition, 
  LightData, 
  BrandData, 
  ModelData, 
  LightsProduct,
  LightsSelectionResponse
} from '../types/lights';
import { USE_MOCK_API } from '../config/lightsApiConfig';
import { mockLightsApiService } from './mockLightsApiService';
import { ENV } from '../config/environment';

// Base API configuration
const API_BASE_URL = ENV.STRAPI_API_URL;

class LightsApiService {
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<LightsSelectionResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return {
        data: responseData.data || responseData, // Handle both wrapped and direct responses
        success: true,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        data: null as T,
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get all available brands for lights selection
   */
  async getBrands(): Promise<LightsSelectionResponse<BrandData[]>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.getBrands();
      return { data, success: true };
    }
    return this.makeRequest<BrandData[]>('/lights-selection/brands');
  }

  /**
   * Get all models for a specific brand
   */
  async getModelsByBrand(brandId: string): Promise<LightsSelectionResponse<ModelData[]>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.getModelsByBrand(brandId);
      return { data, success: true };
    }
    return this.makeRequest<ModelData[]>(`/lights-selection/models-by-brand/${brandId}`);
  }

  /**
   * Get all light positions for a specific model
   */
  async getPositionsByModel(modelId: string): Promise<LightsSelectionResponse<LightPosition[]>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.getPositionsByModel(modelId);
      return { data, success: true };
    }
    return this.makeRequest<LightPosition[]>(`/lights-selection/model/${modelId}/positions`);
  }

  /**
   * Get specific light data for a model and position
   */
  async getLightDataByPosition(
    modelId: string, 
    positionId: string
  ): Promise<LightsSelectionResponse<LightData>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.getLightDataByPosition(modelId, positionId);
      return { data, success: true };
    }
    return this.makeRequest<LightData>(`/lights-selection/model/${modelId}/position/${positionId}/light-data`);
  }

  /**
   * Search for models by brand slug and model slug
   */
  async searchModelBySlugs(
    brandSlug: string, 
    modelSlug: string
  ): Promise<LightsSelectionResponse<ModelData | null>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.searchModel(brandSlug, modelSlug);
      return { data: data[0] || null, success: true };
    }
    return this.makeRequest<ModelData | null>(
      `/lights-selection/search?brandSlug=${brandSlug}&modelSlug=${modelSlug}`
    );
  }

  /**
   * Get light positions by brand and model slugs (alternative endpoint)
   */
  async getPositionsBySlugs(
    brandSlug: string, 
    modelSlug: string
  ): Promise<LightsSelectionResponse<LightPosition[]>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.getPositionsBySlugs(brandSlug, modelSlug);
      return { data, success: true };
    }
    return this.makeRequest<LightPosition[]>(
      `/lights-selection/positions?brandSlug=${brandSlug}&modelSlug=${modelSlug}`
    );
  }

  /**
   * Get lights products by brand and model slugs
   */
  async getProductsBySlugs(
    brandSlug: string, 
    modelSlug: string
  ): Promise<LightsSelectionResponse<LightsProduct[]>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.getProductsBySlugs(brandSlug, modelSlug);
      return { data, success: true };
    }
    return this.makeRequest<LightsProduct[]>(
      `/lights-selection/products?brandSlug=${brandSlug}&modelSlug=${modelSlug}`
    );
  }

  /**
   * Get all master light positions (sorted list)
   */
  async getAllMasterPositions(): Promise<LightsSelectionResponse<LightPosition[]>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.getAllMasterPositions();
      return { data, success: true };
    }
    return this.makeRequest<LightPosition[]>('/lights-selection/positions/all');
  }

  /**
   * Get lights products by brand, model slugs and position
   */
  async getProductsBySlugsAndPosition(
    brandSlug: string, 
    modelSlug: string,
    positionSlug: string
  ): Promise<LightsSelectionResponse<LightsProduct[]>> {
    if (USE_MOCK_API) {
      const data = await mockLightsApiService.getProductsBySlugsAndPosition(brandSlug, modelSlug, positionSlug);
      return { data, success: true };
    }
    return this.makeRequest<LightsProduct[]>(
      `/lights-selection/products?brandSlug=${brandSlug}&modelSlug=${modelSlug}&positionSlug=${positionSlug}`
    );
  }
}

// Export singleton instance
export const lightsApiService = new LightsApiService();
export default lightsApiService;
