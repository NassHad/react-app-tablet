// Types pour l'application kiosque automobile

export interface Vehicle {
  id: number;
  type: VehicleType;
  brand: string;
  model: string;
  year?: number;
}

export type VehicleType = 'car' | 'truck' | 'motorcycle';

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  icon?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  categoryId: number;
  compatibility: VehicleCompatibility[];
}

export interface VehicleCompatibility {
  id: number;
  vehicleId: number;
  productId: number;
  specificQuestions?: SpecificQuestion[];
}

export interface SpecificQuestion {
  id: number;
  question: string;
  type: 'radio' | 'checkbox' | 'select';
  options: string[];
  required: boolean;
}

export interface UserSelection {
  vehicleType?: VehicleType;
  category?: ProductCategory;
  vehicle?: Vehicle;
  answers?: Record<string, string | string[]>;
}

export interface SearchFilters {
  vehicleType?: VehicleType;
  categoryId?: number;
  brand?: string;
  model?: string;
  year?: number;
}

// Types pour la synchronisation
export interface SyncData {
  vehicles: Vehicle[];
  categories: ProductCategory[];
  products: Product[];
  compatibilities: VehicleCompatibility[];
  lastSync: string;
}

// Types pour la navigation
export type AppRoute = 
  | '/'
  | '/vehicle-type'
  | '/category'
  | '/brand'
  | '/model'
  | '/questions'
  | '/products'
  | '/product-details';

export interface NavigationState {
  currentStep: number;
  totalSteps: number;
  canGoBack: boolean;
  canGoForward: boolean;
} 