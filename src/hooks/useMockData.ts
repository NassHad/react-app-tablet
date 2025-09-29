import { useState, useEffect, useCallback } from 'react';
import { mockDataService } from '../services/mockDataService';
import type { MockUserSelection, MockLightProduct, MockBatteryMotorisation, MockLightPosition, MockBrand, MockModel } from '../services/mockDataService';

export const useMockData = () => {
  const [isMockMode, setIsMockMode] = useState(false);
  const [mockUserSelection, setMockUserSelection] = useState<MockUserSelection | null>(null);

  // Load mock mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('dataMode');
    setIsMockMode(savedMode === 'mock');
  }, []);

  // Listen for mode changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('dataMode');
      setIsMockMode(savedMode === 'mock');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Mock data getters - memoized to prevent infinite loops
  const getMockBrands = useCallback((): MockBrand[] => {
    return mockDataService.getMockBrands();
  }, []);

  const getMockModelsByBrand = useCallback((brandSlug: string): MockModel[] => {
    return mockDataService.getMockModelsByBrand(brandSlug);
  }, []);

  const getMockLightPositions = useCallback((): MockLightPosition[] => {
    return mockDataService.getMockLightPositions();
  }, []);

  const getMockLightProducts = useCallback((brandSlug: string, modelSlug: string, positionSlug: string): MockLightProduct[] => {
    return mockDataService.getMockLightProducts(brandSlug, modelSlug, positionSlug);
  }, []);

  const getMockBatteryMotorisations = useCallback((brandSlug: string, modelSlug: string): MockBatteryMotorisation[] => {
    return mockDataService.getMockBatteryMotorisations(brandSlug, modelSlug);
  }, []);

  const getMockBatteryData = useCallback((refs: string[]) => {
    return mockDataService.getMockBatteryData(refs);
  }, []);

  const createMockUserSelection = useCallback((vehicleId: number = 1, category: string = 'lights', positionSlug?: string): MockUserSelection => {
    return mockDataService.createMockUserSelection(vehicleId, category, positionSlug);
  }, []);

  const setMockUserSelectionData = (selection: MockUserSelection) => {
    setMockUserSelection(selection);
  };

  return {
    isMockMode,
    mockUserSelection,
    setMockUserSelectionData,
    getMockBrands,
    getMockModelsByBrand,
    getMockLightPositions,
    getMockLightProducts,
    getMockBatteryMotorisations,
    getMockBatteryData,
    createMockUserSelection
  };
};
