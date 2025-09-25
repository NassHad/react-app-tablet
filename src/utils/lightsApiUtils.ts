/**
 * Handle API errors consistently across the lights module
 */
export const handleLightsApiError = (error: any, context: string): { message: string; code?: string; details?: any } => {
  console.error(`Lights API Error in ${context}:`, error);
  
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'API_ERROR',
      details: { context, stack: error.stack }
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'API_ERROR',
      details: { context }
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    details: { context, originalError: error }
  };
};

/**
 * Validate API response structure
 */
export const validateLightsApiResponse = (response: any): boolean => {
  if (!response) return false;
  if (typeof response !== 'object') return false;
  if (typeof response.success !== 'boolean') return false;
  
  return true;
};

/**
 * Extract error message from API response
 */
export const extractErrorMessage = (response: any): string => {
  if (response?.message) return response.message;
  if (response?.error?.message) return response.error.message;
  if (typeof response === 'string') return response;
  
  return 'An unknown error occurred';
};

/**
 * Check if an error is retryable
 */
export const isRetryableError = (error: { message: string; code?: string; details?: any }): boolean => {
  const retryableCodes = [
    'NETWORK_ERROR',
    'TIMEOUT_ERROR',
    'SERVER_ERROR'
  ];
  
  return retryableCodes.includes(error.code || '');
};

/**
 * Format error for user display
 */
export const formatErrorForUser = (error: { message: string; code?: string; details?: any }): string => {
  const userFriendlyMessages: Record<string, string> = {
    'FETCH_BRANDS_ERROR': 'Unable to load vehicle brands. Please try again.',
    'FETCH_MODELS_ERROR': 'Unable to load vehicle models. Please try again.',
    'FETCH_POSITIONS_ERROR': 'Unable to load light positions. Please try again.',
    'FETCH_LIGHT_DATA_ERROR': 'Unable to load light details. Please try again.',
    'SEARCH_MODEL_ERROR': 'Vehicle model not found. Please check your selection.',
    'NETWORK_ERROR': 'Network connection issue. Please check your internet connection.',
    'SERVER_ERROR': 'Server is temporarily unavailable. Please try again later.',
    'UNKNOWN_ERROR': 'Something went wrong. Please try again.'
  };
  
  return userFriendlyMessages[error.code || 'UNKNOWN_ERROR'] || error.message;
};
