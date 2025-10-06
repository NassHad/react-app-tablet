import { useState, useCallback } from 'react';
import { batteryApiService, type BatteryMotorisation, type BatteryModel, type BatteryProduct } from '../services/batteryApiService';
import { databaseService } from '../db/database';
import { shouldUseLocalDatabase } from '../config/dataSource';
import { useMockData } from './useMockData';

interface UseBatteryDataReturn {
  motorisations: BatteryMotorisation[];
  batteryModels: BatteryModel[];
  batteryProducts: BatteryProduct[];
  selectedMotorisation: BatteryMotorisation | null;
  loadingMotorisations: boolean;
  loadingBatteryModels: boolean;
  loadingBatteryProducts: boolean;
  error: { message: string; code?: string } | null;
  fetchBatteryProductsBySlugs: (brandSlug: string, modelSlug: string) => Promise<void>;
  fetchBatteryProductsByBrand: (brandSlug: string) => Promise<void>;
  fetchBatteryTypesSummary: () => Promise<void>;
  fetchBatteryModelsByBrandModelAndMotorisation: (brandSlug: string, modelSlug: string, motorisation: string) => Promise<void>;
  setSelectedMotorisation: (motorisation: BatteryMotorisation | null) => void;
  clearError: () => void;
}

export const useBatteryData = (): UseBatteryDataReturn => {
  const [motorisations, setMotorisations] = useState<BatteryMotorisation[]>([]);
  const [batteryModels, setBatteryModels] = useState<BatteryModel[]>([]);
  const [batteryProducts, setBatteryProducts] = useState<BatteryProduct[]>([]);
  const [selectedMotorisation, setSelectedMotorisation] = useState<BatteryMotorisation | null>(null);
  const [loadingMotorisations, setLoadingMotorisations] = useState(false);
  const [loadingBatteryModels, setLoadingBatteryModels] = useState(false);
  const [loadingBatteryProducts, setLoadingBatteryProducts] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);

  // Mock data hook
  const { isMockMode, getMockBatteryMotorisations, getMockBatteryData } = useMockData();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchBatteryProductsBySlugs = useCallback(async (brandSlug: string, modelSlug: string) => {
    setLoadingMotorisations(true);
    setError(null);
    
    try {
      if (isMockMode) {
        console.log(`🎭 Using mock battery motorisations for: ${brandSlug} - ${modelSlug}`);
        const mockMotorisations = getMockBatteryMotorisations(brandSlug, modelSlug);
        setMotorisations(mockMotorisations);
      } else if (shouldUseLocalDatabase()) {
        console.log(`🗄️ Fetching battery products from local database for: ${brandSlug} - ${modelSlug}`);
        const db = await databaseService.getDb();
        if (db) {
          const result = await db.query(
            'SELECT * FROM battery_products WHERE brand_slug = ? AND model_slug = ?', 
            [brandSlug, modelSlug]
          );
          const products = result.values || [];
          console.log(`✅ Found ${products.length} battery products in database`);
          
          // Transform battery products to motorisations format
          const motorisations: BatteryMotorisation[] = [];
          products.forEach((product: any) => {
            if (product.motorisations) {
              try {
                const motorisationsData = JSON.parse(product.motorisations);
                if (Array.isArray(motorisationsData)) {
                  motorisationsData.forEach((motor: any) => {
                    motorisations.push({
                      id: `${product.id}-${motor.motorisation}`,
                      motorisation: motor.motorisation,
                      fuel: motor.fuel,
                      startDate: motor.startDate,
                      endDate: motor.endDate,
                      batteryTypes: {
                        AGM: motor.batteryAGM || '',
                        EFB: motor.batteryEFB || '',
                        Conventional: motor.batteryConventional || ''
                      }
                    });
                  });
                }
              } catch (error) {
                console.warn('Error parsing motorisations:', error);
              }
            }
          });
          
          console.log(`✅ Transformed to ${motorisations.length} motorisations`);
          setMotorisations(motorisations);
        } else {
          throw new Error('Database not initialized');
        }
      } else {
        console.log(`🔋 Fetching battery products from API for: ${brandSlug} - ${modelSlug}`);
        const response = await batteryApiService.getBatteryProductsBySlugs(brandSlug, modelSlug);
        
        if (response.success && response.data) {
          console.log(`✅ Battery products fetched:`, response.data);
          setMotorisations(response.data);
        } else {
          console.log(`❌ Failed to fetch battery products from API, falling back to local database:`, response.message);
          
          // Fallback to local database when API fails
          const db = await databaseService.getDb();
          if (db) {
            const result = await db.query(
              'SELECT * FROM battery_products WHERE brand_slug = ? AND model_slug = ?',
              [brandSlug, modelSlug]
            );
            const batteryProducts = result.values || [];
            console.log(`🔋 Found ${batteryProducts.length} battery products in local database`);
            
            if (batteryProducts.length > 0) {
              // Transform to match the expected format
              const motorisations: BatteryMotorisation[] = [];
              batteryProducts.forEach((product: any) => {
                if (product.motorisations) {
                  try {
                    const motorisationsData = JSON.parse(product.motorisations);
                    motorisationsData.forEach((motor: any) => {
                      motorisations.push({
                        id: `${product.id}-${motor.motorisation}`,
                        motorisation: motor.motorisation,
                        fuel: motor.fuel,
                        startDate: motor.startDate,
                        endDate: motor.endDate,
                        batteryTypes: {
                          AGM: motor.batteryAGM || '',
                          EFB: motor.batteryEFB || '',
                          Conventional: motor.batteryConventional || ''
                        }
                      });
                    });
                  } catch (error) {
                    console.warn('Error parsing motorisations:', error);
                  }
                }
              });
              
              console.log(`✅ Transformed to ${motorisations.length} motorisations from local database`);
              setMotorisations(motorisations);
            } else {
              setError({
                message: 'No battery products found for this vehicle',
                code: 'NO_BATTERY_PRODUCTS_FOUND'
              });
            }
          } else {
            setError({
              message: 'Database not initialized',
              code: 'DATABASE_NOT_INITIALIZED'
            });
          }
        }
      }
    } catch (err) {
      console.log(`💥 Exception fetching battery products:`, err);
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_BATTERY_PRODUCTS_ERROR'
      });
    } finally {
      setLoadingMotorisations(false);
    }
  }, [isMockMode, getMockBatteryMotorisations]);

  const fetchBatteryProductsByBrand = useCallback(async (brandSlug: string) => {
    setLoadingBatteryProducts(true);
    setError(null);
    
    try {
      console.log(`🔋 Fetching battery products for brand: ${brandSlug}`);
      const response = await batteryApiService.getBatteryProductsByBrand(brandSlug);
      
      if (response.success && response.data) {
        console.log(`✅ Battery products for brand fetched:`, response.data);
        setBatteryProducts(response.data);
      } else {
        console.log(`❌ Failed to fetch battery products for brand:`, response.message);
        setError({
          message: response.message || 'Failed to fetch battery products for brand',
          code: 'FETCH_BATTERY_PRODUCTS_BRAND_ERROR'
        });
      }
    } catch (err) {
      console.log(`💥 Exception fetching battery products for brand:`, err);
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_BATTERY_PRODUCTS_BRAND_ERROR'
      });
    } finally {
      setLoadingBatteryProducts(false);
    }
  }, []);

  const fetchBatteryTypesSummary = useCallback(async () => {
    setLoadingBatteryProducts(true);
    setError(null);
    
    try {
      console.log(`🔋 Fetching battery types summary`);
      const response = await batteryApiService.getBatteryTypesSummary();
      
      if (response.success && response.data) {
        console.log(`✅ Battery types summary fetched:`, response.data);
        // Handle summary data as needed
      } else {
        console.log(`❌ Failed to fetch battery types summary:`, response.message);
        setError({
          message: response.message || 'Failed to fetch battery types summary',
          code: 'FETCH_BATTERY_TYPES_SUMMARY_ERROR'
        });
      }
    } catch (err) {
      console.log(`💥 Exception fetching battery types summary:`, err);
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_BATTERY_TYPES_SUMMARY_ERROR'
      });
    } finally {
      setLoadingBatteryProducts(false);
    }
  }, []);

  const fetchBatteryModelsByBrandModelAndMotorisation = useCallback(async (brandSlug: string, modelSlug: string, motorisation: string) => {
    setLoadingBatteryModels(true);
    setError(null);
    
    try {
      console.log(`🔋 Fetching battery models for: ${brandSlug} - ${modelSlug} - ${motorisation}`);
      const response = await batteryApiService.getBatteryModelsByBrandModelAndMotorisation(brandSlug, modelSlug, motorisation);
      
      if (response.success && response.data) {
        console.log(`✅ Battery models fetched:`, response.data);
        setBatteryModels(response.data);
      } else {
        console.log(`❌ Failed to fetch battery models:`, response.message);
        setError({
          message: response.message || 'Failed to fetch battery models',
          code: 'FETCH_BATTERY_MODELS_ERROR'
        });
      }
    } catch (err) {
      console.log(`💥 Exception fetching battery models:`, err);
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_BATTERY_MODELS_ERROR'
      });
    } finally {
      setLoadingBatteryModels(false);
    }
  }, []);

  return {
    motorisations,
    batteryModels,
    batteryProducts,
    selectedMotorisation,
    loadingMotorisations,
    loadingBatteryModels,
    loadingBatteryProducts,
    error,
    fetchBatteryProductsBySlugs,
    fetchBatteryProductsByBrand,
    fetchBatteryTypesSummary,
    fetchBatteryModelsByBrandModelAndMotorisation,
    setSelectedMotorisation,
    clearError
  };
};
