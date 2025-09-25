export default {
  async getBrandsAndModelsByCategory(ctx: any) {
    try {
      const { categoryId } = ctx.params;
      
      if (!categoryId) {
        return ctx.badRequest('Category ID is required');
      }

      // Get all products in the selected category
      const products = await strapi.entityService.findMany('api::product.product', {
        filters: { 
          category: categoryId,
          isActive: true 
        },
        populate: {
          category: true
        }
      });

      if (!products || products.length === 0) {
        return ctx.send({
          brands: [],
          models: [],
          message: 'No products found for this category'
        });
      }

      // Get all compatibilities for these products using $or filter
      const productIds = products.map((p: any) => p.id);
      let compatibilities: any[] = [];
      
      if (productIds.length > 0) {
        // Use $or filter for each product ID (alternative to $in)
        const orFilters = productIds.map(id => ({ product: id }));
        compatibilities = await strapi.entityService.findMany('api::compatibility.compatibility', {
          filters: {
            $or: orFilters
          },
          populate: {
            vehicle: true,
            product: true
          }
        });
      }

      if (!compatibilities || compatibilities.length === 0) {
        return ctx.send({
          brands: [],
          models: [],
          message: 'No vehicle compatibilities found for products in this category'
        });
      }

      // Extract unique brand and model IDs from vehicles
      const brandIds = new Set();
      const modelIds = new Set();
      
      compatibilities.forEach((comp: any) => {
        if (comp.vehicle) {
          if (comp.vehicle.id_brand) {
            brandIds.add(comp.vehicle.id_brand);
          }
          if (comp.vehicle.id_model) {
            modelIds.add(comp.vehicle.id_model);
          }
        }
      });

      // Get battery brands that match the vehicle brand IDs
      const batteryBrands = await strapi.entityService.findMany('api::battery-brand.battery-brand', {
        filters: {
          isActive: true
        },
        sort: { name: 'asc' }
      });

      // Get battery models that match the vehicle model IDs and their brands
      const batteryModels = await strapi.entityService.findMany('api::battery-model.battery-model', {
        filters: {
          isActive: true
        },
        populate: {
          batteryBrand: true
        },
        sort: { name: 'asc' }
      });

      // Filter brands and models based on the vehicle IDs found
      // Note: This assumes that battery brand/model IDs correspond to vehicle brand/model IDs
      // You might need to adjust this logic based on your actual data relationship
      
      const filteredBrands = batteryBrands.filter((brand: any) => 
        brandIds.has(brand.id) || 
        // Alternative: if you have a different relationship, adjust here
        true // For now, return all active brands
      );

      const filteredModels = batteryModels.filter((model: any) => 
        modelIds.has(model.id) || 
        // Alternative: if you have a different relationship, adjust here
        true // For now, return all active models
      );

      // Group models by brand for easier frontend consumption
      const modelsByBrand: any = {};
      filteredModels.forEach((model: any) => {
        if (model.batteryBrand) {
          const brandId = model.batteryBrand.id;
          if (!modelsByBrand[brandId]) {
            modelsByBrand[brandId] = {
              brand: model.batteryBrand,
              models: []
            };
          }
          modelsByBrand[brandId].models.push({
            id: model.id,
            name: model.name,
            slug: model.slug,
            startDate: model.startDate,
            endDate: model.endDate,
            isActive: model.isActive
          });
        }
      });

      return ctx.send({
        category: (products[0] as any)?.category || null,
        brands: filteredBrands.map((brand: any) => ({
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          isActive: brand.isActive
        })),
        modelsByBrand: Object.values(modelsByBrand),
        totalProducts: products.length,
        totalCompatibilities: compatibilities.length
      });

    } catch (error) {
      console.error('Error fetching brands and models by category:', error);
      return ctx.internalServerError('Failed to fetch brands and models');
    }
  },

  async getBrandsByCategory(ctx: any) {
    try {
      const { categoryId } = ctx.params;
      
      if (!categoryId) {
        return ctx.badRequest('Category ID is required');
      }

      // Get all products in the selected category
      const products = await strapi.entityService.findMany('api::product.product', {
        filters: { 
          category: categoryId,
          isActive: true 
        }
      });

      if (!products || products.length === 0) {
        return ctx.send([]);
      }

      // Get all compatibilities for these products using $or filter
      const productIds = products.map((p: any) => p.id);
      let compatibilities: any[] = [];
      
      if (productIds.length > 0) {
        const orFilters = productIds.map(id => ({ product: id }));
        compatibilities = await strapi.entityService.findMany('api::compatibility.compatibility', {
          filters: {
            $or: orFilters
          },
          populate: {
            vehicle: true
          }
        });
      }

      // Extract unique brand IDs
      const brandIds = new Set();
      compatibilities.forEach((comp: any) => {
        if (comp.vehicle?.id_brand) {
          brandIds.add(comp.vehicle.id_brand);
        }
      });

      // Get battery brands
      const batteryBrands = await strapi.entityService.findMany('api::battery-brand.battery-brand', {
        filters: {
          isActive: true
        },
        sort: { name: 'asc' }
      });

      // Filter brands (adjust logic based on your actual relationship)
      const filteredBrands = batteryBrands.filter((brand: any) => 
        brandIds.has(brand.id) || true // For now, return all active brands
      );

      return ctx.send(filteredBrands.map((brand: any) => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        isActive: brand.isActive
      })));

    } catch (error) {
      console.error('Error fetching brands by category:', error);
      return ctx.internalServerError('Failed to fetch brands');
    }
  },

  async getModelsByCategoryAndBrand(ctx: any) {
    try {
      const { categoryId, brandId } = ctx.params;
      
      if (!categoryId || !brandId) {
        return ctx.badRequest('Category ID and Brand ID are required');
      }

      // Get all products in the selected category
      const products = await strapi.entityService.findMany('api::product.product', {
        filters: { 
          category: categoryId,
          isActive: true 
        }
      });

      if (!products || products.length === 0) {
        return ctx.send([]);
      }

      // Get all compatibilities for these products using $or filter
      const productIds = products.map((p: any) => p.id);
      let compatibilities: any[] = [];
      
      if (productIds.length > 0) {
        const orFilters = productIds.map(id => ({ product: id }));
        compatibilities = await strapi.entityService.findMany('api::compatibility.compatibility', {
          filters: {
            $or: orFilters
          },
          populate: {
            vehicle: true
          }
        });
      }

      // Extract unique model IDs for the specific brand
      const modelIds = new Set();
      compatibilities.forEach((comp: any) => {
        if (comp.vehicle?.id_brand == brandId && comp.vehicle?.id_model) {
          modelIds.add(comp.vehicle.id_model);
        }
      });

      // Get battery models for the specific brand
      const batteryModels = await strapi.entityService.findMany('api::battery-model.battery-model', {
        filters: {
          batteryBrand: brandId,
          isActive: true
        },
        populate: {
          batteryBrand: true
        },
        sort: { name: 'asc' }
      });

      // Filter models (adjust logic based on your actual relationship)
      const filteredModels = batteryModels.filter((model: any) => 
        modelIds.has(model.id) || true // For now, return all active models for the brand
      );

      return ctx.send(filteredModels.map((model: any) => ({
        id: model.id,
        name: model.name,
        slug: model.slug,
        startDate: model.startDate,
        endDate: model.endDate,
        isActive: model.isActive,
        batteryBrand: {
          id: model.batteryBrand.id,
          name: model.batteryBrand.name,
          slug: model.batteryBrand.slug
        }
      })));

    } catch (error) {
      console.error('Error fetching models by category and brand:', error);
      return ctx.internalServerError('Failed to fetch models');
    }
  },

  async getMotorisations(ctx: any) {
    try {
      const { brandSlug, modelSlug } = ctx.query;
      
      if (!brandSlug || !modelSlug) {
        return ctx.badRequest('brandSlug and modelSlug are required');
      }

      // Get the general model by brand and model slugs
      const generalModel = await strapi.entityService.findMany('api::model.model', {
        filters: {
          slug: modelSlug.toLowerCase(),
          brand: {
            slug: brandSlug.toLowerCase()
          }
        },
        populate: {
          brand: true
        }
      });

      if (!generalModel || generalModel.length === 0) {
        return ctx.send({
          data: [],
          success: true,
          message: 'No general model found for the specified brand and model'
        });
      }

      // Get battery models that match the general model
      const batteryModels = await strapi.entityService.findMany('api::battery-model.battery-model', {
        filters: {
          modelSlug: `${brandSlug.toLowerCase()}-${modelSlug.toLowerCase()}`,
          isActive: true
        },
        populate: {
          batteryBrand: true,
          model: {
            populate: {
              brand: true
            }
          }
        }
      });

      if (!batteryModels || batteryModels.length === 0) {
        return ctx.send({
          data: [],
          success: true,
          message: 'No battery models found for the specified brand and model'
        });
      }

      // Extract all motorisations from the battery models
      const allMotorisations: any[] = [];
      batteryModels.forEach((batteryModel: any) => {
        if (batteryModel.motorisations && Array.isArray(batteryModel.motorisations)) {
          batteryModel.motorisations.forEach((motorisation: any, index: number) => {
            allMotorisations.push({
              id: `motor-${batteryModel.id}-${index}`,
              motorisation: motorisation.motorisation,
              fuel: motorisation.fuel,
              startDate: motorisation.startDate,
              endDate: motorisation.endDate,
              batteryModelId: batteryModel.id,
              batteryModelSlug: batteryModel.slug
            });
          });
        }
      });

      // Remove duplicates based on motorisation name
      const uniqueMotorisations = allMotorisations.filter((motor, index, self) => 
        index === self.findIndex(m => m.motorisation === motor.motorisation)
      );

      return ctx.send({
        data: uniqueMotorisations,
        success: true,
        message: `Found ${uniqueMotorisations.length} motorisation(s) for ${brandSlug} ${modelSlug}`,
        model: {
          id: generalModel[0].id,
          name: generalModel[0].name,
          slug: generalModel[0].slug,
          brand: {
            id: generalModel[0].brand.id,
            name: generalModel[0].brand.name,
            slug: generalModel[0].brand.slug
          }
        },
        batteryModel: {
          id: batteryModels[0].id,
          name: batteryModels[0].name,
          slug: batteryModels[0].slug,
          modelSlug: batteryModels[0].modelSlug
        }
      });

    } catch (error) {
      console.error('Error fetching motorisations:', error);
      return ctx.internalServerError('Failed to fetch motorisations');
    }
  },

  async getModels(ctx: any) {
    try {
      const { brandSlug, modelSlug, motorisation } = ctx.query;
      
      if (!brandSlug || !modelSlug || !motorisation) {
        return ctx.badRequest('brandSlug, modelSlug, and motorisation are required');
      }

      // Get battery models that match the criteria
      const batteryModels = await strapi.entityService.findMany('api::battery-model.battery-model', {
        filters: {
          modelSlug: `${brandSlug.toLowerCase()}-${modelSlug.toLowerCase()}`,
          isActive: true
        },
        populate: {
          batteryBrand: true,
          model: {
            populate: {
              brand: true
            }
          }
        }
      });

      if (!batteryModels || batteryModels.length === 0) {
        return ctx.send({
          data: [],
          success: true,
          message: 'No battery models found for the specified criteria'
        });
      }

      // Filter battery models that have the specified motorisation
      const matchingBatteryModels = batteryModels.filter((batteryModel: any) => {
        if (batteryModel.motorisations && Array.isArray(batteryModel.motorisations)) {
          return batteryModel.motorisations.some((motor: any) => 
            motor.motorisation === motorisation
          );
        }
        return false;
      });

      if (matchingBatteryModels.length === 0) {
        return ctx.send({
          data: [],
          success: true,
          message: 'No battery models found for the specified motorisation'
        });
      }

      // Format the response
      const formattedModels = matchingBatteryModels.map((batteryModel: any) => ({
        id: batteryModel.id,
        name: batteryModel.name,
        slug: batteryModel.slug,
        modelSlug: batteryModel.modelSlug,
        batteryBrand: {
          id: batteryModel.batteryBrand.id,
          name: batteryModel.batteryBrand.name,
          slug: batteryModel.batteryBrand.slug
        },
        model: {
          id: batteryModel.model.id,
          name: batteryModel.model.name,
          slug: batteryModel.model.slug,
          brand: {
            id: batteryModel.model.brand.id,
            name: batteryModel.model.brand.name,
            slug: batteryModel.model.brand.slug
          }
        },
        motorisations: batteryModel.motorisations || [],
        isActive: batteryModel.isActive
      }));

      return ctx.send({
        data: formattedModels,
        success: true,
        message: `Found ${formattedModels.length} battery model(s) for ${brandSlug} ${modelSlug} with motorisation ${motorisation}`
      });

    } catch (error) {
      console.error('Error fetching battery models:', error);
      return ctx.internalServerError('Failed to fetch battery models');
    }
  }
};