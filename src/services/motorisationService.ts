import axios from 'axios';
import { DATA_SOURCE_CONFIG } from '../config/dataSource';

// Configure axios with default settings
const strapiClient = axios.create({
  baseURL: DATA_SOURCE_CONFIG.strapi.apiUrl,
  timeout: DATA_SOURCE_CONFIG.strapi.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Motorisation {
  id: number;
  motorisation: string;
  fuel: string | null;
  startDate: string | null;
  endDate: string | null;
  slug: string;
}

export interface MotorisationResponse {
  model: {
    id: number;
    name: string;
    slug: string;
    batteryBrand: {
      id: number;
      name: string;
      slug: string;
    };
  };
  motorisations: Motorisation[];
}

class MotorisationService {
  /**
   * Get motorisations by model ID
   */
  async getMotorisationsByModel(modelId: number): Promise<MotorisationResponse> {
    try {
      const response = await strapiClient.get(`/motorisation/model/${modelId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching motorisations by model:', error);
      throw new Error('Failed to fetch motorisations');
    }
  }

  /**
   * Get motorisations by brand ID and model name
   */
  async getMotorisationsByBrandAndModel(brandId: number, modelName: string): Promise<MotorisationResponse> {
    try {
      const response = await strapiClient.get(`/motorisation/brand/${brandId}/model/${encodeURIComponent(modelName)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching motorisations by brand and model:', error);
      throw new Error('Failed to fetch motorisations');
    }
  }

  /**
   * Get unique motorisations for a model (for display in select)
   */
  async getUniqueMotorisationsForModel(modelId: number): Promise<string[]> {
    try {
      const response = await this.getMotorisationsByModel(modelId);
      const uniqueMotorisations = Array.from(
        new Set(response.motorisations.map(m => m.motorisation))
      ).sort();
      return uniqueMotorisations;
    } catch (error) {
      console.error('Error fetching unique motorisations:', error);
      throw new Error('Failed to fetch motorisations');
    }
  }

  /**
   * Get motorisations with date ranges for a specific motorisation type
   */
  async getMotorisationDateRanges(modelId: number, motorisation: string): Promise<Motorisation[]> {
    try {
      const response = await this.getMotorisationsByModel(modelId);
      return response.motorisations
        .filter(m => m.motorisation === motorisation)
        .sort((a, b) => {
          // Sort by start date
          if (!a.startDate && !b.startDate) return 0;
          if (!a.startDate) return 1;
          if (!b.startDate) return -1;
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        });
    } catch (error) {
      console.error('Error fetching motorisation date ranges:', error);
      throw new Error('Failed to fetch date ranges');
    }
  }
}

export const motorisationService = new MotorisationService();
