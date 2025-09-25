import { useState, useCallback } from 'react';
import { lightsApiService } from '../services/lightsApiService';
import type { 
  LightPosition, 
  LightData, 
  BrandData, 
  ModelData,
  LightsProduct
} from '../types/lights';

interface UseLightsDataReturn {
  // Data
  brands: BrandData[];
  models: ModelData[];
  positions: LightPosition[];
  lightData: LightData | null;
  products: LightsProduct[];
  
  // Loading states
  loadingBrands: boolean;
  loadingModels: boolean;
  loadingPositions: boolean;
  loadingLightData: boolean;
  loadingProducts: boolean;
  
  // Error states
  error: { message: string; code?: string } | null;
  
  // Actions
  fetchBrands: () => Promise<void>;
  fetchModels: (brandId: string) => Promise<void>;
  fetchPositions: (modelId: string) => Promise<void>;
  fetchLightData: (modelId: string, positionId: string) => Promise<void>;
  searchModelBySlugs: (brandSlug: string, modelSlug: string) => Promise<ModelData | null>;
  fetchPositionsBySlugs: (brandSlug: string, modelSlug: string) => Promise<void>;
  fetchAllMasterPositions: () => Promise<void>;
  fetchProductsBySlugs: (brandSlug: string, modelSlug: string) => Promise<void>;
  fetchProductsBySlugsAndPosition: (brandSlug: string, modelSlug: string, positionSlug: string) => Promise<void>;
  
  // Utilities
  clearError: () => void;
  reset: () => void;
}

