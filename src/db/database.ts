import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import type { ProductCategory } from '../types';

const DB_NAME = 'tablet-app.db';
const DB_VERSION = 1;

class DatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initialize(): Promise<void> {
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
    this.db = await this.sqlite.createConnection(DB_NAME, false, 'no-encryption', DB_VERSION, false);
    await this.db.open();

    // 5. Créer les tables si besoin
    await this.createTables();
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('DB non initialisée');

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS product_categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE
      );
    `);

    await this.db.execute(`
      INSERT OR IGNORE INTO product_categories (id, name, slug) VALUES
      (1, 'Balais d''essuie-glace', 'wipers'),
      (2, 'Batteries', 'batteries'),
      (3, 'Huiles', 'oils'),
      (4, 'Ampoules', 'bulbs');
    `);
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    if (!this.db) throw new Error('DB non initialisée');
    const result = await this.db.query('SELECT * FROM product_categories ORDER BY name');
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
