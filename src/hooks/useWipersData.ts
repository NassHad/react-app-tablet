import { useState, useCallback, useEffect } from 'react';
import { wipersApiService } from '../services/wipersApiService';
import { mockWipersApiService } from '../services/mockWipersApiService';
import { databaseService } from '../db/database';
import { shouldUseLocalDatabase } from '../config/dataSource';
import { useMockData } from './useMockData';
import type { 
  WipersPosition, 
  WipersData, 
  BrandData, 
  ModelData, 
  WipersProduct,
  WipersSelectionResponse
} from '../types/wipers';

interface UseWipersDataReturn {
  // Data states
  brands: BrandData[];
  models: ModelData[];
  positions: WipersPosition[];
  products: WipersProduct[];
  wipersData: WipersData[];
  
  // Loading states
  loadingBrands: boolean;
  loadingModels: boolean;
  loadingPositions: boolean;
  loadingProducts: boolean;
  loadingWipersData: boolean;
  
  // Error state
  error: string | null;
  
  // Actions
  fetchBrands: () => Promise<void>;
  fetchModelsByBrand: (brandId: string) => Promise<void>;
  fetchModelsByBrandSlug: (brandSlug: string) => Promise<void>;
  fetchPositionsByModel: (modelId: string) => Promise<void>;
  fetchAllPositions: () => Promise<void>;
  fetchProductsBySlugs: (brandSlug: string, modelSlug: string) => Promise<void>;
  fetchProductsBySlugsAndPosition: (brandSlug: string, modelSlug: string, positionSlug: string) => Promise<void>;
  fetchProductsByModelAndPosition: (modelSlug: string, position: string) => Promise<void>;
  fetchWiperDataByPosition: (positionId: string) => Promise<void>;
  clearError: () => void;
  clearData: () => void;
}

