import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import type { ProductCategory } from '../types';

const DB_NAME = 'react-app-db.db';
const DB_VERSION = 1;

// Configuration flag to easily switch between SQLite and mock data
export const USE_SQLITE = true; // Set to true to use SQLite database

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

  async getDb(): Promise<SQLiteDBConnection | null> {
    return this.db;
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

    // Create brands table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS brands (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        isActive BOOLEAN DEFAULT 1
      );
    `);

    // Create models table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS models (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        brand_slug TEXT NOT NULL,
        brand_name TEXT,
        isActive BOOLEAN DEFAULT 1
      );
    `);

    // Create light_data table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS light_data (
        id INTEGER PRIMARY KEY,
        ref TEXT NOT NULL,
        description TEXT,
        brandImg TEXT,
        img TEXT,
        specifications TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `);

    // Create battery_data table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS battery_data (
        id INTEGER PRIMARY KEY,
        ref TEXT NOT NULL,
        description TEXT,
        brandImg TEXT,
        img TEXT,
        specifications TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `);

    // Create vehicles table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY,
        brand TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER,
        motorisation TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `);

    // Create compatibilities table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS compatibilities (
        id INTEGER PRIMARY KEY,
        vehicle_id INTEGER,
        product_id INTEGER,
        created_at TEXT,
        updated_at TEXT
      );
    `);

    // Create questions table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY,
        question TEXT NOT NULL,
        category TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `);

    // Create positions table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS positions (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        icon TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `);

    // Create motorisations table
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS motorisations (
        id INTEGER PRIMARY KEY,
        motorisation TEXT NOT NULL,
        batteryTypes TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `);

    // Create db_version table for sync tracking
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS db_version (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );
    `);

    // Categories are now loaded from Strapi sync, no need to hardcode them

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
    // Use SQLite as primary source for offline-first approach
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
    // Use SQLite as primary source for offline-first approach
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

  // Methods for lights data (replacing API calls)
  async getLightDataByRef(ref: string): Promise<any[]> {
    if (!USE_SQLITE || !this.db) {
      console.log('Using mock light data - SQLite not available');
      return this.getMockLightData(ref);
    }

    try {
      const result = await this.db.query('SELECT * FROM light_data WHERE ref = ?', [ref]);
      console.log(`💡 Light data loaded from SQLite for ref ${ref}:`, result.values?.length || 0);
      return result.values || [];
    } catch (error) {
      console.error(`❌ Error loading light data from SQLite for ref ${ref}:`, error);
      return this.getMockLightData(ref);
    }
  }

  // Methods for battery data (replacing API calls)
  async getBatteryDataByRef(ref: string): Promise<any[]> {
    if (!USE_SQLITE || !this.db) {
      console.log('Using mock battery data - SQLite not available');
      return this.getMockBatteryData(ref);
    }

    try {
      const result = await this.db.query('SELECT * FROM battery_data WHERE ref = ?', [ref]);
      console.log(`🔋 Battery data loaded from SQLite for ref ${ref}:`, result.values?.length || 0);
      return result.values || [];
    } catch (error) {
      console.error(`❌ Error loading battery data from SQLite for ref ${ref}:`, error);
      return this.getMockBatteryData(ref);
    }
  }

  // Methods for vehicle data (replacing API calls)
  async getBrands(): Promise<any[]> {
    if (!USE_SQLITE || !this.db) {
      console.log('Using mock brands - SQLite not available');
      return this.getMockBrands();
    }

    try {
      const result = await this.db.query('SELECT * FROM brands ORDER BY name ASC');
      console.log(`🚗 Brands loaded from SQLite:`, result.values?.length || 0);
      return result.values || [];
    } catch (error) {
      console.error(`❌ Error loading brands from SQLite:`, error);
      return this.getMockBrands();
    }
  }

  // Web fallback: Load data from the static database file
  async getBrandsFromWebDB(): Promise<any[]> {
    try {
      console.log('🌐 Loading brands from web database file...');
      const response = await fetch('/assets/databases/react-app-db.db');
      if (!response.ok) {
        throw new Error('Database file not found');
      }
      
      // For now, return mock data since we can't easily read SQLite in browser
      // In a real implementation, you'd use sql.js or similar
      console.log('⚠️ Web SQLite reading not implemented, using mock data');
      return this.getMockBrands();
    } catch (error) {
      console.error('❌ Error loading brands from web DB:', error);
      return this.getMockBrands();
    }
  }

  async getModelsByBrand(brandSlug: string): Promise<any[]> {
    if (!USE_SQLITE || !this.db) {
      console.log('Using mock models - SQLite not available');
      return this.getMockModelsByBrand(brandSlug);
    }

    try {
      const result = await this.db.query('SELECT * FROM models WHERE brand_slug = ? ORDER BY name ASC', [brandSlug]);
      console.log(`🚗 Models loaded from SQLite for brand ${brandSlug}:`, result.values?.length || 0);
      return result.values || [];
    } catch (error) {
      console.error(`❌ Error loading models from SQLite for brand ${brandSlug}:`, error);
      return this.getMockModelsByBrand(brandSlug);
    }
  }

  async getAllModels(): Promise<any[]> {
    if (!USE_SQLITE || !this.db) {
      console.log('Using mock models - SQLite not available');
      return [];
    }

    try {
      const result = await this.db.query('SELECT * FROM models ORDER BY name ASC');
      console.log(`🚗 All models loaded from SQLite:`, result.values?.length || 0);
      return result.values || [];
    } catch (error) {
      console.error(`❌ Error loading all models from SQLite:`, error);
      return [];
    }
  }

  // Mock data methods for fallback
  private getMockLightData(_ref: string): any[] {
    // Return empty array for now - will be populated with real data during sync
    return [];
  }

  private getMockBatteryData(_ref: string): any[] {
    // Return empty array for now - will be populated with real data during sync
    return [];
  }

  private getMockBrands(): any[] {
    return [
      { id: 1, name: 'Audi', slug: 'audi' },
      { id: 2, name: 'BMW', slug: 'bmw' },
      { id: 3, name: 'Mercedes', slug: 'mercedes' },
      { id: 4, name: 'Volkswagen', slug: 'volkswagen' },
      { id: 5, name: 'Peugeot', slug: 'peugeot' },
    ];
  }

  private getMockModelsByBrand(brandSlug: string): any[] {
    const modelsByBrand: Record<string, any[]> = {
      'audi': [
        { id: 1, name: 'A3', slug: 'a3', brand_slug: 'audi' },
        { id: 2, name: 'A4', slug: 'a4', brand_slug: 'audi' },
        { id: 3, name: 'A6', slug: 'a6', brand_slug: 'audi' },
      ],
      'bmw': [
        { id: 4, name: 'Série 1', slug: 'serie-1', brand_slug: 'bmw' },
        { id: 5, name: 'Série 3', slug: 'serie-3', brand_slug: 'bmw' },
        { id: 6, name: 'Série 5', slug: 'serie-5', brand_slug: 'bmw' },
      ],
      'mercedes': [
        { id: 7, name: 'Classe A', slug: 'classe-a', brand_slug: 'mercedes' },
        { id: 8, name: 'Classe C', slug: 'classe-c', brand_slug: 'mercedes' },
        { id: 9, name: 'Classe E', slug: 'classe-e', brand_slug: 'mercedes' },
      ],
    };
    return modelsByBrand[brandSlug] || [];
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
