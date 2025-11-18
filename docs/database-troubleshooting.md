# 🗄️ Database Troubleshooting Guide

## **🚨 Problem: "Database not initialized"**

### **Quick Fix Steps**

1. **🔄 Refresh the page** - Database should auto-initialize
2. **🗄️ Click the red database icon** (bottom-right corner) to open debugger
3. **🔧 Click "Manual Initialize"** button
4. **🧪 Click "Test Connection"** to verify it's working

### **Console Commands (Copy & Paste)**

```typescript
// Check database status
databaseService.getDatabaseStatus()

// Test database connection
databaseService.testConnection()

// Force re-initialization
databaseService.forceReinitialize()

// Manual initialization
databaseService.initialize()
```

## **🔍 What to Look For**

### **Expected Console Output (Success)**
```
🔧 Database initialization started...
🔧 USE_SQLITE: true
🔧 Platform: web
🌐 Web environment detected, setting up web SQLite...
🔧 Creating jeep-sqlite component...
✅ jeep-sqlite component added to DOM
⏳ Waiting for jeep-sqlite to be defined...
✅ jeep-sqlite component is ready
🔧 Initializing web store...
✅ Web SQLite store initialized successfully
🔧 Creating database connection...
✅ Database connection created
✅ Database connection opened successfully
🔧 Setting up database tables...
✅ Database tables created/verified successfully
🎉 Database initialization completed successfully!
```

### **Common Error Messages & Solutions**

#### **❌ "initWebStore method not available"**
**Problem**: Capacitor SQLite plugin not properly installed
**Solution**: 
```bash
npm install @capacitor-community/sqlite
npm run build
```

#### **❌ "jeep-sqlite component not defined"**
**Problem**: Web component not loading
**Solution**: Wait a few seconds and refresh, or check browser console for errors

#### **❌ "Database connection failed"**
**Problem**: IndexedDB not available or blocked
**Solution**: 
- Check if you're in incognito/private mode
- Ensure IndexedDB is enabled in browser
- Try a different browser

## **🛠️ Manual Troubleshooting Steps**

### **Step 1: Check Configuration**
```typescript
// In console, verify:
console.log('USE_SQLITE:', true); // Should be true
console.log('Platform:', Capacitor.getPlatform()); // Should be 'web'
```

### **Step 2: Check Database Status**
```typescript
const status = databaseService.getDatabaseStatus();
console.log('Status:', status);
// Should show: { isInitialized: true, isWeb: true, useSQLite: true }
```

### **Step 3: Test Connection**
```typescript
const isConnected = await databaseService.testConnection();
console.log('Connected:', isConnected); // Should be true
```

### **Step 4: Force Re-initialization**
```typescript
await databaseService.forceReinitialize();
```

## **🔧 Advanced Debugging**

### **Check Browser Storage**
1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Look for IndexedDB
4. Check if `react-app-db.db` exists

### **Check Network Tab**
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for any failed requests

### **Check Console Errors**
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Check for any JavaScript errors

## **📱 Platform-Specific Issues**

### **Web Browser Issues**
- **Chrome**: IndexedDB should work fine
- **Firefox**: Check if IndexedDB is enabled
- **Safari**: May have IndexedDB limitations
- **Edge**: Should work fine

### **Mobile Issues**
- **Android**: Uses native SQLite, different error messages
- **iOS**: Uses native SQLite, different error messages

## **🚀 Quick Recovery Steps**

### **If Nothing Works**
1. **Clear browser data** (cookies, storage, cache)
2. **Restart browser**
3. **Try different browser**
4. **Check if ad-blocker is blocking IndexedDB**

### **Fallback to Mock Data**
```typescript
// In src/db/database.ts, temporarily set:
export const USE_SQLITE = false;
```

## **📞 Getting Help**

### **What to Include in Bug Report**
1. **Browser**: Chrome/Firefox/Safari/Edge version
2. **Platform**: Windows/Mac/Linux
3. **Console Output**: Copy all console messages
4. **Steps to Reproduce**: What you did when it failed
5. **Database Debugger Status**: Screenshot of the debug panel

### **Common Questions**
- **Q**: "Why does it work on mobile but not web?"
- **A**: Different storage mechanisms (SQLite file vs IndexedDB)

- **Q**: "Why does it work sometimes but not others?"
- **A**: Usually IndexedDB initialization timing issues

- **Q**: "Can I use mock data instead?"
- **A**: Yes! Set `USE_SQLITE = false` in database.ts

## **✅ Success Checklist**

- [ ] Database debugger shows green checkmarks
- [ ] Console shows "🎉 Database initialization completed successfully!"
- [ ] `databaseService.testConnection()` returns `true`
- [ ] Categories load from database (not mock data)
- [ ] No red error messages in console

## **🎯 Next Steps After Fix**

1. **Test all features** (categories, products, filters)
2. **Verify data persistence** (refresh page, check if data remains)
3. **Test on different browsers** (Chrome, Firefox, Safari)
4. **Monitor performance** (check if queries are fast)

Your database should now be working! If you're still having issues, use the debug panel and share the console output. 🗄️✨
