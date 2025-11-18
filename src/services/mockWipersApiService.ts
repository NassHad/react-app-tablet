import type { 
  WipersPosition, 
  WipersData, 
  BrandData, 
  ModelData, 
  WipersProduct,
  WipersPositionData
} from '../types/wipers';

// Mock data based on the integration guide examples
const mockBrands: BrandData[] = [
  { id: '1', name: 'BMW', slug: 'bmw' },
  { id: '2', name: 'AUDI', slug: 'audi' },
  { id: '3', name: 'PEUGEOT', slug: 'peugeot' },
  { id: '4', name: 'RENAULT', slug: 'renault' },
  { id: '5', name: 'VOLKSWAGEN', slug: 'volkswagen' },
  { id: '6', name: 'ALFA ROMEO', slug: 'alfa-romeo' }
];

const mockModels: ModelData[] = [
  { id: '1', name: '3-Series M3', slug: '3-series-m3', brand: mockBrands[0] },
  { id: '2', name: 'X5', slug: 'x5', brand: mockBrands[0] },
  { id: '3', name: 'A1 Sportback', slug: 'a1-sportback', brand: mockBrands[1] },
  { id: '4', name: 'A3', slug: 'a3', brand: mockBrands[1] },
  { id: '5', name: '308', slug: '308', brand: mockBrands[2] },
  { id: '6', name: 'Clio', slug: 'clio', brand: mockBrands[3] },
  { id: '10', name: '155', slug: '155', brand: mockBrands[5] }
];

const mockPositions: WipersPosition[] = [
  {
    id: 'pos-0',
    name: 'Kit Avant',
    slug: 'kit-avant',
    description: 'Complete front wiper kit',
    category: 'multiconnexion',
    ref: 'VS 36+',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'pos-1',
    name: 'Côté Conducteur',
    slug: 'cote-conducteur',
    description: 'Driver side wiper',
    category: 'multiconnexion',
    ref: 'VS 31+',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'pos-2',
    name: 'Côté Passager',
    slug: 'cote-passager',
    description: 'Passenger side wiper',
    category: 'multiconnexion',
    ref: 'VS 31+',
    sortOrder: 3,
    isActive: true
  },
  {
    id: 'pos-3',
    name: 'Arrière',
    slug: 'arriere',
    description: 'Rear wiper',
    category: 'arriere',
    ref: 'VS 06',
    sortOrder: 4,
    isActive: true
  }
];

const mockWipersPositionData: WipersPositionData[] = [
  {
    position: 'Kit Avant',
    ref: 'VS 36+',
    description: 'VALEO BALAI E.G. PLAT RETROFIT VS36+ 550MM',
    category: 'multiconnexion'
  },
  {
    position: 'Côté Conducteur',
    ref: 'VS 31+',
    description: 'VALEO BALAI E.G. PLAT RETROFIT VS31+ 400MM',
    category: 'multiconnexion'
  },
  {
    position: 'Côté Passager',
    ref: 'VS 31+',
    description: 'VALEO BALAI E.G. PLAT RETROFIT VS31+ 400MM',
    category: 'multiconnexion'
  },
  {
    position: 'Arrière',
    ref: 'VS 06',
    description: 'VALEO BALAI E.G. ARRIERE VS06 290MM',
    category: 'arriere'
  }
];

const mockProducts: WipersProduct[] = [
  {
    id: '1',
    name: '3-Series M3',
    ref: 'BMW-3SERIES-M3',
    description: 'BMW 3-Series M3 wipers',
    slug: 'wiper-valeo-3-series-m3',
    brand: mockBrands[0],
    model: mockModels[0],
    wipersPositions: mockWipersPositionData,
    constructionYearStart: '2014',
    constructionYearEnd: '2020',
    direction: 'LHD',
    wiperBrand: 'Valeo',
    source: 'wipers_database',
    category: 'wipers',
    isActive: true
  },
  {
    id: '2',
    name: 'X5',
    ref: 'BMW-X5',
    description: 'BMW X5 wipers',
    slug: 'wiper-valeo-x5',
    brand: mockBrands[0],
    model: mockModels[1],
    wipersPositions: mockWipersPositionData,
    constructionYearStart: '2018',
    constructionYearEnd: '2024',
    direction: 'LHD',
    wiperBrand: 'Valeo',
    source: 'wipers_database',
    category: 'wipers',
    isActive: true
  },
  {
    id: '3',
    name: 'A1 Sportback',
    ref: 'AUDI-A1-SPORTBACK',
    description: 'Audi A1 Sportback wipers',
    slug: 'wiper-valeo-a1-sportback',
    brand: mockBrands[1],
    model: mockModels[2],
    wipersPositions: mockWipersPositionData,
    constructionYearStart: '2010',
    constructionYearEnd: '2018',
    direction: 'LHD',
    wiperBrand: 'Valeo',
    source: 'wipers_database',
    category: 'wipers',
    isActive: true
  },
  {
    id: '4',
    name: '155',
    ref: 'ALFA-ROMEO-155',
    description: 'Alfa Romeo 155 wipers',
    slug: 'wiper-valeo-155',
    brand: mockBrands[5],
    model: mockModels[6],
    wipersPositions: mockWipersPositionData,
    constructionYearStart: '1992',
    constructionYearEnd: '1998',
    direction: 'LHD',
    wiperBrand: 'Valeo',
    source: 'wipers_database',
    category: 'wipers',
    isActive: true
  }
];

