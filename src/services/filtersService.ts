import { ENV } from '../config/environment';

export type FilterType = 'oil' | 'air' | 'diesel' | 'cabin';

export interface FindProductsParams {
  brand: string;
  model: string;
  variant?: string;
  filterType: FilterType;
}

export interface FindProductsResponse {
  data: Array<{
    id: number;
    reference: string;
    fullName: string;
    ean?: string;
    filterType: FilterType;
    brand: string;
    isActive: boolean;
    compatibilityMetadata?: {
      vehicleVariant?: string;
      engineCode?: string;
      power?: string;
      notes?: string[];
    };
  }>;
  meta: {
    total: number;
    found: boolean;
    filters: { brand: string; model: string; variant?: string; filterType: FilterType };
    availability: {
      availableReferences: string[];
      unavailableReferences: string[];
      message: string | null;
    };
  };
}

export type FilterVariantItem = {
  id: number;
  variant: string;
  fullName?: string;
  engineCode?: string;
  power?: string;
};

export const filtersService = {
  async getVariants(brand: string, model: string): Promise<FilterVariantItem[]> {
    console.log('getVariants', brand, model);
  const res = await apiGet<{ data: FilterVariantItem[]; meta: any }>(
      '/filter-compatibility/variants',
      { brand, model }
    );
    console.log('getVariants res', res);
    
    return res?.data ?? [];
  },

  async getRefs(params: { brand: string; model: string; variant?: string; filterType: FilterType }): Promise<string[]> {
    // Use find-products endpoint to get both products and original compatibility references
    const res = await apiGet<FindProductsResponse>(
      '/filter-compatibility/find-products',
      {
        brand: params.brand,
        model: params.model,
        variant: params.variant,
        filterType: params.filterType,
      }
    );
    // Prioritize original compatibility references from meta (e.g., "56-CS701")
    // These are more meaningful for display than individual product refs
    const fromMeta = res?.meta?.availability?.availableReferences || [];
    // Fallback to product references if meta doesn't have original refs
    const fromData = Array.isArray(res?.data) ? res.data.map(p => p.reference).filter(Boolean) : [];
    // Use meta refs if available, otherwise use product refs
    const refs = fromMeta.length > 0 ? fromMeta : fromData;
    // Deduplicate
    return Array.from(new Set(refs));
  },

  findProducts(params: FindProductsParams) {
    console.log('findProducts', params);
    return apiGet<FindProductsResponse>('/filter-compatibility/find-products', params as Record<string, any>);
  },
};

export default filtersService;

async function apiGet<T>(path: string, params?: Record<string, any>): Promise<T> {
  const base = ENV.STRAPI_API_URL; // e.g. http://localhost:1338/api
  const url = new URL(base + path);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.append(key, String(value));
    });
  }
  console.log('apiGet url', url.toString());
  const res = await fetch(url.toString(), { headers: { 'Content-Type': 'application/json' }, cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data as T;
}


