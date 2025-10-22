import type { 
  WipersPosition, 
  WipersData, 
  BrandData, 
  ModelData, 
  WipersProduct,
  WipersSelectionResponse
} from '../types/wipers';
import { ENV } from '../config/environment';

// Base API configuration
const API_BASE_URL = ENV.STRAPI_API_URL;

class WipersApiService {
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<WipersSelectionResponse<T>> {
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
      console.error('Wipers API request failed:', error);
      return {
        data: null as T,
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get brands and models by category
   */
  async getBrandsAndModelsByCategory(categoryId: string): Promise<WipersSelectionResponse<{ brands: BrandData[] }>> {
    return this.makeRequest<{ brands: BrandData[] }>(`/wipers-selection/brands-and-models/${categoryId}`);
  }

  /**
   * Get brands by category
   */
  async getBrandsByCategory(categoryId: string): Promise<WipersSelectionResponse<BrandData[]>> {
    return this.makeRequest<BrandData[]>(`/wipers-selection/brands/${categoryId}`);
  }

  /**
   * Get models by category and brand
   */
  async getModelsByCategoryAndBrand(categoryId: string, brandId: string): Promise<WipersSelectionResponse<ModelData[]>> {
    return this.makeRequest<ModelData[]>(`/wipers-selection/models/${categoryId}/${brandId}`);
  }

  /**
   * Get wiper positions for a specific model
   */
  async getPositionsByModel(modelId: string): Promise<WipersSelectionResponse<WipersPosition[]>> {
    return this.makeRequest<WipersPosition[]>(`/wipers-selection/positions/${modelId}`);
  }

  /**
   * Get wiper data by position
   */
  async getWiperDataByPosition(positionId: string): Promise<WipersSelectionResponse<WipersData[]>> {
    return this.makeRequest<WipersData[]>(`/wipers-selection/wiper-data/${positionId}`);
  }

  /**
   * Get all wipers brands
   */
  async getBrands(): Promise<WipersSelectionResponse<BrandData[]>> {
    return this.makeRequest<BrandData[]>('/wipers-selection/brands');
  }

  /**
   * Get models by brand
   */
  async getModelsByBrand(brandId: string): Promise<WipersSelectionResponse<ModelData[]>> {
    return this.makeRequest<ModelData[]>(`/wipers-selection/models/${brandId}`);
  }

  /**
   * Get models by brand slug
   */
  async getModelsByBrandSlug(brandSlug: string): Promise<WipersSelectionResponse<ModelData[]>> {
    return this.makeRequest<ModelData[]>(`/wipers-selection/models-by-brand-slug/${brandSlug}`);
  }

  /**
   * Get models from wipers products
   */
  async getModelsFromProducts(): Promise<WipersSelectionResponse<ModelData[]>> {
    return this.makeRequest<ModelData[]>('/wipers-selection/models-from-products');
  }

  /**
   * Get positions by slugs
   */
  async getPositionsBySlugs(slugs: string[]): Promise<WipersSelectionResponse<WipersPosition[]>> {
    const slugsParam = slugs.map(slug => `slugs[]=${encodeURIComponent(slug)}`).join('&');
    return this.makeRequest<WipersPosition[]>(`/wipers-selection/positions-by-slugs?${slugsParam}`);
  }

  /**
   * Get all wiper positions
   */
  async getAllPositions(): Promise<WipersSelectionResponse<WipersPosition[]>> {
    return this.makeRequest<WipersPosition[]>('/wipers-selection/all-positions');
  }

  /**
   * Get products by slugs
   */
  async getProductsBySlugs(slugs: string[]): Promise<WipersSelectionResponse<WipersProduct[]>> {
    const slugsParam = slugs.map(slug => `slugs[]=${encodeURIComponent(slug)}`).join('&');
    return this.makeRequest<WipersProduct[]>(`/wipers-selection/products-by-slugs?${slugsParam}`);
  }

  /**
   * Search for models by brand slug and model slug
   */
  async searchModelBySlugs(
    brandSlug: string, 
    modelSlug: string
  ): Promise<WipersSelectionResponse<ModelData | null>> {
    return this.makeRequest<ModelData | null>(
      `/wipers-selection/search?brandSlug=${brandSlug}&modelSlug=${modelSlug}`
    );
  }

  /**
   * Get wipers products by brand and model slugs
   */
  async getProductsByBrandAndModel(
    brandSlug: string, 
    modelSlug: string
  ): Promise<WipersSelectionResponse<WipersProduct[]>> {
    console.log('🔍 Fetching wipers products by brand and model:', { brandSlug, modelSlug });
    console.log('🔍 API URL:', `/wipers-selection/products?brandSlug=${brandSlug}&modelSlug=${modelSlug}`);
    return this.makeRequest<WipersProduct[]>(
      `/wipers-selection/products?brandSlug=${brandSlug}&modelSlug=${modelSlug}`
    );
  }

  /**
   * Get wipers products by brand, model slugs and position
   */
  async getProductsBySlugsAndPosition(
    brandSlug: string, 
    modelSlug: string,
    positionSlug: string
  ): Promise<WipersSelectionResponse<WipersProduct[]>> {
    console.log('🔍 Fetching wipers products by slugs and position:', { brandSlug, modelSlug, positionSlug });
    console.log('🔍 API URL:', `/wipers-selection/products-by-slugs?brandSlug=${brandSlug}&modelSlug=${modelSlug}&positionSlug=${positionSlug}`);
    return this.makeRequest<WipersProduct[]>(
      `/wipers-selection/products-by-slugs?brandSlug=${brandSlug}&modelSlug=${modelSlug}&positionSlug=${positionSlug}`
    );
  }

  /**
   * Get wipers products by model slug and position (new position-based filtering)
   */
  async getProductsByModelAndPosition(
    modelSlug: string,
    position: string
  ): Promise<WipersSelectionResponse<WipersProduct[]>> {
    console.log('🔍 Fetching wipers products by model and position:', { modelSlug, position });
    console.log('🔍 API URL:', `/wipers-selection/products/${modelSlug}/${position}`);
    return this.makeRequest<WipersProduct[]>(
      `/wipers-selection/products/${modelSlug}/${position}`
    );
  }
}

// Export singleton instance
export const wipersApiService = new WipersApiService();
export default wipersApiService;
