// Test Import - First 10 Osram entries

await strapi.entityService.create('api::lights-brand.lights-brand', { 
  data: { 
    name: 'ABARTH', 
    slug: 'abarth', 
    isActive: true, 
    publishedAt: new Date() 
  } 
});

// Add more test commands as needed...