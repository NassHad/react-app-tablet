import { databaseService } from '../db/database';
import { ENV } from '../config/environment';

export interface SyncResult {
  success: boolean;
  message: string;
  data?: {
    version: string;
    timestamp: string;
    tabletId: string;
    recordsCount: number;
  };
  error?: string;
}

export interface SyncData {
  version: string;
  timestamp: string;
  tabletId: string;
  data: {
    categories: any[];
    brands: any[];
    models: any[];
    products: any[];
    light_data: any[];
    battery_data: any[];
    vehicles: any[];
    compatibilities: any[];
    questions: any[];
    positions: any[];
    motorisations: any[];
    [key: string]: any[];
  };
}

class SyncService {
  private tabletId: string;
  private baseUrl: string;

  constructor() {
    this.tabletId = 'tablet-001'; // TODO: Make this configurable
    this.baseUrl = ENV.STRAPI_API_URL.replace('/api', ''); // Remove /api suffix
  }

  /**
   * Get current database version from local SQLite
   */
  async getCurrentVersion(): Promise<string | null> {
    try {
      const db = (databaseService as any).db;
      if (!db) return null;

      const result = await db.query('SELECT version FROM db_version ORDER BY id DESC LIMIT 1');
      return result.values?.[0]?.version || null;
    } catch (error) {
      console.error('❌ Error getting current version:', error);
      return null;
    }
  }

  /**
   * Set database version in local SQLite
   */
  async setVersion(version: string): Promise<void> {
    try {
      const db = (databaseService as any).db;
      if (!db) return;

      await db.execute('INSERT OR REPLACE INTO db_version (version, timestamp) VALUES (?, ?)', [
        version,
        new Date().toISOString()
      ]);
      console.log(`✅ Database version updated to: ${version}`);
    } catch (error) {
      console.error('❌ Error setting version:', error);
    }
  }

  /**
   * Fetch sync data from Strapi endpoint
   */
  async fetchSyncData(): Promise<SyncData | null> {
    try {
      const currentVersion = await this.getCurrentVersion();
      const url = `${this.baseUrl}/api/sync/${this.tabletId}`;
      
      console.log(`🔄 Fetching sync data from: ${url}`);
      console.log(`📊 Current local version: ${currentVersion || 'none'}`);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      };

      // Add If-None-Match header if we have a version
      if (currentVersion) {
        headers['If-None-Match'] = currentVersion;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers,
        cache: 'no-store'
      });

      console.log(`📡 Sync response status: ${response.status}`);

      if (response.status === 304) {
        console.log('✅ Data is up to date (304 Not Modified)');
        return null; // No update needed
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SyncData = await response.json();
      console.log(`📦 Sync data received:`, {
        version: data.version,
        timestamp: data.timestamp,
        tabletId: data.tabletId,
        tablesCount: Object.keys(data.data).length
      });

      return data;
    } catch (error) {
      console.error('❌ Error fetching sync data:', error);
      throw error;
    }
  }

  /**
   * Upsert data into SQLite tables
   */
  async upsertData(tableName: string, data: any[]): Promise<void> {
    if (!data || data.length === 0) return;

    const db = (databaseService as any).db;
    if (!db) throw new Error('Database not initialized');

    console.log(`📝 Upserting ${data.length} records into ${tableName}...`);

    // Start transaction
    await db.execute('BEGIN TRANSACTION');

    try {
      // Clear existing data for this table
      await db.execute(`DELETE FROM ${tableName}`);

      // Insert new data
      for (const record of data) {
        const columns = Object.keys(record);
        const placeholders = columns.map(() => '?').join(', ');
        const values = columns.map(col => record[col]);

        const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
        await db.execute(query, values);
      }

      // Commit transaction
      await db.execute('COMMIT');
      console.log(`✅ Successfully upserted ${data.length} records into ${tableName}`);
    } catch (error) {
      // Rollback on error
      await db.execute('ROLLBACK');
      console.error(`❌ Error upserting data into ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Main sync method
   */
  async sync(): Promise<SyncResult> {
    try {
      console.log('🚀 Starting synchronization...');

      // Fetch sync data from Strapi
      const syncData = await this.fetchSyncData();
      
      if (!syncData) {
        return {
          success: true,
          message: 'Data is already up to date',
          data: {
            version: await this.getCurrentVersion() || 'unknown',
            timestamp: new Date().toISOString(),
            tabletId: this.tabletId,
            recordsCount: 0
          }
        };
      }

      // Start transaction for all updates
      const db = (databaseService as any).db;
      if (!db) throw new Error('Database not initialized');

      await db.execute('BEGIN TRANSACTION');

      try {
        let totalRecords = 0;

        // Upsert all tables
        for (const [tableName, data] of Object.entries(syncData.data)) {
          if (Array.isArray(data) && data.length > 0) {
            await this.upsertData(tableName, data);
            totalRecords += data.length;
          }
        }

        // Update version
        await this.setVersion(syncData.version);

        // Commit all changes
        await db.execute('COMMIT');

        console.log('🎉 Synchronization completed successfully!');
        console.log(`📊 Total records synchronized: ${totalRecords}`);

        return {
          success: true,
          message: 'Synchronization completed successfully',
          data: {
            version: syncData.version,
            timestamp: syncData.timestamp,
            tabletId: syncData.tabletId,
            recordsCount: totalRecords
          }
        };

      } catch (error) {
        // Rollback on error
        await db.execute('ROLLBACK');
        throw error;
      }

    } catch (error) {
      console.error('❌ Synchronization failed:', error);
      return {
        success: false,
        message: 'Synchronization failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check if sync is needed (network connectivity check)
   */
  async isSyncNeeded(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sync/${this.tabletId}`, {
        method: 'HEAD',
        cache: 'no-store'
      });
      return response.ok;
    } catch (error) {
      console.log('📡 Network not available for sync');
      return false;
    }
  }

  /**
   * Get sync status
   */
  async getStatus(): Promise<{
    isOnline: boolean;
    currentVersion: string | null;
    lastSync: string | null;
  }> {
    const isOnline = await this.isSyncNeeded();
    const currentVersion = await this.getCurrentVersion();
    
    let lastSync = null;
    try {
      const db = (databaseService as any).db;
      if (db) {
        const result = await db.query('SELECT timestamp FROM db_version ORDER BY id DESC LIMIT 1');
        lastSync = result.values?.[0]?.timestamp || null;
      }
    } catch (error) {
      console.error('Error getting last sync time:', error);
    }

    return {
      isOnline,
      currentVersion,
      lastSync
    };
  }
}

export const syncService = new SyncService();
