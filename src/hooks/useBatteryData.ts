import { useState, useCallback } from 'react';
import { batteryApiService, type BatteryMotorisation, type BatteryModel } from '../services/batteryApiService';

interface UseBatteryDataReturn {
  motorisations: BatteryMotorisation[];
  batteryModels: BatteryModel[];
  loadingMotorisations: boolean;
  loadingBatteryModels: boolean;
  error: { message: string; code?: string } | null;
  fetchMotorisationsByBrandAndModel: (brandSlug: string, modelSlug: string) => Promise<void>;
  fetchBatteryModelsByBrandModelAndMotorisation: (brandSlug: string, modelSlug: string, motorisation: string) => Promise<void>;
  clearError: () => void;
}

export const useBatteryData = (): UseBatteryDataReturn => {
  const [motorisations, setMotorisations] = useState<BatteryMotorisation[]>([]);
  const [batteryModels, setBatteryModels] = useState<BatteryModel[]>([]);
  const [loadingMotorisations, setLoadingMotorisations] = useState(false);
  const [loadingBatteryModels, setLoadingBatteryModels] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchMotorisationsByBrandAndModel = useCallback(async (brandSlug: string, modelSlug: string) => {
    setLoadingMotorisations(true);
    setError(null);
    
    try {
      console.log(`🔋 Fetching motorisations for: ${brandSlug} - ${modelSlug}`);
      const response = await batteryApiService.getMotorisationsByBrandAndModel(brandSlug, modelSlug);
      
      if (response.success && response.data) {
        console.log(`✅ Motorisations fetched:`, response.data);
        setMotorisations(response.data);
      } else {
        console.log(`❌ Failed to fetch motorisations:`, response.message);
        setError({
          message: response.message || 'Failed to fetch motorisations',
          code: 'FETCH_MOTORISATIONS_ERROR'
        });
      }
    } catch (err) {
      console.log(`💥 Exception fetching motorisations:`, err);
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'FETCH_MOTORISATIONS_ERROR'
      });
    } finally {
      setLoadingMotorisations(false);
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
    loadingMotorisations,
    loadingBatteryModels,
    error,
    fetchMotorisationsByBrandAndModel,
    fetchBatteryModelsByBrandModelAndMotorisation,
    clearError
  };
};
