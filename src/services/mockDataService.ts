// Mock data service for web development - v1.1
export interface MockVehicle {
  id: number;
  type: string;
  brand: string;
  model: string;
  motorisation: string;
  dateCirculation: string;
}

export interface MockUserSelection {
  vehicle: MockVehicle;
  category: string;
  answers: {
    positionSlug?: string | string[];
    lightingType?: string;
  };
}

export interface MockLightProduct {
  id: number;
  ref: string;
  description: string;
  brandImg?: string;
  img?: string;
  specifications?: any;
  position: string;
  category: string;
}

export interface MockBatteryProduct {
  id: number;
  ref: string;
  description: string;
  brandImg?: string;
  img?: string;
  specifications?: any;
  position: string;
  category: string;
}

export interface MockBatteryMotorisation {
  id: string;
  motorisation: string;
  fuel: string;
  startDate: string;
  endDate: string;
  batteryTypes: {
    AGM: string;
    EFB: string;
    Conventional: string;
  };
}

export interface MockLightPosition {
  id: number;
  name: string;
  slug: string;
  icon?: string;
}

export interface MockBrand {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface MockModel {
  id: number;
  name: string;
  slug: string;
  brand_slug: string;
  brand_name: string;
  isActive: boolean;
}

class MockDataService {
  // Mock vehicles for testing
  getMockVehicles(): MockVehicle[] {
    return [
      {
        id: 1,
        type: 'car',
        brand: 'Audi',
        model: 'A1 Sportback',
        motorisation: '1.4 TDI',
        dateCirculation: '2018 - 2021'
      },
      {
        id: 2,
        type: 'car',
        brand: 'Peugeot',
        model: '308',
        motorisation: '1.6 HDi',
        dateCirculation: '2014 - 2021'
      },
      {
        id: 3,
        type: 'car',
        brand: 'Renault',
        model: 'Clio',
        motorisation: '1.5 dCi',
        dateCirculation: '2019 - présent'
      }
    ];
  }

  // Mock brands
  getMockBrands(): MockBrand[] {
    return [
      { id: 1, name: 'Audi', slug: 'audi', isActive: true },
      { id: 2, name: 'Peugeot', slug: 'peugeot', isActive: true },
      { id: 3, name: 'Renault', slug: 'renault', isActive: true },
      { id: 4, name: 'Citroën', slug: 'citroen', isActive: true },
      { id: 5, name: 'Volkswagen', slug: 'volkswagen', isActive: true }
    ];
  }

  // Mock models for a brand
  getMockModelsByBrand(brandSlug: string): MockModel[] {
    const modelsByBrand: Record<string, MockModel[]> = {
      'audi': [
        { id: 1, name: 'A1', slug: 'a1', brand_slug: 'audi', brand_name: 'Audi', isActive: true },
        { id: 2, name: 'A1 Sportback', slug: 'a1-sportback', brand_slug: 'audi', brand_name: 'Audi', isActive: true },
        { id: 3, name: 'A3', slug: 'a3', brand_slug: 'audi', brand_name: 'Audi', isActive: true }
      ],
      'peugeot': [
        { id: 4, name: '308', slug: '308', brand_slug: 'peugeot', brand_name: 'Peugeot', isActive: true },
        { id: 5, name: '3008', slug: '3008', brand_slug: 'peugeot', brand_name: 'Peugeot', isActive: true }
      ],
      'renault': [
        { id: 6, name: 'Clio', slug: 'clio', brand_slug: 'renault', brand_name: 'Renault', isActive: true },
        { id: 7, name: 'Megane', slug: 'megane', brand_slug: 'renault', brand_name: 'Renault', isActive: true }
      ]
    };
    return modelsByBrand[brandSlug] || [];
  }

  // Mock light positions
  getMockLightPositions(): MockLightPosition[] {
    return [
      { id: 1, name: 'Feu de croisement', slug: 'feu-de-croisement' },
      { id: 2, name: 'Feu de route', slug: 'feu-de-route' },
      { id: 3, name: 'Feu de position', slug: 'feu-de-position' },
      { id: 4, name: 'Feu antibrouillard', slug: 'feu-antibrouillard' },
      { id: 5, name: 'Clignotant avant', slug: 'clignotant-avant' },
      { id: 6, name: 'Clignotant arrière', slug: 'clignotant-arriere' },
      { id: 7, name: 'Feux arrières', slug: 'feux-arrieres' },
      { id: 8, name: 'Feux stop', slug: 'feux-stop' },
      { id: 9, name: 'Éclairage plaque', slug: 'feux-plaque' },
      { id: 10, name: 'Éclairage intérieur', slug: 'eclairage-interieur' },
      { id: 11, name: 'Éclairage coffre', slug: 'eclairage-coffre' },
      { id: 12, name: 'Éclairage jour', slug: 'eclairage-de-jour' }
    ];
  }

