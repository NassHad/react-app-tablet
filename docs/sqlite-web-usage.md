# 🌐 Using SQLite in Web Environment

## **Overview**

Your React app now supports SQLite in both web and mobile environments! Here's how to configure and use it.

## **🔧 Configuration Options**

### **1. Enable SQLite for Web (Current Setting)**

In `src/db/database.ts`, the code is now configured to use SQLite in web environments:

```typescript
// Configuration flag to easily switch between SQLite and mock data
export const USE_SQLITE = true; // Set to false to use mock data
```

### **2. How It Works in Web Environment**

When `USE_SQLITE = true` and running in web:

1. **Web SQLite Initialization**: Uses Capacitor's web SQLite implementation
2. **Jeep-SQLite Component**: Automatically adds the required web component
3. **IndexedDB Storage**: Data is stored in browser's IndexedDB
4. **Full SQLite Features**: All SQL queries work exactly like in mobile
5. **Automatic Fallback**: If SQLite fails, gracefully falls back to mock data

## **🚀 Usage Examples**

### **Basic Database Operations**

```typescript
import { databaseService } from '../db/database';

// Initialize database (happens automatically in components)
await databaseService.initialize();

// Get all products for a category
const batteries = await databaseService.getProducts('batteries');

// Get filtered products
const standardBatteries = await databaseService.getProducts('batteries', {
  battery_type: 'standard'
});

// Get categories
const categories = await databaseService.getProductCategories();
```

### **Custom Queries (Advanced)**

```typescript
// You can extend the database service with custom methods
async getProductsByBrand(brand: string) {
  if (!USE_SQLITE || this.isWebEnvironment) {
    return this.getMockProducts().filter(p => p.brand === brand);
  }
  
  const result = await this.db.query(
    'SELECT * FROM products WHERE brand = ?',
    [brand]
  );
  return result.values || [];
}
```

## **📊 Database Schema**

### **Categories Table**
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  icon TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT 1
);
```

### **Products Table**
```sql
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
```

## **🔄 Switching Between Modes**

### **Use SQLite (Current)**
```typescript
export const USE_SQLITE = true;
```

### **Use Mock Data**
```typescript
export const USE_SQLITE = false;
```

## **🔍 Debugging**

### **Check Database Status**
```typescript
// In browser console
console.log('Platform:', Capacitor.getPlatform());
console.log('USE_SQLITE:', USE_SQLITE);
```

### **Data Source Flow**
```typescript
// 1. Check if SQLite is enabled
if (!USE_SQLITE) {
  return MOCK_DATA; // Use hardcoded mock data
}

// 2. Check if database is initialized
if (!this.db) {
  return MOCK_DATA; // Database failed to initialize
}

// 3. Try SQLite query
try {
  const result = await this.db.query('SELECT * FROM categories');
  return result.values; // Success: return SQLite data
} catch (error) {
  return MOCK_DATA; // Error: fallback to mock data
}
```

### **Monitor Database Operations**
The database service now includes console logs:
- `Web SQLite store initialized successfully`
- `Database connection opened successfully`
- `Database tables created/verified successfully`
- `Categories loaded from SQLite: 5`
- `Products loaded from SQLite for batteries: 12`
- `Database not initialized, using mock categories`
- `Error loading categories from SQLite, falling back to mock data`

### **Monitor Database Operations**
The database service now includes console logs:
- `Web SQLite store initialized successfully`
- `Database connection opened successfully`
- `Database tables created/verified successfully`
- `Using mock products for category: batteries`

## **📱 Platform Support**

| Platform | SQLite Support | Storage Location |
|----------|----------------|------------------|
| **Web** | ✅ Yes | IndexedDB |
| **Android** | ✅ Yes | SQLite Database |
| **iOS** | ✅ Yes | SQLite Database |

## **⚡ Performance Benefits**

### **Web Environment**
- **Fast Queries**: IndexedDB provides fast data access
- **Offline Support**: Data persists between sessions
- **Real SQL**: Full SQLite query capabilities
- **Memory Efficient**: Only loads requested data

### **Mobile Environment**
- **Native Performance**: Direct SQLite access
- **File-based Storage**: Data stored in app directory
- **Encryption Support**: Can enable database encryption

## **🛠️ Advanced Features**

### **Custom Database Operations**

```typescript
// Add to DatabaseService class
async addProduct(product: any) {
  if (!USE_SQLITE || this.isWebEnvironment) {
    // Add to mock data
    return;
  }
  
  await this.db.execute(`
    INSERT INTO products (brand, type, category, battery_type)
    VALUES (?, ?, ?, ?)
  `, [product.brand, product.type, product.category, product.battery_type]);
}

async updateProduct(id: number, updates: any) {
  if (!USE_SQLITE || this.isWebEnvironment) {
    // Update mock data
    return;
  }
  
  const setClause = Object.keys(updates)
    .map(key => `${key} = ?`)
    .join(', ');
  
  await this.db.execute(`
    UPDATE products SET ${setClause} WHERE id = ?
  `, [...Object.values(updates), id]);
}
```

### **Data Migration**

```typescript
// Handle database schema updates
async migrateDatabase() {
  if (!this.db) return;
  
  // Add new columns if needed
  await this.db.execute(`
    ALTER TABLE products ADD COLUMN price REAL DEFAULT 0
  `).catch(() => {
    // Column might already exist
  });
}
```

## **🎯 Best Practices**

1. **Always Check USE_SQLITE Flag**: Respect the configuration
2. **Handle Errors Gracefully**: Fallback to mock data if needed
3. **Use Proper Types**: Define interfaces for your data
4. **Monitor Performance**: Use console logs for debugging
5. **Test Both Modes**: Ensure app works with SQLite and mock data

## **🔧 Troubleshooting**

### **Common Issues**

1. **Database Not Initializing**
   - Check browser console for errors
   - Verify Capacitor SQLite plugin is installed
   - Ensure `USE_SQLITE = true`

2. **Queries Not Working**
   - Check table schema matches your data
   - Verify column names in queries
   - Use console logs to debug

3. **Performance Issues**
   - Use proper indexes for large datasets
   - Limit query results when possible
   - Consider pagination for large lists

### **Debug Commands**

```typescript
// Check if database is connected
console.log('DB connected:', !!databaseService.db);

// Test a simple query
const test = await databaseService.getProducts('batteries');
console.log('Test query result:', test);
```

## **📈 Next Steps**

1. **Add More Data**: Extend the mock data arrays
2. **Custom Queries**: Add business-specific database methods
3. **Data Validation**: Add input validation for database operations
4. **Caching**: Implement query result caching
5. **Sync**: Add data synchronization with backend services

Your app now has a robust, cross-platform database solution! 🗄️✨
