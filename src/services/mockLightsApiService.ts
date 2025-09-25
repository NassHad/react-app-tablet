import type { BrandData, ModelData, LightPosition, LightData, LightsProduct } from '../types/lights';

// Mock data for testing
const mockBrands: BrandData[] = [
  { id: '1', name: 'Alfa Romeo', slug: 'alfa-romeo' },
  { id: '2', name: 'BMW', slug: 'bmw' },
  { id: '3', name: 'Mercedes-Benz', slug: 'mercedes-benz' },
  { id: '4', name: 'Audi', slug: 'audi' },
  { id: '5', name: 'Volkswagen', slug: 'volkswagen' },
  { id: '6', name: 'Ford', slug: 'ford' },
  { id: '7', name: 'Peugeot', slug: 'peugeot' },
  { id: '8', name: 'Renault', slug: 'renault' },
  { id: '9', name: 'Citroën', slug: 'citroen' },
  { id: '10', name: 'Toyota', slug: 'toyota' }
];

const mockModels: ModelData[] = [
  { id: '1', name: '145', slug: '145', brand: { id: '1', name: 'Alfa Romeo', slug: 'alfa-romeo' } },
  { id: '2', name: '146', slug: '146', brand: { id: '1', name: 'Alfa Romeo', slug: 'alfa-romeo' } },
  { id: '3', name: '147', slug: '147', brand: { id: '1', name: 'Alfa Romeo', slug: 'alfa-romeo' } },
  { id: '4', name: '3 Series', slug: '3-series', brand: { id: '2', name: 'BMW', slug: 'bmw' } },
  { id: '5', name: '5 Series', slug: '5-series', brand: { id: '2', name: 'BMW', slug: 'bmw' } },
  { id: '6', name: 'C-Class', slug: 'c-class', brand: { id: '3', name: 'Mercedes-Benz', slug: 'mercedes-benz' } },
  { id: '7', name: 'A4', slug: 'a4', brand: { id: '4', name: 'Audi', slug: 'audi' } },
  { id: '8', name: 'Golf', slug: 'golf', brand: { id: '5', name: 'Volkswagen', slug: 'volkswagen' } },
  { id: '9', name: 'Focus', slug: 'focus', brand: { id: '6', name: 'Ford', slug: 'ford' } },
  { id: '10', name: '308', slug: '308', brand: { id: '7', name: 'Peugeot', slug: 'peugeot' } }
];

const mockPositions: LightPosition[] = [
  { id: 'pos-1', name: 'Feu de croisement', slug: 'feu-de-croisement', isActive: true, ref: 'H11', category: 'feu_croisement' },
  { id: 'pos-2', name: 'Feu de route', slug: 'feu-de-route', isActive: true, ref: 'H7', category: 'feu_route' },
  { id: 'pos-3', name: 'Éclairage de jour', slug: 'eclairage-de-jour', isActive: true, ref: 'W21W', category: 'eclairage_jour' },
  { id: 'pos-4', name: 'Feu de position', slug: 'feu-de-position', isActive: true, ref: 'W5W', category: 'feu_position' },
  { id: 'pos-5', name: 'Feux antibrouillard', slug: 'feux-antibrouillard', isActive: true, ref: 'H8', category: 'feux_antibrouillard' },
  { id: 'pos-6', name: 'Clignotant avant', slug: 'clignotant-avant', isActive: true, ref: 'PY21W', category: 'clignotant_avant' },
  { id: 'pos-7', name: 'Clignotant arrière', slug: 'clignotant-arriere', isActive: true, ref: 'PY21W', category: 'clignotant_arriere' },
  { id: 'pos-8', name: 'Feux arrières', slug: 'feux-arrieres', isActive: true, ref: 'P21W', category: 'feux_arrieres' },
  { id: 'pos-9', name: 'Feux de stop', slug: 'feux-de-stop', isActive: true, ref: 'P21W', category: 'feux_stop' },
  { id: 'pos-10', name: 'Feux plaque immatriculation', slug: 'feux-plaque-immatriculation', isActive: true, ref: 'W5W', category: 'feux_plaque' }
];

const mockLightData: Record<string, LightData> = {
  'pos-1': {
    position: 'Feu de croisement',
    ref: 'H11',
    category: 'feu_croisement',
    constructionYear: '1995-2001',
    typeConception: 'Halogen'
  },
  'pos-2': {
    position: 'Feu de route',
    ref: 'H7',
    category: 'feu_route',
    constructionYear: '1995-2001',
    typeConception: 'Halogen'
  },
  'pos-3': {
    position: 'Éclairage de jour',
    ref: 'W21W',
    category: 'eclairage_jour',
    constructionYear: '1995-2001',
    typeConception: 'LED'
  },
  'pos-4': {
    position: 'Feu de position',
    ref: 'W5W',
    category: 'feu_position',
    constructionYear: '1995-2001',
    typeConception: 'Halogen'
  },
  'pos-5': {
    position: 'Feux antibrouillard',
    ref: 'H8',
    category: 'feux_antibrouillard',
    constructionYear: '1995-2001',
    typeConception: 'Halogen'
  }
};

