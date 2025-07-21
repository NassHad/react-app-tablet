import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import type { ProductCategory } from '../types';

const DB_NAME = 'react-app-db.db';
const DB_VERSION = 1;

// Mock data for web environment
const MOCK_CATEGORIES: ProductCategory[] = [
  { id: 1, name: 'Balais d\'essuie-glace', slug: 'wipers', icon: 'wiper', active: true },
  { id: 2, name: 'Batteries', slug: 'batteries', icon: 'battery', active: true },
  { id: 3, name: 'Huiles', slug: 'oils', icon: 'oil', active: true },
  { id: 4, name: 'Eclairage', slug: 'bulbs', icon: 'bulb', active: true },
  { id: 5, name: 'Filtration', slug: 'filtration', icon: 'filter', active: true },
];

class DatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWebEnvironment: boolean;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.isWebEnvironment = Capacitor.getPlatform() === 'web';
  }

  async initialize(): Promise<void> {
    // Skip database initialization in web environment
    if (this.isWebEnvironment) {
      console.log('Web environment detected - skipping database initialization');
      return;
    }

    if (Capacitor.getPlatform() === 'web') {
      // 1. Ajouter la balise <jeep-sqlite> si absente
      let jeep = document.querySelector('jeep-sqlite');
      if (!jeep) {
        jeep = document.createElement('jeep-sqlite');
        document.body.prepend(jeep);
      }

      // 2. Attendre que le composant soit prêt
      await customElements.whenDefined('jeep-sqlite');

      // 3. Initialiser le store web
      await this.sqlite.initWebStore?.();
    }

    // 4. Créer et ouvrir la connexion
    if (Capacitor.getPlatform() === 'android') {
      await this.sqlite.copyFromAssets();
    }
    this.db = await this.sqlite.createConnection(DB_NAME, false, 'no-encryption', DB_VERSION, false);
    await this.db.open();

    // 5. Créer les tables si besoin
    await this.createTables();
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('DB non initialisée');

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        active BOOLEAN NOT NULL DEFAULT 1
      );
    `);

    await this.db.execute(`
      INSERT OR IGNORE INTO categories (id, name, active) VALUES
      (1, 'Balais d''essuie-glace', 1),
      (2, 'Batteries', 1),
      (3, 'Huiles', 1),
      (4, 'Eclairage', 1),
      (5, 'Filtration', 1);
    `);
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    // Return mock data in web environment
    if (this.isWebEnvironment) {
      console.log('Web environment - returning mock categories');
      return MOCK_CATEGORIES;
    }

    if (!this.db) throw new Error('DB non initialisée');
    const result = await this.db.query('SELECT * FROM categories ORDER BY name');
    return result.values as ProductCategory[];
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection(DB_NAME, false);
      this.db = null;
    }
  }
}

export const databaseService = new DatabaseService();
