# Strapi Vehicle Data Integration

This document explains how the vehicle data integration with Strapi works and how to set it up.

## Overview

The application now supports fetching vehicle data from your Strapi backend while maintaining local data as a fallback. This provides better data management and real-time updates while ensuring the app works even when Strapi is unavailable.

## Architecture

### Data Flow
```
VehiclePage → VehicleDataService → StrapiService → Strapi API
                    ↓ (fallback)
              Local Data (vehicleData.ts)
```

### Key Components

1. **VehicleDataService** (`src/services/vehicleDataService.ts`)
   - Main service that handles data fetching
   - Implements caching for performance
   - Provides fallback to local data
   - Converts Strapi data format to local format

2. **StrapiService** (`src/services/strapiService.ts`)
   - Handles direct communication with Strapi API
   - Manages authentication and error handling
   - Provides methods for fetching vehicle data

3. **VehiclePage** (`src/pages/VehiclePage.tsx`)
   - Updated to use async data fetching
   - Includes loading states and error handling
   - Maintains the same UI/UX

## Strapi Content Types

Your Strapi backend should have the following content types:

### Battery Brand
```json
{
  "slug": "string (uid)",
  "name": "string",
  "isActive": "boolean"
}
```

### Battery Model
```json
{
  "name": "string",
  "slug": "string (uid)",
  "batteryBrand": "relation to battery-brand",
  "startDate": "date",
  "endDate": "date",
  "isActive": "boolean",
  "motorisation": "string",
  "fuel": "string"
}
```

### Vehicle Type
```json
{
  "name": "string",
  "slug": "string (uid)"
}
```

### Vehicle
```json
{
  "id_brand": "integer",
  "id_model": "integer", 
  "year": "integer",
  "vehicle_type": "relation to vehicle-type"
}
```

## Configuration

### Vehicle Type Mapping
Update `src/config/vehicleTypeMapping.ts` to match your Strapi vehicle type IDs:

```typescript
export const VEHICLE_TYPE_MAPPING = {
  car: 1,        // Your Strapi vehicle type ID for cars
  truck: 2,      // Your Strapi vehicle type ID for trucks
  motorcycle: 3  // Your Strapi vehicle type ID for motorcycles
} as const;
```

### Data Source Configuration
In `src/config/dataSource.ts`, ensure Strapi is set as the current source:

```typescript
export const DATA_SOURCE_CONFIG: DataSourceConfig = {
  currentSource: DataSource.STRAPI, // Use Strapi
  // ... other config
};
```

## API Endpoints

The integration expects these Strapi API endpoints:

- `GET /api/battery-brands?filters[isActive]=true` - Get active battery brands
- `GET /api/battery-models?filters[batteryBrand][id]=X&filters[isActive]=true&populate=batteryBrand` - Get battery models by brand
- `GET /api/battery-models?filters[isActive]=true&populate=batteryBrand` - Get all battery models
- `GET /api/vehicle-types` - Get vehicle types
- `GET /api/vehicles?filters[id_brand]=X&filters[vehicle_type][id]=Y&populate=vehicle_type` - Get vehicles by brand and type (legacy)
- `GET /api/vehicles?populate=vehicle_type` - Get all vehicles (legacy)

## Features

### Caching
- Data is cached for 5 minutes to improve performance
- Cache is automatically invalidated when data is refreshed
- Cache status can be checked via `vehicleDataService.getCacheStatus()`

### Error Handling
- Automatic fallback to local data when Strapi is unavailable
- User-friendly error messages
- Console logging for debugging

### Loading States
- Initial loading state while fetching brands
- Loading indicators for models and date ranges
- Disabled form elements during loading

## Testing

Use the `VehicleDataTest` component to test the integration:

```tsx
import VehicleDataTest from '../components/VehicleDataTest';

// Add to your app for testing
<VehicleDataTest />
```

This component will:
- Test brand fetching
- Test model fetching for a specific brand
- Test date range fetching for a specific model
- Show cache status
- Allow cache clearing

## Data Conversion

The service automatically converts Strapi data to the local format:

### Strapi Brand → Local Brand
```typescript
{
  id: brand.id,
  name: brand.name
}
```

### Strapi Vehicle → Local Model + DateRange
```typescript
// Model
{
  id: modelId,
  brandId: vehicle.id_brand,
  name: `Model ${vehicle.id_model}` // Since model names aren't in Strapi
}

// DateRange
{
  id: dateRangeId,
  modelId: modelId,
  range: `de ${vehicle.year}-01 à ${vehicle.year + 1}-12`
}
```

## Troubleshooting

### Common Issues

1. **No data showing**: Check if Strapi is running and accessible
2. **Wrong vehicle types**: Update the vehicle type mapping in `vehicleTypeMapping.ts`
3. **API errors**: Check the browser console for detailed error messages
4. **Slow loading**: Check network connectivity and Strapi performance

### Debug Mode

Enable debug logging by checking the browser console. The service logs:
- Data fetching attempts
- Cache hits/misses
- Error details
- Fallback activations

### Fallback Testing

To test the fallback mechanism:
1. Stop your Strapi server
2. Refresh the page
3. The app should automatically use local data
4. Check console for fallback messages

## Performance Considerations

- Data is cached for 5 minutes to reduce API calls
- Only necessary data is fetched (brands, then models, then date ranges)
- Local data provides instant fallback
- Loading states prevent user confusion

## Future Improvements

1. **Real-time updates**: Implement WebSocket connections for live data updates
2. **Offline support**: Add service worker for offline functionality
3. **Data synchronization**: Implement background sync when connection is restored
4. **Advanced caching**: Add more sophisticated caching strategies
5. **Model names**: Add a Model content type to Strapi for proper model names

## Migration from Local Data

The integration is designed to be backward compatible. Your existing local data will continue to work as a fallback. To fully migrate:

1. Set up your Strapi content types
2. Import your vehicle data into Strapi
3. Update the vehicle type mapping
4. Test the integration
5. Remove local data when confident in Strapi integration
