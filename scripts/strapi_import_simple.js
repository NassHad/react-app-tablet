// Copy and paste this into Strapi console:

// Create Brands
await strapi.entityService.create('api::brand.brand', { data: { name: 'Alfa Romeo', slug: 'alfa-romeo', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Audi', slug: 'audi', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Bmw', slug: 'bmw', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Chevrolet', slug: 'chevrolet', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Chrysler', slug: 'chrysler', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Citroën', slug: 'citroën', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Dacia', slug: 'dacia', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Ds', slug: 'ds', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Fiat', slug: 'fiat', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Ford', slug: 'ford', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Honda', slug: 'honda', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Hyundai', slug: 'hyundai', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Iveco', slug: 'iveco', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Jeep', slug: 'jeep', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Kia', slug: 'kia', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Lancia', slug: 'lancia', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Land Rover', slug: 'land-rover', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Mercedes Benz', slug: 'mercedes-benz', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Mini', slug: 'mini', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Mitsubishi', slug: 'mitsubishi', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Nissan', slug: 'nissan', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Opel', slug: 'opel', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Peugeot', slug: 'peugeot', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Renault', slug: 'renault', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Seat', slug: 'seat', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Skoda', slug: 'skoda', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Smart', slug: 'smart', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Suzuki', slug: 'suzuki', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Toyota', slug: 'toyota', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Volkswagen', slug: 'volkswagen', publishedAt: new Date() } });
await strapi.entityService.create('api::brand.brand', { data: { name: 'Volvo', slug: 'volvo', publishedAt: new Date() } });

// Create Models
await strapi.entityService.create('api::model.model', { data: { name: '147', brand: 1, motorisation: '1.6 16V T.SPARK', fuel: 'Petrole', startDate: '01/01/2001', endDate: '01/03/2010', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: '147', brand: 1, motorisation: 'ECO', fuel: 'Petrole', startDate: '01/01/2001', endDate: '01/03/2010', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: '147', brand: 1, motorisation: '1.9 JTD', fuel: 'Diesel', startDate: '01/04/2001', endDate: '01/03/2010', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: '147', brand: 1, motorisation: '1.9 JTD 16V', fuel: 'Diesel', startDate: '01/04/2001', endDate: '01/03/2010', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: '147', brand: 1, motorisation: '1.9 JTDM', fuel: 'Diesel', startDate: '01/04/2001', endDate: '01/03/2010', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: '147', brand: 1, motorisation: '16V', fuel: 'Diesel', startDate: '01/04/2001', endDate: '01/03/2010', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: '159', brand: 1, motorisation: '1.9 JTDM 16V', fuel: 'Diesel', startDate: '01/09/2005', endDate: '01/11/2011', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: 'GIULIETTA', brand: 1, motorisation: '1.4 TB', fuel: 'Petrole', startDate: '01/04/2010', endDate: '', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: 'GIULIETTA', brand: 1, motorisation: '1.6 JTDM', fuel: 'Diesel', startDate: '01/04/2010', endDate: '', publishedAt: new Date() } });
await strapi.entityService.create('api::model.model', { data: { name: 'GIULIETTA', brand: 1, motorisation: '2.0 JTDM', fuel: 'Diesel', startDate: '01/04/2010', endDate: '', publishedAt: new Date() } });

// ... and 1602 more models (see full file for complete list)
