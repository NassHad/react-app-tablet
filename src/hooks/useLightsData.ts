import { useState, useCallback } from 'react';
import { lightsApiService } from '../services/lightsApiService';
import { databaseService } from '../db/database';
import { shouldUseLocalDatabase } from '../config/dataSource';
import { useMockData } from './useMockData';
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

  // Mock data hook
  const { isMockMode, getMockBrands, getMockModelsByBrand, getMockLightPositions, getMockLightProducts } = useMockData();

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
    
    console.log(`🔍 fetchProductsBySlugs called with: ${brandSlug} ${modelSlug}`);
    console.log(`🔍 isMockMode: ${isMockMode}`);
    console.log(`🔍 shouldUseLocalDatabase(): ${shouldUseLocalDatabase()}`);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock light products for: ${brandSlug} ${modelSlug}`);
        const mockProducts = getMockLightProducts(brandSlug, modelSlug, '');
        setProducts(mockProducts as any);
      } else if (shouldUseLocalDatabase()) {
        console.log(`🗄️ Fetching light products from local database for: ${brandSlug} ${modelSlug}`);
        const db = await databaseService.getDb();
        if (db) {
          // Find lights_products for this vehicle
          const lightsProductsResult = await db.query(
            'SELECT * FROM lights_products WHERE brand_slug = ? AND model_slug = ?',
            [brandSlug, modelSlug]
          );
          const lightsProducts = lightsProductsResult.values || [];
          console.log(`🔍 Found ${lightsProducts.length} lights products for ${brandSlug} ${modelSlug}`);
          
          if (lightsProducts.length === 0) {
            console.log(`❌ No lights products found for ${brandSlug} ${modelSlug}`);
            setProducts([]);
            return;
          }
          
          // Transform to match the expected format
          const transformedProducts = lightsProducts.map((product: any) => ({
            id: product.id,
            ref: product.ref,
            description: product.description,
            brandImg: product.brandImg,
            img: product.img,
            specifications: product.specifications,
            typeConception: product.typeConception,
            light_positions: product.light_positions,
            category: 'lights'
          })) as any;
          
          console.log(`✅ Transformed to ${transformedProducts.length} products`);
          setProducts(transformedProducts);
        } else {
          throw new Error('Database not initialized');
        }
      } else {
        console.log(`🔍 API Call: getProductsBySlugs(${brandSlug}, ${modelSlug})`);
        const response = await lightsApiService.getProductsBySlugs(brandSlug, modelSlug);
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          setError({
            message: response.message || 'Failed to fetch products',
            code: 'FETCH_PRODUCTS_ERROR'
          });
        }
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_PRODUCTS_ERROR'
      });
    } finally {
      setLoadingProducts(false);
    }
  }, [isMockMode, getMockLightProducts]);

  // Fetch all master positions
  const fetchAllMasterPositions = useCallback(async () => {
    setLoadingPositions(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log('🎭 Using mock positions data...');
        const mockPositions = getMockLightPositions();
        setPositions(mockPositions as any);
      } else if (shouldUseLocalDatabase()) {
        console.log('🗄️ Fetching positions from local database...');
        const db = await databaseService.getDb();
        if (db) {
          const result = await db.query('SELECT * FROM positions ORDER BY name');
          const positions = result.values as LightPosition[];
          console.log('✅ Positions loaded from database:', positions.length);
          setPositions(positions);
        } else {
          throw new Error('Database not initialized');
        }
      } else {
        console.log('🌐 Fetching positions from API...');
        const response = await lightsApiService.getAllMasterPositions();
        if (response.success && response.data) {
          setPositions(response.data);
        } else {
          setError({
            message: response.message || 'Failed to fetch master positions',
            code: 'FETCH_MASTER_POSITIONS_ERROR'
          });
        }
      }
    } catch (err) {
      console.error('❌ Error fetching positions:', err);
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_MASTER_POSITIONS_ERROR'
      });
    } finally {
      setLoadingPositions(false);
    }
  }, [isMockMode, getMockLightPositions]);

  // Fetch products by brand, model slugs and position
  const fetchProductsBySlugsAndPosition = useCallback(async (brandSlug: string, modelSlug: string, positionSlug: string) => {
    setLoadingProducts(true);
    setError(null);
    
    console.log(`🔍 fetchProductsBySlugsAndPosition called with: ${brandSlug} ${modelSlug} - ${positionSlug}`);
    console.log(`🔍 isMockMode: ${isMockMode}`);
    console.log(`🔍 shouldUseLocalDatabase(): ${shouldUseLocalDatabase()}`);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock light products for: ${brandSlug} ${modelSlug} - ${positionSlug}`);
        const mockProducts = getMockLightProducts(brandSlug, modelSlug, positionSlug);
        setProducts(mockProducts as any);
      } else if (shouldUseLocalDatabase()) {
        console.log(`🗄️ Fetching light products from local database for: ${brandSlug} ${modelSlug} - ${positionSlug}`);
        const db = await databaseService.getDb();
        if (db) {
          // Step 1: Find lights_products for this vehicle using model_slug
          const lightsProductsResult = await db.query(
            'SELECT * FROM lights_products WHERE brand_slug = ? AND model_slug = ?',
            [brandSlug, modelSlug]
          );
          const lightsProducts = lightsProductsResult.values || [];
          console.log(`🔍 Found ${lightsProducts.length} lights products for ${brandSlug} ${modelSlug}`);
          
          if (lightsProducts.length === 0) {
            console.log(`❌ No lights products found for ${brandSlug} ${modelSlug}`);
            setProducts([]);
            return;
          }
          
          // Step 2: Extract refs for the specific position
          const refsForPosition = new Set<string>();
          lightsProducts.forEach((product: any) => {
            if (product.light_positions) {
              try {
                const positions = JSON.parse(product.light_positions);
                positions.forEach((pos: any) => {
                  // Match position by slug or name
                  // Convert positionSlug from "feu-de-route" to "feu_route" format
                  // Remove "de" from "feu-de-route" to match "feu_route"
                  const normalizedPositionSlug = positionSlug.replace(/-/g, '_').replace(/_de_/g, '_');
                  const normalizedCategory = pos.category?.replace(/-/g, '_');
                  
                  if (pos.category === positionSlug || 
                      normalizedCategory === normalizedPositionSlug ||
                      pos.position?.toLowerCase().includes(positionSlug.toLowerCase()) ||
                      positionSlug.toLowerCase().includes(pos.category?.toLowerCase())) {
                    refsForPosition.add(pos.ref);
                    console.log(`✅ Found ref ${pos.ref} for position ${pos.position} (${pos.category})`);
                  }
                });
              } catch (error) {
                console.warn('Error parsing light_positions:', error);
              }
            } else if (product.ref && product.ref !== 'Multiple') {
              // Fallback: use product ref if no light_positions JSON
              refsForPosition.add(product.ref);
              console.log(`✅ Using product ref ${product.ref} as fallback`);
            }
          });
          
          console.log(`📋 Refs needed for position ${positionSlug}:`, Array.from(refsForPosition));
          
          if (refsForPosition.size === 0) {
            console.log(`❌ No refs found for position ${positionSlug}`);
            setProducts([]);
            return;
          }
          
          // Step 3: Get light_data for these refs
          const refsArray = Array.from(refsForPosition);
          const placeholders = refsArray.map(() => '?').join(',');
          const lightDataResult = await db.query(
            `SELECT * FROM light_data WHERE ref IN (${placeholders})`,
            refsArray
          );
          const lightData = lightDataResult.values || [];
          console.log(`💡 Found ${lightData.length} light data entries for refs:`, refsArray);
          
          if (lightData.length === 0) {
            console.log(`❌ No light data found for refs:`, refsArray);
            setProducts([]);
            return;
          }
          
          // Log sample data
          if (lightData.length > 0) {
            console.log(`📋 Sample light data:`, lightData[0]);
          }
          
          // Step 4: Transform to match the expected format
          const transformedProducts = lightData.map((light: any) => ({
            id: light.id,
            ref: light.ref,
            description: light.description,
            brandImg: light.brandImg,
            img: light.img,
            specifications: light.specifications,
            position: positionSlug,
            category: 'lights'
          })) as any;
          
          console.log(`✅ Filtered products for ${positionSlug}:`, transformedProducts.length);
          if (transformedProducts.length > 0) {
            console.log(`📋 Sample transformed product:`, transformedProducts[0]);
          }
          setProducts(transformedProducts);
        } else {
          throw new Error('Database not initialized');
        }
      } else {
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
      }
    } catch (err) {
      console.log(`💥 Error fetching products:`, err);
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_PRODUCTS_POSITION_ERROR'
      });
    } finally {
      setLoadingProducts(false);
    }
  }, [isMockMode, getMockLightProducts]);

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
