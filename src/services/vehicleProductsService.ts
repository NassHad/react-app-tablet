import { ENV } from '../config/environment';

export interface VehicleProductsParams {
  brandSlug: string;
  modelSlug: string;
  motorisation?: string;
  vehicleModel?: string;
}

export interface VehicleProduct {
  id: number;
  reference?: string;
  name?: string;
  brand?: string;
  fullName?: string;
  filterType?: string;
  ean?: string;
  isActive?: boolean;
  img?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      large?: { url: string };
    };
  };
  brandImg?: {
    url: string;
  };
  [key: string]: any; // Allow additional fields
}

export interface VehicleProductsResponse {
  data: {
    batteries: VehicleProduct[];
    lights: VehicleProduct[];
    wipers: VehicleProduct[];
    filters: VehicleProduct[];
    oil: VehicleProduct[];
  };
  meta: {
    totals: {
      batteries: number;
      lights: number;
      wipers: number;
      filters: number;
      oil: number;
      total: number;
    };
  };
}

class VehicleProductsService {
  async getAllProductsByVehicle(params: VehicleProductsParams): Promise<VehicleProductsResponse> {
    const base = ENV.STRAPI_API_URL;
    const url = new URL(`${base}/vehicle-products/all`);
    
    // Add required parameters
    url.searchParams.append('brandSlug', params.brandSlug);
    url.searchParams.append('modelSlug', params.modelSlug);
    
    // Add optional parameters
    if (params.motorisation) {
      url.searchParams.append('motorisation', params.motorisation);
    }
    if (params.vehicleModel) {
      url.searchParams.append('vehicleModel', params.vehicleModel);
    }
    
    console.log('🚗 Fetching all products for vehicle:', url.toString());
    
    const res = await fetch(url.toString(), {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('API Response structure:', {
      hasData: !!data.data,
      hasMeta: !!data.meta,
      hasTotals: !!data.meta?.totals,
      dataKeys: data.data ? Object.keys(data.data) : [],
      metaKeys: data.meta ? Object.keys(data.meta) : []
    });
    
    // Normalize the response structure - API returns capitalized keys
    const normalizedData: VehicleProductsResponse = {
      data: {
        batteries: data.data?.Batteries || data.data?.batteries || [],
        lights: data.data?.Lights || data.data?.lights || [],
        wipers: data.data?.Wipers || data.data?.wipers || [],
        filters: data.data?.Filters || data.data?.filters || [],
        oil: data.data?.Oil || data.data?.oil || []
      },
      meta: {
        totals: data.meta?.totals || (() => {
          // Calculate totals from normalized data
          const batteries = data.data?.Batteries || data.data?.batteries || [];
          const lights = data.data?.Lights || data.data?.lights || [];
          const wipers = data.data?.Wipers || data.data?.wipers || [];
          const filters = data.data?.Filters || data.data?.filters || [];
          const oil = data.data?.Oil || data.data?.oil || [];
          
          return {
            batteries: Array.isArray(batteries) ? batteries.length : 0,
            lights: Array.isArray(lights) ? lights.length : 0,
            wipers: Array.isArray(wipers) ? wipers.length : 0,
            filters: Array.isArray(filters) ? filters.length : 0,
            oil: Array.isArray(oil) ? oil.length : 0,
            total: (Array.isArray(batteries) ? batteries.length : 0) +
                   (Array.isArray(lights) ? lights.length : 0) +
                   (Array.isArray(wipers) ? wipers.length : 0) +
                   (Array.isArray(filters) ? filters.length : 0) +
                   (Array.isArray(oil) ? oil.length : 0)
          };
        })()
      }
    };
    
    console.log('Normalized response:', normalizedData);
    const { lights, batteries, wipers, filters, oil } = normalizedData.data;
    const totalsLog = {
      brandSlug: params.brandSlug,
      modelSlug: params.modelSlug,
      batteries: batteries?.length || 0,
      lights: lights?.length || 0,
      wipers: wipers?.length || 0,
      filters: filters?.length || 0,
      oil: oil?.length || 0
    };
    console.log('📦 Category totals:', totalsLog);
    if (!lights || lights.length === 0) {
      console.warn('⚠️ No lights products returned for vehicle:', {
        brandSlug: params.brandSlug,
        modelSlug: params.modelSlug,
        motorisation: params.motorisation,
        vehicleModel: params.vehicleModel
      });
    }
    
    return normalizedData;
  }
}

export const vehicleProductsService = new VehicleProductsService();
export default vehicleProductsService;

