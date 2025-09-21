import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import type { ProductCategory } from '../types';

const DB_NAME = 'react-app-db.db';
const DB_VERSION = 1;

// Configuration flag to easily switch between SQLite and mock data
export const USE_SQLITE = false; // Set to false to use mock data

// Mock data for all categories
const MOCK_CATEGORIES: ProductCategory[] = [
  { id: 1, name: 'Balais d\'essuie-glace', slug: 'wipers', icon: 'wiper', active: true },
  { id: 2, name: 'Batteries', slug: 'batteries', icon: 'battery', active: true },
  { id: 3, name: 'Huiles', slug: 'oils', icon: 'oil', active: true },
  { id: 4, name: 'Eclairage', slug: 'bulbs', icon: 'bulb', active: true },
  { id: 5, name: 'Filtration', slug: 'filtration', icon: 'filter', active: true },
];

const MOCK_BATTERY_PRODUCTS = [
  { id: 1, brand: 'Bosch', type: 'E43 Blue Dynamic', power: '72 Ah', tension: '470 A', category: 'batteries', battery_type: 'standard' },
  { id: 2, brand: 'Varta', type: 'Silver Dynamic', power: '60 Ah', tension: '540 A', category: 'batteries', battery_type: 'efb' },
  { id: 3, brand: 'Bosch', type: 'S4 Silver', power: '80 Ah', tension: '800 A', category: 'batteries', battery_type: 'agm' },
  { id: 4, brand: 'Varta', type: 'Blue Dynamic', power: '70 Ah', tension: '660 A', category: 'batteries', battery_type: 'standard' },
  { id: 5, brand: 'Bosch', type: 'S5 Silver', power: '95 Ah', tension: '850 A', category: 'batteries', battery_type: 'agm' },
  { id: 6, brand: 'Varta', type: 'Silver Dynamic', power: '65 Ah', tension: '600 A', category: 'batteries', battery_type: 'efb' },
  { id: 7, brand: 'Bosch', type: 'E44 Blue Dynamic', power: '74 Ah', tension: '680 A', category: 'batteries', battery_type: 'standard' },
  { id: 8, brand: 'Varta', type: 'Blue Dynamic', power: '55 Ah', tension: '480 A', category: 'batteries', battery_type: 'standard' },
  { id: 9, brand: 'Bosch', type: 'S6 Silver', power: '110 Ah', tension: '1000 A', category: 'batteries', battery_type: 'agm' },
  { id: 10, brand: 'Varta', type: 'Silver Dynamic', power: '75 Ah', tension: '700 A', category: 'batteries', battery_type: 'efb' },
  { id: 11, brand: 'Bosch', type: 'E45 Blue Dynamic', power: '77 Ah', tension: '720 A', category: 'batteries', battery_type: 'standard' },
  { id: 12, brand: 'Varta', type: 'Blue Dynamic', power: '50 Ah', tension: '440 A', category: 'batteries', battery_type: 'standard' },
];

const MOCK_BULB_PRODUCTS = [
  { id: 1, brand: 'OSRAM', number: '2', type: 'H4', voltage: '12V', category: 'bulbs', lighting_type: 'feu_croisement' },
  { id: 2, brand: 'Philips', number: '2', type: 'H7', voltage: '12V', category: 'bulbs', lighting_type: 'feu_route' },
  { id: 3, brand: 'OSRAM', number: '4', type: 'H1', voltage: '12V', category: 'bulbs', lighting_type: 'eclairage_jour' },
  { id: 4, brand: 'Philips', number: '2', type: 'H3', voltage: '12V', category: 'bulbs', lighting_type: 'feux_antibrouillard' },
  { id: 5, brand: 'OSRAM', number: '2', type: 'H11', voltage: '12V', category: 'bulbs', lighting_type: 'clignotant_avant' },
  { id: 6, brand: 'Philips', number: '2', type: 'H4', voltage: '12V', category: 'bulbs', lighting_type: 'feu_croisement' },
  { id: 7, brand: 'OSRAM', number: '2', type: 'H8', voltage: '12V', category: 'bulbs', lighting_type: 'clignotant_arriere' },
  { id: 8, brand: 'Philips', number: '4', type: 'H7', voltage: '12V', category: 'bulbs', lighting_type: 'feu_route' },
  { id: 9, brand: 'OSRAM', number: '2', type: 'H9', voltage: '12V', category: 'bulbs', lighting_type: 'feux_arrieres' },
  { id: 10, brand: 'Philips', number: '2', type: 'H1', voltage: '12V', category: 'bulbs', lighting_type: 'feux_stop' },
  { id: 11, brand: 'OSRAM', number: '2', type: 'H4', voltage: '24V', category: 'bulbs', lighting_type: 'feux_plaque' },
  { id: 12, brand: 'Philips', number: '2', type: 'H7', voltage: '24V', category: 'bulbs', lighting_type: 'eclairage_interieur' },
];

