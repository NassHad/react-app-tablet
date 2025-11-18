import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const STRAPI_URL = 'http://localhost:1338';
const TABLET_ID = 'tablet-001';
const OUTPUT_DB_PATH = path.join(__dirname, '..', 'public', 'assets', 'databases', 'react-app-db.db');

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_DB_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function fetchStrapiData() {
  console.log('🔄 Fetching data from Strapi...');
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/sync/${TABLET_ID}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Data fetched successfully:`, {
      version: data.version,
      timestamp: data.timestamp,
      tabletId: data.tabletId,
      tablesCount: Object.keys(data.data).length
    });
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching data from Strapi:', error);
    throw error;
  }
}

function createDatabase() {
  console.log('🗄️ Creating SQLite database...');
  
  // Remove existing database if it exists
  if (fs.existsSync(OUTPUT_DB_PATH)) {
    fs.unlinkSync(OUTPUT_DB_PATH);
  }
  
  const db = new sqlite3.Database(OUTPUT_DB_PATH);
  
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create tables
      db.run(`
        CREATE TABLE categories (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL,
          icon TEXT NOT NULL,
          active BOOLEAN NOT NULL DEFAULT 1
        );
      `);
      
      db.run(`
        CREATE TABLE products (
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
      
      db.run(`
        CREATE TABLE brands (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL,
          isActive BOOLEAN DEFAULT 1
        );
      `);
      
      db.run(`
        CREATE TABLE models (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL,
          brand_slug TEXT NOT NULL,
          brand_name TEXT,
          isActive BOOLEAN DEFAULT 1
        );
      `);
      
      db.run(`
        CREATE TABLE light_data (
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
      
      db.run(`
        CREATE TABLE battery_data (
          id INTEGER PRIMARY KEY,
          ref TEXT NOT NULL,
          description TEXT,
          brand TEXT,
          brandImg TEXT,
          img TEXT,
          specifications TEXT,
          created_at TEXT,
          updated_at TEXT
        );
      `);
      
      db.run(`
        CREATE TABLE battery_products (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT,
          brand TEXT,
          brand_slug TEXT,
          model_name TEXT,
          model_slug TEXT,
          motorisations TEXT,
          is_active BOOLEAN DEFAULT 1,
          category TEXT,
          battery_brand TEXT,
          img TEXT,
          created_at TEXT,
          updated_at TEXT
        );
      `);
      
      db.run(`
        CREATE TABLE lights_products (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT,
          brand TEXT,
          brand_slug TEXT,
          model_name TEXT,
          model_slug TEXT,
          light_positions TEXT,
          ref TEXT,
          description TEXT,
          construction_year_start TEXT,
          construction_year_end TEXT,
          type_conception TEXT,
          part_number TEXT,
          notes TEXT,
          source TEXT,
          category TEXT,
          is_active BOOLEAN DEFAULT 1,
          created_at TEXT,
          updated_at TEXT
        );
      `);
      
      db.run(`
        CREATE TABLE vehicles (
          id INTEGER PRIMARY KEY,
          brand TEXT NOT NULL,
          model TEXT NOT NULL,
          year INTEGER,
          motorisation TEXT,
          created_at TEXT,
          updated_at TEXT
        );
      `);
      
      db.run(`
        CREATE TABLE compatibilities (
          id INTEGER PRIMARY KEY,
          vehicle_id INTEGER,
          product_id INTEGER,
          created_at TEXT,
          updated_at TEXT
        );
      `);
      
      db.run(`
        CREATE TABLE questions (
          id INTEGER PRIMARY KEY,
          question TEXT NOT NULL,
          category TEXT,
          created_at TEXT,
          updated_at TEXT
        );
      `);
      
      db.run(`
        CREATE TABLE positions (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL,
          icon TEXT,
          created_at TEXT,
          updated_at TEXT
        );
      `);
      
      db.run(`
        CREATE TABLE motorisations (
          id INTEGER PRIMARY KEY,
          motorisation TEXT NOT NULL,
          batteryTypes TEXT,
          created_at TEXT,
          updated_at TEXT
        );
      `);
      
      db.run(`
        CREATE TABLE db_version (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          version TEXT NOT NULL,
          timestamp TEXT NOT NULL
        );
      `);
      
      console.log('✅ Database tables created');
      resolve(db);
    });
  });
}

async function insertData(db, syncData) {
  console.log('📝 Inserting data into database...');
  
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const stmt = db.prepare(`
        INSERT INTO db_version (version, timestamp) VALUES (?, ?)
      `);
      stmt.run(syncData.version, syncData.timestamp);
      stmt.finalize();
      
        // Map Strapi table names to SQLite table names
        const tableMapping = {
          'categories': 'categories',
          'brands': 'brands',
          'models': 'models',
          'batteryData': 'battery_data',
          'batteryProducts': 'battery_products',
          'lightsProducts': 'lights_products',
          'lightData': 'light_data',
          'vehicles': 'vehicles',
          'compatibilities': 'compatibilities',
          'specificQuestions': 'questions',
          'lightsPositions': 'positions',
          'motorisations': 'motorisations'
        };
        
        // Insert data for each table
        const tables = Object.keys(syncData.data);
        let completed = 0;
        
        tables.forEach(strapiTableName => {
          const sqliteTableName = tableMapping[strapiTableName];
          if (!sqliteTableName) {
            console.log(`⚠️ Skipping unmapped table: ${strapiTableName}`);
            completed++;
            if (completed === tables.length) {
              resolve();
            }
            return;
          }
          
          const data = syncData.data[strapiTableName];
          if (!Array.isArray(data) || data.length === 0) {
            console.log(`⚠️ No data for table: ${strapiTableName} -> ${sqliteTableName}`);
            completed++;
            if (completed === tables.length) {
              resolve();
            }
            return;
          }
          
          console.log(`📝 Inserting ${data.length} records into ${sqliteTableName} (from ${strapiTableName})...`);
          
          // Map Strapi columns to SQLite columns
          const columnMapping = {
            'categories': {
              'id': 'id',
              'name': 'name',
              'slug': 'slug',
              'icon': 'icon',
              'isActive': 'active'
            },
            'brands': {
              'id': 'id',
              'name': 'name',
              'slug': 'slug',
              'isActive': 'isActive'
            },
            'models': {
              'id': 'id',
              'name': 'name',
              'slug': 'slug',
              'brand.slug': 'brand_slug',
              'brand.name': 'brand_name',
              'isActive': 'isActive'
            },
            'battery_data': {
              'id': 'id',
              'ref': 'ref',
              'description': 'description',
              'brand': 'brand',
              'brandImg': 'brandImg',
              'img': 'img',
              'specifications': 'specifications',
              'createdAt': 'created_at',
              'updatedAt': 'updated_at'
            },
            'light_data': {
              'id': 'id',
              'ref': 'ref',
              'description': 'description',
              'brandImg': 'brandImg',
              'img': 'img',
              'specifications': 'specifications',
              'createdAt': 'created_at',
              'updatedAt': 'updated_at'
            },
            'battery_products': {
              'id': 'id',
              'name': 'name',
              'slug': 'slug',
              'brand': 'brand',
              'brandSlug': 'brand_slug',
              'modelName': 'model_name',
              'modelSlug': 'model_slug',
              'motorisations': 'motorisations',
              'isActive': 'is_active',
              'category': 'category',
              'batteryBrand': 'battery_brand',
              'img': 'img',
              'createdAt': 'created_at',
              'updatedAt': 'updated_at'
            },
            'lights_products': {
              'id': 'id',
              'name': 'name',
              'slug': 'slug',
              'brand.name': 'brand',
              'brand.slug': 'brand_slug',
              'model.name': 'model_name',
              'model.slug': 'model_slug',
              'lightPositions': 'light_positions',
              'ref': 'ref',
              'description': 'description',
              'constructionYearStart': 'construction_year_start',
              'constructionYearEnd': 'construction_year_end',
              'typeConception': 'type_conception',
              'partNumber': 'part_number',
              'notes': 'notes',
              'source': 'source',
              'category': 'category',
              'isActive': 'is_active',
              'createdAt': 'created_at',
              'updatedAt': 'updated_at'
            },
            'positions': {
              'id': 'id',
              'name': 'name',
              'slug': 'slug',
              'icon': 'icon',
              'createdAt': 'created_at',
              'updatedAt': 'updated_at'
            }
          };
          
          const mapping = columnMapping[sqliteTableName];
          if (!mapping) {
            console.log(`⚠️ No column mapping for table: ${sqliteTableName}`);
            completed++;
            if (completed === tables.length) {
              resolve();
            }
            return;
          }
          
          // Get SQLite columns and Strapi columns
          const sqliteColumns = Object.values(mapping);
          const strapiColumns = Object.keys(mapping);
          const placeholders = sqliteColumns.map(() => '?').join(', ');
          
          const stmt = db.prepare(`
            INSERT INTO ${sqliteTableName} (${sqliteColumns.join(', ')}) VALUES (${placeholders})
          `);
          
          data.forEach((record, index) => {
            // Skip models without brand (for models table)
            if (sqliteTableName === 'models' && (!record.brand || !record.brand.slug)) {
              console.log(`⚠️ Skipping model without brand: ${record.name} (ID: ${record.id})`);
              return;
            }
            
            // Debug: log first few records for models table
            if (sqliteTableName === 'models' && index < 3) {
              console.log(`🔍 Debug model ${index}:`, {
                id: record.id,
                name: record.name,
                brand: record.brand ? `${record.brand.name} (${record.brand.slug})` : 'NO BRAND'
              });
            }
            
            const values = strapiColumns.map(strapiCol => {
              // Handle nested properties like 'brand.slug'
              let value;
              if (strapiCol.includes('.')) {
                const parts = strapiCol.split('.');
                value = record[parts[0]];
                for (let i = 1; i < parts.length; i++) {
                  if (value && typeof value === 'object') {
                    value = value[parts[i]];
                  } else {
                    value = null;
                    break;
                  }
                }
              } else {
                value = record[strapiCol];
              }
              
              // Convert objects to JSON strings
              if (typeof value === 'object' && value !== null) {
                return JSON.stringify(value);
              }
              return value;
            });
            
            try {
              stmt.run(values);
            } catch (error) {
              console.warn(`⚠️ Skipping record with error:`, error.message);
              if (sqliteTableName === 'models') {
                console.log('❌ Failed model record:', {
                  id: record.id,
                  name: record.name,
                  brand: record.brand ? `${record.brand.name} (${record.brand.slug})` : 'NO BRAND',
                  values: values
                });
              }
              console.warn(`Record:`, record);
            }
          });
          
          stmt.finalize();
          console.log(`✅ Inserted ${data.length} records into ${sqliteTableName}`);
          
          completed++;
          if (completed === tables.length) {
            resolve();
          }
        });
    });
  });
}

async function main() {
  try {
    console.log('🚀 Starting seed generation...');
    console.log('📡 Testing Strapi connection...');
    
    // 1. Fetch data from Strapi
    const syncData = await fetchStrapiData();
    
    // 2. Create database
    const db = await createDatabase();
    
    // 3. Insert data
    await insertData(db, syncData);
    
    // 4. Close database
    db.close();
    
    console.log('🎉 Seed generation completed successfully!');
    console.log(`📁 Database saved to: ${OUTPUT_DB_PATH}`);
    
    // Verify file exists and get size
    const stats = fs.statSync(OUTPUT_DB_PATH);
    console.log(`📊 Database size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('❌ Seed generation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || 
                     import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`;

if (isMainModule) {
  console.log('✅ Running main function...');
  main();
}

export { main };
