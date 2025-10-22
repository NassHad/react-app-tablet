# 🔗 Real Backend Testing Guide for BulbsQuestions

## 📋 Overview

This guide covers testing the BulbsQuestions component with your real Strapi backend. It includes connection testing, API endpoint verification, and component integration testing.

## 🚀 Quick Start

### 1. Prerequisites
- ✅ Strapi backend running on `http://localhost:1338` (or your configured URL)
- ✅ Lights-selection endpoints available
- ✅ Frontend application running on `http://localhost:3000`

### 2. Access Test Page
Navigate to: `http://localhost:3000/test/lights`

### 3. Select "Real Backend Test" Tab
Click on the "Real Backend Test" tab to access the real backend testing interface.

## 🔧 Backend Setup

### 1. Verify Strapi Backend
Make sure your Strapi backend is running and accessible:

```bash
# Check if Strapi is running
curl http://localhost:1338/api/lights-selection/brands

# Expected response: JSON array of brands
```

### 2. Required Endpoints
Your Strapi backend should have these endpoints:

```
GET /api/lights-selection/brands
GET /api/lights-selection/models-by-brand/:brandId
GET /api/lights-selection/model/:modelId/positions
GET /api/lights-selection/light-data-by-position/:modelId/:positionId
GET /api/lights-selection/search-model?brandSlug=:brandSlug&modelSlug=:modelSlug
GET /api/lights-selection/positions-by-slugs?brandSlug=:brandSlug&modelSlug=:modelSlug
```

### 3. CORS Configuration
Ensure CORS is properly configured in your Strapi backend:

```javascript
// config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'http://localhost:5173']
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## 🧪 Testing Components

### 1. Backend Status Checker
**Location:** Top of the Real Backend Test tab

**Features:**
- ✅ Real-time backend connectivity check
- ✅ Response time measurement
- ✅ Endpoint availability verification
- ✅ Error diagnosis and troubleshooting

**What it checks:**
- Backend URL accessibility
- HTTP response status
- Response time performance
- CORS configuration
- Endpoint availability

### 2. Real Backend Test Component
**Location:** Main content area of Real Backend Test tab

**Features:**
- ✅ Comprehensive API testing
- ✅ Vehicle data flow testing
- ✅ Position selection testing
- ✅ Real-time result logging
- ✅ Error handling and recovery

**Test Scenarios:**
1. **Backend Connection Test**
   - Tests basic connectivity
   - Measures response time
   - Verifies data format

2. **Vehicle Data Flow Test**
   - Tests slug generation from vehicle data
   - Tests positions fetching by slugs
   - Verifies data structure

3. **Position Selection Test**
   - Tests individual position selection
   - Tests light data fetching
   - Verifies data display

## 📊 Test Results Interpretation

### 1. Success Indicators
- ✅ **Green checkmarks** - Test passed
- ✅ **Response times** - Under 1000ms is good
- ✅ **Data structure** - Valid JSON responses
- ✅ **Error handling** - Graceful error recovery

### 2. Warning Indicators
- ⚠️ **Yellow warnings** - Non-critical issues
- ⚠️ **Slow responses** - Over 2000ms
- ⚠️ **Empty data** - No results returned
- ⚠️ **Partial failures** - Some endpoints working

### 3. Error Indicators
- ❌ **Red errors** - Critical failures
- ❌ **Connection errors** - Backend not accessible
- ❌ **HTTP errors** - 4xx/5xx status codes
- ❌ **Timeout errors** - Requests taking too long

## 🔍 Troubleshooting

### 1. Backend Not Accessible
**Symptoms:** All tests fail with connection errors

**Solutions:**
- Check if Strapi is running: `npm run develop` or `yarn develop`
- Verify the URL: `http://localhost:1338/api`
- Check firewall settings
- Verify port availability

### 2. CORS Errors
**Symptoms:** Browser console shows CORS errors

**Solutions:**
- Update CORS configuration in Strapi
- Add your frontend URL to allowed origins
- Check if backend is running on different port

### 3. 404 Errors
**Symptoms:** Endpoints return 404 Not Found

**Solutions:**
- Verify lights-selection plugin is installed
- Check endpoint URLs in Strapi
- Ensure API routes are properly configured

### 4. 500 Errors
**Symptoms:** Endpoints return 500 Internal Server Error

**Solutions:**
- Check Strapi logs for detailed error messages
- Verify database connection
- Check data model configurations

### 5. Empty Data Responses
**Symptoms:** Endpoints return empty arrays or null

**Solutions:**
- Check if data exists in Strapi database
- Verify data model relationships
- Check API query parameters

## 📈 Performance Testing

### 1. Response Time Benchmarks
- **Brands API**: < 500ms
- **Models API**: < 300ms
- **Positions API**: < 400ms
- **Light Data API**: < 200ms
- **Search API**: < 600ms

### 2. Load Testing
- Test with multiple concurrent requests
- Monitor memory usage
- Check for memory leaks
- Verify error handling under load

### 3. Data Volume Testing
- Test with large datasets
- Verify pagination if implemented
- Check response size limits
- Monitor performance degradation

## 🔄 Continuous Testing

### 1. Automated Testing
```bash
# Run backend connection test
node src/scripts/testBackendConnection.js

# Run with custom URL
VITE_STRAPI_API_URL=http://your-backend-url/api node src/scripts/testBackendConnection.js
```

### 2. Manual Testing Checklist
- [ ] Backend status shows "Online"
- [ ] All endpoints return valid data
- [ ] Response times are acceptable
- [ ] Error handling works correctly
- [ ] Component renders without errors
- [ ] User interactions work as expected

### 3. Integration Testing
- [ ] Test with different vehicle types
- [ ] Test with different model combinations
- [ ] Test error scenarios
- [ ] Test edge cases
- [ ] Test with real user data

## 🚀 Production Readiness

### 1. Pre-deployment Checklist
- [ ] All tests pass consistently
- [ ] Response times meet benchmarks
- [ ] Error handling is robust
- [ ] CORS is properly configured
- [ ] Security headers are set
- [ ] Monitoring is in place

### 2. Monitoring Setup
- [ ] API response time monitoring
- [ ] Error rate tracking
- [ ] User interaction analytics
- [ ] Performance metrics
- [ ] Alert configuration

## 📚 Additional Resources

### Documentation
- [Strapi Documentation](https://docs.strapi.io/)
- [CORS Configuration](https://docs.strapi.io/dev-docs/configurations/middlewares#cors)
- [API Routes](https://docs.strapi.io/dev-docs/backend-customization/routes)

### Testing Tools
- [Postman](https://www.postman.com/) - API testing
- [Insomnia](https://insomnia.rest/) - API testing
- [Browser DevTools](https://developer.chrome.com/docs/devtools/) - Network debugging

### Debugging
- [Strapi Logs](https://docs.strapi.io/dev-docs/configurations/server#logging)
- [Browser Console](https://developer.chrome.com/docs/devtools/console/)
- [Network Tab](https://developer.chrome.com/docs/devtools/network/)

---

**Happy Testing! 🎉**

For questions or issues, check the test results and error messages for detailed information.
