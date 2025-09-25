# 🧪 Lights Integration Testing Guide

## 📋 Overview

This guide covers comprehensive testing for the lights integration feature, including API testing, component testing, and end-to-end testing scenarios.

## 🚀 Quick Start

### 1. Access Test Page
Navigate to `/test/lights` in your application to access the comprehensive test suite.

### 2. Enable Mock Mode
Set the environment variable `VITE_USE_MOCK_LIGHTS_API=true` to use mock data for testing without a real backend.

## 🧪 Test Components

### 1. LightsApiTest Component
**Location:** `src/components/LightsApiTest.tsx`

**Features:**
- Individual API endpoint testing
- Comprehensive test suite execution
- Real-time result logging
- Error handling and recovery
- Data visualization

**Test Cases:**
- ✅ Brands API
- ✅ Models API
- ✅ Positions API
- ✅ Slugs API
- ✅ Search Model API
- ✅ Light Data API

### 2. LightsTestPage Component
**Location:** `src/pages/test/LightsTestPage.tsx`

**Features:**
- Tabbed interface for different test types
- API testing interface
- Component testing with mock data
- Real-time feedback

## 🔧 Configuration

### Environment Variables
```bash
# Enable mock API mode
VITE_USE_MOCK_LIGHTS_API=true

# Enable mock delays for realistic testing
VITE_MOCK_API_DELAYS=true

# Strapi backend URL
VITE_STRAPI_API_URL=http://localhost:1337/api
```

### Mock Data Configuration
**Location:** `src/services/mockLightsApiService.ts`

**Mock Data Includes:**
- 10 brands (Alfa Romeo, BMW, Mercedes-Benz, etc.)
- 10 models per brand
- 10 light positions per model
- Realistic light data with construction years and types

## 📊 Test Scenarios

### 1. API Integration Tests

#### Test 1: Brands API
```typescript
// Expected: Returns array of brand objects
const brands = await lightsApiService.getBrands();
// Should return: [{ id: '1', name: 'Alfa Romeo', slug: 'alfa-romeo' }, ...]
```

#### Test 2: Models API
```typescript
// Expected: Returns models for specific brand
const models = await lightsApiService.getModelsByBrand('1');
// Should return: [{ id: '1', name: '145', slug: '145', brand: {...} }, ...]
```

#### Test 3: Positions API
```typescript
// Expected: Returns light positions for specific model
const positions = await lightsApiService.getPositionsByModel('1');
// Should return: [{ id: 'pos-1', name: 'Feu de croisement', ... }, ...]
```

#### Test 4: Slugs API
```typescript
// Expected: Returns positions using brand and model slugs
const positions = await lightsApiService.getPositionsBySlugs('alfa-romeo', '145');
// Should return: Array of light positions
```

#### Test 5: Search Model API
```typescript
// Expected: Returns model by slugs
const model = await lightsApiService.searchModelBySlugs('alfa-romeo', '145');
// Should return: Model object or null
```

#### Test 6: Light Data API
```typescript
// Expected: Returns specific light data
const lightData = await lightsApiService.getLightDataByPosition('1', 'pos-1');
// Should return: { position: 'Feu de croisement', ref: 'H11', ... }
```

### 2. Component Tests

#### Test 1: BulbsQuestions Component
**Mock Data:**
- Vehicle: Alfa Romeo 145 (1995-2001)
- Category: Éclairage (lights)

**Expected Behavior:**
1. Component loads with mock vehicle data
2. Positions are fetched and displayed
3. User can select positions
4. Light data is fetched and displayed
5. Answers are passed to parent component

#### Test 2: Error Handling
**Test Scenarios:**
- Network errors
- API timeouts
- Invalid data responses
- Empty data responses

#### Test 3: Loading States
**Test Scenarios:**
- Initial loading
- Position selection loading
- Light data loading
- Error recovery

## 🐛 Debugging

### Common Issues

#### 1. API Connection Issues
**Symptoms:** All API tests fail with network errors
**Solutions:**
- Check if Strapi backend is running
- Verify API URL configuration
- Enable mock mode for testing

#### 2. Mock Data Issues
**Symptoms:** Mock API returns empty data
**Solutions:**
- Check mock data configuration
- Verify environment variables
- Check console for errors

#### 3. Component Rendering Issues
**Symptoms:** Component doesn't render or shows errors
**Solutions:**
- Check browser console for errors
- Verify component props
- Check TypeScript compilation

### Debug Tools

#### 1. Browser DevTools
- Network tab for API calls
- Console for error messages
- React DevTools for component state

#### 2. Test Component Logs
- Real-time test results
- Error details and stack traces
- Data visualization

#### 3. Console Logging
```typescript
// Enable detailed logging
console.log('API Response:', response);
console.log('Component State:', state);
console.log('Error Details:', error);
```

## 📈 Performance Testing

### 1. API Response Times
**Expected:**
- Brands API: < 500ms
- Models API: < 300ms
- Positions API: < 400ms
- Light Data API: < 200ms

### 2. Component Rendering
**Expected:**
- Initial render: < 100ms
- Position selection: < 50ms
- Light data display: < 100ms

### 3. Memory Usage
**Monitor:**
- API call caching
- Component re-renders
- Memory leaks

## 🔄 Continuous Testing

### 1. Automated Tests
```bash
# Run component tests
npm test

# Run API integration tests
npm run test:api

# Run full test suite
npm run test:all
```

### 2. Manual Testing Checklist
- [ ] All API endpoints respond correctly
- [ ] Component renders without errors
- [ ] User interactions work as expected
- [ ] Error states are handled gracefully
- [ ] Loading states are displayed
- [ ] Data is passed correctly between components

### 3. Regression Testing
- [ ] Test with different vehicle types
- [ ] Test with different categories
- [ ] Test error scenarios
- [ ] Test edge cases

## 🚀 Production Readiness

### 1. Pre-deployment Checklist
- [ ] All tests pass
- [ ] Mock mode disabled
- [ ] Real API endpoints configured
- [ ] Error handling tested
- [ ] Performance benchmarks met
- [ ] Security considerations addressed

### 2. Monitoring
- [ ] API response times
- [ ] Error rates
- [ ] User interactions
- [ ] Performance metrics

## 📚 Additional Resources

### Documentation
- [API Service Documentation](../services/lightsApiService.ts)
- [Mock Service Documentation](../services/mockLightsApiService.ts)
- [Component Documentation](../pages/questions/BulbsQuestions.tsx)

### Configuration
- [API Configuration](../config/lightsApiConfig.ts)
- [Type Definitions](../types/lights.ts)
- [Utility Functions](../utils/lightsApiUtils.ts)

### Testing
- [Test Components](../components/LightsApiTest.tsx)
- [Test Pages](../pages/test/LightsTestPage.tsx)
- [Mock Data](../services/mockLightsApiService.ts)

---

**Happy Testing! 🎉**

For questions or issues, check the console logs and test results for detailed error information.