const mockWipersData: WipersData[] = [
  {
    id: '1-0',
    wiperType: 'VS 36+',
    position: 'Kit Avant',
    category: 'multiconnexion',
    direction: 'LHD',
    constructionYearStart: '2014',
    constructionYearEnd: '2020',
    brand: mockBrands[0],
    model: mockModels[0]
  },
  {
    id: '1-1',
    wiperType: 'VS 31+',
    position: 'Côté Conducteur',
    category: 'multiconnexion',
    direction: 'LHD',
    constructionYearStart: '2014',
    constructionYearEnd: '2020',
    brand: mockBrands[0],
    model: mockModels[0]
  }
];

class MockWipersApiService {
  async getBrands(): Promise<BrandData[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockBrands), 300);
    });
  }

  async getModelsByBrand(brandId: string): Promise<ModelData[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const models = mockModels.filter(model => model.brand?.id === brandId);
        resolve(models);
      }, 300);
    });
  }

  async getModelsByBrandSlug(brandSlug: string): Promise<ModelData[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const models = mockModels.filter(model => model.brand?.slug === brandSlug);
        resolve(models);
      }, 300);
    });
  }

  async getPositionsByModel(modelId: string): Promise<WipersPosition[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockPositions), 300);
    });
  }

  async getWiperDataByPosition(positionId: string): Promise<WipersData[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const data = mockWipersData.filter(item => item.id.includes(positionId.split('-')[1]));
        resolve(data);
      }, 300);
    });
  }

  async getAllPositions(): Promise<WipersPosition[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockPositions), 300);
    });
  }

  async getPositionsBySlugs(slugs: string[]): Promise<WipersPosition[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const positions = mockPositions.filter(pos => slugs.includes(pos.slug));
        resolve(positions);
      }, 300);
    });
  }

  async getProductsByBrandAndModel(brandSlug: string, modelSlug: string): Promise<WipersProduct[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const products = mockProducts.filter(product => 
          product.brand.slug === brandSlug && product.model.slug === modelSlug
        );
        resolve(products);
      }, 300);
    });
  }

  async getProductsBySlugsAndPosition(brandSlug: string, modelSlug: string, positionSlug: string): Promise<WipersProduct[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const products = mockProducts.filter(product => 
          product.brand.slug === brandSlug && 
          product.model.slug === modelSlug &&
          product.wipersPositions.some(pos => pos.position.toLowerCase().includes(positionSlug))
        );
        resolve(products);
      }, 300);
    });
  }

  async searchModel(brandSlug: string, modelSlug: string): Promise<ModelData[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const models = mockModels.filter(model => 
          model.brand?.slug === brandSlug && model.slug === modelSlug
        );
        resolve(models);
      }, 300);
    });
  }

  async getModelsFromProducts(): Promise<ModelData[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const uniqueModels = mockProducts.reduce((acc, product) => {
          if (!acc.find(model => model.id === product.model.id)) {
            acc.push(product.model);
          }
          return acc;
        }, [] as ModelData[]);
        resolve(uniqueModels);
      }, 300);
    });
  }

  async getProductsBySlugs(slugs: string[]): Promise<WipersProduct[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const products = mockProducts.filter(product => slugs.includes(product.slug));
        resolve(products);
      }, 300);
    });
  }

  async getProductsByModelAndPosition(modelSlug: string, position: string): Promise<WipersProduct[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('🔍 Mock API Debug:', { modelSlug, position });
        console.log('🔍 Available mock products:', mockProducts.map(p => ({ name: p.name, modelSlug: p.model.slug })));
        
        // Filter products by modelSlug
        const products = mockProducts.filter(product => {
          const matches = product.model.slug === modelSlug;
          console.log(`🔍 Product ${product.name} (model.slug: ${product.model.slug}) matches ${modelSlug}:`, matches);
          return matches;
        });
        
        console.log('🔍 Filtered products:', products.length);
        
        // Add selectedPosition to simulate the new API response
        const productsWithPosition = products.map(product => {
          const selectedPos = product.wipersPositions.find(pos =>
            pos.position.toLowerCase().includes(position.toLowerCase()) ||
            pos.category.toLowerCase().includes(position.toLowerCase())
          ) || product.wipersPositions[0];
          
          console.log(`🔍 Selected position for ${product.name}:`, selectedPos);
          
          return {
            ...product,
            selectedPosition: selectedPos
          };
        });
        
        console.log('🔍 Final products with position:', productsWithPosition.length);
        resolve(productsWithPosition);
      }, 300);
    });
  }
}

export const mockWipersApiService = new MockWipersApiService();
export default mockWipersApiService;
