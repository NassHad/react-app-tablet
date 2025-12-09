import React, { useState, useEffect } from 'react';
import type { VehicleProduct, VehicleProductsResponse } from '../services/vehicleProductsService';
import { lightDataService, type LightDataProduct } from '../services/lightDataService';
import { getImageUrl, getBrandImageUrl } from '../config/environment';

interface AllProductsByCategoryProps {
  data: VehicleProductsResponse | null;
  loading: boolean;
  error?: string | null;
}

interface CategoryInfo {
  key: keyof VehicleProductsResponse['data'];
  name: string;
  slug: string;
  icon?: string;
}

const CATEGORIES: CategoryInfo[] = [
  { key: 'batteries', name: 'Batteries', slug: 'batteries' },
  { key: 'lights', name: 'Éclairage', slug: 'lights' },
  { key: 'wipers', name: 'Balais essuie-glace', slug: 'wipers' },
  { key: 'filters', name: 'Filtres', slug: 'filters' },
  { key: 'oil', name: 'Huile', slug: 'oil' },
];

const AllProductsByCategory: React.FC<AllProductsByCategoryProps> = ({ data, loading, error }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [lightDataMap, setLightDataMap] = useState<Record<string, LightDataProduct[]>>({});
  const [loadingLightData, setLoadingLightData] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [lightDataError, setLightDataError] = useState<string | null>(null);

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey);
      } else {
        newSet.add(categoryKey);
      }
      return newSet;
    });
  };

  // Fetch light data when lights products are loaded
  useEffect(() => {
    const fetchLightData = async () => {
      if (!data?.data?.lights || data.data.lights.length === 0) {
        return;
      }

      setLoadingLightData(true);
      setLightDataError(null);

      try {
        // Extract all unique refs from lights products
        const allRefs = new Set<string>();
        data.data.lights.forEach(product => {
          if (product.lightPositions && Array.isArray(product.lightPositions)) {
            product.lightPositions.forEach(pos => {
              if (pos.ref) allRefs.add(pos.ref);
            });
          }
        });

        console.log('💡 Fetching light data for refs:', Array.from(allRefs));

        // Fetch light data for all refs in parallel
        const lightData = await lightDataService.fetchLightDataByRefs(Array.from(allRefs));
        setLightDataMap(lightData);

        console.log('✅ Light data loaded');
      } catch (error) {
        console.error('❌ Error fetching light data:', error);
        setLightDataError('Erreur lors du chargement des données d\'éclairage');
      } finally {
        setLoadingLightData(false);
      }
    };

    fetchLightData();
  }, [data?.data?.lights]);

  // Toggle product expansion
  const toggleProduct = (productKey: string) => {
    setExpandedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productKey)) {
        newSet.delete(productKey);
      } else {
        newSet.add(productKey);
      }
      return newSet;
    });
  };

  // Helper to group light positions by ref
  const groupLightPositionsByRef = (lightPositions: Array<{ ref: string; position: string; category: string }>) => {
    const grouped: Record<string, Array<{ position: string; category: string }>> = {};
    lightPositions.forEach(pos => {
      if (!grouped[pos.ref]) grouped[pos.ref] = [];
      grouped[pos.ref].push({ position: pos.position, category: pos.category });
    });
    return grouped;
  };

  const getProductImageUrl = (product: VehicleProduct): string => {
    if (product.img?.formats?.thumbnail?.url) {
      return getImageUrl(product.img.formats.thumbnail.url);
    }
    if (product.img?.url) {
      return getImageUrl(product.img.url);
    }
    return getImageUrl(); // Returns placeholder
  };

  const getProductBrandImageUrl = (product: VehicleProduct): string => {
    // Handle brandImg from product directly
    if (product.brandImg?.url) {
      return getBrandImageUrl(product.brandImg.url);
    }
    // Handle brand object with image
    if (typeof product.brand === 'object' && product.brand !== null && 'img' in product.brand) {
      const brandWithImg = product.brand as { img?: { url: string } };
      if (brandWithImg.img?.url) {
        return getBrandImageUrl(brandWithImg.img.url);
      }
    }
    return getBrandImageUrl(); // Returns placeholder
  };

  if (loading || loadingLightData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1290AD] mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">
            {loading ? 'Chargement des produits...' : 'Chargement des détails des ampoules...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-red-600">Erreur: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-gray-600">Sélectionnez un véhicule pour afficher les produits</p>
        </div>
      </div>
    );
  }

  // Calculate totals from data if meta.totals is not available
  const calculateTotals = () => {
    if (data.meta?.totals) {
      return data.meta.totals;
    }
    // Fallback: calculate from actual data arrays
    return {
      batteries: data.data?.batteries?.length || 0,
      lights: data.data?.lights?.length || 0,
      wipers: data.data?.wipers?.length || 0,
      filters: data.data?.filters?.length || 0,
      oil: data.data?.oil?.length || 0,
      total: (data.data?.batteries?.length || 0) +
             (data.data?.lights?.length || 0) +
             (data.data?.wipers?.length || 0) +
             (data.data?.filters?.length || 0) +
             (data.data?.oil?.length || 0)
    };
  };

  const totals = calculateTotals();
  const totalProducts = totals.total;

  if (totalProducts === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-gray-600">Aucun produit disponible pour ce véhicule</p>
        </div>
      </div>
    );
  }

  // Component to display individual light bulb product
  const LightBulbItem: React.FC<{ bulb: LightDataProduct }> = ({ bulb }) => {
    return (
      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#1290AD] transition-colors">
        {/* Brand Logo */}
        <div className="w-24 h-16 flex items-center justify-center mr-4">
          {bulb.brandImg?.url ? (
            <img
              src={getBrandImageUrl(bulb.brandImg.url)}
              alt={`${bulb.brand} Logo`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => { e.currentTarget.src = '/assets/img/placeholder-brand.svg'; }}
            />
          ) : (
            <div className="text-gray-400 text-xs text-center">{bulb.brand}</div>
          )}
        </div>

        {/* Description */}
        <div className="flex-1 text-lg text-black font-medium">
          {bulb.description || `${bulb.brand} ${bulb.ref}`}
        </div>

        {/* Product Image */}
        <div className="w-20 h-20 flex items-center justify-center">
          {bulb.img?.url ? (
            <img
              src={getImageUrl(bulb.img.url)}
              alt={`${bulb.ref} Image`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => { e.currentTarget.src = '/assets/img/placeholder-product.svg'; }}
            />
          ) : (
            <div className="text-gray-400 text-xs text-center">Pas d'image</div>
          )}
        </div>
      </div>
    );
  };

  // Component to display light product with expandable bulb variants
  const LightProductCard: React.FC<{
    product: VehicleProduct;
    categoryKey: string;
  }> = ({ product, categoryKey }) => {
    if (!product.lightPositions || product.lightPositions.length === 0) {
      return null;
    }

    const groupedPositions = groupLightPositionsByRef(product.lightPositions);

    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200">
        {Object.entries(groupedPositions).map(([ref, positions]) => {
          const lightBulbs = lightDataMap[ref] || [];
          const productKey = `${categoryKey}-${product.id}-${ref}`;
          const isRefExpanded = expandedProducts.has(productKey);

          return (
            <div key={ref} className="mb-2 last:mb-0">
              {/* Collapsed Header - Clickable */}
              <button
                onClick={() => toggleProduct(productKey)}
                className="w-full flex items-center p-4 hover:bg-gray-100 transition-colors rounded-lg text-left"
              >
                {/* Representative Brand Image */}
                {lightBulbs.length > 0 && lightBulbs[0].brandImg?.url && (
                  <div className="w-20 h-12 flex items-center justify-center mr-4">
                    <img
                      src={getBrandImageUrl(lightBulbs[0].brandImg.url)}
                      alt="Brand"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}

                {/* Ref Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-800">
                      Référence: {ref}
                    </span>
                    {lightBulbs.length > 0 && (
                      <span className="bg-[#1290AD] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {lightBulbs.length} produit{lightBulbs.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Positions: {positions.map(p => p.position).join(', ')}
                  </div>
                </div>

                {/* Expand Icon */}
                <svg
                  className={`w-6 h-6 text-gray-600 transition-transform ${isRefExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded Content - Shows Bulb Products */}
              {isRefExpanded && (
                <div className="border-t border-gray-200 p-4 bg-white">
                  {lightBulbs.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">
                      Aucune ampoule disponible pour cette référence
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {lightBulbs.map(bulb => (
                        <LightBulbItem key={bulb.id} bulb={bulb} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Summary */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          {totalProducts} produit{totalProducts > 1 ? 's' : ''} disponible{totalProducts > 1 ? 's' : ''}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {CATEGORIES.map(category => {
            const count = totals[category.key];
            if (count === 0) return null;
            return (
              <div key={category.key} className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="font-semibold text-gray-700">{category.name}: </span>
                <span className="text-[#1290AD]">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Banner for Light Data */}
      {lightDataError && (
        <div className="mb-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-700">{lightDataError}</p>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-4">
        {CATEGORIES.map(category => {
          const products = data.data?.[category.key] || [];
          const count = totals[category.key];
          const isExpanded = expandedCategories.has(category.key);

          if (count === 0) {
            return null;
          }

          return (
            <div key={category.key} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.key)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#1290AD] rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{category.name}</h3>
                  <span className="bg-[#1290AD] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {count}
                  </span>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-600 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Category Products */}
              {isExpanded && (
                <div className="border-t border-gray-200">
                  <div className="overflow-y-auto max-h-96 p-4">
                    {!products || products.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Aucun produit dans cette catégorie</p>
                    ) : (
                      <div className="space-y-3">
                        {products.map((product) => {
                          // Special rendering for lights category
                          if (category.key === 'lights') {
                            return (
                              <LightProductCard
                                key={product.id}
                                product={product}
                                categoryKey={category.key}
                              />
                            );
                          }

                          // Existing rendering for other categories (batteries, wipers, filters, oil)
                          const productImageUrl = getProductImageUrl(product);
                          const brandImageUrl = getProductBrandImageUrl(product);
                          // Handle different product structures from API
                          const reference = product.reference || product.ref || product.fullName || product.name || 'N/A';
                          // Brand can be a string or an object with a name property
                          let brand = 'N/A';
                          if (typeof product.brand === 'object' && product.brand !== null && 'name' in product.brand) {
                            brand = (product.brand as { name: string }).name;
                          } else if (typeof product.brand === 'string') {
                            brand = product.brand;
                          } else if (product.wiperBrand) {
                            brand = product.wiperBrand;
                          }

                          return (
                            <div
                              key={product.id}
                              className="bg-gray-50 rounded-lg flex flex-row items-center p-4 border border-gray-200 hover:border-[#1290AD] transition-colors"
                            >
                              {/* Brand Image */}
                              <div className="w-24 h-16 flex items-center justify-center mr-4">
                                {brandImageUrl ? (
                                  <img
                                    src={brandImageUrl}
                                    alt={`${brand} Logo`}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                      e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                    }}
                                  />
                                ) : (
                                  <div className="text-gray-400 text-xs text-center">{brand}</div>
                                )}
                              </div>

                              {/* Reference/Name */}
                              <div className="flex-1 text-lg text-black font-medium">
                                {reference}
                              </div>

                              {/* Filter Type (if applicable) */}
                              {product.filterType && (
                                <div className="text-sm text-gray-600 mr-4 capitalize">
                                  {product.filterType}
                                </div>
                              )}

                              {/* Product Image */}
                              <div className="w-20 h-20 flex items-center justify-center">
                                {productImageUrl ? (
                                  <img
                                    src={productImageUrl}
                                    alt={`Image ${reference}`}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                      e.currentTarget.src = '/assets/img/placeholder-brand.svg';
                                    }}
                                  />
                                ) : (
                                  <div className="text-gray-400 text-xs text-center">Pas d'image</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProductsByCategory;

