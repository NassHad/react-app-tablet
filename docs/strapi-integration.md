# 🚀 Strapi Backend Integration Guide

## **Overview**

Your React app now has a flexible data architecture that can switch between:
- **Strapi Backend** (primary) - for production and development
- **Local SQLite Database** (fallback) - for offline/fallback scenarios

## **🔧 Configuration**

### **1. Data Source Configuration**

Edit `src/config/dataSource.ts` to control which data source to use:

```typescript
export const DATA_SOURCE_CONFIG: DataSourceConfig = {
  currentSource: DataSource.STRAPI, // Change this to switch between sources
  
  strapi: {
    baseUrl: 'http://localhost:1338',        // Your Strapi URL
    apiUrl: 'http://localhost:1338/api',    // Strapi API endpoint
    timeout: 10000,                         // Request timeout
  },
  
  localDatabase: {
    enabled: true,                           // Keep local DB as fallback
    fallbackToMock: true,                   // Use mock data if DB fails
  }
};
```

### **2. Switching Data Sources**

#### **Option A: Configuration File**
```typescript
// In src/config/dataSource.ts
currentSource: DataSource.STRAPI        // Use Strapi
currentSource: DataSource.LOCAL_DATABASE // Use local database
```

#### **Option B: Runtime Switching**
```typescript
import { dataService } from '../services/dataService';

// Switch to Strapi
dataService.switchDataSource('strapi');

// Switch to local database
dataService.switchDataSource('local');
```

## **🌐 Strapi Setup Requirements**

### **1. Content Types**

Your Strapi instance needs these content types:

#### **Categories Collection**
```json
{
  "id": "number",
  "name": "string",
  "slug": "string", 
  "icon": "string",
  "active": "boolean"
}
```

#### **Products Collection**
```json
{
  "id": "number",
  "brand": "string",
  "type": "string",
  "category": "string",
  "battery_type": "string (optional)",
  "lighting_type": "string (optional)",
  "power": "string (optional)",
  "tension": "string (optional)",
  "quantity": "string (optional)",
  "voltage": "string (optional)",
  "number": "string (optional)",
  "reference": "string (optional)",
  "size": "string (optional)"
}
```

### **2. API Endpoints**

Strapi will automatically create these endpoints:
- `GET /api/categories` - List all categories
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get specific product
- `GET /api/categories?filters[active][$eq]=true` - Active categories only

### **3. Permissions**

In Strapi Admin Panel:
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Select **Public** role
3. Enable **find** and **findOne** permissions for:
   - Categories
   - Products

## **📱 Usage in Components**

### **1. Basic Usage (Recommended)**

```typescript
import { dataService } from '../services/dataService';

const MyComponent = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // This will automatically use Strapi or fallback to local DB
        const products = await dataService.getProducts('batteries');
        setProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    
    loadProducts();
  }, []);
  
  // ... rest of component
};
```

### **2. Advanced Usage with Error Handling**

```typescript
import { dataService } from '../services/dataService';

const MyComponent = () => {
  const [products, setProducts] = useState([]);
  const [dataSource, setDataSource] = useState('');
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await dataService.getProducts('batteries');
        setProducts(products);
        
        // Show which data source was used
        setDataSource(dataService.getCurrentSource());
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      }
    };
    
    loadProducts();
  }, []);
  
  return (
    <div>
      <p>Data source: {dataSource}</p>
      {/* ... rest of component */}
    </div>
  );
};
```

## **🔍 Monitoring & Debugging**

### **1. Strapi Status Component**

A blue info button (ℹ️) appears in the bottom-right corner. Click it to:
- See current data source
- Test connection to Strapi
- Switch between data sources
- View connection status

### **2. Console Logging**

The service provides detailed logging:

```
📡 Fetching products from Strapi...
✅ Strapi Response: 200 /api/products
📊 Products loaded from Strapi for batteries: 15
```

### **3. Connection Testing**

```typescript
// Test if Strapi is accessible
const isConnected = await dataService.testConnection();
console.log('Strapi connected:', isConnected);
```

## **🚨 Troubleshooting**

### **Common Issues**

#### **1. "Network Error" or "Connection Refused"**
- **Problem**: Strapi server not running
- **Solution**: Start your Strapi server on port 1338

#### **2. "404 Not Found"**
- **Problem**: API endpoints don't exist
- **Solution**: Create the required content types in Strapi

#### **3. "403 Forbidden"**
- **Problem**: Permissions not set correctly
- **Solution**: Check Strapi permissions for Public role

#### **4. "CORS Error"**
- **Problem**: Strapi blocking requests from your React app
- **Solution**: Configure CORS in Strapi's `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

And in `config/middlewares.js`:
```javascript
module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['http://localhost:5173', 'http://localhost:3000'], // Your React app URLs
    },
  },
};
```

### **Fallback Behavior**

If Strapi fails, the system automatically falls back to:
1. **Local SQLite Database** (if enabled)
2. **Mock Data** (if local DB fails)

## **🔄 Migration from Local Database**

### **1. Gradual Migration**

You can migrate gradually by updating components one by one:

```typescript
// Before (using local database)
import { databaseService } from '../db/database';
const products = await databaseService.getProducts('batteries');

// After (using unified service)
import { dataService } from '../services/dataService';
const products = await dataService.getProducts('batteries');
```

### **2. Testing Both Sources**

```typescript
// Test Strapi
dataService.switchDataSource('strapi');
const strapiProducts = await dataService.getProducts('batteries');

// Test local database
dataService.switchDataSource('local');
const localProducts = await dataService.getProducts('batteries');
```

## **📊 Performance Considerations**

### **1. Caching**

Strapi responses are not cached by default. Consider:
- Implementing React Query or SWR for caching
- Using Strapi's built-in caching features
- Implementing local storage for offline scenarios

### **2. Network Optimization**

- Use filters to reduce data transfer
- Implement pagination for large datasets
- Consider GraphQL for complex queries

## **🔮 Future Enhancements**

### **1. Authentication**
```typescript
// Add to strapiClient configuration
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
}
```

### **2. Real-time Updates**
```typescript
// Using Strapi's WebSocket support
strapiClient.get('/products', {
  params: { 'live': true }
});
```

### **3. Offline Support**
```typescript
// Cache Strapi responses in IndexedDB
// Sync when connection is restored
```

## **📝 Summary**

Your app now has:
- ✅ **Flexible data architecture** that can switch between sources
- ✅ **Automatic fallback** to local database if Strapi fails
- ✅ **Easy configuration** to control data sources
- ✅ **Monitoring tools** to debug connection issues
- ✅ **Seamless migration** from existing local database usage

To get started:
1. Ensure your Strapi server is running on `localhost:1338`
2. Create the required content types in Strapi
3. Set permissions for public access
4. Update components to use `dataService` instead of `databaseService`
5. Use the Strapi Status component to monitor connections

Happy coding! 🎉