// Mock products data
const mockProducts: LightsProduct[] = [
  {
    id: 'prod-1',
    name: 'ABARTH 500 / 595 / 695 - Feu de croisement',
    ref: 'H7',
    description: 'Ampoule H7 pour feu de croisement ABARTH 500/595/695',
    brand: { id: '1', name: 'ABARTH', slug: 'abarth' },
    model: { id: '1', name: '500 / 595 / 695', slug: '500-595-695', brand: { id: '1', name: 'ABARTH', slug: 'abarth' } },
    lightPositions: [
      { id: 'pos-0', name: 'Feu de croisement', slug: 'feu-de-croisement', isActive: true, ref: 'H7', category: 'feu_croisement' }
    ],
    constructionYearStart: '2007',
    constructionYearEnd: '2020',
    typeConception: 'Halogen',
    partNumber: 'ABARTH-H7-500',
    notes: 'Compatible avec toutes les versions 500/595/695',
    source: 'OSRAM',
    category: 'feu_croisement',
    isActive: true,
    slug: 'abarth-500-595-695-feu-croisement'
  },
  {
    id: 'prod-2',
    name: 'ABARTH 500 / 595 / 695 - Feu de route',
    ref: 'H7',
    description: 'Ampoule H7 pour feu de route ABARTH 500/595/695',
    brand: { id: '1', name: 'ABARTH', slug: 'abarth' },
    model: { id: '1', name: '500 / 595 / 695', slug: '500-595-695', brand: { id: '1', name: 'ABARTH', slug: 'abarth' } },
    lightPositions: [
      { id: 'pos-1', name: 'Feu de route', slug: 'feu-de-route', isActive: true, ref: 'H7', category: 'feu_route' }
    ],
    constructionYearStart: '2007',
    constructionYearEnd: '2020',
    typeConception: 'Halogen',
    partNumber: 'ABARTH-H7-ROUTE-500',
    notes: 'Haute performance pour conduite nocturne',
    source: 'OSRAM',
    category: 'feu_route',
    isActive: true,
    slug: 'abarth-500-595-695-feu-route'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLightsApiService = {
  getBrands: async (): Promise<BrandData[]> => {
    await delay(500);
    return mockBrands;
  },

  getModelsByBrand: async (brandId: string): Promise<ModelData[]> => {
    await delay(300);
    return mockModels.filter(model => model.brand.id === brandId);
  },

  getPositionsByModel: async (modelId: string): Promise<LightPosition[]> => {
    await delay(400);
    // Return different positions based on model
    if (modelId === '1') { // Alfa Romeo 145
      return mockPositions.slice(0, 6); // First 6 positions
    } else if (modelId === '2') { // Alfa Romeo 146
      return mockPositions.slice(2, 8); // Different set
    } else {
      return mockPositions.slice(0, 4); // Default set
    }
  },

  getLightDataByPosition: async (_modelId: string, positionId: string): Promise<LightData> => {
    await delay(200);
    const data = mockLightData[positionId];
    if (!data) {
      throw new Error(`No light data found for position ${positionId}`);
    }
    return data;
  },

  searchModel: async (brandSlug: string, modelSlug: string): Promise<ModelData[]> => {
    await delay(300);
    const results = mockModels.filter(model => 
      model.brand.slug === brandSlug && model.slug === modelSlug
    );
    return results;
  },

  getPositionsBySlugs: async (brandSlug: string, modelSlug: string): Promise<LightPosition[]> => {
    await delay(400);
    // Find the model first
    const model = mockModels.find(m => 
      m.brand.slug === brandSlug && m.slug === modelSlug
    );
    
    if (!model) {
      return [];
    }
    
    // Return positions for this model
    return mockLightsApiService.getPositionsByModel(model.id);
  },

  getProductsBySlugs: async (brandSlug: string, modelSlug: string): Promise<LightsProduct[]> => {
    await delay(400);
    return mockProducts.filter(p => p.brand.slug === brandSlug && p.model.slug === modelSlug);
  },

  getProductsBySlugsAndPosition: async (brandSlug: string, modelSlug: string, positionSlug: string): Promise<LightsProduct[]> => {
    await delay(400);
    return mockProducts.filter(p => 
      p.brand.slug === brandSlug && 
      p.model.slug === modelSlug && 
      p.lightPositions.some(pos => pos.slug === positionSlug)
    );
  },

  getAllMasterPositions: async (): Promise<LightPosition[]> => {
    await delay(300);
    // Return all master positions sorted (as they would be from the backend)
    return mockPositions.sort((a, b) => a.name.localeCompare(b.name));
  }
};

export default mockLightsApiService;
