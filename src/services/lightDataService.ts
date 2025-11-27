import { ENV } from '../config/environment';

export interface LightDataProduct {
  id: number;
  ref: string;
  brand: string;
  img?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  brandImg?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  isActive: boolean;
  description?: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

class LightDataService {
  private baseUrl = ENV.STRAPI_API_URL;

  /**
   * Fetch all light-data products matching a specific reference code
   * @param ref - The reference code (e.g., "H7", "H1", "PY21W")
   * @returns Array of light bulb products
   */
  async fetchLightDataByRef(ref: string): Promise<LightDataProduct[]> {
    try {
      const url = `${this.baseUrl}/lights-data/ref/${ref}`;
      console.log(`🔍 Fetching light data for ref: ${ref}`);

      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      });

      if (!response.ok) {
        console.warn(`⚠️ No light data found for ref: ${ref} (${response.status})`);
        return [];
      }

      const data = await response.json();
      const products = data.data || [];

      console.log(`✅ Found ${products.length} light product(s) for ref: ${ref}`);
      return products;
    } catch (error) {
      console.error(`❌ Error fetching light data for ref ${ref}:`, error);
      return [];
    }
  }

  /**
   * Fetch light-data for multiple reference codes in parallel
   * @param refs - Array of reference codes
   * @returns Object mapping ref codes to arrays of light products
   */
  async fetchLightDataByRefs(refs: string[]): Promise<Record<string, LightDataProduct[]>> {
    if (!refs || refs.length === 0) {
      return {};
    }

    console.log(`💡 Fetching light data for ${refs.length} ref(s):`, refs);

    try {
      // Fetch all refs in parallel for better performance
      const results = await Promise.all(
        refs.map(ref => this.fetchLightDataByRef(ref))
      );

      // Build map of ref -> products
      const map: Record<string, LightDataProduct[]> = {};
      refs.forEach((ref, index) => {
        map[ref] = results[index];
      });

      const totalProducts = Object.values(map).reduce((sum, products) => sum + products.length, 0);
      console.log(`✅ Successfully loaded ${totalProducts} total light products across ${refs.length} ref(s)`);

      return map;
    } catch (error) {
      console.error('❌ Error fetching light data by refs:', error);
      throw error;
    }
  }

  /**
   * Helper to get image URL from image object
   * @param img - Image object with url and formats
   * @param size - Size variant ('thumbnail', 'small', 'medium', 'large')
   * @returns Image URL or null
   */
  getImageUrl(img?: { url: string; formats?: any }, size: 'thumbnail' | 'small' | 'medium' | 'large' = 'thumbnail'): string | null {
    if (!img) return null;

    // Try to get formatted size first
    if (img.formats && img.formats[size]?.url) {
      return `${ENV.STRAPI_API_URL.replace('/api', '')}${img.formats[size].url}`;
    }

    // Fallback to original URL
    if (img.url) {
      return `${ENV.STRAPI_API_URL.replace('/api', '')}${img.url}`;
    }

    return null;
  }
}

// Export singleton instance
export const lightDataService = new LightDataService();
export default lightDataService;