export const useWipersData = (): UseWipersDataReturn => {
  // Data states
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [models, setModels] = useState<ModelData[]>([]);
  const [positions, setPositions] = useState<WipersPosition[]>([]);
  const [products, setProducts] = useState<WipersProduct[]>([]);
  const [wipersData, setWipersData] = useState<WipersData[]>([]);
  
  // Loading states
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingPositions, setLoadingPositions] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingWipersData, setLoadingWipersData] = useState(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Mock data hook
  const { isMockMode } = useMockData();

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clear all data function
  const clearData = useCallback(() => {
    setBrands([]);
    setModels([]);
    setPositions([]);
    setProducts([]);
    setWipersData([]);
    setError(null);
  }, []);

  // Fetch brands
  const fetchBrands = useCallback(async () => {
    setLoadingBrands(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log('🎭 Using mock wipers brands');
        const mockBrands = await mockWipersApiService.getBrands();
        setBrands(mockBrands);
      } else if (shouldUseLocalDatabase()) {
        console.log('🗄️ Fetching wipers brands from local database');
        const db = await databaseService.getDb();
        if (db) {
          const brandsResult = await db.query('SELECT * FROM wipers_brands');
          const brands = brandsResult.values || [];
          setBrands(brands as BrandData[]);
        }
      } else {
        console.log('🌐 Fetching wipers brands from API');
        const response = await wipersApiService.getBrands();
        if (response.success && response.data) {
          setBrands(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch brands');
        }
      }
    } catch (err) {
      console.error('Error fetching wipers brands:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch brands');
    } finally {
      setLoadingBrands(false);
    }
  }, [isMockMode]);

  // Fetch models by brand
  const fetchModelsByBrand = useCallback(async (brandId: string) => {
    setLoadingModels(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock wipers models for brand: ${brandId}`);
        const mockModels = await mockWipersApiService.getModelsByBrand(brandId);
        setModels(mockModels);
      } else if (shouldUseLocalDatabase()) {
        console.log(`🗄️ Fetching wipers models from local database for brand: ${brandId}`);
        const db = await databaseService.getDb();
        if (db) {
          const modelsResult = await db.query(
            'SELECT * FROM wipers_models WHERE brand_id = ?',
            [brandId]
          );
          const models = modelsResult.values || [];
          setModels(models as ModelData[]);
        }
      } else {
        console.log(`🌐 Fetching wipers models from API for brand: ${brandId}`);
        const response = await wipersApiService.getModelsByBrand(brandId);
        if (response.success && response.data) {
          setModels(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch models');
        }
      }
    } catch (err) {
      console.error('Error fetching wipers models:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch models');
    } finally {
      setLoadingModels(false);
    }
  }, [isMockMode]);

  // Fetch models by brand slug
  const fetchModelsByBrandSlug = useCallback(async (brandSlug: string) => {
    setLoadingModels(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock wipers models for brand slug: ${brandSlug}`);
        const mockModels = await mockWipersApiService.getModelsByBrandSlug(brandSlug);
        setModels(mockModels);
      } else {
        console.log(`🌐 Fetching wipers models from API for brand slug: ${brandSlug}`);
        const response = await wipersApiService.getModelsByBrandSlug(brandSlug);
        if (response.success && response.data) {
          setModels(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch models');
        }
      }
    } catch (err) {
      console.error('Error fetching wipers models by slug:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch models');
    } finally {
      setLoadingModels(false);
    }
  }, [isMockMode]);

  // Fetch positions by model
  const fetchPositionsByModel = useCallback(async (modelId: string) => {
    setLoadingPositions(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock wipers positions for model: ${modelId}`);
        const mockPositions = await mockWipersApiService.getPositionsByModel(modelId);
        setPositions(mockPositions);
      } else if (shouldUseLocalDatabase()) {
        console.log(`🗄️ Fetching wipers positions from local database for model: ${modelId}`);
        const db = await databaseService.getDb();
        if (db) {
          const positionsResult = await db.query(
            'SELECT * FROM wipers_positions WHERE model_id = ?',
            [modelId]
          );
          const positions = positionsResult.values || [];
          setPositions(positions as WipersPosition[]);
        }
      } else {
        console.log(`🌐 Fetching wipers positions from API for model: ${modelId}`);
        const response = await wipersApiService.getPositionsByModel(modelId);
        if (response.success && response.data) {
          setPositions(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch positions');
        }
      }
    } catch (err) {
      console.error('Error fetching wipers positions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch positions');
    } finally {
      setLoadingPositions(false);
    }
  }, [isMockMode]);

  // Fetch all positions
  const fetchAllPositions = useCallback(async () => {
    setLoadingPositions(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log('🎭 Using mock all wipers positions');
        const mockPositions = await mockWipersApiService.getAllPositions();
        setPositions(mockPositions);
      } else if (shouldUseLocalDatabase()) {
        console.log('🗄️ Fetching all wipers positions from local database');
        const db = await databaseService.getDb();
        if (db) {
          const positionsResult = await db.query('SELECT * FROM wipers_positions ORDER BY sort_order');
          const positions = positionsResult.values || [];
          setPositions(positions as WipersPosition[]);
        }
      } else {
        console.log('🌐 Fetching all wipers positions from API');
        const response = await wipersApiService.getAllPositions();
        if (response.success && response.data) {
          setPositions(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch positions');
        }
      }
    } catch (err) {
      console.error('Error fetching all wipers positions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch positions');
    } finally {
      setLoadingPositions(false);
    }
  }, [isMockMode]);

  // Fetch products by slugs
  const fetchProductsBySlugs = useCallback(async (brandSlug: string, modelSlug: string) => {
    setLoadingProducts(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock wipers products for: ${brandSlug} ${modelSlug}`);
        const mockProducts = await mockWipersApiService.getProductsByBrandAndModel(brandSlug, modelSlug);
        setProducts(mockProducts);
      } else if (shouldUseLocalDatabase()) {
        console.log(`🗄️ Fetching wipers products from local database for: ${brandSlug} ${modelSlug}`);
        const db = await databaseService.getDb();
        if (db) {
          const productsResult = await db.query(
            'SELECT * FROM wipers_products WHERE brand_slug = ? AND model_slug = ?',
            [brandSlug, modelSlug]
          );
          const products = productsResult.values || [];
          setProducts(products as WipersProduct[]);
        }
      } else {
        console.log(`🌐 Fetching wipers products from API for: ${brandSlug} ${modelSlug}`);
        const response = await wipersApiService.getProductsByBrandAndModel(brandSlug, modelSlug);
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch products');
        }
      }
    } catch (err) {
      console.error('Error fetching wipers products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoadingProducts(false);
    }
  }, [isMockMode]);

  // Fetch products by slugs and position
  const fetchProductsBySlugsAndPosition = useCallback(async (brandSlug: string, modelSlug: string, positionSlug: string) => {
    setLoadingProducts(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock wipers products for: ${brandSlug} ${modelSlug} ${positionSlug}`);
        const mockProducts = await mockWipersApiService.getProductsBySlugsAndPosition(brandSlug, modelSlug, positionSlug);
        setProducts(mockProducts);
      } else {
        console.log(`🌐 Fetching wipers products from API for: ${brandSlug} ${modelSlug} ${positionSlug}`);
        const response = await wipersApiService.getProductsBySlugsAndPosition(brandSlug, modelSlug, positionSlug);
        console.log('🔍 API Response:', response);
        console.log('🔍 API Response data:', response.data);
        console.log('🔍 API Response success:', response.success);
        console.log('🔍 API Response message:', response.message);
        console.log('🔍 API Response data length:', response.data?.length);
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch products');
        }
      }
    } catch (err) {
      console.error('Error fetching wipers products by position:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoadingProducts(false);
    }
  }, [isMockMode]);

  // Fetch products by model slug and position (new position-based filtering)
  const fetchProductsByModelAndPosition = useCallback(async (modelSlug: string, position: string) => {
    setLoadingProducts(true);
    setError(null);

    try {
      if (isMockMode) {
        console.log(`🎭 Using mock wipers products for model: ${modelSlug}, position: ${position}`);
        const mockProducts = await mockWipersApiService.getProductsByModelAndPosition(modelSlug, position);
        setProducts(mockProducts);
      } else {
        console.log(`🌐 Fetching wipers products from API for model: ${modelSlug}, position: ${position}`);
        const response = await wipersApiService.getProductsByModelAndPosition(modelSlug, position);
        console.log(`🔍 API Response for ${modelSlug}/${position}:`, response);
        
        if (response.success && response.data) {
          console.log(`✅ Found ${response.data.length} products for ${modelSlug}/${position}`);
          setProducts(response.data);
        } else {
          console.error(`❌ API Error for ${modelSlug}/${position}:`, response);
          throw new Error(response.message || 'Failed to fetch products');
        }
      }
    } catch (err) {
      console.error('Error fetching wipers products by model and position:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoadingProducts(false);
    }
  }, [isMockMode]);

  // Fetch wiper data by position
  const fetchWiperDataByPosition = useCallback(async (positionId: string) => {
    setLoadingWipersData(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock wipers data for position: ${positionId}`);
        const mockData = await mockWipersApiService.getWiperDataByPosition(positionId);
        setWipersData(mockData);
      } else {
        console.log(`🌐 Fetching wipers data from API for position: ${positionId}`);
        const response = await wipersApiService.getWiperDataByPosition(positionId);
        if (response.success && response.data) {
          setWipersData(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch wipers data');
        }
      }
    } catch (err) {
      console.error('Error fetching wipers data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch wipers data');
    } finally {
      setLoadingWipersData(false);
    }
  }, [isMockMode]);

  return {
    // Data states
    brands,
    models,
    positions,
    products,
    wipersData,
    
    // Loading states
    loadingBrands,
    loadingModels,
    loadingPositions,
    loadingProducts,
    loadingWipersData,
    
    // Error state
    error,
    
    // Actions
    fetchBrands,
    fetchModelsByBrand,
    fetchModelsByBrandSlug,
    fetchPositionsByModel,
    fetchAllPositions,
    fetchProductsBySlugs,
    fetchProductsBySlugsAndPosition,
    fetchProductsByModelAndPosition,
    fetchWiperDataByPosition,
    clearError,
    clearData
  };
};
