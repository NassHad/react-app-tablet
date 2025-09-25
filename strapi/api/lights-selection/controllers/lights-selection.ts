export default {
  async getBrandsAndModelsByCategory(ctx: any) {
    try {
      const { categoryId } = ctx.params;
      
      if (!categoryId) {
        return ctx.badRequest('Category ID is required');
      }

      // Get all lights products
      const lightsProducts = await strapi.entityService.findMany('api::lights-product.lights-product', {
        filters: {
          isActive: true
        },
        populate: {
          brand: true,
          model: {
            populate: {
              brand: true
            }
          },
          lights_position: true
        }
      });

      if (!lightsProducts || lightsProducts.length === 0) {
        return ctx.send({
          category: null,
          brands: [],
          models: []
        });
      }

      // Extract unique brands and models
      const brandsMap = new Map();
      const modelsMap = new Map();

      lightsProducts.forEach((product: any) => {
        const model = product.model;
        const brand = product.brand;

        if (model && brand) {
          // Add brand
          if (!brandsMap.has(brand.id)) {
            brandsMap.set(brand.id, {
              id: brand.id,
              name: brand.name,
              slug: brand.slug
            });
          }

          // Add model
          const modelKey = `${brand.id}-${model.id}`;
          if (!modelsMap.has(modelKey)) {
            modelsMap.set(modelKey, {
              id: model.id,
              name: model.name,
              slug: model.slug,
              brand: {
                id: brand.id,
                name: brand.name,
                slug: brand.slug
              }
            });
          }
        }
      });

      return ctx.send({
        category: { id: categoryId, name: 'Lights Category' },
        brands: Array.from(brandsMap.values()),
        models: Array.from(modelsMap.values())
      });

    } catch (error) {
      console.error('Error fetching lights brands and models by category:', error);
      return ctx.internalServerError('Failed to fetch lights data');
    }
  },

  async getBrandsByCategory(ctx: any) {
    try {
      const { categoryId } = ctx.params;
      
      if (!categoryId) {
        return ctx.badRequest('Category ID is required');
      }

      // Get all lights products
      const lightsProducts = await strapi.entityService.findMany('api::lights-product.lights-product', {
        filters: {
          isActive: true
        },
        populate: {
          brand: true,
          model: true
        }
      });

      const brandsMap = new Map();

      lightsProducts.forEach((product: any) => {
        const brand = product.brand;

        if (brand) {
          if (!brandsMap.has(brand.id)) {
            brandsMap.set(brand.id, {
              id: brand.id,
              name: brand.name,
              slug: brand.slug
            });
          }
        }
      });

      return ctx.send(Array.from(brandsMap.values()));

    } catch (error) {
      console.error('Error fetching lights brands by category:', error);
      return ctx.internalServerError('Failed to fetch lights brands');
    }
  },

  async getModelsByCategoryAndBrand(ctx: any) {
    try {
      const { categoryId, brandId } = ctx.params;
      
      if (!categoryId || !brandId) {
        return ctx.badRequest('Category ID and Brand ID are required');
      }

      // Get all lights products for this brand
      const lightsProducts = await strapi.entityService.findMany('api::lights-product.lights-product', {
        filters: {
          isActive: true,
          brand: {
            id: brandId
          }
        },
        populate: {
          brand: true,
          model: {
            populate: {
              brand: true
            }
          }
        }
      });

      const modelsMap = new Map();

      lightsProducts.forEach((product: any) => {
        const model = product.model;
        const brand = product.brand;

        if (model && brand && brand.id == brandId) {
          const modelKey = `${brand.id}-${model.id}`;
          if (!modelsMap.has(modelKey)) {
            modelsMap.set(modelKey, {
              id: model.id,
              name: model.name,
              slug: model.slug,
              brand: {
                id: brand.id,
                name: brand.name,
                slug: brand.slug
              }
            });
          }
        }
      });

      return ctx.send(Array.from(modelsMap.values()));

    } catch (error) {
      console.error('Error fetching lights models by category and brand:', error);
      return ctx.internalServerError('Failed to fetch lights models');
    }
  },

  async getPositionsByModel(ctx: any) {
    try {
      const { modelId } = ctx.params;
      
      if (!modelId) {
        return ctx.badRequest('Model ID is required');
      }

      // Get the lights product for this model
      const lightsProduct = await strapi.entityService.findMany('api::lights-product.lights-product', {
        filters: {
          isActive: true,
          model: {
            id: modelId
          }
        },
        populate: {
          brand: true,
          model: {
            populate: {
              brand: true
            }
          }
        }
      });

      if (lightsProduct.length === 0) {
        return ctx.send([]);
      }

      // Extract positions from the lightPositions JSON field
      const product = lightsProduct[0];
      const positions = (product as any).lightPositions || [];

      // Transform positions to match expected format
      const formattedPositions = positions.map((pos: any, index: number) => ({
        id: `pos-${index}`,
        name: pos.position,
        slug: pos.position.toLowerCase().replace(/\s+/g, '-'),
        isActive: true,
        ref: pos.ref,
        category: pos.category
      }));

      return ctx.send(formattedPositions);

    } catch (error) {
      console.error('Error fetching positions by model:', error);
      return ctx.internalServerError('Failed to fetch positions');
    }
  },

  async getLightDataByPosition(ctx: any) {
    try {
      const { positionId } = ctx.params;
      
      if (!positionId) {
        return ctx.badRequest('Position ID is required');
      }

      // For grouped positions, we need to find the product and extract the specific position
      // The positionId format is "pos-{index}" where index is the position in the array
      const positionIndex = parseInt(positionId.replace('pos-', ''));
      
      if (isNaN(positionIndex)) {
        return ctx.badRequest('Invalid position ID format');
      }

      // Get all lights products and find the one with the requested position
      const lightsProducts = await strapi.entityService.findMany('api::lights-product.lights-product', {
        filters: {
          isActive: true
        },
        populate: {
          brand: true,
          model: {
            populate: {
              brand: true
            }
          }
        }
      });

      // Find products that have the requested position
      const matchingProducts = lightsProducts.filter((product: any) => {
        const positions = (product as any).lightPositions || [];
        return positions.length > positionIndex;
      });

      // Transform to match the expected format
      const lightData = matchingProducts.map((product: any) => {
        const positions = (product as any).lightPositions || [];
        const position = positions[positionIndex];
        
        return {
          id: `${product.id}-${positionIndex}`,
          lightType: position.ref,
          position: position.position,
          category: position.category,
          typeConception: product.typeConception,
          partNumber: product.partNumber,
          notes: product.notes,
          source: product.source,
          constructionYearStart: product.constructionYearStart,
          constructionYearEnd: product.constructionYearEnd,
          brand: product.brand,
          model: product.model
        };
      });

      return ctx.send(lightData);

    } catch (error) {
      console.error('Error fetching light data by position:', error);
      return ctx.internalServerError('Failed to fetch light data');
    }
  },

  async getProducts(ctx: any) {
    try {
      const { brandSlug, modelSlug, positionSlug } = ctx.query;
      
      if (!brandSlug || !modelSlug || !positionSlug) {
        return ctx.badRequest('brandSlug, modelSlug, and positionSlug are required');
      }

      // Get all lights products
      const lightsProducts = await strapi.entityService.findMany('api::lights-product.lights-product', {
        filters: {
          isActive: true
        },
        populate: {
          brand: true,
          model: {
            populate: {
              brand: true
            }
          }
        }
      });

      // Filter products by brand and model slugs
      const matchingProducts = lightsProducts.filter((product: any) => {
        const productBrandSlug = product.brand?.slug?.toLowerCase();
        const productModelSlug = product.model?.slug?.toLowerCase();
        
        return productBrandSlug === brandSlug.toLowerCase() && 
               productModelSlug === modelSlug.toLowerCase();
      });

      // Filter by position and extract the specific position data
      const productsWithPosition = matchingProducts.map((product: any) => {
        const positions = (product as any).lightPositions || [];
        const matchingPosition = positions.find((pos: any) => {
          const posSlug = pos.position.toLowerCase().replace(/\s+/g, '-');
          return posSlug === positionSlug.toLowerCase();
        });

        if (matchingPosition) {
          return {
            id: product.id,
            name: product.name,
            ref: matchingPosition.ref,
            description: product.description,
            brand: product.brand,
            model: product.model,
            lightPositions: [{
              id: `pos-${positions.indexOf(matchingPosition)}`,
              name: matchingPosition.position,
              slug: matchingPosition.position.toLowerCase().replace(/\s+/g, '-'),
              ref: matchingPosition.ref,
              category: matchingPosition.category
            }],
            constructionYearStart: product.constructionYearStart,
            constructionYearEnd: product.constructionYearEnd,
            typeConception: product.typeConception,
            partNumber: product.partNumber,
            notes: product.notes,
            source: product.source,
            category: product.category,
            isActive: product.isActive,
            slug: product.slug
          };
        }
        return null;
      }).filter(Boolean);

      if (productsWithPosition.length === 0) {
        return ctx.send({
          data: [],
          success: true,
          message: 'No products found for the specified brand, model, and position'
        });
      }

      return ctx.send({
        data: productsWithPosition,
        success: true
      });

    } catch (error) {
      console.error('Error fetching products:', error);
      return ctx.internalServerError('Failed to fetch products');
    }
  }
};