  // Mock light products for a specific vehicle and position
  getMockLightProducts(brandSlug: string, modelSlug: string, positionSlug: string): MockLightProduct[] {
    // Simulate different products based on position
    const productsByPosition: Record<string, MockLightProduct[]> = {
      'feu-de-route': [
        {
          id: 1,
          ref: 'H1',
          description: 'OSRAM ESSENTIAL H1 12V ECOPACK1',
          brandImg: JSON.stringify({ url: '/uploads/LOGO_OSRAM_123353271e.png' }),
          img: JSON.stringify({ url: '/uploads/904600_OSRAM_ORIGINAL_P21_W_4062172396325_1_d26195cca1.jpg' }),
          position: positionSlug,
          category: 'lights'
        },
        {
          id: 2,
          ref: 'H7',
          description: 'OSRAM ESSENTIAL H7 12V ECOPACK1',
          brandImg: JSON.stringify({ url: '/uploads/LOGO_OSRAM_123353271e.png' }),
          img: JSON.stringify({ url: '/uploads/904600_OSRAM_ORIGINAL_P21_W_4062172396325_1_d26195cca1.jpg' }),
          position: positionSlug,
          category: 'lights'
        }
      ],
      'feu-de-croisement': [
        {
          id: 3,
          ref: 'H7',
          description: 'OSRAM ESSENTIAL H7 12V ECOPACK1',
          brandImg: JSON.stringify({ url: '/uploads/LOGO_OSRAM_123353271e.png' }),
          img: JSON.stringify({ url: '/uploads/904600_OSRAM_ORIGINAL_P21_W_4062172396325_1_d26195cca1.jpg' }),
          position: positionSlug,
          category: 'lights'
        }
      ],
      'feu-de-position': [
        {
          id: 4,
          ref: 'W5W',
          description: 'OSRAM ORIGINAL W5W 12V ECOPACK2',
          brandImg: JSON.stringify({ url: '/uploads/LOGO_OSRAM_123353271e.png' }),
          img: JSON.stringify({ url: '/uploads/904600_OSRAM_ORIGINAL_P21_W_4062172396325_1_d26195cca1.jpg' }),
          position: positionSlug,
          category: 'lights'
        }
      ]
    };

    return productsByPosition[positionSlug] || [];
  }

  // Mock battery motorisations for a specific vehicle
  getMockBatteryMotorisations(brandSlug: string, modelSlug: string): MockBatteryMotorisation[] {
    return [
      {
        id: '1-1.4-TDI',
        motorisation: '1.4 TDI',
        fuel: 'Diesel',
        startDate: '2018',
        endDate: '2021',
        batteryTypes: {
          AGM: 'F4',
          EFB: 'F3',
          Conventional: ''
        }
      },
      {
        id: '2-1.6-HDi',
        motorisation: '1.6 HDi',
        fuel: 'Diesel',
        startDate: '2014',
        endDate: '2021',
        batteryTypes: {
          AGM: 'F5',
          EFB: 'F6',
          Conventional: ''
        }
      }
    ];
  }

  // Mock battery data for specific refs
  getMockBatteryData(refs: string[]): MockBatteryProduct[] {
    const batteryData: Record<string, MockBatteryProduct> = {
      'F4': {
        id: 1,
        ref: 'F4',
        description: 'Fulmen F4 Endurance AGM',
        brandImg: JSON.stringify({ url: '/uploads/LOGO_FULMEN_2813d901ed.jpeg' }),
        img: JSON.stringify({ url: '/uploads/908000_FULMEN_F1_ENDURANCE_BD_8198337b62.jpg' }),
        position: 'battery',
        category: 'batteries'
      },
      'F3': {
        id: 2,
        ref: 'F3',
        description: 'Fulmen F3 Endurance EFB',
        brandImg: JSON.stringify({ url: '/uploads/LOGO_FULMEN_2813d901ed.jpeg' }),
        img: JSON.stringify({ url: '/uploads/908010_FULMEN_F3_ENDURANCE_9b43e9f2f8.jpg' }),
        position: 'battery',
        category: 'batteries'
      },
      'F5': {
        id: 3,
        ref: 'F5',
        description: 'Fulmen F5 Endurance AGM',
        brandImg: JSON.stringify({ url: '/uploads/LOGO_FULMEN_2813d901ed.jpeg' }),
        img: JSON.stringify({ url: '/uploads/908020_FULMEN_F4_ENDURANCE_BD_176a5bca14.jpg' }),
        position: 'battery',
        category: 'batteries'
      },
      'F6': {
        id: 4,
        ref: 'F6',
        description: 'Fulmen F6 Endurance EFB',
        brandImg: JSON.stringify({ url: '/uploads/LOGO_FULMEN_2813d901ed.jpeg' }),
        img: JSON.stringify({ url: '/uploads/908030_FULMEN_F6_ENDURANCE_BD_d995f5a539.jpg' }),
        position: 'battery',
        category: 'batteries'
      }
    };

    return refs.map(ref => batteryData[ref]).filter(Boolean);
  }

  // Create a mock user selection for testing
  createMockUserSelection(vehicleId: number = 1, category: string = 'lights', positionSlug?: string): MockUserSelection {
    const vehicles = this.getMockVehicles();
    const vehicle = vehicles.find(v => v.id === vehicleId) || vehicles[0];
    
    return {
      vehicle,
      category,
      answers: {
        positionSlug: positionSlug || 'feu-de-route',
        lightingType: 'Halogen'
      }
    };
  }
}

export const mockDataService = new MockDataService();