const MOCK_OIL_PRODUCTS = [
  { id: 1, brand: 'Total', type: '5W-30', quantity: '5L', category: 'oils' },
  { id: 2, brand: 'Mobil', type: '10W-40', quantity: '4L', category: 'oils' },
  { id: 3, brand: 'Castrol', type: '5W-40', quantity: '5L', category: 'oils' },
  { id: 4, brand: 'Total', type: '15W-40', quantity: '4L', category: 'oils' },
  { id: 5, brand: 'Mobil', type: '0W-20', quantity: '5L', category: 'oils' },
  { id: 6, brand: 'Castrol', type: '10W-30', quantity: '4L', category: 'oils' },
  { id: 7, brand: 'Total', type: '5W-30', quantity: '1L', category: 'oils' },
  { id: 8, brand: 'Mobil', type: '10W-40', quantity: '1L', category: 'oils' },
  { id: 9, brand: 'Castrol', type: '5W-40', quantity: '1L', category: 'oils' },
  { id: 10, brand: 'Total', type: '15W-40', quantity: '1L', category: 'oils' },
  { id: 11, brand: 'Mobil', type: '0W-20', quantity: '1L', category: 'oils' },
  { id: 12, brand: 'Castrol', type: '10W-30', quantity: '1L', category: 'oils' },
];

const MOCK_FILTRATION_PRODUCTS = [
  { id: 1, brand: 'Purflux', type: 'Filtre à gazole', reference: 'C123', category: 'filtration' },
  { id: 2, brand: 'Mann', type: 'Filtre à air', reference: 'A456', category: 'filtration' },
  { id: 3, brand: 'Bosch', type: 'Filtre d\'habitacle', reference: 'B789', category: 'filtration' },
  { id: 4, brand: 'Purflux', type: 'Filtre à huile', reference: 'H101', category: 'filtration' },
];

const MOCK_WIPER_PRODUCTS = [
  { id: 1, brand: 'Valeo', type: 'VS70', size: '350mm', category: 'wipers' },
  { id: 2, brand: 'Bosch', type: 'Aerotwin', size: '400mm', category: 'wipers' },
  { id: 3, brand: 'Valeo', type: 'VS80', size: '380mm', category: 'wipers' },
  { id: 4, brand: 'Bosch', type: 'Aerotwin', size: '350mm', category: 'wipers' },
  { id: 5, brand: 'Valeo', type: 'VS60', size: '320mm', category: 'wipers' },
  { id: 6, brand: 'Bosch', type: 'Aerotwin', size: '420mm', category: 'wipers' },
  { id: 7, brand: 'Valeo', type: 'VS90', size: '450mm', category: 'wipers' },
  { id: 8, brand: 'Bosch', type: 'Aerotwin', size: '380mm', category: 'wipers' },
  { id: 9, brand: 'Valeo', type: 'VS100', size: '500mm', category: 'wipers' },
  { id: 10, brand: 'Bosch', type: 'Aerotwin', size: '360mm', category: 'wipers' },
  { id: 11, brand: 'Valeo', type: 'VS50', size: '300mm', category: 'wipers' },
  { id: 12, brand: 'Bosch', type: 'Aerotwin', size: '440mm', category: 'wipers' },
];

class DatabaseService {
  private sqlite!: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWebEnvironment: boolean;

  constructor() {
    console.log('🔧 DatabaseService constructor called');
    console.log('🔧 CapacitorSQLite available:', !!CapacitorSQLite);
    console.log('🔧 Platform detected:', Capacitor.getPlatform());
    
    try {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
      console.log('✅ SQLiteConnection created successfully');
    } catch (error) {
      console.error('❌ Failed to create SQLiteConnection:', error);
    }
    
    this.isWebEnvironment = Capacitor.getPlatform() === 'web';
    console.log('🔧 isWebEnvironment set to:', this.isWebEnvironment);
  }

