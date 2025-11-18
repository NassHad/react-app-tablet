// Wipers Position Types
export interface WipersPosition {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  ref: string;
  sortOrder: number;
  isActive: boolean;
}

// Wipers Data Types
export interface WipersData {
  id: string;
  wiperType: string;
  position: string;
  category: string;
  direction: string;
  constructionYearStart: string;
  constructionYearEnd: string;
  brand: BrandData;
  model: ModelData;
}

// Wipers Product Types
export interface WipersProduct {
  id: string;
  name: string;
  ref: string;
  description: string;
  brand: BrandData;
  model: ModelData;
  wipersPositions: WipersPositionData[];
  selectedPosition?: WipersPositionData; // New field for position-based filtering
  constructionYearStart: string;
  constructionYearEnd: string;
  direction: string;
  wiperBrand: string;
  source: string;
  category: string;
  isActive: boolean;
  slug: string;
}

// Wipers Position Data (embedded in products)
export interface WipersPositionData {
  position: string;
  ref: string;
  description: string;
  category: string;
  wiperData?: {
    id: number;
    ref: string;
    brand: string;
    description: string;
    category: string;
    gtiCode: string;
    genCode: string;
    isActive: boolean;
    size: string;
    img?: {
      id: number;
      name: string;
      url: string;
      alternativeText?: string;
      caption?: string;
      width: number;
      height: number;
      formats?: {
        thumbnail?: { 
          name: string;
          hash: string;
          ext: string;
          url: string;
          width: number;
          height: number;
        };
        small?: { 
          name: string;
          hash: string;
          ext: string;
          url: string;
          width: number;
          height: number;
        };
        medium?: { 
          name: string;
          hash: string;
          ext: string;
          url: string;
          width: number;
          height: number;
        };
        large?: { 
          name: string;
          hash: string;
          ext: string;
          url: string;
          width: number;
          height: number;
        };
      };
    };
    brandImg?: {
      id: number;
      name: string;
      url: string;
      alternativeText?: string;
      caption?: string;
      width: number;
      height: number;
      formats?: {
        thumbnail?: { 
          name: string;
          hash: string;
          ext: string;
          url: string;
          width: number;
          height: number;
        };
        small?: { 
          name: string;
          hash: string;
          ext: string;
          url: string;
          width: number;
          height: number;
        };
        medium?: { 
          name: string;
          hash: string;
          ext: string;
          url: string;
          width: number;
          height: number;
        };
      };
    };
  };
}

// Brand Types (reused from lights)
export interface BrandData {
  id: string;
  name: string;
  slug: string;
}

// Model Types (reused from lights)
export interface ModelData {
  id: string;
  name: string;
  slug: string;
  brand?: BrandData;
}

// API Response Types
export interface WipersSelectionResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface WipersError {
  message: string;
  code?: string;
  details?: any;
}

// Wipers Category Types
export type WipersCategory = 'multiconnexion' | 'standard' | 'arriere';

// Wipers Direction Types
export type WipersDirection = 'LHD' | 'RHD';

// Wipers Brand Types
export type WipersBrand = 'Valeo';