export const useLightsData = (): UseLightsDataReturn => {
  // Data states
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [models, setModels] = useState<ModelData[]>([]);
  const [positions, setPositions] = useState<LightPosition[]>([]);
  const [lightData, setLightData] = useState<LightData | null>(null);
  const [products, setProducts] = useState<LightsProduct[]>([]);
  
  // Loading states
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingPositions, setLoadingPositions] = useState(false);
  const [loadingLightData, setLoadingLightData] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  // Error state
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset all data
  const reset = useCallback(() => {
    setBrands([]);
    setModels([]);
    setPositions([]);
    setLightData(null);
    setError(null);
  }, []);

  // Fetch brands
  const fetchBrands = useCallback(async () => {
    setLoadingBrands(true);
    setError(null);
    
    try {
      const response = await lightsApiService.getBrands();
      if (response.success && response.data) {
        setBrands(response.data);
      } else {
        setError({
          message: response.message || 'Failed to fetch brands',
          code: 'FETCH_BRANDS_ERROR'
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_BRANDS_ERROR'
      });
    } finally {
      setLoadingBrands(false);
    }
  }, []);

  // Fetch models by brand ID
  const fetchModels = useCallback(async (brandId: string) => {
    setLoadingModels(true);
    setError(null);
    
    try {
      const response = await lightsApiService.getModelsByBrand(brandId);
      if (response.success && response.data) {
        setModels(response.data);
      } else {
        setError({
          message: response.message || 'Failed to fetch models',
          code: 'FETCH_MODELS_ERROR'
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_MODELS_ERROR'
      });
    } finally {
      setLoadingModels(false);
    }
  }, []);

  // Fetch positions by model ID
  const fetchPositions = useCallback(async (modelId: string) => {
    setLoadingPositions(true);
    setError(null);
    
    try {
      const response = await lightsApiService.getPositionsByModel(modelId);
      if (response.success && response.data) {
        setPositions(response.data);
      } else {
        setError({
          message: response.message || 'Failed to fetch positions',
          code: 'FETCH_POSITIONS_ERROR'
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_POSITIONS_ERROR'
      });
    } finally {
      setLoadingPositions(false);
    }
  }, []);

  // Fetch light data by model and position
  const fetchLightData = useCallback(async (modelId: string, positionId: string) => {
    setLoadingLightData(true);
    setError(null);
    
    try {
      const response = await lightsApiService.getLightDataByPosition(modelId, positionId);
      if (response.success && response.data) {
        setLightData(response.data);
      } else {
        setError({
          message: response.message || 'Failed to fetch light data',
          code: 'FETCH_LIGHT_DATA_ERROR'
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_LIGHT_DATA_ERROR'
      });
    } finally {
      setLoadingLightData(false);
    }
  }, []);

  // Search model by slugs
  const searchModelBySlugs = useCallback(async (brandSlug: string, modelSlug: string): Promise<ModelData | null> => {
    try {
      const response = await lightsApiService.searchModelBySlugs(brandSlug, modelSlug);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError({
          message: response.message || 'Model not found',
          code: 'SEARCH_MODEL_ERROR'
        });
        return null;
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'SEARCH_MODEL_ERROR'
      });
      return null;
    }
  }, []);

  // Fetch positions by slugs
  const fetchPositionsBySlugs = useCallback(async (brandSlug: string, modelSlug: string) => {
    setLoadingPositions(true);
    setError(null);
    
    try {
      const response = await lightsApiService.getPositionsBySlugs(brandSlug, modelSlug);
      if (response.success && response.data) {
        setPositions(response.data);
      } else {
        setError({
          message: response.message || 'Failed to fetch positions',
          code: 'FETCH_POSITIONS_ERROR'
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_POSITIONS_ERROR'
      });
    } finally {
      setLoadingPositions(false);
    }
  }, []);

  // Fetch products by brand and model slugs
  const fetchProductsBySlugs = useCallback(async (brandSlug: string, modelSlug: string) => {
    setLoadingProducts(true);
    setError(null);
    
    try {
      const response = await lightsApiService.getProductsBySlugs(brandSlug, modelSlug);
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError({
          message: response.message || 'Failed to fetch products',
          code: 'FETCH_PRODUCTS_ERROR'
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_PRODUCTS_ERROR'
      });
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fetch all master positions
  const fetchAllMasterPositions = useCallback(async () => {
    setLoadingPositions(true);
    setError(null);
    
    try {
      const response = await lightsApiService.getAllMasterPositions();
      if (response.success && response.data) {
        setPositions(response.data);
      } else {
        setError({
          message: response.message || 'Failed to fetch master positions',
          code: 'FETCH_MASTER_POSITIONS_ERROR'
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_MASTER_POSITIONS_ERROR'
      });
    } finally {
      setLoadingPositions(false);
    }
  }, []);

  // Fetch products by brand, model slugs and position
  const fetchProductsBySlugsAndPosition = useCallback(async (brandSlug: string, modelSlug: string, positionSlug: string) => {
    setLoadingProducts(true);
    setError(null);
    
    try {
      console.log(`🔍 API Call: getProductsBySlugsAndPosition(${brandSlug}, ${modelSlug}, ${positionSlug})`);
      const response = await lightsApiService.getProductsBySlugsAndPosition(brandSlug, modelSlug, positionSlug);
      console.log(`📡 API Response:`, response);
      
      if (response.success && response.data) {
        console.log(`✅ Setting products:`, response.data);
        setProducts(response.data);
      } else {
        console.log(`❌ API Error:`, response.message);
        setError({
          message: response.message || 'Failed to fetch products for position',
          code: 'FETCH_PRODUCTS_POSITION_ERROR'
        });
      }
    } catch (err) {
      console.log(`💥 API Exception:`, err);
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_PRODUCTS_POSITION_ERROR'
      });
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  return {
    // Data
    brands,
    models,
    positions,
    lightData,
    products,
    
    // Loading states
    loadingBrands,
    loadingModels,
    loadingPositions,
    loadingLightData,
    loadingProducts,
    
    // Error state
    error,
    
    // Actions
    fetchBrands,
    fetchModels,
    fetchPositions,
    fetchLightData,
    searchModelBySlugs,
    fetchPositionsBySlugs,
    fetchAllMasterPositions,
    fetchProductsBySlugs,
    fetchProductsBySlugsAndPosition,
    
    // Utilities
    clearError,
    reset,
  };
};