  async initialize(): Promise<void> {
    console.log('🔧 Database initialization started...');
    console.log('🔧 USE_SQLITE:', USE_SQLITE);
    console.log('🔧 Platform:', Capacitor.getPlatform());
    
    // Skip database initialization if using mock data
    if (!USE_SQLITE) {
      console.log('❌ Using mock data - skipping database initialization');
      return;
    }

    try {
      if (Capacitor.getPlatform() === 'web') {
        console.log('🌐 Web environment detected, setting up web SQLite...');
        
        // 1. Try to load jeep-sqlite dynamically
        await this.ensureJeepSQLiteLoaded();
        
        // 2. Initialize web store
        console.log('🔧 Initializing web store...');
        if (this.sqlite.initWebStore) {
          try {
            await this.sqlite.initWebStore();
            console.log('✅ Web SQLite store initialized successfully');
          } catch (webStoreError) {
            console.warn('⚠️ Web store initialization failed, continuing anyway:', webStoreError);
          }
        } else {
          console.log('⚠️ initWebStore method not available');
        }
      }

      // 3. Create and open connection
      console.log('🔧 Creating database connection...');
      if (Capacitor.getPlatform() === 'android') {
        console.log('📱 Android detected, copying from assets...');
        await this.sqlite.copyFromAssets();
      }
      
      this.db = await this.sqlite.createConnection(DB_NAME, false, 'no-encryption', DB_VERSION, false);
      console.log('✅ Database connection created');
      
      await this.db.open();
      console.log('✅ Database connection opened successfully');

      // 4. Create tables if needed
      console.log('🔧 Setting up database tables...');
      await this.createTables();
      console.log('✅ Database tables created/verified successfully');
      
      console.log('🎉 Database initialization completed successfully!');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      console.log('🔄 Falling back to mock data mode');
      // Fallback to mock data if database fails
      this.isWebEnvironment = true;
    }
  }

// Public method to check jeep-sqlite status
async checkJeepSQLiteStatus(): Promise<{ exists: boolean; defined: boolean; ready: boolean }> {
  const jeepElement = document.querySelector('jeep-sqlite');
  const isDefined = customElements.get('jeep-sqlite') !== undefined;
  
  let isReady = false;
  if (isDefined) {
    try {
      await customElements.whenDefined('jeep-sqlite');
      isReady = true;
    } catch {
      isReady = false;
    }
  }
  
  return {
    exists: !!jeepElement,
    defined: isDefined,
    ready: isReady
  };
}

private async loadFromLocalNodeModules(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/node_modules/jeep-sqlite/dist/esm/jeep-sqlite.entry.js';
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load from node_modules'));
    
    document.head.appendChild(script);
  });
}

// Strategy 2: Load from CDN
private async loadFromCDN(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/jeep-sqlite@2.8.0/dist/esm/jeep-sqlite.entry.js';
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load from CDN'));
    
    document.head.appendChild(script);
  });
}

// Strategy 3: Load from unpkg
private async loadFromUnpkg(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/jeep-sqlite@2.8.0/dist/esm/jeep-sqlite.entry.js';
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load from unpkg'));
    
    document.head.appendChild(script);
  });
}

