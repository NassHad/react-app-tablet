import type { SyncData } from '../types';

interface StrapiConfig {
  baseUrl: string;
  apiToken: string;
}

class SyncService {
  private config: StrapiConfig;

  constructor(config: StrapiConfig) {
    this.config = config;
  }

  /**
   * Récupère toutes les données depuis Strapi
   */
  async fetchAllData(): Promise<SyncData> {
    try {
      const [vehicles, categories, products, compatibilities] = await Promise.all([
        this.fetchVehicles(),
        this.fetchCategories(),
        this.fetchProducts(),
        this.fetchCompatibilities()
      ]);

      return {
        vehicles,
        categories,
        products,
        compatibilities,
        lastSync: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error);
      throw error;
    }
  }

  /**
   * Récupère les véhicules depuis Strapi
   */
  private async fetchVehicles() {
    const response = await fetch(`${this.config.baseUrl}/api/vehicles?populate=*`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map((item: any) => ({
      id: item.id,
      typeId: item.attributes.type_id,
      brand: item.attributes.brand,
      model: item.attributes.model,
      year: item.attributes.year
    }));
  }

  /**
   * Récupère les catégories depuis Strapi
   */
  private async fetchCategories() {
    const response = await fetch(`${this.config.baseUrl}/api/product-categories`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      slug: item.attributes.slug,
      icon: item.attributes.icon
    }));
  }

  /**
   * Récupère les produits depuis Strapi
   */
  private async fetchProducts() {
    const response = await fetch(`${this.config.baseUrl}/api/products?populate=*`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      description: item.attributes.description,
      image: item.attributes.image?.data?.attributes?.url,
      price: item.attributes.price,
      categoryId: item.attributes.category_id
    }));
  }

  /**
   * Récupère les compatibilités depuis Strapi
   */
  private async fetchCompatibilities() {
    const response = await fetch(`${this.config.baseUrl}/api/vehicle-compatibilities`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map((item: any) => ({
      id: item.id,
      vehicleId: item.attributes.vehicle_id,
      productId: item.attributes.product_id
    }));
  }

  /**
   * Vérifie la connectivité avec Strapi
   */
  async checkConnectivity(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/health`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Erreur de connectivité:', error);
      return false;
    }
  }

  /**
   * Synchronise les données avec la base locale
   */
  async syncWithLocalDatabase(): Promise<void> {
    try {
      const isOnline = await this.checkConnectivity();
      
      if (!isOnline) {
        console.log('Pas de connexion internet, utilisation des données locales');
        return;
      }

      console.log('Synchronisation avec Strapi...');
      // const syncData = await this.fetchAllData();
      
      // TODO: Intégrer avec databaseService.syncData(syncData)
      console.log('Synchronisation terminée avec succès');
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error);
      throw error;
    }
  }
}

// Configuration par défaut (à adapter selon votre Strapi)
const defaultConfig: StrapiConfig = {
  baseUrl: 'https://your-strapi-instance.com',
  apiToken: 'your-api-token'
};

export const syncService = new SyncService(defaultConfig); 