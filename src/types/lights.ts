// Light Position Types
export interface LightPosition {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  ref: string;
  category: string;
}

// Light Data Types
export interface LightData {
  position: string;
  ref: string;
  category: string;
  constructionYear: string;
  typeConception: string;
}

// Lights Product Types
export interface LightsProduct {
  id: string;
  name: string;
  ref: string;
  description: string;
  brand: BrandData;
  model: ModelData;
  lightPositions: LightPosition[];
  light_positions?: string; // JSON string from database
  constructionYearStart: string;
  constructionYearEnd: string;
  typeConception: string;
  partNumber: string;
  notes: string;
  source: string;
  category: string;
  isActive: boolean;
  slug: string;
}

// Brand Types (for lights selection)
export interface BrandData {
  id: string;
  name: string;
  slug: string;
}

// Model Types (for lights selection)
export interface ModelData {
  id: string;
  name: string;
  slug: string;
  brand: BrandData;
}

// Legacy types for backward compatibility
export type LightsBrand = BrandData;
export type LightsModel = ModelData;

// API Response Types
export interface LightsSelectionResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface LightsError {
  message: string;
  code?: string;
  details?: any;
}