private async ensureJeepSQLiteLoaded(): Promise<void> {
  console.log('🔧 Ensuring jeep-sqlite is loaded...');
  
  // Check if already loaded
  if (customElements.get('jeep-sqlite')) {
    console.log('✅ jeep-sqlite already loaded');
    return;
  }

  // Try multiple loading strategies
  const loadingStrategies = [
    this.loadFromLocalNodeModules,
    this.loadFromCDN,
    this.loadFromUnpkg
  ];

  for (const strategy of loadingStrategies) {
    try {
      console.log(`🔧 Trying loading strategy: ${strategy.name}`);
      await strategy();
      
      // Wait for custom element to be defined
      await customElements.whenDefined('jeep-sqlite');
      console.log('✅ jeep-sqlite loaded successfully');
      return;
    } catch (error) {
      console.warn(`⚠️ Strategy ${strategy.name} failed:`, error);
      continue;
    }
  }

  throw new Error('All jeep-sqlite loading strategies failed');
}

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('DB non initialisée');

    // Create categories table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        icon TEXT NOT NULL,
        active BOOLEAN NOT NULL DEFAULT 1
      );
    `);

    // Create products table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        brand TEXT NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        specifications TEXT,
        battery_type TEXT,
        lighting_type TEXT,
        power TEXT,
        tension TEXT,
        quantity TEXT,
        voltage TEXT,
        number TEXT,
        reference TEXT,
        size TEXT
      );
    `);

    // Insert categories
    await this.db.execute(`
      INSERT OR IGNORE INTO categories (id, name, slug, icon, active) VALUES
      (1, 'Balais d''essuie-glace', 'wipers', 'wiper', 1),
      (2, 'Batteries', 'batteries', 'battery', 1),
      (3, 'Huiles', 'oils', 'oil', 1),
      (4, 'Eclairage', 'bulbs', 'bulb', 1),
      (5, 'Filtration', 'filtration', 'filter', 1);
    `);

    // Insert products
    const allProducts = [
      ...MOCK_BATTERY_PRODUCTS,
      ...MOCK_BULB_PRODUCTS,
      ...MOCK_OIL_PRODUCTS,
      ...MOCK_FILTRATION_PRODUCTS,
      ...MOCK_WIPER_PRODUCTS
    ];

    for (const product of allProducts) {
      await this.db.execute(`
        INSERT OR IGNORE INTO products (
          id, brand, type, category, battery_type, lighting_type, 
          power, tension, quantity, voltage, number, reference, size
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        product.id, product.brand, product.type, product.category,
        (product as any).battery_type || null, (product as any).lighting_type || null,
        (product as any).power || null, (product as any).tension || null, (product as any).quantity || null,
        (product as any).voltage || null, (product as any).number || null, (product as any).reference || null,
        (product as any).size || null
      ] as any);
    }
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    // First, try to get categories from Strapi if available
    try {
      const { strapiService } = await import('../services/strapiService');
      console.log('🌐 Attempting to fetch categories from Strapi...');
      const strapiCategories = await strapiService.getProductCategories();
      console.log('✅ Categories loaded from Strapi:', strapiCategories.length);
      return strapiCategories;
    } catch (strapiError: any) {
      console.log('📡 Strapi not available, falling back to local database:', strapiError?.message || 'Unknown error');
      
      // Fallback to local database logic
      if (!USE_SQLITE) {
        console.log('Using mock categories - USE_SQLITE is false');
        return MOCK_CATEGORIES;
      }

      if (!this.db) {
        console.log('Database not initialized, using mock categories');
        return MOCK_CATEGORIES;
      }

      try {
        const result = await this.db.query('SELECT * FROM categories WHERE active = 1 ORDER BY name');
        console.log('🗄️ Categories loaded from SQLite:', result.values?.length || 0);
        return result.values as ProductCategory[];
      } catch (error) {
        console.error('❌ Error loading categories from SQLite, falling back to mock data:', error);
        return MOCK_CATEGORIES;
      }
    }
  }

  async getProductById(id: number): Promise<any | null> {
    try {
      if (!USE_SQLITE) {
        console.log('Using mock products - USE_SQLITE is false');
        // Search in all mock products
        const allMockProducts = [
          ...MOCK_BATTERY_PRODUCTS,
          ...MOCK_BULB_PRODUCTS,
          ...MOCK_OIL_PRODUCTS,
          ...MOCK_FILTRATION_PRODUCTS,
          ...MOCK_WIPER_PRODUCTS
        ];
        return allMockProducts.find(p => p.id === id) || null;
      }

      if (!this.db) {
        console.log('Database not initialized, using mock products');
        const allMockProducts = [
          ...MOCK_BATTERY_PRODUCTS,
          ...MOCK_BULB_PRODUCTS,
          ...MOCK_OIL_PRODUCTS,
          ...MOCK_FILTRATION_PRODUCTS,
          ...MOCK_WIPER_PRODUCTS
        ];
        return allMockProducts.find(p => p.id === id) || null;
      }

      const result = await this.db.query('SELECT * FROM products WHERE id = ?', [id]);
      return result.values?.[0] || null;
    } catch (error) {
      console.error('❌ Error loading product by ID from SQLite, falling back to mock data:', error);
      const allMockProducts = [
        ...MOCK_BATTERY_PRODUCTS,
        ...MOCK_BULB_PRODUCTS,
        ...MOCK_OIL_PRODUCTS,
        ...MOCK_FILTRATION_PRODUCTS,
        ...MOCK_WIPER_PRODUCTS
      ];
      return allMockProducts.find(p => p.id === id) || null;
    }
  }

  async getProducts(category: string, filters?: Record<string, any>): Promise<any[]> {
    // First, try to get products from Strapi if available
    try {
      const { strapiService } = await import('../services/strapiService');
      console.log(`🌐 Attempting to fetch products for ${category} from Strapi...`);
      const strapiProducts = await strapiService.getProducts(category, filters);
      console.log(`✅ Products loaded from Strapi for ${category}:`, strapiProducts.length);
      return strapiProducts;
    } catch (strapiError: any) {
      console.log(`📡 Strapi not available for ${category}, falling back to local database:`, strapiError?.message || 'Unknown error');
      
      // Fallback to local database logic
      if (!USE_SQLITE) {
        console.log('Using mock products - USE_SQLITE is false');
        return this.getMockProducts(category, filters);
      }

      if (!this.db) {
        console.log('Database not initialized, using mock products for category:', category);
        return this.getMockProducts(category, filters);
      }

      try {
        let query = 'SELECT * FROM products WHERE category = ?';
        const params: any[] = [category];

        // Add filters
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) {
              query += ` AND ${key} = ?`;
              params.push(value);
            }
          });
        }

        const result = await this.db.query(query, params);
        console.log(`🗄️ Products loaded from SQLite for ${category}:`, result.values?.length || 0);
        return result.values || [];
      } catch (error) {
        console.error(`❌ Error loading products from SQLite for ${category}, falling back to mock data:`, error);
        return this.getMockProducts(category, filters);
      }
    }
  }

  private getMockProducts(category: string, filters?: Record<string, any>): any[] {
    let products: any[] = [];

    switch (category) {
      case 'batteries':
        products = MOCK_BATTERY_PRODUCTS;
        if (filters?.battery_type) {
          products = products.filter(p => p.battery_type === filters.battery_type);
        }
        break;
      case 'bulbs':
        products = MOCK_BULB_PRODUCTS;
        if (filters?.lighting_type) {
          products = products.filter(p => p.lighting_type === filters.lighting_type);
        }
        break;
      case 'oils':
        products = MOCK_OIL_PRODUCTS;
        break;
      case 'filtration':
        products = MOCK_FILTRATION_PRODUCTS;
        break;
      case 'wipers':
        products = MOCK_WIPER_PRODUCTS;
        break;
      default:
        products = [];
    }

    return products;
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection(DB_NAME, false);
      this.db = null;
      console.log('🔒 Database connection closed');
    }
  }

  // Public method to check database status
  getDatabaseStatus(): { isInitialized: boolean; isWeb: boolean; useSQLite: boolean } {
    return {
      isInitialized: !!this.db,
      isWeb: this.isWebEnvironment,
      useSQLite: USE_SQLITE
    };
  }

  // Public method to force re-initialization
  async forceReinitialize(): Promise<void> {
    console.log('🔄 Force re-initializing database...');
    await this.close();
    this.isWebEnvironment = false; // Reset web environment flag
    await this.initialize();
  }

  // Public method to test database connection
  async testConnection(): Promise<boolean> {
    try {
      if (!this.db) {
        console.log('❌ No database connection available');
        return false;
      }
      
      const result = await this.db.query('SELECT 1 as test');
      console.log('✅ Database connection test successful:', result);
      return true;
    } catch (error) {
      console.error('❌ Database connection test failed:', error);
      return false;
    }
  }

  async manuallyLoadJeepSQLite(): Promise<boolean> {
    try {
      console.log('🔧 Manually loading jeep-sqlite...');
      
      // Check if already loaded
      if (customElements.get('jeep-sqlite')) {
        console.log('✅ jeep-sqlite already loaded');
        return true;
      }
      
      // Try to load from CDN if not already loaded
      if (!(window as any).jeepSqlite) {
        console.log('🔧 Loading jeep-sqlite from CDN...');
        
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://cdn.jsdelivr.net/npm/jeep-sqlite@2.8.0/dist/esm/jeep-sqlite.entry.js';
        
        const scriptLoaded = new Promise<boolean>((resolve, reject) => {
          script.onload = () => resolve(true);
          script.onerror = () => reject(new Error('Failed to load jeep-sqlite script'));
        });
        
        document.head.appendChild(script);
        await scriptLoaded;
        console.log('✅ jeep-sqlite script loaded');
      }
      
      // Wait for custom element to be defined
      await customElements.whenDefined('jeep-sqlite');
      console.log('✅ jeep-sqlite custom element defined');
      
      return true;
    } catch (error) {
      console.error('❌ Failed to manually load jeep-sqlite:', error);
      return false;
    }
  }
}

export const databaseService = new DatabaseService();
