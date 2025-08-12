// Configuration for the application flow
// This makes it easy to revert changes by simply changing this flag

export const FLOW_CONFIG = {
  // Set to true to select vehicle first, then category
  // Set to false to select category first, then vehicle (original flow)
  SELECT_VEHICLE_FIRST: true,
  
  // Whether to show the search input in the navigation bar
  SHOW_SEARCH_INPUT: false,
} as const;

// Helper function to get the next route based on current flow
export const getNextRoute = (currentRoute: string): string => {
  if (FLOW_CONFIG.SELECT_VEHICLE_FIRST) {
    // New flow: vehicle-type -> vehicle -> category -> questions/products
    switch (currentRoute) {
      case '/vehicle-type':
        return '/vehicle';
      case '/vehicle':
        return '/category';
      case '/category':
        return '/questions'; // or /products for batteries
      default:
        return '/vehicle-type';
    }
  } else {
    // Original flow: vehicle-type -> category -> vehicle -> questions/products
    switch (currentRoute) {
      case '/vehicle-type':
        return '/category';
      case '/category':
        return '/vehicle';
      case '/vehicle':
        return '/questions'; // or /products for batteries
      default:
        return '/vehicle-type';
    }
  }
};