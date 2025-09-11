// ============================================
// STEP 1: Create Brands
// ============================================

// Create brand: Alfa Romeo
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Alfa Romeo',
    slug: 'alfa-romeo',
    publishedAt: new Date()
  }
});

// Create brand: Audi
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Audi',
    slug: 'audi',
    publishedAt: new Date()
  }
});

// Create brand: Bmw
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Bmw',
    slug: 'bmw',
    publishedAt: new Date()
  }
});

// Create brand: Chevrolet
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Chevrolet',
    slug: 'chevrolet',
    publishedAt: new Date()
  }
});

// Create brand: Chrysler
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Chrysler',
    slug: 'chrysler',
    publishedAt: new Date()
  }
});

// Create brand: Citroën
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Citroën',
    slug: 'citroën',
    publishedAt: new Date()
  }
});

// Create brand: Dacia
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Dacia',
    slug: 'dacia',
    publishedAt: new Date()
  }
});

// Create brand: Ds
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Ds',
    slug: 'ds',
    publishedAt: new Date()
  }
});

// Create brand: Fiat
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Fiat',
    slug: 'fiat',
    publishedAt: new Date()
  }
});

// Create brand: Ford
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Ford',
    slug: 'ford',
    publishedAt: new Date()
  }
});

// Create brand: Honda
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Honda',
    slug: 'honda',
    publishedAt: new Date()
  }
});

// Create brand: Hyundai
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Hyundai',
    slug: 'hyundai',
    publishedAt: new Date()
  }
});

// Create brand: Iveco
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Iveco',
    slug: 'iveco',
    publishedAt: new Date()
  }
});

// Create brand: Jeep
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Jeep',
    slug: 'jeep',
    publishedAt: new Date()
  }
});

// Create brand: Kia
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Kia',
    slug: 'kia',
    publishedAt: new Date()
  }
});

// Create brand: Lancia
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Lancia',
    slug: 'lancia',
    publishedAt: new Date()
  }
});

// Create brand: Land Rover
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Land Rover',
    slug: 'land-rover',
    publishedAt: new Date()
  }
});

// Create brand: Mercedes Benz
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Mercedes Benz',
    slug: 'mercedes-benz',
    publishedAt: new Date()
  }
});

// Create brand: Mini
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Mini',
    slug: 'mini',
    publishedAt: new Date()
  }
});

// Create brand: Mitsubishi
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Mitsubishi',
    slug: 'mitsubishi',
    publishedAt: new Date()
  }
});

// Create brand: Nissan
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Nissan',
    slug: 'nissan',
    publishedAt: new Date()
  }
});

// Create brand: Opel
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Opel',
    slug: 'opel',
    publishedAt: new Date()
  }
});

// Create brand: Peugeot
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Peugeot',
    slug: 'peugeot',
    publishedAt: new Date()
  }
});

// Create brand: Renault
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Renault',
    slug: 'renault',
    publishedAt: new Date()
  }
});

// Create brand: Seat
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Seat',
    slug: 'seat',
    publishedAt: new Date()
  }
});

// Create brand: Skoda
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Skoda',
    slug: 'skoda',
    publishedAt: new Date()
  }
});

// Create brand: Smart
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Smart',
    slug: 'smart',
    publishedAt: new Date()
  }
});

// Create brand: Suzuki
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Suzuki',
    slug: 'suzuki',
    publishedAt: new Date()
  }
});

// Create brand: Toyota
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Toyota',
    slug: 'toyota',
    publishedAt: new Date()
  }
});

// Create brand: Volkswagen
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Volkswagen',
    slug: 'volkswagen',
    publishedAt: new Date()
  }
});

// Create brand: Volvo
await strapi.entityService.create('api::brand.brand', {
  data: {
    name: 'Volvo',
    slug: 'volvo',
    publishedAt: new Date()
  }
});

// ============================================
// STEP 2: Create Models
// ============================================

// Model 1: 147 (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '147',
    brand: 1,
    motorisation: '1.6 16V T.SPARK',
    fuel: 'Petrole',
    startDate: '01/01/2001',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 2: 147 (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '147',
    brand: 1,
    motorisation: 'ECO',
    fuel: 'Petrole',
    startDate: '01/01/2001',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 3: 147 (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '147',
    brand: 1,
    motorisation: '1.9 JTD',
    fuel: 'Diesel',
    startDate: '01/04/2001',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 4: 147 (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '147',
    brand: 1,
    motorisation: '1.9 JTD 16V',
    fuel: 'Diesel',
    startDate: '01/04/2001',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 5: 147 (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '147',
    brand: 1,
    motorisation: '1.9 JTDM',
    fuel: 'Diesel',
    startDate: '01/04/2001',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 6: 147 (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '147',
    brand: 1,
    motorisation: '16V',
    fuel: 'Diesel',
    startDate: '01/04/2001',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 7: 159 (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '159',
    brand: 1,
    motorisation: '1.9 JTDM 16V',
    fuel: 'Diesel',
    startDate: '01/09/2005',
    endDate: '01/11/2011',
    publishedAt: new Date()
  }
});

// Model 8: GIULIETTA (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GIULIETTA',
    brand: 1,
    motorisation: '1.4 TB',
    fuel: 'Petrole',
    startDate: '01/04/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 9: GIULIETTA (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GIULIETTA',
    brand: 1,
    motorisation: '1.6 JTDM',
    fuel: 'Diesel',
    startDate: '01/04/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 10: GIULIETTA (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GIULIETTA',
    brand: 1,
    motorisation: '2.0 JTDM',
    fuel: 'Diesel',
    startDate: '01/04/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 11: GT (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GT',
    brand: 1,
    motorisation: '1.9 JTD',
    fuel: 'Diesel',
    startDate: '01/11/2003',
    endDate: '01/09/2010',
    publishedAt: new Date()
  }
});

// Model 12: MITO (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MITO',
    brand: 1,
    motorisation: '1.3 MultiJet',
    fuel: 'Diesel',
    startDate: '01/08/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 13: MITO (alfa-romeo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MITO',
    brand: 1,
    motorisation: '1.6 JTDM',
    fuel: 'Diesel',
    startDate: '01/08/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 14: A1 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1',
    brand: 2,
    motorisation: '1.4 TDI',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 15: A1 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1',
    brand: 2,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 16: A1 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1',
    brand: 2,
    motorisation: '1.0 TFSI',
    fuel: 'Petrole',
    startDate: '01/05/2010',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 17: A1 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1',
    brand: 2,
    motorisation: '1.2 TFSI',
    fuel: 'Petrole',
    startDate: '01/05/2010',
    endDate: '01/04/2015',
    publishedAt: new Date()
  }
});

// Model 18: A1 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1',
    brand: 2,
    motorisation: '1.4 TFSI',
    fuel: 'Petrole',
    startDate: '01/05/2010',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 19: A1 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1',
    brand: 2,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/05/2010',
    endDate: '01/04/2015',
    publishedAt: new Date()
  }
});

// Model 20: A1 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1 Sportback',
    brand: 2,
    motorisation: '1.4 TDI',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 21: A1 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1 Sportback',
    brand: 2,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 22: A1 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1 Sportback',
    brand: 2,
    motorisation: '1.0 TFSI',
    fuel: 'Petrole',
    startDate: '01/05/2010',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 23: A1 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1 Sportback',
    brand: 2,
    motorisation: '1.2 TFSI',
    fuel: 'Petrole',
    startDate: '01/05/2010',
    endDate: '01/04/2015',
    publishedAt: new Date()
  }
});

// Model 24: A1 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A1 Sportback',
    brand: 2,
    motorisation: '1.4 TFSI',
    fuel: 'Petrole',
    startDate: '01/05/2010',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 25: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 26: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 27: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '2.0 TDI 16V',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 28: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '2.0 TDI 16V quattro',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 29: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '2.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 30: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 31: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '1.6 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 32: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 33: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '2.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 34: A3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3',
    brand: 2,
    motorisation: '30 TDI (1.6)',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 35: A3 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Convertible',
    brand: 2,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 36: A3 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Convertible',
    brand: 2,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 37: A3 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Convertible',
    brand: 2,
    motorisation: '2.0 TDI 16V',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 38: A3 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Convertible',
    brand: 2,
    motorisation: '2.0 TDI 16V quattro',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 39: A3 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Convertible',
    brand: 2,
    motorisation: '2.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 40: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 41: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 42: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '2.0 TDI 16V',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 43: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '2.0 TDI 16V quattro',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 44: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '2.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/03/2013',
    publishedAt: new Date()
  }
});

// Model 45: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 46: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '1.6 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 47: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 48: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '2.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 49: A3 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A3 Sportback',
    brand: 2,
    motorisation: '30 TDI (1.6)',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 50: A4 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4',
    brand: 2,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 51: A4 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4',
    brand: 2,
    motorisation: '2.0 TDI 16V',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 52: A4 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4',
    brand: 2,
    motorisation: '2.5 TDI',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 53: A4 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4',
    brand: 2,
    motorisation: '2.5 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 54: A4 Avant (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4 Avant',
    brand: 2,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 55: A4 Avant (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4 Avant',
    brand: 2,
    motorisation: '2.0 TDI 16V',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 56: A4 Avant (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4 Avant',
    brand: 2,
    motorisation: '2.5 TDI',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 57: A4 Avant (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4 Avant',
    brand: 2,
    motorisation: '2.5 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 58: A4 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4 Convertible',
    brand: 2,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 59: A4 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4 Convertible',
    brand: 2,
    motorisation: '2.0 TDI 16V',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 60: A4 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4 Convertible',
    brand: 2,
    motorisation: '2.5 TDI',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 61: A4 Convertible (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A4 Convertible',
    brand: 2,
    motorisation: '2.5 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 62: A5 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A5',
    brand: 2,
    motorisation: '2.7 TDI',
    fuel: 'Diesel',
    startDate: '01/06/2007',
    endDate: '01/03/2012',
    publishedAt: new Date()
  }
});

// Model 63: A5 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A5',
    brand: 2,
    motorisation: '3.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/06/2007',
    endDate: '01/03/2012',
    publishedAt: new Date()
  }
});

// Model 64: A5 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A5 Sportback',
    brand: 2,
    motorisation: '2.7 TDI',
    fuel: 'Diesel',
    startDate: '01/06/2007',
    endDate: '01/03/2012',
    publishedAt: new Date()
  }
});

// Model 65: A5 Sportback (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A5 Sportback',
    brand: 2,
    motorisation: '3.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/06/2007',
    endDate: '01/03/2012',
    publishedAt: new Date()
  }
});

// Model 66: A6 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A6',
    brand: 2,
    motorisation: '2.5 TDI',
    fuel: 'Diesel',
    startDate: '01/07/1997',
    endDate: '01/09/2018',
    publishedAt: new Date()
  }
});

// Model 67: A6 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A6',
    brand: 2,
    motorisation: '2.5 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/07/1997',
    endDate: '01/09/2018',
    publishedAt: new Date()
  }
});

// Model 68: A6 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A6',
    brand: 2,
    motorisation: '2.7 TDI',
    fuel: 'Diesel',
    startDate: '01/07/1997',
    endDate: '01/09/2018',
    publishedAt: new Date()
  }
});

// Model 69: A6 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A6',
    brand: 2,
    motorisation: '2.7 TDI quattro 3.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/07/1997',
    endDate: '01/09/2018',
    publishedAt: new Date()
  }
});

// Model 70: A6 Avant (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A6 Avant',
    brand: 2,
    motorisation: '2.5 TDI',
    fuel: 'Diesel',
    startDate: '01/07/1997',
    endDate: '01/09/2018',
    publishedAt: new Date()
  }
});

// Model 71: A6 Avant (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A6 Avant',
    brand: 2,
    motorisation: '2.5 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/07/1997',
    endDate: '01/09/2018',
    publishedAt: new Date()
  }
});

// Model 72: A6 Avant (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A6 Avant',
    brand: 2,
    motorisation: '2.7 TDI',
    fuel: 'Diesel',
    startDate: '01/07/1997',
    endDate: '01/09/2018',
    publishedAt: new Date()
  }
});

// Model 73: A6 Avant (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A6 Avant',
    brand: 2,
    motorisation: '2.7 TDI quattro 3.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/07/1997',
    endDate: '01/09/2018',
    publishedAt: new Date()
  }
});

// Model 74: Q3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Q3',
    brand: 2,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 75: Q3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Q3',
    brand: 2,
    motorisation: '2.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 76: Q3 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Q3',
    brand: 2,
    motorisation: '35 TDI quattro (2.0)',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 77: Q5 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Q5',
    brand: 2,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/06/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 78: Q5 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Q5',
    brand: 2,
    motorisation: '2.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/06/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 79: Q5 (audi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Q5',
    brand: 2,
    motorisation: '2.0 TDI quattro',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 80: 1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1',
    brand: 3,
    motorisation: '116 d',
    fuel: 'Diesel',
    startDate: '01/07/2011',
    endDate: '01/06/2019',
    publishedAt: new Date()
  }
});

// Model 81: 1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1',
    brand: 3,
    motorisation: '118 d',
    fuel: 'Diesel',
    startDate: '01/07/2011',
    endDate: '01/06/2019',
    publishedAt: new Date()
  }
});

// Model 82: 1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1',
    brand: 3,
    motorisation: '120 d',
    fuel: 'Diesel',
    startDate: '01/07/2011',
    endDate: '01/06/2019',
    publishedAt: new Date()
  }
});

// Model 83: 1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1',
    brand: 3,
    motorisation: '125d',
    fuel: 'Diesel',
    startDate: '01/07/2011',
    endDate: '01/06/2019',
    publishedAt: new Date()
  }
});

// Model 84: 1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1',
    brand: 3,
    motorisation: '118 d',
    fuel: 'Diesel',
    startDate: '01/09/2006',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 85: 1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1',
    brand: 3,
    motorisation: '120 d',
    fuel: 'Diesel',
    startDate: '01/09/2006',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 86: 1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1',
    brand: 3,
    motorisation: '116 d',
    fuel: 'Diesel',
    startDate: '01/12/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 87: 1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1',
    brand: 3,
    motorisation: '120 d',
    fuel: 'Diesel',
    startDate: '01/12/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 88: 2 Active Tourer (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2 Active Tourer',
    brand: 3,
    motorisation: '2 Coupe (F22',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 89: 2 Active Tourer (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2 Active Tourer',
    brand: 3,
    motorisation: '2 Gran Tourer (F46) 214 d',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 90: 2 Active Tourer (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2 Active Tourer',
    brand: 3,
    motorisation: '216 d',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 91: 2 Active Tourer (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2 Active Tourer',
    brand: 3,
    motorisation: '218 d',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 92: 2 Active Tourer (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2 Active Tourer',
    brand: 3,
    motorisation: 'F87)',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 93: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '320 d',
    fuel: 'Diesel',
    startDate: '01/04/1998',
    endDate: '01/05/2005',
    publishedAt: new Date()
  }
});

// Model 94: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '325 tds',
    fuel: 'Diesel',
    startDate: '01/09/1991',
    endDate: '01/02/1998',
    publishedAt: new Date()
  }
});

// Model 95: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '325',
    fuel: 'Diesel',
    startDate: '01/09/2005',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 96: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '330 d',
    fuel: 'Diesel',
    startDate: '01/09/2005',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 97: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '330 xd',
    fuel: 'Diesel',
    startDate: '01/09/2005',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 98: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '330 xd',
    fuel: 'Diesel',
    startDate: '01/10/1999',
    endDate: '01/02/2005',
    publishedAt: new Date()
  }
});

// Model 99: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '318 d',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 100: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '320 d',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 101: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '320 d xDrive',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 102: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: 'F80) 316 d',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/10/2018',
    publishedAt: new Date()
  }
});

// Model 103: 3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3',
    brand: 3,
    motorisation: '320 d',
    fuel: 'Diesel',
    startDate: '01/12/2004',
    endDate: '01/10/2011',
    publishedAt: new Date()
  }
});

// Model 104: 5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '5',
    brand: 3,
    motorisation: '520 d',
    fuel: 'Diesel',
    startDate: '01/01/1997',
    endDate: '01/06/2003',
    publishedAt: new Date()
  }
});

// Model 105: 5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '5',
    brand: 3,
    motorisation: '525 d',
    fuel: 'Diesel',
    startDate: '01/01/1997',
    endDate: '01/06/2003',
    publishedAt: new Date()
  }
});

// Model 106: 5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '5',
    brand: 3,
    motorisation: '525 td',
    fuel: 'Diesel',
    startDate: '01/01/1997',
    endDate: '01/06/2003',
    publishedAt: new Date()
  }
});

// Model 107: 5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '5',
    brand: 3,
    motorisation: '525 d',
    fuel: 'Diesel',
    startDate: '01/06/2004',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 108: 5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '5',
    brand: 3,
    motorisation: '530 d',
    fuel: 'Diesel',
    startDate: '01/06/2004',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 109: X1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X1',
    brand: 3,
    motorisation: 'sDrive 16 d',
    fuel: 'Diesel',
    startDate: '01/09/2009',
    endDate: '01/06/2015',
    publishedAt: new Date()
  }
});

// Model 110: X1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X1',
    brand: 3,
    motorisation: 'sDrive 18 d',
    fuel: 'Diesel',
    startDate: '01/09/2009',
    endDate: '01/06/2015',
    publishedAt: new Date()
  }
});

// Model 111: X1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X1',
    brand: 3,
    motorisation: 'sDrive 20 d',
    fuel: 'Diesel',
    startDate: '01/09/2009',
    endDate: '01/06/2015',
    publishedAt: new Date()
  }
});

// Model 112: X1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X1',
    brand: 3,
    motorisation: 'xDrive 18 d',
    fuel: 'Diesel',
    startDate: '01/09/2009',
    endDate: '01/06/2015',
    publishedAt: new Date()
  }
});

// Model 113: X1 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X1',
    brand: 3,
    motorisation: 'xDrive 20 d',
    fuel: 'Diesel',
    startDate: '01/09/2009',
    endDate: '01/06/2015',
    publishedAt: new Date()
  }
});

// Model 114: X3 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X3',
    brand: 3,
    motorisation: '2.0 D',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '01/08/2008',
    publishedAt: new Date()
  }
});

// Model 115: X5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X5',
    brand: 3,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/07/2013',
    publishedAt: new Date()
  }
});

// Model 116: X5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X5',
    brand: 3,
    motorisation: '3.0 sd',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/07/2013',
    publishedAt: new Date()
  }
});

// Model 117: X5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X5',
    brand: 3,
    motorisation: 'xDrive 30 d',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/07/2013',
    publishedAt: new Date()
  }
});

// Model 118: X5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X5',
    brand: 3,
    motorisation: 'xDrive 35 d',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/07/2013',
    publishedAt: new Date()
  }
});

// Model 119: X5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X5',
    brand: 3,
    motorisation: 'xDrive 40 d',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/07/2013',
    publishedAt: new Date()
  }
});

// Model 120: X5 (bmw)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X5',
    brand: 3,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/12/1999',
    endDate: '01/09/2006',
    publishedAt: new Date()
  }
});

// Model 121: MATIZ (chevrolet)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MATIZ',
    brand: 4,
    motorisation: 'M250) 0.8',
    fuel: 'Petrole',
    startDate: '01/03/2005',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 122: PT CRUISER (chrysler)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PT CRUISER',
    brand: 5,
    motorisation: '2.2 CRD',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 123:  (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 6,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/02/2000',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 124:  (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 6,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/02/2000',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 125:  (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 6,
    motorisation: '1.6 HDi',
    fuel: 'Diesel',
    startDate: '01/05/2004',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 126: 1.4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1.4',
    brand: 6,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 127: 1.4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1.4',
    brand: 6,
    motorisation: '1.0 VTi 68',
    fuel: 'Petrole',
    startDate: '01/08/2012',
    endDate: '01/09/2016',
    publishedAt: new Date()
  }
});

// Model 128: 1.4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1.4',
    brand: 6,
    motorisation: '1.2 VTi 82',
    fuel: 'Petrole',
    startDate: '01/08/2012',
    endDate: '01/09/2016',
    publishedAt: new Date()
  }
});

// Model 129: 1.4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1.4',
    brand: 6,
    motorisation: '1.6 VTi 120',
    fuel: 'Petrole',
    startDate: '01/08/2012',
    endDate: '01/09/2016',
    publishedAt: new Date()
  }
});

// Model 130: BERLINGO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO',
    brand: 6,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 131: BERLINGO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO',
    brand: 6,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 132: BERLINGO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO',
    brand: 6,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 133: BERLINGO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO',
    brand: 6,
    motorisation: '1.6 HDi 115',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 134: BERLINGO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO',
    brand: 6,
    motorisation: '1.6 HDi 75',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 135: BERLINGO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO',
    brand: 6,
    motorisation: '1.6 HDi 75 16V',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 136: BERLINGO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO',
    brand: 6,
    motorisation: '1.6 HDi 90',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 137: BERLINGO / BERLINGO FIRST Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST Box',
    brand: 6,
    motorisation: '1.6 HDI 75',
    fuel: 'Diesel',
    startDate: '01/07/1996',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 138: BERLINGO / BERLINGO FIRST Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST Box',
    brand: 6,
    motorisation: '1.6 HDI 90',
    fuel: 'Diesel',
    startDate: '01/07/1996',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 139: BERLINGO / BERLINGO FIRST Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST Box',
    brand: 6,
    motorisation: '1.9 D 70',
    fuel: 'Diesel',
    startDate: '01/07/1996',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 140: BERLINGO / BERLINGO FIRST Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST Box',
    brand: 6,
    motorisation: '2.0 HDI 90',
    fuel: 'Diesel',
    startDate: '01/07/1996',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 141: BERLINGO / BERLINGO FIRST MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST MPV',
    brand: 6,
    motorisation: '1.4 i',
    fuel: 'Petrole',
    startDate: '01/07/1996',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 142: BERLINGO / BERLINGO FIRST MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST MPV',
    brand: 6,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/07/1996',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 143: BERLINGO / BERLINGO FIRST MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST MPV',
    brand: 6,
    motorisation: '1.6 HDI 90',
    fuel: 'Diesel',
    startDate: '01/07/1996',
    endDate: '01/05/2008',
    publishedAt: new Date()
  }
});

// Model 144: BERLINGO / BERLINGO FIRST MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST MPV',
    brand: 6,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/07/1996',
    endDate: '01/05/2008',
    publishedAt: new Date()
  }
});

// Model 145: BERLINGO / BERLINGO FIRST MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO / BERLINGO FIRST MPV',
    brand: 6,
    motorisation: '2.0 HDI 90 (MFRHY)',
    fuel: 'Diesel',
    startDate: '01/12/1999',
    endDate: '01/10/2005',
    publishedAt: new Date()
  }
});

// Model 146: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 147: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '1.6 HDi 115',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 148: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '1.6 HDi 75',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 149: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '1.6 HDi 90 16V',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 150: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '1 75',
    fuel: 'Diesel',
    startDate: '01/07/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 151: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/07/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 152: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/07/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 153: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '1.6 HDi 90',
    fuel: 'Diesel',
    startDate: '01/07/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 154: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '6 75',
    fuel: 'Diesel',
    startDate: '01/07/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 155: BERLINGO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Box',
    brand: 6,
    motorisation: '75 75',
    fuel: 'Diesel',
    startDate: '01/07/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 156: BERLINGO Platform/Chassis (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BERLINGO Platform/Chassis',
    brand: 6,
    motorisation: '1.6 HDi 90 16V',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 157: C-CROSSER (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CROSSER',
    brand: 6,
    motorisation: '2.2 HDi',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 158: C1 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C1',
    brand: 6,
    motorisation: '1.4 HDi',
    fuel: 'Diesel',
    startDate: '01/06/2005',
    endDate: '01/09/2014',
    publishedAt: new Date()
  }
});

// Model 159: C1 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C1 II',
    brand: 6,
    motorisation: '1.0 VTi 68',
    fuel: 'Petrole',
    startDate: '01/04/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 160: C1 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C1 II',
    brand: 6,
    motorisation: '1.0 VTi 72',
    fuel: 'Petrole',
    startDate: '01/04/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 161: C1 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C1 II',
    brand: 6,
    motorisation: '1.2 VTi 82',
    fuel: 'Petrole',
    startDate: '01/04/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 162: C15 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C15',
    brand: 6,
    motorisation: '1.8 D',
    fuel: 'Diesel',
    startDate: '01/07/1986',
    endDate: '01/12/2005',
    publishedAt: new Date()
  }
});

// Model 163: C15 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C15',
    brand: 6,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/07/1986',
    endDate: '01/12/2005',
    publishedAt: new Date()
  }
});

// Model 164: C2 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C2',
    brand: 6,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 165: C2 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C2',
    brand: 6,
    motorisation: '1.4 HDi',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 166: C3 AIRCROSS II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 AIRCROSS II',
    brand: 6,
    motorisation: '1.2 PureTech 82',
    fuel: 'Petrole',
    startDate: '01/06/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 167: C3 AIRCROSS II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 AIRCROSS II',
    brand: 6,
    motorisation: '110',
    fuel: 'Petrole',
    startDate: '01/06/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 168: C3 AIRCROSS II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 AIRCROSS II',
    brand: 6,
    motorisation: '130',
    fuel: 'Petrole',
    startDate: '01/06/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 169: C3 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 I',
    brand: 6,
    motorisation: '1.1 i',
    fuel: 'Petrole',
    startDate: '01/02/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 170: C3 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 I',
    brand: 6,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/02/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 171: C3 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 I',
    brand: 6,
    motorisation: '1.4 16V Hdi',
    fuel: 'Diesel',
    startDate: '01/02/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 172: C3 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 I',
    brand: 6,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/02/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 173: C3 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 I',
    brand: 6,
    motorisation: '1.4 i',
    fuel: 'Petrole',
    startDate: '01/02/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 174: C3 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 I',
    brand: 6,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/02/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 175: C3 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 I',
    brand: 6,
    motorisation: '1.6 16V Hdi',
    fuel: 'Diesel',
    startDate: '01/02/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 176: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.0 VTi 68',
    fuel: 'Petrole',
    startDate: '01/08/2012',
    endDate: '01/09/2016',
    publishedAt: new Date()
  }
});

// Model 177: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.2 VTi 82',
    fuel: 'Petrole',
    startDate: '01/08/2012',
    endDate: '01/09/2016',
    publishedAt: new Date()
  }
});

// Model 178: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.6 VTi 120',
    fuel: 'Petrole',
    startDate: '01/08/2012',
    endDate: '01/09/2016',
    publishedAt: new Date()
  }
});

// Model 179: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.4 HDi 70',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 180: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.4 VTi 95',
    fuel: 'Petrole',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 181: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 182: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.6 BlueHDi 75',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 183: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.6 Hdi',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 184: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 185: C3 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 II',
    brand: 6,
    motorisation: '1.6 HDi 90',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 186: C3 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 III',
    brand: 6,
    motorisation: '1.2 THP 110',
    fuel: 'Petrole',
    startDate: '01/07/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 187: C3 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 III',
    brand: 6,
    motorisation: '1.2 VTi 68',
    fuel: 'Petrole',
    startDate: '01/07/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 188: C3 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 III',
    brand: 6,
    motorisation: '1.2 VTi 82',
    fuel: 'Petrole',
    startDate: '01/07/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 189: C3 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 III',
    brand: 6,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/07/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 190: C3 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 III',
    brand: 6,
    motorisation: '1.6 BlueHDi 75',
    fuel: 'Diesel',
    startDate: '01/07/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 191: C3 Picasso (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 Picasso',
    brand: 6,
    motorisation: '1.2 THP 110',
    fuel: 'Petrole',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 192: C3 Picasso (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 Picasso',
    brand: 6,
    motorisation: '1.4 VTi 95',
    fuel: 'Petrole',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 193: C3 Picasso (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 Picasso',
    brand: 6,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/05/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 194: C3 Picasso (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 Picasso',
    brand: 6,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/05/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 195: C3 Picasso (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 Picasso',
    brand: 6,
    motorisation: '1.6 HDi 115',
    fuel: 'Diesel',
    startDate: '01/05/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 196: C3 Picasso (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 Picasso',
    brand: 6,
    motorisation: '1.6 HDi 90',
    fuel: 'Diesel',
    startDate: '01/05/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 197: C3 Pluriel (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 Pluriel',
    brand: 6,
    motorisation: '1.4 HDi',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 198: C3 Pluriel (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C3 Pluriel',
    brand: 6,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/05/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 199: C4 AIRCROSS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 AIRCROSS',
    brand: 6,
    motorisation: '1.6 HDi 115',
    fuel: 'Diesel',
    startDate: '01/04/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 200: C4 AIRCROSS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 AIRCROSS',
    brand: 6,
    motorisation: '1.6 HDi 115 AWC',
    fuel: 'Diesel',
    startDate: '01/04/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 201: C4 AIRCROSS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 AIRCROSS',
    brand: 6,
    motorisation: '1.8 HDi 150 AWC',
    fuel: 'Diesel',
    startDate: '01/04/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 202: C4 CACTUS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 CACTUS',
    brand: 6,
    motorisation: '1 75',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 203: C4 CACTUS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 CACTUS',
    brand: 6,
    motorisation: '1.2 THP 110',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 204: C4 CACTUS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 CACTUS',
    brand: 6,
    motorisation: '1.2 VTi 82',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 205: C4 CACTUS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 CACTUS',
    brand: 6,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 206: C4 CACTUS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 CACTUS',
    brand: 6,
    motorisation: '1.6 HDi 90',
    fuel: 'Diesel',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 207: C4 CACTUS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 CACTUS',
    brand: 6,
    motorisation: '2 75',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 208: C4 CACTUS (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 CACTUS',
    brand: 6,
    motorisation: '75 75',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 209: C4 Grand Picasso I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso I',
    brand: 6,
    motorisation: '1.6 Hdi',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 210: C4 Grand Picasso I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso I',
    brand: 6,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 211: C4 Grand Picasso I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso I',
    brand: 6,
    motorisation: '2.0 HDi 138',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 212: C4 Grand Picasso I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso I',
    brand: 6,
    motorisation: '2.0 HDi 150',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 213: C4 Grand Picasso I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso I',
    brand: 6,
    motorisation: '2.0 HDi 165',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 214: C4 Grand Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso II',
    brand: 6,
    motorisation: '1.6 HDi',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 215: C4 Grand Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso II',
    brand: 6,
    motorisation: '120',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 216: C4 Grand Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso II',
    brand: 6,
    motorisation: '2.0 BlueHDi 150',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 217: C4 Grand Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso II',
    brand: 6,
    motorisation: 'BlueHDi 115',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 218: C4 Grand Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso II',
    brand: 6,
    motorisation: '1.2 THP 130',
    fuel: 'Petrole',
    startDate: '01/09/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 219: C4 Grand Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso II',
    brand: 6,
    motorisation: '1.6 THP 165',
    fuel: 'Petrole',
    startDate: '01/09/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 220: C4 Grand Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Grand Picasso II',
    brand: 6,
    motorisation: '1.6 VTi 120',
    fuel: 'Petrole',
    startDate: '01/09/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 221: C4 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 I',
    brand: 6,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/11/2004',
    endDate: '01/07/2011',
    publishedAt: new Date()
  }
});

// Model 222: C4 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 I',
    brand: 6,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/11/2004',
    endDate: '01/07/2011',
    publishedAt: new Date()
  }
});

// Model 223: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '1.2 THP 110',
    fuel: 'Petrole',
    startDate: '01/04/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 224: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '130',
    fuel: 'Petrole',
    startDate: '01/04/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 225: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '0 150',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 226: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 227: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '1.6 HDi 90',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 228: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '1.6 VTi 120',
    fuel: 'Petrole',
    startDate: '01/11/2009',
    endDate: '01/12/2016',
    publishedAt: new Date()
  }
});

// Model 229: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '110',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 230: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '115',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 231: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '120',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 232: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '150 150',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 233: C4 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 II',
    brand: 6,
    motorisation: '2 150',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 234: C4 Picasso I MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso I MPV',
    brand: 6,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/09/2010',
    endDate: '01/08/2013',
    publishedAt: new Date()
  }
});

// Model 235: C4 Picasso I MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso I MPV',
    brand: 6,
    motorisation: '1.6 Hdi',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '01/08/2013',
    publishedAt: new Date()
  }
});

// Model 236: C4 Picasso I MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso I MPV',
    brand: 6,
    motorisation: '150',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '01/08/2013',
    publishedAt: new Date()
  }
});

// Model 237: C4 Picasso I MPV (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso I MPV',
    brand: 6,
    motorisation: '2.0 HDi 138',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '01/08/2013',
    publishedAt: new Date()
  }
});

// Model 238: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '0 150',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 239: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '1 150',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 240: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '1.2 THP 130',
    fuel: 'Petrole',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 241: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 242: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '1.6 HDi 90',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 243: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '1.6 THP 165',
    fuel: 'Petrole',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 244: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '1.6 VTi 120',
    fuel: 'Petrole',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 245: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '115 150',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 246: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '120',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 247: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '135 150',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 248: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '150 150',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 249: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '2 150',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 250: C4 Picasso II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C4 Picasso II',
    brand: 6,
    motorisation: '6 150',
    fuel: 'Diesel',
    startDate: '01/02/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 251: C5 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 I',
    brand: 6,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/03/2001',
    endDate: '01/08/2004',
    publishedAt: new Date()
  }
});

// Model 252: C5 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 I',
    brand: 6,
    motorisation: '2.0 16V',
    fuel: 'Petrole',
    startDate: '01/03/2001',
    endDate: '01/08/2004',
    publishedAt: new Date()
  }
});

// Model 253: C5 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 I',
    brand: 6,
    motorisation: '2.0 16V HPi',
    fuel: 'Petrole',
    startDate: '01/03/2001',
    endDate: '01/08/2004',
    publishedAt: new Date()
  }
});

// Model 254: C5 I (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 I',
    brand: 6,
    motorisation: '2.0 Hdi',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/08/2004',
    publishedAt: new Date()
  }
});

// Model 255: C5 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 II',
    brand: 6,
    motorisation: '1.6 HDi (RC8HZB)',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 256: C5 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 II',
    brand: 6,
    motorisation: '2.0 Hdi',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 257: C5 II (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 II',
    brand: 6,
    motorisation: '2.2 Hdi',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 258: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '0 140',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 259: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 260: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '140 140',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 261: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '2 140',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 262: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '0 150',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 263: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '0 200',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 264: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 265: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '115',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 266: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '150 150',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 267: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '165 200',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 268: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '180 200',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 269: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '2 150',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 270: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '2 200',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 271: C5 III (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III',
    brand: 6,
    motorisation: '200 200',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 272: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '0 180',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 273: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '1 115',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 274: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '110 115',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 275: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 276: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '140 180',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 277: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '150 180',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 278: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '165 180',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 279: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '180 180',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 280: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '2 180',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 281: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '2.2 Hdi 200',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 282: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '3.0 Hdi 240',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 283: C5 III Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C5 III Break',
    brand: 6,
    motorisation: '6 115',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 284: C8 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C8',
    brand: 6,
    motorisation: '0 165',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 285: C8 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C8',
    brand: 6,
    motorisation: '135 165',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 286: C8 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C8',
    brand: 6,
    motorisation: '165 165',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 287: C8 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C8',
    brand: 6,
    motorisation: '2 165',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 288: C8 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C8',
    brand: 6,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 289: C8 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C8',
    brand: 6,
    motorisation: '2.2 Hdi',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 290: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '1.2 VTi 82',
    fuel: 'Petrole',
    startDate: '01/04/2010',
    endDate: '01/03/2015',
    publishedAt: new Date()
  }
});

// Model 291: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '1.4 VTi 95',
    fuel: 'Petrole',
    startDate: '01/04/2010',
    endDate: '01/03/2015',
    publishedAt: new Date()
  }
});

// Model 292: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '1.6 Racing',
    fuel: 'Petrole',
    startDate: '01/04/2010',
    endDate: '01/03/2015',
    publishedAt: new Date()
  }
});

// Model 293: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '1.6 THP 155',
    fuel: 'Petrole',
    startDate: '01/04/2010',
    endDate: '01/03/2015',
    publishedAt: new Date()
  }
});

// Model 294: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '1.6 VTi 120',
    fuel: 'Petrole',
    startDate: '01/04/2010',
    endDate: '01/03/2015',
    publishedAt: new Date()
  }
});

// Model 295: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '1 115',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 296: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 297: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '110 115',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 298: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 299: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '6 115',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 300: DS3 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS3',
    brand: 6,
    motorisation: '90 115',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 301: DS4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS4',
    brand: 6,
    motorisation: '0 135',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 302: DS4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS4',
    brand: 6,
    motorisation: '1 115',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 303: DS4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS4',
    brand: 6,
    motorisation: '110 115',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 304: DS4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS4',
    brand: 6,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 305: DS4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS4',
    brand: 6,
    motorisation: '135 135',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 306: DS4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS4',
    brand: 6,
    motorisation: '2 135',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 307: DS4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS4',
    brand: 6,
    motorisation: '2.0 HDi 165',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 308: DS4 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS4',
    brand: 6,
    motorisation: '6 115',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 309: DS5 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS5',
    brand: 6,
    motorisation: '1 165',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 310: DS5 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS5',
    brand: 6,
    motorisation: '115 165',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 311: DS5 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS5',
    brand: 6,
    motorisation: '135 165',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 312: DS5 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS5',
    brand: 6,
    motorisation: '165 165',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 313: DS5 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS5',
    brand: 6,
    motorisation: '2.0 BlueHDi 180',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 314: DS5 (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS5',
    brand: 6,
    motorisation: '6 165',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '01/07/2015',
    publishedAt: new Date()
  }
});

// Model 315: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '2 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 316: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 317: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '8 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 318: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '0 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 319: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '04 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 320: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '110 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 321: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '130 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 322: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '2 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 323: JUMPER Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box',
    brand: 6,
    motorisation: '2002 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 324: JUMPER Box | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box | RELAY',
    brand: 6,
    motorisation: '2.2 HDi 100',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 325: JUMPER Box | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box | RELAY',
    brand: 6,
    motorisation: '0 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 326: JUMPER Box | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box | RELAY',
    brand: 6,
    motorisation: '110 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 327: JUMPER Box | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box | RELAY',
    brand: 6,
    motorisation: '130 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 328: JUMPER Box | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Box | RELAY',
    brand: 6,
    motorisation: '2 130',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 329: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '0 180',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 330: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '110 150',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 331: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '120 150',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 332: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '130 150',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 333: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '150 150',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 334: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '160 180',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 335: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '180 180',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 336: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '2 150',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 337: JUMPER Platform/Chassis | RELAY (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPER Platform/Chassis | RELAY',
    brand: 6,
    motorisation: '3 180',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 338: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '0 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 339: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '1 115',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 340: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 341: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '120 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 342: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '150 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 343: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '180 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 344: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '2 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 345: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '6 115',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 346: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '95 115',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 347: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '0 110',
    fuel: 'Diesel',
    startDate: '01/10/1995',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 348: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/10/1995',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 349: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '1.9 D 70',
    fuel: 'Diesel',
    startDate: '01/10/1995',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 350: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '1.9 DT',
    fuel: 'Diesel',
    startDate: '01/10/1995',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 351: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/10/1995',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 352: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '2 110',
    fuel: 'Diesel',
    startDate: '01/10/1995',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 353: JUMPY Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box',
    brand: 6,
    motorisation: '95 110',
    fuel: 'Diesel',
    startDate: '01/10/1995',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 354: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '0 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 355: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '1 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 356: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '120 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 357: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '125 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 358: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '140 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 359: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '16 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 360: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '165 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 361: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '2 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 362: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '6 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 363: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '8 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 364: JUMPY Box | DISPATCH (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Box | DISPATCH',
    brand: 6,
    motorisation: '90 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 365: JUMPY Platform/Chassis (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Platform/Chassis',
    brand: 6,
    motorisation: '0 110',
    fuel: 'Diesel',
    startDate: '01/10/1999',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 366: JUMPY Platform/Chassis (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Platform/Chassis',
    brand: 6,
    motorisation: '1.9 TD',
    fuel: 'Diesel',
    startDate: '01/10/1999',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 367: JUMPY Platform/Chassis (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Platform/Chassis',
    brand: 6,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/10/1999',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 368: JUMPY Platform/Chassis (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Platform/Chassis',
    brand: 6,
    motorisation: '2 110',
    fuel: 'Diesel',
    startDate: '01/10/1999',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 369: JUMPY Platform/Chassis (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUMPY Platform/Chassis',
    brand: 6,
    motorisation: '95 110',
    fuel: 'Diesel',
    startDate: '01/10/1999',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 370: NEMO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NEMO Box',
    brand: 6,
    motorisation: '1.3 HDi 75',
    fuel: 'Diesel',
    startDate: '01/10/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 371: NEMO Box (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NEMO Box',
    brand: 6,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/10/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 372: NEMO Estate (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NEMO Estate',
    brand: 6,
    motorisation: '1 80',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 373: NEMO Estate (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NEMO Estate',
    brand: 6,
    motorisation: '1.4 HDi',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 374: NEMO Estate (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NEMO Estate',
    brand: 6,
    motorisation: '3 80',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 375: NEMO Estate (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NEMO Estate',
    brand: 6,
    motorisation: '75 80',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 376: NEMO Estate (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NEMO Estate',
    brand: 6,
    motorisation: '80 80',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 377: SAXO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SAXO',
    brand: 6,
    motorisation: '1.0 X',
    fuel: 'Petrole',
    startDate: '01/05/1996',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 378: SAXO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SAXO',
    brand: 6,
    motorisation: '1.4 VTS',
    fuel: 'Petrole',
    startDate: '01/05/1996',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 379: SAXO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SAXO',
    brand: 6,
    motorisation: '1.6 VTS',
    fuel: 'Petrole',
    startDate: '01/05/1996',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 380: SAXO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SAXO',
    brand: 6,
    motorisation: '1.5 D',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/04/2004',
    publishedAt: new Date()
  }
});

// Model 381: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '1.4 i',
    fuel: 'Petrole',
    startDate: '01/04/1997',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 382: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/04/1997',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 383: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '1.8 i',
    fuel: 'Petrole',
    startDate: '01/04/1997',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 384: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '1.8 i 16V',
    fuel: 'Petrole',
    startDate: '01/04/1997',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 385: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/04/1997',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 386: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '1.9 SD',
    fuel: 'Diesel',
    startDate: '01/04/1997',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 387: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '1.9 TD',
    fuel: 'Diesel',
    startDate: '01/04/1997',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 388: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '0 109',
    fuel: 'Diesel',
    startDate: '01/05/2001',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 389: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '109 109',
    fuel: 'Diesel',
    startDate: '01/05/2001',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 390: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '2 109',
    fuel: 'Diesel',
    startDate: '01/05/2001',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 391: XSARA (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA',
    brand: 6,
    motorisation: '90 109',
    fuel: 'Diesel',
    startDate: '01/05/2001',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 392: XSARA Box Body / Estate / Hatchback (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA Box Body / Estate / Hatchback',
    brand: 6,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '01/03/2005',
    publishedAt: new Date()
  }
});

// Model 393: XSARA Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA Break',
    brand: 6,
    motorisation: '0 109',
    fuel: 'Diesel',
    startDate: '01/02/1999',
    endDate: '01/08/2005',
    publishedAt: new Date()
  }
});

// Model 394: XSARA Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA Break',
    brand: 6,
    motorisation: '109 109',
    fuel: 'Diesel',
    startDate: '01/02/1999',
    endDate: '01/08/2005',
    publishedAt: new Date()
  }
});

// Model 395: XSARA Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA Break',
    brand: 6,
    motorisation: '2 109',
    fuel: 'Diesel',
    startDate: '01/02/1999',
    endDate: '01/08/2005',
    publishedAt: new Date()
  }
});

// Model 396: XSARA Break (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA Break',
    brand: 6,
    motorisation: '90 109',
    fuel: 'Diesel',
    startDate: '01/02/1999',
    endDate: '01/08/2005',
    publishedAt: new Date()
  }
});

// Model 397: XSARA PICASSO (citroën)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'XSARA PICASSO',
    brand: 6,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/12/1999',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 398: DOKKER (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOKKER',
    brand: 7,
    motorisation: '1.2 Tce',
    fuel: 'Petrole',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 399: DOKKER (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOKKER',
    brand: 7,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 400: DUSTER (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUSTER',
    brand: 7,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/04/2010',
    endDate: '01/01/2018',
    publishedAt: new Date()
  }
});

// Model 401: DUSTER (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUSTER',
    brand: 7,
    motorisation: '1.2 TCe 125',
    fuel: 'Petrole',
    startDate: '01/10/2013',
    endDate: '01/01/2018',
    publishedAt: new Date()
  }
});

// Model 402: DUSTER (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUSTER',
    brand: 7,
    motorisation: '1.6 Sce 115',
    fuel: 'Petrole',
    startDate: '01/10/2013',
    endDate: '01/01/2018',
    publishedAt: new Date()
  }
});

// Model 403: DUSTER (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUSTER',
    brand: 7,
    motorisation: '4x4',
    fuel: 'Petrole',
    startDate: '01/10/2013',
    endDate: '01/01/2018',
    publishedAt: new Date()
  }
});

// Model 404: DUSTER Box (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUSTER Box',
    brand: 7,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 405: DUSTER Box (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUSTER Box',
    brand: 7,
    motorisation: '4x4',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 406: LODGY (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LODGY',
    brand: 7,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 407: LODGY (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LODGY',
    brand: 7,
    motorisation: '1.2 Tce',
    fuel: 'Petrole',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 408: LODGY (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LODGY',
    brand: 7,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 409: LOGAN (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LOGAN',
    brand: 7,
    motorisation: '1.2 16V',
    fuel: 'Petrole',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 410: LOGAN (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LOGAN',
    brand: 7,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 411: LOGAN (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LOGAN',
    brand: 7,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 412: LOGAN (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LOGAN',
    brand: 7,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 413: LOGAN (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LOGAN',
    brand: 7,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/09/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 414: LOGAN MCV (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LOGAN MCV',
    brand: 7,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 415: SANDERO (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO',
    brand: 7,
    motorisation: '1.2 16V',
    fuel: 'Petrole',
    startDate: '01/06/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 416: SANDERO (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO',
    brand: 7,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/06/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 417: SANDERO (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO',
    brand: 7,
    motorisation: '1.2 16V LPG',
    fuel: 'Petroleum',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 418: SANDERO (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO',
    brand: 7,
    motorisation: '1.4 MPI LPG Petrole',
    fuel: 'Petroleum',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 419: SANDERO (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO',
    brand: 7,
    motorisation: 'Gas (LPG)',
    fuel: 'Petroleum',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 420: SANDERO II (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO II',
    brand: 7,
    motorisation: '1.0 SCe 75',
    fuel: 'Petrole',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 421: SANDERO II (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO II',
    brand: 7,
    motorisation: '1.1',
    fuel: 'Petrole',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 422: SANDERO II (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO II',
    brand: 7,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 423: SANDERO II (dacia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANDERO II',
    brand: 7,
    motorisation: 'TCe 90',
    fuel: 'Petrole',
    startDate: '01/10/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 424: DS 3 (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 3',
    brand: 8,
    motorisation: '1 130',
    fuel: 'Petrole',
    startDate: '01/04/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 425: DS 3 (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 3',
    brand: 8,
    motorisation: '1.2 VTi 82',
    fuel: 'Petrole',
    startDate: '01/04/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 426: DS 3 (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 3',
    brand: 8,
    motorisation: '1.6 THP 165',
    fuel: 'Petrole',
    startDate: '01/04/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 427: DS 3 (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 3',
    brand: 8,
    motorisation: '110 130',
    fuel: 'Petrole',
    startDate: '01/04/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 428: DS 3 (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 3',
    brand: 8,
    motorisation: '130 130',
    fuel: 'Petrole',
    startDate: '01/04/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 429: DS 3 (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 3',
    brand: 8,
    motorisation: '2 130',
    fuel: 'Petrole',
    startDate: '01/04/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 430: DS 4 / DS 4 CROSSBACK (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 4 / DS 4 CROSSBACK',
    brand: 8,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 431: DS 4 / DS 4 CROSSBACK (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 4 / DS 4 CROSSBACK',
    brand: 8,
    motorisation: '2.0 BlueHDi 150',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 432: DS 4 / DS 4 CROSSBACK (ds)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DS 4 / DS 4 CROSSBACK',
    brand: 8,
    motorisation: '2.0 BlueHDi 180',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 433: 120 Multijet 2 (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '120 Multijet 2',
    brand: 9,
    motorisation: '180 Multijet 3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 434: 120 Multijet 2 (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '120 Multijet 2',
    brand: 9,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 435: 160 Multijet (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '160 Multijet',
    brand: 9,
    motorisation: '180 Multijet 3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 436: 160 Multijet (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '160 Multijet',
    brand: 9,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 437: 2 D (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2 D',
    brand: 9,
    motorisation: '180 Multijet 3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 438: 2 D (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2 D',
    brand: 9,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 439: 3 D (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3 D',
    brand: 9,
    motorisation: '180 Multijet 3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 440: 3 D (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3 D',
    brand: 9,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 441: 500 (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500',
    brand: 9,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/07/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 442: 500 (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500',
    brand: 9,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/07/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 443: 500 (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500',
    brand: 9,
    motorisation: '1.3 D Multijet',
    fuel: 'Diesel',
    startDate: '01/10/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 444: 500 C (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500 C',
    brand: 9,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/09/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 445: 500 C (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500 C',
    brand: 9,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/09/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 446: 500L (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500L',
    brand: 9,
    motorisation: '1.4',
    fuel: 'Petrol',
    startDate: '01/09/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 447: 500L (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500L',
    brand: 9,
    motorisation: '1.6 D Multijet',
    fuel: 'Diesel',
    startDate: '01/09/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 448: 500L (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500L',
    brand: 9,
    motorisation: '352_) 0.9',
    fuel: 'Petrol',
    startDate: '01/09/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 449: 500X (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500X',
    brand: 9,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 450: 500X (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '500X',
    brand: 9,
    motorisation: '1.6 D Multijet',
    fuel: 'Diesel',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 451: DOBLO Box Body / Estate (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO Box Body / Estate',
    brand: 9,
    motorisation: '1.3 D Multijet',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 452: DOBLO Cargo (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO Cargo',
    brand: 9,
    motorisation: '1.3 D Multijet',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/01/2010',
    publishedAt: new Date()
  }
});

// Model 453: DOBLO Cargo (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO Cargo',
    brand: 9,
    motorisation: '1.3 JTD 16V',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/01/2010',
    publishedAt: new Date()
  }
});

// Model 454: DOBLO Cargo (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO Cargo',
    brand: 9,
    motorisation: '1.9',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/01/2010',
    publishedAt: new Date()
  }
});

// Model 455: DOBLO Cargo (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO Cargo',
    brand: 9,
    motorisation: '1.9 JTD (223ZXE1A)',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/01/2010',
    publishedAt: new Date()
  }
});

// Model 456: DOBLO MPV (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO MPV',
    brand: 9,
    motorisation: '1.3 D Multijet',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 457: DOBLO MPV (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO MPV',
    brand: 9,
    motorisation: '1.3 JTD 16V',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 458: DOBLO MPV (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO MPV',
    brand: 9,
    motorisation: '1.9',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 459: DOBLO MPV (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DOBLO MPV',
    brand: 9,
    motorisation: '1.9 JTD (223ZXE1A)',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 460: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.5 D',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 461: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.5 TDI',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 462: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.8 D',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 463: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.8 D 4x4',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 464: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.8 TDI',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 465: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.0 JTD',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 466: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.3 JTD',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 467: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.8 JTD',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 468: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.8 JTD 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 469: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.8 JTD Power',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 470: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '2.8 TD',
    fuel: 'Diesel',
    startDate: '01/04/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 471: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '0 D',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 472: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '130 Multijet 2',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 473: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '290_) 115 Multijet 2',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 474: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '3 D',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 475: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 476: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '160 Multijet 3',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 477: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '180 Multijet 3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 478: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '290_) 150 Multijet 2',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 479: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '3 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 480: DUCATO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Box',
    brand: 9,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 481: DUCATO Bus (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Bus',
    brand: 9,
    motorisation: '180 Multijet 3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 482: DUCATO Bus (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Bus',
    brand: 9,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 483: DUCATO Platform/Chassis (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Platform/Chassis',
    brand: 9,
    motorisation: '130 Multijet 2.3 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 484: DUCATO Platform/Chassis (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Platform/Chassis',
    brand: 9,
    motorisation: '180 Multijet 3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 485: DUCATO Platform/Chassis (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Platform/Chassis',
    brand: 9,
    motorisation: '2.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 486: DUCATO Platform/Chassis (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DUCATO Platform/Chassis',
    brand: 9,
    motorisation: '3.0 D',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 487: GRANDE PUNTO (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRANDE PUNTO',
    brand: 9,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 488: GRANDE PUNTO (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRANDE PUNTO',
    brand: 9,
    motorisation: '1.4 T-Jet',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 489: MULTIPLA (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MULTIPLA',
    brand: 9,
    motorisation: '1.9 JTD',
    fuel: 'Diesel',
    startDate: '01/04/1999',
    endDate: '01/06/2010',
    publishedAt: new Date()
  }
});

// Model 490: MULTIPLA (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MULTIPLA',
    brand: 9,
    motorisation: '1.9 JTD 105',
    fuel: 'Diesel',
    startDate: '01/04/1999',
    endDate: '01/06/2010',
    publishedAt: new Date()
  }
});

// Model 491: MULTIPLA (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MULTIPLA',
    brand: 9,
    motorisation: '1.9 JTD 110',
    fuel: 'Diesel',
    startDate: '01/04/1999',
    endDate: '01/06/2010',
    publishedAt: new Date()
  }
});

// Model 492: MULTIPLA (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MULTIPLA',
    brand: 9,
    motorisation: '1.9 JTD 115',
    fuel: 'Diesel',
    startDate: '01/04/1999',
    endDate: '01/06/2010',
    publishedAt: new Date()
  }
});

// Model 493: PANDA (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PANDA',
    brand: 9,
    motorisation: '0.9 4x4',
    fuel: 'Petrole',
    startDate: '01/02/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 494: PANDA (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PANDA',
    brand: 9,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/02/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 495: PANDA (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PANDA',
    brand: 9,
    motorisation: '169AXF1A)',
    fuel: 'Petrole',
    startDate: '01/03/2010',
    endDate: '01/08/2013',
    publishedAt: new Date()
  }
});

// Model 496: PUNTO (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PUNTO',
    brand: 9,
    motorisation: '1.9 DS 60',
    fuel: 'Diesel',
    startDate: '01/09/1999',
    endDate: '01/03/2012',
    publishedAt: new Date()
  }
});

// Model 497: PUNTO (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PUNTO',
    brand: 9,
    motorisation: '1.9 JTD',
    fuel: 'Diesel',
    startDate: '01/09/1999',
    endDate: '01/03/2012',
    publishedAt: new Date()
  }
});

// Model 498: PUNTO (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PUNTO',
    brand: 9,
    motorisation: '1.9 JTD 80',
    fuel: 'Diesel',
    startDate: '01/09/1999',
    endDate: '01/03/2012',
    publishedAt: new Date()
  }
});

// Model 499: SCUDO Box (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCUDO Box',
    brand: 9,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/02/1996',
    endDate: '01/12/2006',
    publishedAt: new Date()
  }
});

// Model 500: STILO (fiat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'STILO',
    brand: 9,
    motorisation: '1.9 JTD',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/11/2006',
    publishedAt: new Date()
  }
});

// Model 501:  (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 10,
    motorisation: '2.2 TDCi',
    fuel: 'Diesel',
    startDate: '01/01/2000',
    endDate: '01/08/2014',
    publishedAt: new Date()
  }
});

// Model 502:  (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 10,
    motorisation: '2.4 Di',
    fuel: 'Diesel',
    startDate: '01/01/2000',
    endDate: '01/08/2014',
    publishedAt: new Date()
  }
});

// Model 503:  (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 10,
    motorisation: '2.4 TDCi',
    fuel: 'Diesel',
    startDate: '01/01/2000',
    endDate: '01/08/2014',
    publishedAt: new Date()
  }
});

// Model 504:  (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 10,
    motorisation: '2.4 TDE',
    fuel: 'Diesel',
    startDate: '01/01/2000',
    endDate: '01/08/2014',
    publishedAt: new Date()
  }
});

// Model 505: Box (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Box',
    brand: 10,
    motorisation: '2.5 DI',
    fuel: 'Diesel',
    startDate: '01/05/1991',
    endDate: '01/03/2000',
    publishedAt: new Date()
  }
});

// Model 506: Box (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Box',
    brand: 10,
    motorisation: '2.5 TD',
    fuel: 'Diesel',
    startDate: '01/05/1991',
    endDate: '01/03/2000',
    publishedAt: new Date()
  }
});

// Model 507: Box (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'Box',
    brand: 10,
    motorisation: '2.5 TDI',
    fuel: 'Diesel',
    startDate: '01/05/1991',
    endDate: '01/03/2000',
    publishedAt: new Date()
  }
});

// Model 508: C-MAX (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-MAX',
    brand: 10,
    motorisation: '1.8 TDCi',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/09/2010',
    publishedAt: new Date()
  }
});

// Model 509: C-MAX (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-MAX',
    brand: 10,
    motorisation: '2.0 TDCi',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/09/2010',
    publishedAt: new Date()
  }
});

// Model 510: ECOSPORT (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ECOSPORT',
    brand: 10,
    motorisation: '1.0 EcoBoost',
    fuel: 'Petrole',
    startDate: '01/10/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 511: FIESTA IV (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA IV',
    brand: 10,
    motorisation: '1.8 D',
    fuel: 'Diesel',
    startDate: '01/08/1995',
    endDate: '01/01/2002',
    publishedAt: new Date()
  }
});

// Model 512: FIESTA IV (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA IV',
    brand: 10,
    motorisation: '1.8 DI',
    fuel: 'Diesel',
    startDate: '01/08/1995',
    endDate: '01/01/2002',
    publishedAt: new Date()
  }
});

// Model 513: FIESTA V (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA V',
    brand: 10,
    motorisation: '1.25 16V',
    fuel: 'Petrole',
    startDate: '01/11/2001',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 514: FIESTA V (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA V',
    brand: 10,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/11/2001',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 515: FIESTA V (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA V',
    brand: 10,
    motorisation: '1.4 TDCi',
    fuel: 'Diesel',
    startDate: '01/11/2001',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 516: FIESTA V (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA V',
    brand: 10,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/11/2001',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 517: FIESTA VI (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA VI',
    brand: 10,
    motorisation: '1.4 TDCi',
    fuel: 'Diesel',
    startDate: '01/01/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 518: FIESTA VI (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA VI',
    brand: 10,
    motorisation: '1.5 TDCi',
    fuel: 'Diesel',
    startDate: '01/01/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 519: FIESTA VI (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA VI',
    brand: 10,
    motorisation: '1.6 TDCi',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 520: FIESTA VI (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA VI',
    brand: 10,
    motorisation: '1.0 EcoBoost',
    fuel: 'Petrole',
    startDate: '01/06/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 521: FIESTA VI (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA VI',
    brand: 10,
    motorisation: '1.0 Sport',
    fuel: 'Petrole',
    startDate: '01/06/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 522: FIESTA VI (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA VI',
    brand: 10,
    motorisation: '1.6 Ti',
    fuel: 'Petrole',
    startDate: '01/06/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 523: FIESTA VII (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FIESTA VII',
    brand: 10,
    motorisation: '1.5 TDCi',
    fuel: 'Diesel',
    startDate: '01/08/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 524: FOCUS (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS',
    brand: 10,
    motorisation: '1 TDDi',
    fuel: 'Diesel',
    startDate: '01/10/1998',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 525: FOCUS (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS',
    brand: 10,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/10/1998',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 526: FOCUS (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS',
    brand: 10,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/10/1998',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 527: FOCUS (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS',
    brand: 10,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/10/1998',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 528: FOCUS (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS',
    brand: 10,
    motorisation: '1.8 TDCi',
    fuel: 'Diesel',
    startDate: '01/10/1998',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 529: FOCUS (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS',
    brand: 10,
    motorisation: '8 TDDi',
    fuel: 'Diesel',
    startDate: '01/10/1998',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 530: FOCUS C-MAX (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS C-MAX',
    brand: 10,
    motorisation: '1.6 TDCi',
    fuel: 'Diesel',
    startDate: '01/10/2003',
    endDate: '01/03/2007',
    publishedAt: new Date()
  }
});

// Model 531: FOCUS C-MAX (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS C-MAX',
    brand: 10,
    motorisation: '1.8 TDCi',
    fuel: 'Diesel',
    startDate: '01/10/2003',
    endDate: '01/03/2007',
    publishedAt: new Date()
  }
});

// Model 532: FOCUS C-MAX (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS C-MAX',
    brand: 10,
    motorisation: '2.0 TDCi',
    fuel: 'Diesel',
    startDate: '01/10/2003',
    endDate: '01/03/2007',
    publishedAt: new Date()
  }
});

// Model 533: FOCUS II (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS II',
    brand: 10,
    motorisation: '1.6 TDCi',
    fuel: 'Diesel',
    startDate: '01/07/2004',
    endDate: '01/09/2012',
    publishedAt: new Date()
  }
});

// Model 534: FOCUS II (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS II',
    brand: 10,
    motorisation: '1.8 TDCi',
    fuel: 'Diesel',
    startDate: '01/07/2004',
    endDate: '01/09/2012',
    publishedAt: new Date()
  }
});

// Model 535: FOCUS II (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS II',
    brand: 10,
    motorisation: '2.0 TDCi',
    fuel: 'Diesel',
    startDate: '01/07/2004',
    endDate: '01/09/2012',
    publishedAt: new Date()
  }
});

// Model 536: FOCUS Turnier (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS Turnier',
    brand: 10,
    motorisation: '1 TDDi',
    fuel: 'Diesel',
    startDate: '01/02/1999',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 537: FOCUS Turnier (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS Turnier',
    brand: 10,
    motorisation: '1.8 TDCi',
    fuel: 'Diesel',
    startDate: '01/02/1999',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 538: FOCUS Turnier (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOCUS Turnier',
    brand: 10,
    motorisation: '8 TDDi',
    fuel: 'Diesel',
    startDate: '01/02/1999',
    endDate: '01/11/2004',
    publishedAt: new Date()
  }
});

// Model 539: FUSION (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FUSION',
    brand: 10,
    motorisation: '1.4 TDCi',
    fuel: 'Diesel',
    startDate: '01/08/2002',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 540: FUSION (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FUSION',
    brand: 10,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/08/2002',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 541: FUSION (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FUSION',
    brand: 10,
    motorisation: '1.6 TDCi',
    fuel: 'Diesel',
    startDate: '01/08/2002',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 542: GALAXY (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GALAXY',
    brand: 10,
    motorisation: '1.3 i',
    fuel: 'Petrole',
    startDate: '01/09/1996',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 543: III (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'III',
    brand: 10,
    motorisation: '0 TDCi',
    fuel: 'Diesel',
    startDate: '01/10/2000',
    endDate: '01/03/2007',
    publishedAt: new Date()
  }
});

// Model 544: III (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'III',
    brand: 10,
    motorisation: '16 TDCi',
    fuel: 'Diesel',
    startDate: '01/10/2000',
    endDate: '01/03/2007',
    publishedAt: new Date()
  }
});

// Model 545: III (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'III',
    brand: 10,
    motorisation: '2 TDCi',
    fuel: 'Diesel',
    startDate: '01/10/2000',
    endDate: '01/03/2007',
    publishedAt: new Date()
  }
});

// Model 546: KA (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KA',
    brand: 10,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/03/1995',
    endDate: '01/05/2006',
    publishedAt: new Date()
  }
});

// Model 547: KA (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KA',
    brand: 10,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/10/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 548: KA+ (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KA+',
    brand: 10,
    motorisation: '1.2 Ti-VCT',
    fuel: 'Petrole',
    startDate: '01/06/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 549: KUGA I MONDEO (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KUGA I MONDEO',
    brand: 10,
    motorisation: '2.0 TDCI',
    fuel: 'Petrole',
    startDate: '01/10/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 550: KUGA I MONDEO (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KUGA I MONDEO',
    brand: 10,
    motorisation: '2.0 TDCI 4x4',
    fuel: 'Petrole',
    startDate: '01/10/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 551: MONDEO III Turnier (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MONDEO III Turnier',
    brand: 10,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/10/2000',
    endDate: '01/03/2007',
    publishedAt: new Date()
  }
});

// Model 552: RANGER (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RANGER',
    brand: 10,
    motorisation: '3.2 TDCi 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 553: S-MAX (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'S-MAX',
    brand: 10,
    motorisation: '1.8 TDCi',
    fuel: 'Diesel',
    startDate: '01/05/2006',
    endDate: '01/12/2014',
    publishedAt: new Date()
  }
});

// Model 554: S-MAX (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'S-MAX',
    brand: 10,
    motorisation: '2.0 TDCi',
    fuel: 'Diesel',
    startDate: '01/05/2006',
    endDate: '01/12/2014',
    publishedAt: new Date()
  }
});

// Model 555: TRANSIT CONNECT (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRANSIT CONNECT',
    brand: 10,
    motorisation: '1.8 DI',
    fuel: 'Diesel',
    startDate: '01/06/2002',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 556: TRANSIT CONNECT (ford)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRANSIT CONNECT',
    brand: 10,
    motorisation: '1.8 TDCi',
    fuel: 'Diesel',
    startDate: '01/06/2002',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 557: CIVIC VIII Hatchback (honda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CIVIC VIII Hatchback',
    brand: 11,
    motorisation: '2.2 CTDi',
    fuel: 'Diesel',
    startDate: '01/09/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 558: CR-V III (honda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CR-V III',
    brand: 11,
    motorisation: '2.2 i-CTDi 4WD',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 559: CR-V III (honda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CR-V III',
    brand: 11,
    motorisation: '2.2 i-DTEC 4WD',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 560: JAZZ III (honda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JAZZ III',
    brand: 11,
    motorisation: '1.3 i',
    fuel: 'Petrole',
    startDate: '01/07/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 561: GETZ (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GETZ',
    brand: 12,
    motorisation: '1.5 CRDi',
    fuel: 'Diesel',
    startDate: '01/03/2003',
    endDate: '01/06/2009',
    publishedAt: new Date()
  }
});

// Model 562: GETZ (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GETZ',
    brand: 12,
    motorisation: '1.3 i',
    fuel: 'Petrole',
    startDate: '01/09/2002',
    endDate: '01/06/2009',
    publishedAt: new Date()
  }
});

// Model 563: i10 (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'i10',
    brand: 12,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/01/2008',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 564: i20 (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'i20',
    brand: 12,
    motorisation: 'IB) 1.2',
    fuel: 'Petrole',
    startDate: '01/11/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 565: i30 (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'i30',
    brand: 12,
    motorisation: '1.6 CRDI',
    fuel: 'Diesel',
    startDate: '01/12/2011',
    endDate: '01/12/2016',
    publishedAt: new Date()
  }
});

// Model 566: ix35 (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ix35',
    brand: 12,
    motorisation: '2.0 CRDi 4WD',
    fuel: 'Diesel',
    startDate: '01/01/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 567: ix35 (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ix35',
    brand: 12,
    motorisation: '1.7 CRDi',
    fuel: 'Diesel',
    startDate: '01/11/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 568: MATRIX (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MATRIX',
    brand: 12,
    motorisation: '1.5 CRDi',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/08/2010',
    publishedAt: new Date()
  }
});

// Model 569: MATRIX (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MATRIX',
    brand: 12,
    motorisation: '1.5 CRDi VGT',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/08/2010',
    publishedAt: new Date()
  }
});

// Model 570: SANTA FÉ I (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANTA FÉ I',
    brand: 12,
    motorisation: '2.0 CRDi',
    fuel: 'Diesel',
    startDate: '01/08/2001',
    endDate: '01/03/2006',
    publishedAt: new Date()
  }
});

// Model 571: SANTA FÉ I (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANTA FÉ I',
    brand: 12,
    motorisation: '2.0 CRDi 4x4',
    fuel: 'Diesel',
    startDate: '01/08/2001',
    endDate: '01/03/2006',
    publishedAt: new Date()
  }
});

// Model 572: SANTA FÉ II (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANTA FÉ II',
    brand: 12,
    motorisation: '2.2 CRDi',
    fuel: 'Diesel',
    startDate: '01/03/2006',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 573: SANTA FÉ II (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANTA FÉ II',
    brand: 12,
    motorisation: '2.2 CRDi 4x4',
    fuel: 'Diesel',
    startDate: '01/03/2006',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 574: SANTA FÉ II (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SANTA FÉ II',
    brand: 12,
    motorisation: '2.2 CRDi GLS 4x4',
    fuel: 'Diesel',
    startDate: '01/03/2006',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 575: TUCSON (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TUCSON',
    brand: 12,
    motorisation: '1.7 CRDi',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 576: TUCSON (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TUCSON',
    brand: 12,
    motorisation: '0 Drive',
    fuel: 'Diesel',
    startDate: '01/08/2004',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 577: TUCSON (hyundai)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TUCSON',
    brand: 12,
    motorisation: '2 Drive',
    fuel: 'Diesel',
    startDate: '01/08/2004',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 578: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 C 11 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 579: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 C 12 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 580: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 C 13 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 581: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 C 15V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 582: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 C 9 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 583: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 S 11 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 584: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 S 12 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 585: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 S 13 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 586: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 S 15 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 587: DAILY III Box Body / Estate 29 L 12 V (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Box Body / Estate 29 L 12 V',
    brand: 13,
    motorisation: '35 S 9 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/07/2007',
    publishedAt: new Date()
  }
});

// Model 588: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 C 10 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 589: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 C 11',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 590: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 C 12',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 591: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 C 9',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 592: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 S 10 V',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 593: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 S 11',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 594: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 S 12',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 595: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 S 13',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 596: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '35 S 9',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 597: DAILY III Platform/Chassis 29 L 12 (iveco)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'DAILY III Platform/Chassis 29 L 12',
    brand: 13,
    motorisation: '50 C 11',
    fuel: 'Diesel',
    startDate: '01/05/1999',
    endDate: '01/04/2006',
    publishedAt: new Date()
  }
});

// Model 598: RENEGADE Closed Off-Road Vehicle (jeep)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RENEGADE Closed Off-Road Vehicle',
    brand: 14,
    motorisation: '1.6 CRD',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 599:  (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 15,
    motorisation: '2.5 CRDi',
    fuel: 'Diesel',
    startDate: '01/08/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 600: CEE'D SW (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CEE'D SW',
    brand: 15,
    motorisation: '1 115',
    fuel: 'Diesel',
    startDate: '01/09/2007',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 601: CEE'D SW (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CEE'D SW',
    brand: 15,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/09/2007',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 602: CEE'D SW (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CEE'D SW',
    brand: 15,
    motorisation: '6 115',
    fuel: 'Diesel',
    startDate: '01/09/2007',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 603: CEE'D SW (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CEE'D SW',
    brand: 15,
    motorisation: '90 115',
    fuel: 'Diesel',
    startDate: '01/09/2007',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 604: PICANTO (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PICANTO',
    brand: 15,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/03/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 605: PICANTO (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PICANTO',
    brand: 15,
    motorisation: '1.0',
    fuel: 'Petrole',
    startDate: '01/04/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 606: PICANTO (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PICANTO',
    brand: 15,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/05/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 607: QLE) SPORTAGE (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QLE) SPORTAGE',
    brand: 15,
    motorisation: '1.7 CRDi',
    fuel: 'Diesel',
    startDate: '01/09/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 608: QLE) SPORTAGE (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QLE) SPORTAGE',
    brand: 15,
    motorisation: '2.0 CRDi',
    fuel: 'Diesel',
    startDate: '01/09/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 609: RIO III (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RIO III',
    brand: 15,
    motorisation: '1.2 CVVT',
    fuel: 'Petrole',
    startDate: '01/11/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 610: VENGA (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VENGA',
    brand: 15,
    motorisation: '1.4 CRDi 90',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 611: VENGA (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VENGA',
    brand: 15,
    motorisation: '1.6 CRDi 115',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 612: VENGA (kia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VENGA',
    brand: 15,
    motorisation: '1.7 CRDi',
    fuel: 'Diesel',
    startDate: '01/12/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 613: YPSILON (lancia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YPSILON',
    brand: 16,
    motorisation: '0.9 TwinAir',
    fuel: 'Petrole',
    startDate: '01/05/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 614: YPSILON (lancia)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YPSILON',
    brand: 16,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/05/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 615: FREELANDER (land-rover)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FREELANDER',
    brand: 17,
    motorisation: '2.0 DI 4x4',
    fuel: 'Diesel',
    startDate: '01/02/1998',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 616: FREELANDER (land-rover)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FREELANDER',
    brand: 17,
    motorisation: '2.0 Td4 4x4',
    fuel: 'Diesel',
    startDate: '01/02/1998',
    endDate: '01/10/2006',
    publishedAt: new Date()
  }
});

// Model 617: RANGE ROVER EVOQUE (land-rover)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RANGE ROVER EVOQUE',
    brand: 17,
    motorisation: '0 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 618: RANGE ROVER EVOQUE (land-rover)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RANGE ROVER EVOQUE',
    brand: 17,
    motorisation: '2 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 619: RANGE ROVER EVOQUE (land-rover)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RANGE ROVER EVOQUE',
    brand: 17,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 620:  (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 18,
    motorisation: '250 CDI',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 621:  (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 18,
    motorisation: 'BlueTEC 4-matic',
    fuel: 'Diesel',
    startDate: '01/06/2011',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 622:  (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 18,
    motorisation: '270 CDI',
    fuel: 'Diesel',
    startDate: '01/10/2002',
    endDate: '01/05/2009',
    publishedAt: new Date()
  }
});

// Model 623:  (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '',
    brand: 18,
    motorisation: '320 CDI',
    fuel: 'Diesel',
    startDate: '01/10/2002',
    endDate: '01/05/2009',
    publishedAt: new Date()
  }
});

// Model 624: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: '200 D',
    fuel: 'Diesel',
    startDate: '01/06/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 625: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: 'A220 D',
    fuel: 'Diesel',
    startDate: '01/06/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 626: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: 'A 160',
    fuel: 'Petrole',
    startDate: '01/07/1997',
    endDate: '01/08/2004',
    publishedAt: new Date()
  }
});

// Model 627: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: 'A 190',
    fuel: 'Petrole',
    startDate: '01/07/1997',
    endDate: '01/08/2004',
    publishedAt: new Date()
  }
});

// Model 628: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: 'A 170 CDI',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '01/08/2004',
    publishedAt: new Date()
  }
});

// Model 629: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: 'A 180 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '01/06/2012',
    publishedAt: new Date()
  }
});

// Model 630: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: 'A 200 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '01/06/2012',
    publishedAt: new Date()
  }
});

// Model 631: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: 'A170',
    fuel: 'Petrole',
    startDate: '01/09/2004',
    endDate: '01/06/2012',
    publishedAt: new Date()
  }
});

// Model 632: A-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'A-CLASS',
    brand: 18,
    motorisation: 'A200',
    fuel: 'Petrole',
    startDate: '01/09/2004',
    endDate: '01/06/2012',
    publishedAt: new Date()
  }
});

// Model 633: B-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'B-CLASS',
    brand: 18,
    motorisation: 'B 200 CDI',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/11/2011',
    publishedAt: new Date()
  }
});

// Model 634: B-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'B-CLASS',
    brand: 18,
    motorisation: '160 d',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 635: B-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'B-CLASS',
    brand: 18,
    motorisation: '220 d',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 636: B-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'B-CLASS',
    brand: 18,
    motorisation: '242 d',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 637: B-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'B-CLASS',
    brand: 18,
    motorisation: 'B 180 CDI',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 638: B-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'B-CLASS',
    brand: 18,
    motorisation: 'B 200 CDI',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 639: B-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'B-CLASS',
    brand: 18,
    motorisation: 'd',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 640: B-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'B-CLASS',
    brand: 18,
    motorisation: 'd 4-matic',
    fuel: 'Diesel',
    startDate: '01/11/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 641: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 220',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 642: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 200 CDI',
    fuel: 'Diesel',
    startDate: '01/01/2011',
    endDate: '01/01/2014',
    publishedAt: new Date()
  }
});

// Model 643: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 250 CDI',
    fuel: 'Diesel',
    startDate: '01/01/2011',
    endDate: '01/01/2014',
    publishedAt: new Date()
  }
});

// Model 644: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 320 CDI',
    fuel: 'Diesel',
    startDate: '01/01/2011',
    endDate: '01/01/2014',
    publishedAt: new Date()
  }
});

// Model 645: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: '220 d',
    fuel: 'Diesel',
    startDate: '01/02/2014',
    endDate: '01/05/2018',
    publishedAt: new Date()
  }
});

// Model 646: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C250 BlueTEC',
    fuel: 'Diesel',
    startDate: '01/02/2014',
    endDate: '01/05/2018',
    publishedAt: new Date()
  }
});

// Model 647: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'd',
    fuel: 'Diesel',
    startDate: '01/02/2014',
    endDate: '01/05/2018',
    publishedAt: new Date()
  }
});

// Model 648: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'd 4-matic',
    fuel: 'Diesel',
    startDate: '01/02/2014',
    endDate: '01/05/2018',
    publishedAt: new Date()
  }
});

// Model 649: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 220 CDI',
    fuel: 'Diesel',
    startDate: '01/05/1993',
    endDate: '01/05/2000',
    publishedAt: new Date()
  }
});

// Model 650: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 220 D',
    fuel: 'Diesel',
    startDate: '01/05/1993',
    endDate: '01/05/2000',
    publishedAt: new Date()
  }
});

// Model 651: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 250 D',
    fuel: 'Diesel',
    startDate: '01/05/1993',
    endDate: '01/05/2000',
    publishedAt: new Date()
  }
});

// Model 652: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 250 Turbo-D',
    fuel: 'Diesel',
    startDate: '01/05/1993',
    endDate: '01/05/2000',
    publishedAt: new Date()
  }
});

// Model 653: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 220 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '01/06/2003',
    publishedAt: new Date()
  }
});

// Model 654: C-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS',
    brand: 18,
    motorisation: 'C 320 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '01/06/2003',
    publishedAt: new Date()
  }
});

// Model 655: C-CLASS Coupe C 200 CDI (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'C-CLASS Coupe C 200 CDI',
    brand: 18,
    motorisation: 'C220 CDI',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/05/2008',
    publishedAt: new Date()
  }
});

// Model 656: CABRIOLET (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CABRIOLET',
    brand: 18,
    motorisation: '300 CE-24 (124.061)',
    fuel: 'Petrole',
    startDate: '01/04/1992',
    endDate: '01/06/1993',
    publishedAt: new Date()
  }
});

// Model 657: D (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'D',
    brand: 18,
    motorisation: 'E 300 Turbo-D',
    fuel: 'Diesel',
    startDate: '01/03/1996',
    endDate: '01/03/2002',
    publishedAt: new Date()
  }
});

// Model 658: D (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'D',
    brand: 18,
    motorisation: 'E320 CDI',
    fuel: 'Diesel',
    startDate: '01/03/1996',
    endDate: '01/03/2002',
    publishedAt: new Date()
  }
});

// Model 659: E-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'E-CLASS',
    brand: 18,
    motorisation: '220 BlueTEC',
    fuel: 'Diesel',
    startDate: '01/01/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 660: E-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'E-CLASS',
    brand: 18,
    motorisation: '250 BlueTEC',
    fuel: 'Diesel',
    startDate: '01/01/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 661: E-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'E-CLASS',
    brand: 18,
    motorisation: 'E 350 CDI',
    fuel: 'Diesel',
    startDate: '01/01/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 662: E-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'E-CLASS',
    brand: 18,
    motorisation: 'E 280 CDI',
    fuel: 'Diesel',
    startDate: '01/11/2002',
    endDate: '01/12/2008',
    publishedAt: new Date()
  }
});

// Model 663: E-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'E-CLASS',
    brand: 18,
    motorisation: 'E 320 CDI',
    fuel: 'Diesel',
    startDate: '01/11/2002',
    endDate: '01/12/2008',
    publishedAt: new Date()
  }
});

// Model 664: GLA-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GLA-CLASS',
    brand: 18,
    motorisation: '220 d',
    fuel: 'Diesel',
    startDate: '01/12/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 665: GLC (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GLC',
    brand: 18,
    motorisation: '250 d 4-matic',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '01/04/2019',
    publishedAt: new Date()
  }
});

// Model 666: M-CLASS (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'M-CLASS',
    brand: 18,
    motorisation: 'ML 400 CDI',
    fuel: 'Diesel',
    startDate: '01/12/1999',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 667: M-CLASS ML 280 / 300 /320 / (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'M-CLASS ML 280 / 300 /320 /',
    brand: 18,
    motorisation: '350 CDI 4-matic',
    fuel: 'Diesel',
    startDate: '01/07/2005',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 668: SPRINTER 3 (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SPRINTER 3',
    brand: 18,
    motorisation: '314 CDI',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 669: SPRINTER 3 (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SPRINTER 3',
    brand: 18,
    motorisation: '316 CDI',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 670: SPRINTER 3 (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SPRINTER 3',
    brand: 18,
    motorisation: '5-t Box (906) 313 CDI',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 671: SPRINTER 4 (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SPRINTER 4',
    brand: 18,
    motorisation: '414 CDI',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 672: SPRINTER 4 (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SPRINTER 4',
    brand: 18,
    motorisation: '6-t Box (906) 413 CDI',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 673: VITO / MIXTO Box (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO / MIXTO Box',
    brand: 18,
    motorisation: '115 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 674: VITO / MIXTO Box (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO / MIXTO Box',
    brand: 18,
    motorisation: '122 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 675: VITO Box (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Box',
    brand: 18,
    motorisation: '108 D 2.3',
    fuel: 'Diesel',
    startDate: '01/03/1997',
    endDate: '01/07/2003',
    publishedAt: new Date()
  }
});

// Model 676: VITO Box (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Box',
    brand: 18,
    motorisation: '110 CDI 2.2',
    fuel: 'Diesel',
    startDate: '01/03/1997',
    endDate: '01/07/2003',
    publishedAt: new Date()
  }
});

// Model 677: VITO Box (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Box',
    brand: 18,
    motorisation: '110 D 2.3',
    fuel: 'Diesel',
    startDate: '01/03/1997',
    endDate: '01/07/2003',
    publishedAt: new Date()
  }
});

// Model 678: VITO Box (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Box',
    brand: 18,
    motorisation: '112 CDI 2.2',
    fuel: 'Diesel',
    startDate: '01/03/1997',
    endDate: '01/07/2003',
    publishedAt: new Date()
  }
});

// Model 679: VITO Bus (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Bus',
    brand: 18,
    motorisation: '109 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 680: VITO Bus (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Bus',
    brand: 18,
    motorisation: '110 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 681: VITO Bus (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Bus',
    brand: 18,
    motorisation: '111 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 682: VITO Bus (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Bus',
    brand: 18,
    motorisation: '113 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 683: VITO Bus (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Bus',
    brand: 18,
    motorisation: '115 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 684: VITO Bus (mercedes-benz)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITO Bus',
    brand: 18,
    motorisation: '116 CDI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 685: MINI (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI',
    brand: 19,
    motorisation: '53 S',
    fuel: 'Petrole',
    startDate: '01/06/2001',
    endDate: '01/09/2006',
    publishedAt: new Date()
  }
});

// Model 686: MINI (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI',
    brand: 19,
    motorisation: 'One',
    fuel: 'Petrole',
    startDate: '01/06/2001',
    endDate: '01/09/2006',
    publishedAt: new Date()
  }
});

// Model 687: MINI (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI',
    brand: 19,
    motorisation: 'One',
    fuel: 'Petrole',
    startDate: '01/09/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 688: MINI (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI',
    brand: 19,
    motorisation: 'One',
    fuel: 'Petrole',
    startDate: '01/10/2006',
    endDate: '01/11/2013',
    publishedAt: new Date()
  }
});

// Model 689: MINI (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI',
    brand: 19,
    motorisation: 'One D',
    fuel: 'Diesel',
    startDate: '01/11/2006',
    endDate: '01/11/2013',
    publishedAt: new Date()
  }
});

// Model 690: MINI (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI',
    brand: 19,
    motorisation: 'John Cooper Works',
    fuel: 'Petrole',
    startDate: '01/12/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 691: MINI (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI',
    brand: 19,
    motorisation: 'One',
    fuel: 'Petrole',
    startDate: '01/12/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 692: MINI COUNTRYMAN (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI COUNTRYMAN',
    brand: 19,
    motorisation: 'One',
    fuel: 'Petrole',
    startDate: '01/08/2010',
    endDate: '01/10/2016',
    publishedAt: new Date()
  }
});

// Model 693: MINI COUNTRYMAN (mini)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MINI COUNTRYMAN',
    brand: 19,
    motorisation: 'One D',
    fuel: 'Diesel',
    startDate: '01/08/2010',
    endDate: '01/10/2016',
    publishedAt: new Date()
  }
});

// Model 694: L 200 / TRITON (mitsubishi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'L 200 / TRITON',
    brand: 20,
    motorisation: '2 4WD',
    fuel: 'Diesel',
    startDate: '01/11/2005',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 695: L 200 / TRITON (mitsubishi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'L 200 / TRITON',
    brand: 20,
    motorisation: '4 4WD',
    fuel: 'Diesel',
    startDate: '01/11/2005',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 696: L 200 / TRITON (mitsubishi)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'L 200 / TRITON',
    brand: 20,
    motorisation: '5 4WD',
    fuel: 'Diesel',
    startDate: '01/11/2005',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 697: JUKE (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUKE',
    brand: 21,
    motorisation: '1.2 DIG-T',
    fuel: 'Petrole',
    startDate: '01/05/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 698: JUKE (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUKE',
    brand: 21,
    motorisation: '1 4x4',
    fuel: 'Petrole',
    startDate: '01/06/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 699: JUKE (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUKE',
    brand: 21,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 700: JUKE (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUKE',
    brand: 21,
    motorisation: '4 4x4',
    fuel: 'Petrole',
    startDate: '01/06/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 701: JUKE (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JUKE',
    brand: 21,
    motorisation: '6 4x4',
    fuel: 'Petrole',
    startDate: '01/06/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 702: MICRA II (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MICRA II',
    brand: 21,
    motorisation: '0 16V',
    fuel: 'Petrole',
    startDate: '01/08/1992',
    endDate: '01/02/2003',
    publishedAt: new Date()
  }
});

// Model 703: MICRA II (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MICRA II',
    brand: 21,
    motorisation: '1 16V',
    fuel: 'Petrole',
    startDate: '01/08/1992',
    endDate: '01/02/2003',
    publishedAt: new Date()
  }
});

// Model 704: MICRA II (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MICRA II',
    brand: 21,
    motorisation: '16 16V',
    fuel: 'Petrole',
    startDate: '01/08/1992',
    endDate: '01/02/2003',
    publishedAt: new Date()
  }
});

// Model 705: MICRA II (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MICRA II',
    brand: 21,
    motorisation: '3 16V',
    fuel: 'Petrole',
    startDate: '01/08/1992',
    endDate: '01/02/2003',
    publishedAt: new Date()
  }
});

// Model 706: MICRA II (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MICRA II',
    brand: 21,
    motorisation: '4 16V',
    fuel: 'Petrole',
    startDate: '01/08/1992',
    endDate: '01/02/2003',
    publishedAt: new Date()
  }
});

// Model 707: MICRA IV (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MICRA IV',
    brand: 21,
    motorisation: '2.1',
    fuel: 'Petrole',
    startDate: '01/05/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 708: MICRA V (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MICRA V',
    brand: 21,
    motorisation: '0.9 IG-T',
    fuel: 'Petrole',
    startDate: '01/12/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 709: NOTE (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NOTE',
    brand: 21,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/03/2006',
    endDate: '01/06/2012',
    publishedAt: new Date()
  }
});

// Model 710: NOTE (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NOTE',
    brand: 21,
    motorisation: 'NE11) 1.4',
    fuel: 'Petrole',
    startDate: '01/03/2006',
    endDate: '01/06/2012',
    publishedAt: new Date()
  }
});

// Model 711: NOTE (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NOTE',
    brand: 21,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 712: NP300 NAVARA (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'NP300 NAVARA',
    brand: 21,
    motorisation: '2.5 dCi 4WD',
    fuel: 'Diesel',
    startDate: '01/10/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 713: PATHFINDER III (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PATHFINDER III',
    brand: 21,
    motorisation: '2 4WD',
    fuel: 'Diesel',
    startDate: '01/01/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 714: PATHFINDER III (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PATHFINDER III',
    brand: 21,
    motorisation: '4 4WD',
    fuel: 'Diesel',
    startDate: '01/01/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 715: PATHFINDER III (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PATHFINDER III',
    brand: 21,
    motorisation: '5 4WD',
    fuel: 'Diesel',
    startDate: '01/01/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 716: PRIMERA Hatchback (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PRIMERA Hatchback',
    brand: 21,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/09/1996',
    endDate: '01/07/2002',
    publishedAt: new Date()
  }
});

// Model 717: QASHQAI / QASHQAI +2 I (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI / QASHQAI +2 I',
    brand: 21,
    motorisation: '0 Drive',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 718: QASHQAI / QASHQAI +2 I (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI / QASHQAI +2 I',
    brand: 21,
    motorisation: '1 Drive',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 719: QASHQAI / QASHQAI +2 I (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI / QASHQAI +2 I',
    brand: 21,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 720: QASHQAI / QASHQAI +2 I (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI / QASHQAI +2 I',
    brand: 21,
    motorisation: '2 Drive',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 721: QASHQAI / QASHQAI +2 I (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI / QASHQAI +2 I',
    brand: 21,
    motorisation: '6 Drive',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 722: QASHQAI II Closed Off- Road Vehicle (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI II Closed Off- Road Vehicle',
    brand: 21,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 723: QASHQAI II Closed Off- Road Vehicle (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI II Closed Off- Road Vehicle',
    brand: 21,
    motorisation: '1.6 dCi',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 724: QASHQAI II Closed Off- Road Vehicle (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI II Closed Off- Road Vehicle',
    brand: 21,
    motorisation: 'ALL MODE 4x4-i',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 725: QASHQAI II Closed Off-Road Vehicle (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI II Closed Off-Road Vehicle',
    brand: 21,
    motorisation: '1.2 DIG-T',
    fuel: 'Petrole',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 726: QASHQAI II Closed Off-Road Vehicle (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'QASHQAI II Closed Off-Road Vehicle',
    brand: 21,
    motorisation: '1.6 DIG-T',
    fuel: 'Petrole',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 727: TERRANO II (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TERRANO II',
    brand: 21,
    motorisation: '2.7 TD 4WD',
    fuel: 'Diesel',
    startDate: '01/02/1993',
    endDate: '01/09/2007',
    publishedAt: new Date()
  }
});

// Model 728: TERRANO II (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TERRANO II',
    brand: 21,
    motorisation: '3.0 Di 4WD',
    fuel: 'Diesel',
    startDate: '01/02/1993',
    endDate: '01/09/2007',
    publishedAt: new Date()
  }
});

// Model 729: X-TRAIL (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X-TRAIL',
    brand: 21,
    motorisation: '1.6 dCi ALL MODE 4x4-i',
    fuel: 'Diesel',
    startDate: '01/04/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 730: X-TRAIL (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X-TRAIL',
    brand: 21,
    motorisation: '2.0  1.6 dCi',
    fuel: 'Diesel',
    startDate: '01/04/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 731: X-TRAIL (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X-TRAIL',
    brand: 21,
    motorisation: '2.2 dCi 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2001',
    endDate: '01/12/2008',
    publishedAt: new Date()
  }
});

// Model 732: X-TRAIL (nissan)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'X-TRAIL',
    brand: 21,
    motorisation: '2.2 Di 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2001',
    endDate: '01/12/2008',
    publishedAt: new Date()
  }
});

// Model 733: AGILA (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'AGILA',
    brand: 22,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/04/2008',
    endDate: '01/06/2011',
    publishedAt: new Date()
  }
});

// Model 734: AGILA (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'AGILA',
    brand: 22,
    motorisation: '1.0 12V',
    fuel: 'Petrole',
    startDate: '01/09/2000',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 735: AGILA (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'AGILA',
    brand: 22,
    motorisation: '1.2 16V',
    fuel: 'Petrole',
    startDate: '01/09/2000',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 736: AGILA (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'AGILA',
    brand: 22,
    motorisation: '1.2 16V Twinport',
    fuel: 'Petrole',
    startDate: '01/09/2000',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 737: ASTRA G (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ASTRA G',
    brand: 22,
    motorisation: '1.7 CDTI',
    fuel: 'Diesel',
    startDate: '01/02/1998',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 738: ASTRA G (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ASTRA G',
    brand: 22,
    motorisation: '1.7 DTI 16V',
    fuel: 'Diesel',
    startDate: '01/02/1998',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 739: ASTRA G (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ASTRA G',
    brand: 22,
    motorisation: '1.7 TD  Hatchback(T98)',
    fuel: 'Diesel',
    startDate: '01/02/1998',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 740: ASTRA G Estate (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ASTRA G Estate',
    brand: 22,
    motorisation: '2.0 DI',
    fuel: 'Diesel',
    startDate: '01/02/1998',
    endDate: '01/07/2004',
    publishedAt: new Date()
  }
});

// Model 741: ASTRA G Estate (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ASTRA G Estate',
    brand: 22,
    motorisation: '2.0 DTI 16V',
    fuel: 'Diesel',
    startDate: '01/02/1998',
    endDate: '01/07/2004',
    publishedAt: new Date()
  }
});

// Model 742: ASTRA J (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ASTRA J',
    brand: 22,
    motorisation: '1.7 CDTI (68) (P10)',
    fuel: 'Diesel',
    startDate: '01/09/2009',
    endDate: '01/10/2015',
    publishedAt: new Date()
  }
});

// Model 743: COMBO Box Body /Estate (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'COMBO Box Body /Estate',
    brand: 22,
    motorisation: '1.3 CDTI 16V',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 744: COMBO Box Body /Estate (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'COMBO Box Body /Estate',
    brand: 22,
    motorisation: '1.7 CDTI 16V',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 745: COMBO Box Body /Estate (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'COMBO Box Body /Estate',
    brand: 22,
    motorisation: '1.7 DI 16V',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 746: CORSA B (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA B',
    brand: 22,
    motorisation: '1.0 i 12V',
    fuel: 'Petrole',
    startDate: '01/03/1993',
    endDate: '01/09/2000',
    publishedAt: new Date()
  }
});

// Model 747: CORSA B (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA B',
    brand: 22,
    motorisation: '1.2 i 16V',
    fuel: 'Petrole',
    startDate: '01/03/1993',
    endDate: '01/09/2000',
    publishedAt: new Date()
  }
});

// Model 748: CORSA B (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA B',
    brand: 22,
    motorisation: '1.4 Si',
    fuel: 'Petrole',
    startDate: '01/03/1993',
    endDate: '01/09/2000',
    publishedAt: new Date()
  }
});

// Model 749: CORSA B (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA B',
    brand: 22,
    motorisation: '1.5 D',
    fuel: 'Diesel',
    startDate: '01/03/1993',
    endDate: '01/09/2000',
    publishedAt: new Date()
  }
});

// Model 750: CORSA B (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA B',
    brand: 22,
    motorisation: '1.5TD',
    fuel: 'Diesel',
    startDate: '01/03/1993',
    endDate: '01/09/2000',
    publishedAt: new Date()
  }
});

// Model 751: CORSA B (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA B',
    brand: 22,
    motorisation: '1.7 D',
    fuel: 'Diesel',
    startDate: '01/03/1993',
    endDate: '01/09/2000',
    publishedAt: new Date()
  }
});

// Model 752: CORSA C (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA C',
    brand: 22,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/09/2000',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 753: CORSA C (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA C',
    brand: 22,
    motorisation: '1.2 Twinport',
    fuel: 'Petrole',
    startDate: '01/09/2000',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 754: CORSA C (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA C',
    brand: 22,
    motorisation: '1.3 CDTI',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 755: CORSA C (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA C',
    brand: 22,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/09/2000',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 756: CORSA C (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA C',
    brand: 22,
    motorisation: '1.7 CDTI',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 757: CORSA C (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA C',
    brand: 22,
    motorisation: '1.7 DI',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 758: CORSA C (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA C',
    brand: 22,
    motorisation: '1.7 DTI',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 759: CORSA D (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA D',
    brand: 22,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/07/2006',
    endDate: '01/08/2014',
    publishedAt: new Date()
  }
});

// Model 760: CORSA D (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA D',
    brand: 22,
    motorisation: '1.3 CDTI (L08',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '01/06/2011',
    publishedAt: new Date()
  }
});

// Model 761: CORSA D (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA D',
    brand: 22,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/07/2006',
    endDate: '01/08/2014',
    publishedAt: new Date()
  }
});

// Model 762: CORSA D (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA D',
    brand: 22,
    motorisation: 'L68)',
    fuel: 'Diesel',
    startDate: '01/07/2006',
    endDate: '01/06/2011',
    publishedAt: new Date()
  }
});

// Model 763: CORSA E (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA E',
    brand: 22,
    motorisation: '1 Turbo',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 764: CORSA E (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CORSA E',
    brand: 22,
    motorisation: '4 Turbo',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 765: CROSSLAND X (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CROSSLAND X',
    brand: 22,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/03/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 766: KARL (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KARL',
    brand: 22,
    motorisation: '1.0',
    fuel: 'Petrole',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 767: MERIVA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA A MPV',
    brand: 22,
    motorisation: '1.4 16V Twinport',
    fuel: 'Petrole',
    startDate: '01/05/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 768: MERIVA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA A MPV',
    brand: 22,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/05/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 769: MERIVA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA A MPV',
    brand: 22,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/05/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 770: MERIVA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA A MPV',
    brand: 22,
    motorisation: '1.8',
    fuel: 'Petrole',
    startDate: '01/05/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 771: MERIVA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA A MPV',
    brand: 22,
    motorisation: '1.3 CDTI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 772: MERIVA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA A MPV',
    brand: 22,
    motorisation: '1.7 CDTI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 773: MERIVA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA A MPV',
    brand: 22,
    motorisation: '1.7 DI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 774: MERIVA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA A MPV',
    brand: 22,
    motorisation: '1.7 DTI',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 775: MERIVA B MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA B MPV',
    brand: 22,
    motorisation: '1.6 CDTi',
    fuel: 'Diesel',
    startDate: '01/06/2010',
    endDate: '01/03/2017',
    publishedAt: new Date()
  }
});

// Model 776: MERIVA B MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MERIVA B MPV',
    brand: 22,
    motorisation: '1.7 CDTI',
    fuel: 'Diesel',
    startDate: '01/06/2010',
    endDate: '01/03/2017',
    publishedAt: new Date()
  }
});

// Model 777: MOKKA / MOKKA X (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MOKKA / MOKKA X',
    brand: 22,
    motorisation: '1 4x4',
    fuel: 'Diesel',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 778: MOKKA / MOKKA X (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MOKKA / MOKKA X',
    brand: 22,
    motorisation: '1.6 CDTI',
    fuel: 'Diesel',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 779: MOKKA / MOKKA X (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MOKKA / MOKKA X',
    brand: 22,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 780: MOKKA / MOKKA X (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MOKKA / MOKKA X',
    brand: 22,
    motorisation: '7 4x4',
    fuel: 'Diesel',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 781: MOKKA / MOKKA X (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MOKKA / MOKKA X',
    brand: 22,
    motorisation: '1 4x4',
    fuel: 'Petrole',
    startDate: '01/04/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 782: MOKKA / MOKKA X (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MOKKA / MOKKA X',
    brand: 22,
    motorisation: '4 4x4',
    fuel: 'Petrole',
    startDate: '01/04/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 783: VECTRA C GTS (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VECTRA C GTS',
    brand: 22,
    motorisation: '1.9 CDTI',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/01/2009',
    publishedAt: new Date()
  }
});

// Model 784: VECTRA C GTS (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VECTRA C GTS',
    brand: 22,
    motorisation: '2.2 DTI 16V',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/01/2009',
    publishedAt: new Date()
  }
});

// Model 785: ZAFIRA / ZAFIRA FAMILY B (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ZAFIRA / ZAFIRA FAMILY B',
    brand: 22,
    motorisation: '1.9 CDTI',
    fuel: 'Diesel',
    startDate: '01/07/2005',
    endDate: '01/04/2015',
    publishedAt: new Date()
  }
});

// Model 786: ZAFIRA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ZAFIRA A MPV',
    brand: 22,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/04/1999',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 787: ZAFIRA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ZAFIRA A MPV',
    brand: 22,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/04/1999',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 788: ZAFIRA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ZAFIRA A MPV',
    brand: 22,
    motorisation: '2.0 DI',
    fuel: 'Diesel',
    startDate: '01/07/1999',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 789: ZAFIRA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ZAFIRA A MPV',
    brand: 22,
    motorisation: '2.0 DI 16V',
    fuel: 'Diesel',
    startDate: '01/07/1999',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 790: ZAFIRA A MPV (opel)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ZAFIRA A MPV',
    brand: 22,
    motorisation: '2.0 DTI 16V',
    fuel: 'Diesel',
    startDate: '01/07/1999',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 791: 1007 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1007',
    brand: 23,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/04/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 792: 1007 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1007',
    brand: 23,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/04/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 793: 1007 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '1007',
    brand: 23,
    motorisation: '1.6 Hdi',
    fuel: 'Diesel',
    startDate: '01/04/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 794: 106 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '106 II',
    brand: 23,
    motorisation: '1.0 i',
    fuel: 'Petrole',
    startDate: '01/04/1996',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 795: 106 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '106 II',
    brand: 23,
    motorisation: '1.1i',
    fuel: 'Petrole',
    startDate: '01/04/1996',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 796: 106 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '106 II',
    brand: 23,
    motorisation: '1.4i',
    fuel: 'Petrole',
    startDate: '01/04/1996',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 797: 106 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '106 II',
    brand: 23,
    motorisation: '1.5 D',
    fuel: 'Diesel',
    startDate: '01/05/1996',
    endDate: '01/07/2004',
    publishedAt: new Date()
  }
});

// Model 798: 107 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '107',
    brand: 23,
    motorisation: '1.4 HDi',
    fuel: 'Diesel',
    startDate: '01/06/2005',
    endDate: '01/05/2014',
    publishedAt: new Date()
  }
});

// Model 799: 107 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '107',
    brand: 23,
    motorisation: 'PN_) 1.0',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '01/05/2014',
    publishedAt: new Date()
  }
});

// Model 800: 108 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '108',
    brand: 23,
    motorisation: '1.0 Vti',
    fuel: 'Petrole',
    startDate: '01/05/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 801: 108 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '108',
    brand: 23,
    motorisation: '1.0 VTi 72',
    fuel: 'Petrole',
    startDate: '01/05/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 802: 108 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '108',
    brand: 23,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/05/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 803: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '1 110',
    fuel: 'Petrole',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 804: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '1 130',
    fuel: 'Petrole',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 805: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '110 110',
    fuel: 'Petrole',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 806: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '130 130',
    fuel: 'Petrole',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 807: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '2 110',
    fuel: 'Petrole',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 808: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '2 130',
    fuel: 'Petrole',
    startDate: '01/01/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 809: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '1.2 Vti',
    fuel: 'Petrole',
    startDate: '01/03/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 810: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '1.6 Vti',
    fuel: 'Petrole',
    startDate: '01/03/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 811: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '1.6 BlueHDi 75',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 812: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '100',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 813: 2008 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '2008',
    brand: 23,
    motorisation: '120',
    fuel: 'Diesel',
    startDate: '01/07/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 814: 206 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 CC',
    brand: 23,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/09/2000',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 815: 206 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 CC',
    brand: 23,
    motorisation: '2.0 S16',
    fuel: 'Petrole',
    startDate: '01/09/2000',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 816: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '2.0 RC',
    fuel: 'Petrole',
    startDate: '01/04/1999',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 817: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '2.0 S16',
    fuel: 'Petrole',
    startDate: '01/04/1999',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 818: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '1.1 i',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '01/02/2007',
    publishedAt: new Date()
  }
});

// Model 819: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '01/02/2007',
    publishedAt: new Date()
  }
});

// Model 820: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '1.4 HDi eco 70',
    fuel: 'Diesel',
    startDate: '01/09/1998',
    endDate: '01/09/2009',
    publishedAt: new Date()
  }
});

// Model 821: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '1.4 i',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '01/02/2007',
    publishedAt: new Date()
  }
});

// Model 822: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/09/1998',
    endDate: '01/09/2009',
    publishedAt: new Date()
  }
});

// Model 823: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '1.6i',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '01/02/2007',
    publishedAt: new Date()
  }
});

// Model 824: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/09/1998',
    endDate: '01/09/2009',
    publishedAt: new Date()
  }
});

// Model 825: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '16 16V',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '01/02/2007',
    publishedAt: new Date()
  }
});

// Model 826: 206 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Hatchback',
    brand: 23,
    motorisation: '2.0 HDI 90',
    fuel: 'Diesel',
    startDate: '01/09/1998',
    endDate: '01/09/2009',
    publishedAt: new Date()
  }
});

// Model 827: 206 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 SW',
    brand: 23,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 828: 206 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 SW',
    brand: 23,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 829: 206 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 SW',
    brand: 23,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 830: 206 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 SW',
    brand: 23,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 831: 206 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 SW',
    brand: 23,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/07/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 832: 206 Van (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Van',
    brand: 23,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/04/1999',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 833: 206 Van (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206 Van',
    brand: 23,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/04/1999',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 834: 206+ (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206+',
    brand: 23,
    motorisation: '1.4 HDi eco 70',
    fuel: 'Diesel',
    startDate: '01/01/2009',
    endDate: '01/06/2013',
    publishedAt: new Date()
  }
});

// Model 835: 206+ (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '206+',
    brand: 23,
    motorisation: '2M_) 1.1',
    fuel: 'Petrole',
    startDate: '01/01/2009',
    endDate: '01/06/2013',
    publishedAt: new Date()
  }
});

// Model 836: 207 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207',
    brand: 23,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/02/2006',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 837: 207 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207',
    brand: 23,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/02/2006',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 838: 207 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207',
    brand: 23,
    motorisation: '1.6 16V Turbo',
    fuel: 'Petrole',
    startDate: '01/02/2006',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 839: 207 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207',
    brand: 23,
    motorisation: '1.6 Hdi',
    fuel: 'Diesel',
    startDate: '01/02/2006',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 840: 207 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207',
    brand: 23,
    motorisation: '1.6 Hdi 110',
    fuel: 'Diesel',
    startDate: '01/02/2006',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 841: 207 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207',
    brand: 23,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/02/2007',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 842: 207 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207',
    brand: 23,
    motorisation: '1.6 16V Vti',
    fuel: 'Petrole',
    startDate: '01/02/2007',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 843: 207 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 CC',
    brand: 23,
    motorisation: '1 Turbo',
    fuel: 'Petrole',
    startDate: '01/02/2007',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 844: 207 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 CC',
    brand: 23,
    motorisation: '1.6 HDi',
    fuel: 'Diesel',
    startDate: '01/02/2007',
    endDate: '01/01/2015',
    publishedAt: new Date()
  }
});

// Model 845: 207 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 CC',
    brand: 23,
    motorisation: '16 Turbo',
    fuel: 'Petrole',
    startDate: '01/02/2007',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 846: 207 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 CC',
    brand: 23,
    motorisation: '6 Turbo',
    fuel: 'Petrole',
    startDate: '01/02/2007',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 847: 207 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 SW',
    brand: 23,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/06/2007',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 848: 207 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 SW',
    brand: 23,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/06/2007',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 849: 207 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 SW',
    brand: 23,
    motorisation: '1.6 HDi',
    fuel: 'Diesel',
    startDate: '01/08/2009',
    endDate: '01/10/2013',
    publishedAt: new Date()
  }
});

// Model 850: 207 Van (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 Van',
    brand: 23,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/04/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 851: 207 Van (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '207 Van',
    brand: 23,
    motorisation: '1.6 Hdi',
    fuel: 'Diesel',
    startDate: '01/04/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 852: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '1.2 THP 110',
    fuel: 'Petrole',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 853: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '1.6 Gti',
    fuel: 'Petrole',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 854: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '1 120',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 855: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 856: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 857: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 858: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '100 120',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 859: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '120 120',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 860: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '6 120',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 861: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: '75 120',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 862: 208 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '208 I',
    brand: 23,
    motorisation: 'CC_) 1.0',
    fuel: 'Petrole',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 863: 3008 MPV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 MPV',
    brand: 23,
    motorisation: '2.0 HDi Hybrid4 Diesel',
    fuel: 'Electro',
    startDate: '01/02/2011',
    endDate: '01/08/2016',
    publishedAt: new Date()
  }
});

// Model 864: 3008 MPV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 MPV',
    brand: 23,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/05/2014',
    endDate: '01/08/2016',
    publishedAt: new Date()
  }
});

// Model 865: 3008 MPV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 MPV',
    brand: 23,
    motorisation: '1.6 HDI',
    fuel: 'Diesel',
    startDate: '01/05/2014',
    endDate: '01/08/2016',
    publishedAt: new Date()
  }
});

// Model 866: 3008 MPV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 MPV',
    brand: 23,
    motorisation: '0 150',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '01/08/2016',
    publishedAt: new Date()
  }
});

// Model 867: 3008 MPV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 MPV',
    brand: 23,
    motorisation: '150 150',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '01/08/2016',
    publishedAt: new Date()
  }
});

// Model 868: 3008 MPV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 MPV',
    brand: 23,
    motorisation: '2 150',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '01/08/2016',
    publishedAt: new Date()
  }
});

// Model 869: 3008 MPV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 MPV',
    brand: 23,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '01/08/2016',
    publishedAt: new Date()
  }
});

// Model 870: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '0 180',
    fuel: 'Diesel',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 871: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '1 130',
    fuel: 'Petrole',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 872: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '1.5 BlueHDi 130',
    fuel: 'Diesel',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 873: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 874: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '1.6 THP 165',
    fuel: 'Petrole',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 875: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '120 180',
    fuel: 'Diesel',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 876: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '130 130',
    fuel: 'Petrole',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 877: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '150 180',
    fuel: 'Diesel',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 878: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '180 180',
    fuel: 'Diesel',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 879: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '2 130',
    fuel: 'Petrole',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 880: 3008 SUV (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '3008 SUV',
    brand: 23,
    motorisation: '2 180',
    fuel: 'Diesel',
    startDate: '01/05/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 881: 306 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '306 Hatchback',
    brand: 23,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/05/1993',
    endDate: '01/12/2002',
    publishedAt: new Date()
  }
});

// Model 882: 306 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '306 Hatchback',
    brand: 23,
    motorisation: '1.9 DT',
    fuel: 'Diesel',
    startDate: '01/05/1993',
    endDate: '01/12/2002',
    publishedAt: new Date()
  }
});

// Model 883: 306 Hatchback (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '306 Hatchback',
    brand: 23,
    motorisation: '2.0 HDI 90',
    fuel: 'Diesel',
    startDate: '01/05/1993',
    endDate: '01/12/2002',
    publishedAt: new Date()
  }
});

// Model 884: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/08/2000',
    endDate: '01/11/2007',
    publishedAt: new Date()
  }
});

// Model 885: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '2.0 16V',
    fuel: 'Petrole',
    startDate: '01/08/2000',
    endDate: '01/11/2007',
    publishedAt: new Date()
  }
});

// Model 886: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '0 135',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 887: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 888: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '1.6 Hdi',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 889: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 890: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '135 135',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 891: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '2 135',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 892: 307 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307',
    brand: 23,
    motorisation: '90 135',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 893: 307 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 Break',
    brand: 23,
    motorisation: '0 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 894: 307 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 Break',
    brand: 23,
    motorisation: '1 110',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 895: 307 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 Break',
    brand: 23,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 896: 307 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 Break',
    brand: 23,
    motorisation: '110 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 897: 307 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 Break',
    brand: 23,
    motorisation: '135 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 898: 307 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 Break',
    brand: 23,
    motorisation: '2 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 899: 307 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 Break',
    brand: 23,
    motorisation: '6 110',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 900: 307 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 Break',
    brand: 23,
    motorisation: '90 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 901: 307 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 CC',
    brand: 23,
    motorisation: '2.0 HDi 135',
    fuel: 'Diesel',
    startDate: '01/06/2005',
    endDate: '01/04/2009',
    publishedAt: new Date()
  }
});

// Model 902: 307 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 CC',
    brand: 23,
    motorisation: '2.0 16V',
    fuel: 'Petrol',
    startDate: '01/10/2003',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 903: 307 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 SW',
    brand: 23,
    motorisation: '0 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 904: 307 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 SW',
    brand: 23,
    motorisation: '1.6 HDi 90',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 905: 307 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 SW',
    brand: 23,
    motorisation: '110',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 906: 307 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 SW',
    brand: 23,
    motorisation: '110 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 907: 307 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 SW',
    brand: 23,
    motorisation: '135 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 908: 307 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 SW',
    brand: 23,
    motorisation: '2 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 909: 307 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '307 SW',
    brand: 23,
    motorisation: '90 135',
    fuel: 'Diesel',
    startDate: '01/03/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 910: 308 CC (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 CC',
    brand: 23,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 911: 308 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 I',
    brand: 23,
    motorisation: '1.6 Hdi',
    fuel: 'Diesel',
    startDate: '01/09/2007',
    endDate: '01/10/2014',
    publishedAt: new Date()
  }
});

// Model 912: 308 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 I',
    brand: 23,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/09/2007',
    endDate: '01/10/2014',
    publishedAt: new Date()
  }
});

// Model 913: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '1.5 BlueHDi 130',
    fuel: 'Diesel',
    startDate: '01/06/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 914: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '1 115',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 915: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '1 130',
    fuel: 'Petrole',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 916: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 917: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '1.6 GT 205',
    fuel: 'Petrole',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 918: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '1.6 Gti',
    fuel: 'Petrole',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 919: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '100 115',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 920: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '110 130',
    fuel: 'Petrole',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 921: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 922: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '130 130',
    fuel: 'Petrole',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 923: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '2 130',
    fuel: 'Petrole',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 924: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '2.0 BlueHDi 150',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 925: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '2.0 GT BlueHDi 180',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 926: 308 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 II',
    brand: 23,
    motorisation: '6 115',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 927: 308 SW I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW I',
    brand: 23,
    motorisation: '1.6 HDi',
    fuel: 'Diesel',
    startDate: '01/11/2009',
    endDate: '01/10/2014',
    publishedAt: new Date()
  }
});

// Model 928: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '0 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 929: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '1 115',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 930: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '1 130',
    fuel: 'Petrole',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 931: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '100 115',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 932: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '110 130',
    fuel: 'Petrole',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 933: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 934: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '120 115',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 935: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '130 130',
    fuel: 'Petrole',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 936: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '180 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 937: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '2 130',
    fuel: 'Petrole',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 938: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '2 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 939: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '2.0 BlueHDi 150',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 940: 308 SW II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '308 SW II',
    brand: 23,
    motorisation: '6 115',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 941: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '0 110',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/05/2004',
    publishedAt: new Date()
  }
});

// Model 942: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/05/2004',
    publishedAt: new Date()
  }
});

// Model 943: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/05/2004',
    publishedAt: new Date()
  }
});

// Model 944: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '2 110',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/05/2004',
    publishedAt: new Date()
  }
});

// Model 945: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '2.1 TD 12V',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/05/2004',
    publishedAt: new Date()
  }
});

// Model 946: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '2.2 Hdi',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/05/2004',
    publishedAt: new Date()
  }
});

// Model 947: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '90 110',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/05/2004',
    publishedAt: new Date()
  }
});

// Model 948: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/11/1995',
    endDate: '01/06/2004',
    publishedAt: new Date()
  }
});

// Model 949: 406 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406',
    brand: 23,
    motorisation: '2.0 16V',
    fuel: 'Petrole',
    startDate: '01/11/1995',
    endDate: '01/06/2004',
    publishedAt: new Date()
  }
});

// Model 950: 406 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406 Break',
    brand: 23,
    motorisation: '0 110',
    fuel: 'Diesel',
    startDate: '01/10/1996',
    endDate: '01/10/2004',
    publishedAt: new Date()
  }
});

// Model 951: 406 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406 Break',
    brand: 23,
    motorisation: '1.9 TD',
    fuel: 'Diesel',
    startDate: '01/10/1996',
    endDate: '01/10/2004',
    publishedAt: new Date()
  }
});

// Model 952: 406 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406 Break',
    brand: 23,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/10/1996',
    endDate: '01/10/2004',
    publishedAt: new Date()
  }
});

// Model 953: 406 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406 Break',
    brand: 23,
    motorisation: '2 110',
    fuel: 'Diesel',
    startDate: '01/10/1996',
    endDate: '01/10/2004',
    publishedAt: new Date()
  }
});

// Model 954: 406 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406 Break',
    brand: 23,
    motorisation: '2.2 Hdi',
    fuel: 'Diesel',
    startDate: '01/10/1996',
    endDate: '01/10/2004',
    publishedAt: new Date()
  }
});

// Model 955: 406 Break (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '406 Break',
    brand: 23,
    motorisation: '90 110',
    fuel: 'Diesel',
    startDate: '01/10/1996',
    endDate: '01/10/2004',
    publishedAt: new Date()
  }
});

// Model 956: 407 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407',
    brand: 23,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/03/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 957: 407 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407',
    brand: 23,
    motorisation: '2.0',
    fuel: 'Petrole',
    startDate: '01/03/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 958: 407 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407',
    brand: 23,
    motorisation: '2.0 16V',
    fuel: 'Petrole',
    startDate: '01/03/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 959: 407 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407',
    brand: 23,
    motorisation: '2.2',
    fuel: 'Petrole',
    startDate: '01/03/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 960: 407 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407',
    brand: 23,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/05/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 961: 407 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407',
    brand: 23,
    motorisation: '2.0 HDi 135',
    fuel: 'Diesel',
    startDate: '01/05/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 962: 407 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407',
    brand: 23,
    motorisation: '2.2 Hdi 170',
    fuel: 'Diesel',
    startDate: '01/05/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 963: 407 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407',
    brand: 23,
    motorisation: '2.7 Hdi',
    fuel: 'Diesel',
    startDate: '01/05/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 964: 407 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407 SW',
    brand: 23,
    motorisation: '1.6 HDi 110',
    fuel: 'Diesel',
    startDate: '01/05/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 965: 407 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407 SW',
    brand: 23,
    motorisation: '0 170',
    fuel: 'Diesel',
    startDate: '01/07/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 966: 407 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407 SW',
    brand: 23,
    motorisation: '135 170',
    fuel: 'Diesel',
    startDate: '01/07/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 967: 407 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407 SW',
    brand: 23,
    motorisation: '170 170',
    fuel: 'Diesel',
    startDate: '01/07/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 968: 407 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407 SW',
    brand: 23,
    motorisation: '2 170',
    fuel: 'Diesel',
    startDate: '01/07/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 969: 407 SW (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '407 SW',
    brand: 23,
    motorisation: '2.7 Hdi',
    fuel: 'Diesel',
    startDate: '01/07/2004',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 970: 5008 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '5008 II',
    brand: 23,
    motorisation: '1.5 BlueHDi 130',
    fuel: 'Diesel',
    startDate: '01/12/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 971: 5008 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '5008 II',
    brand: 23,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/12/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 972: 5008 II (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '5008 II',
    brand: 23,
    motorisation: '2.0 BlueHDi 180',
    fuel: 'Diesel',
    startDate: '01/12/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 973: 508 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 I',
    brand: 23,
    motorisation: '0 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 974: 508 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 I',
    brand: 23,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 975: 508 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 I',
    brand: 23,
    motorisation: '150 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 976: 508 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 I',
    brand: 23,
    motorisation: '180 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 977: 508 I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 I',
    brand: 23,
    motorisation: '2 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 978: 508 SW I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 SW I',
    brand: 23,
    motorisation: '0 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 979: 508 SW I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 SW I',
    brand: 23,
    motorisation: '1.6 BlueHDi 120',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 980: 508 SW I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 SW I',
    brand: 23,
    motorisation: '150 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 981: 508 SW I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 SW I',
    brand: 23,
    motorisation: '180 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 982: 508 SW I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 SW I',
    brand: 23,
    motorisation: '2 180',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 983: 508 SW I (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '508 SW I',
    brand: 23,
    motorisation: '2.0 HDi 180 RXH',
    fuel: 'Diesel',
    startDate: '01/03/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 984: 607 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '607',
    brand: 23,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/02/2000',
    endDate: '01/07/2011',
    publishedAt: new Date()
  }
});

// Model 985: 607 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '607',
    brand: 23,
    motorisation: '2.2 Hdi',
    fuel: 'Diesel',
    startDate: '01/02/2000',
    endDate: '01/07/2011',
    publishedAt: new Date()
  }
});

// Model 986: 807 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '807',
    brand: 23,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/06/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 987: 807 (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: '807',
    brand: 23,
    motorisation: '2.2 HDi',
    fuel: 'Diesel',
    startDate: '01/06/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 988: BIPPER (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BIPPER',
    brand: 23,
    motorisation: '1.3 HDi 75',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 989: BIPPER (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BIPPER',
    brand: 23,
    motorisation: '1.4 Hdi',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 990: BIPPER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BIPPER Tepee',
    brand: 23,
    motorisation: '1 80',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 991: BIPPER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BIPPER Tepee',
    brand: 23,
    motorisation: '1.4 Ddi',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 992: BIPPER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BIPPER Tepee',
    brand: 23,
    motorisation: '3 80',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 993: BIPPER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BIPPER Tepee',
    brand: 23,
    motorisation: '75 80',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 994: BIPPER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BIPPER Tepee',
    brand: 23,
    motorisation: '80 80',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 995: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 996: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '1.9 DT',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 997: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '1.9 DT 4x4',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 998: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '2 4x4',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 999: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 1000: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '5 4x4',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 1001: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '8 4x4',
    fuel: 'Diesel',
    startDate: '01/03/1994',
    endDate: '01/04/2002',
    publishedAt: new Date()
  }
});

// Model 1002: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '100 120',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1003: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '120 120',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1004: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '2 120',
    fuel: 'Diesel',
    startDate: '01/04/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1005: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '0 160',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1006: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '110 160',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1007: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '130 160',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1008: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '160 160',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1009: BOXER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'BOXER Box',
    brand: 23,
    motorisation: '2 160',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1010: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '0 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1011: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '1 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1012: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '120 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1013: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '130 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1014: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '140 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1015: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '16 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1016: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '165 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1017: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '2 165',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1018: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '6 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1019: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '8 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1020: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '90 16V',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1021: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '1 70',
    fuel: 'Diesel',
    startDate: '01/02/1996',
    endDate: '01/12/2006',
    publishedAt: new Date()
  }
});

// Model 1022: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '70 70',
    fuel: 'Diesel',
    startDate: '01/02/1996',
    endDate: '01/12/2006',
    publishedAt: new Date()
  }
});

// Model 1023: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '9 70',
    fuel: 'Diesel',
    startDate: '01/02/1996',
    endDate: '01/12/2006',
    publishedAt: new Date()
  }
});

// Model 1024: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '0 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1025: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '1 115',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1026: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1027: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '120 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1028: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '150 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1029: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '180 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1030: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '2 180',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1031: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '6 115',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1032: EXPERT Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Box',
    brand: 23,
    motorisation: '95 115',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1033: EXPERT Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Tepee',
    brand: 23,
    motorisation: '0 165',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1034: EXPERT Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Tepee',
    brand: 23,
    motorisation: '100 165',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1035: EXPERT Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Tepee',
    brand: 23,
    motorisation: '120 165',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1036: EXPERT Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Tepee',
    brand: 23,
    motorisation: '130 165',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1037: EXPERT Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Tepee',
    brand: 23,
    motorisation: '140 165',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1038: EXPERT Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Tepee',
    brand: 23,
    motorisation: '165 165',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1039: EXPERT Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EXPERT Tepee',
    brand: 23,
    motorisation: '2 165',
    fuel: 'Diesel',
    startDate: '01/03/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1040: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '1 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1041: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '100 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1042: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '120 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1043: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '6 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1044: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '75 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1045: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '1 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1046: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '16 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1047: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1048: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '6 4x4',
    fuel: 'Diesel',
    startDate: '01/04/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1049: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '1 90',
    fuel: 'Diesel',
    startDate: '01/05/1996',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1050: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/05/1996',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1051: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/05/1996',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1052: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '6 90',
    fuel: 'Diesel',
    startDate: '01/05/1996',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1053: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '75 90',
    fuel: 'Diesel',
    startDate: '01/05/1996',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1054: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '90 90',
    fuel: 'Diesel',
    startDate: '01/05/1996',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1055: PARTNER Box (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Box',
    brand: 23,
    motorisation: '1.6 BlueHDi 100',
    fuel: 'Diesel',
    startDate: '01/09/2018',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1056: PARTNER Combispace (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Combispace',
    brand: 23,
    motorisation: '1 90',
    fuel: 'Diesel',
    startDate: '01/12/1998',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1057: PARTNER Combispace (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Combispace',
    brand: 23,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/12/1998',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1058: PARTNER Combispace (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Combispace',
    brand: 23,
    motorisation: '2.0 HDI',
    fuel: 'Diesel',
    startDate: '01/12/1998',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1059: PARTNER Combispace (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Combispace',
    brand: 23,
    motorisation: '6 90',
    fuel: 'Diesel',
    startDate: '01/12/1998',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1060: PARTNER Combispace (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Combispace',
    brand: 23,
    motorisation: '75 90',
    fuel: 'Diesel',
    startDate: '01/12/1998',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1061: PARTNER Combispace (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Combispace',
    brand: 23,
    motorisation: '90 90',
    fuel: 'Diesel',
    startDate: '01/12/1998',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1062: PARTNER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Tepee',
    brand: 23,
    motorisation: '1 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1063: PARTNER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Tepee',
    brand: 23,
    motorisation: '100 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1064: PARTNER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Tepee',
    brand: 23,
    motorisation: '120 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1065: PARTNER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Tepee',
    brand: 23,
    motorisation: '16 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1066: PARTNER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Tepee',
    brand: 23,
    motorisation: '6 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1067: PARTNER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Tepee',
    brand: 23,
    motorisation: '75 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1068: PARTNER Tepee (peugeot)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PARTNER Tepee',
    brand: 23,
    motorisation: '90 120',
    fuel: 'Diesel',
    startDate: '01/04/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1069: CAPTUR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CAPTUR',
    brand: 24,
    motorisation: '1.2 TCe 120',
    fuel: 'Petrole',
    startDate: '01/01/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1070: CAPTUR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CAPTUR',
    brand: 24,
    motorisation: '0.9 TCe 90',
    fuel: 'Petrole',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1071: CAPTUR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CAPTUR',
    brand: 24,
    motorisation: '1 110',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1072: CAPTUR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CAPTUR',
    brand: 24,
    motorisation: '1.2 TCe 120',
    fuel: 'Petrole',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1073: CAPTUR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CAPTUR',
    brand: 24,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1074: CAPTUR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CAPTUR',
    brand: 24,
    motorisation: '5 110',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1075: CAPTUR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CAPTUR',
    brand: 24,
    motorisation: '90 110',
    fuel: 'Diesel',
    startDate: '01/06/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1076: CLIO Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO Grandtour',
    brand: 24,
    motorisation: 'KR0G)',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1077: CLIO Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO Grandtour',
    brand: 24,
    motorisation: 'KR1C',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1078: CLIO Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO Grandtour',
    brand: 24,
    motorisation: 'KR1N)',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1079: CLIO Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO Grandtour',
    brand: 24,
    motorisation: 'KR1S',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1080: CLIO I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO I',
    brand: 24,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/01/1991',
    endDate: '01/09/1998',
    publishedAt: new Date()
  }
});

// Model 1081: CLIO I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO I',
    brand: 24,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/05/1990',
    endDate: '01/09/1998',
    publishedAt: new Date()
  }
});

// Model 1082: CLIO I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO I',
    brand: 24,
    motorisation: '1.7',
    fuel: 'Petrole',
    startDate: '01/05/1990',
    endDate: '01/09/1998',
    publishedAt: new Date()
  }
});

// Model 1083: CLIO I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO I',
    brand: 24,
    motorisation: '357_) 1.2',
    fuel: 'Petrole',
    startDate: '01/05/1990',
    endDate: '01/09/1998',
    publishedAt: new Date()
  }
});

// Model 1084: CLIO I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO I',
    brand: 24,
    motorisation: '5',
    fuel: 'Petrole',
    startDate: '01/05/1990',
    endDate: '01/09/1998',
    publishedAt: new Date()
  }
});

// Model 1085: CLIO I Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO I Box',
    brand: 24,
    motorisation: '1 RND',
    fuel: 'Diesel',
    startDate: '01/01/1991',
    endDate: '01/09/1998',
    publishedAt: new Date()
  }
});

// Model 1086: CLIO I Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO I Box',
    brand: 24,
    motorisation: '9 RND',
    fuel: 'Diesel',
    startDate: '01/01/1991',
    endDate: '01/09/1998',
    publishedAt: new Date()
  }
});

// Model 1087: CLIO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1088: CLIO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II',
    brand: 24,
    motorisation: '1 16V',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1089: CLIO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II',
    brand: 24,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1090: CLIO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II',
    brand: 24,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/09/1998',
    endDate: '01/05/2005',
    publishedAt: new Date()
  }
});

// Model 1091: CLIO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II',
    brand: 24,
    motorisation: '1.9 dTi',
    fuel: 'Diesel',
    startDate: '01/09/1998',
    endDate: '01/05/2005',
    publishedAt: new Date()
  }
});

// Model 1092: CLIO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II',
    brand: 24,
    motorisation: '16 16V',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1093: CLIO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II',
    brand: 24,
    motorisation: '2 16V',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1094: CLIO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II',
    brand: 24,
    motorisation: '6 16V',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1095: CLIO II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II Box',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1096: CLIO II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II Box',
    brand: 24,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/09/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1097: CLIO II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II Box',
    brand: 24,
    motorisation: 'Dti',
    fuel: 'Diesel',
    startDate: '01/09/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1098: CLIO II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II Box',
    brand: 24,
    motorisation: 'SB0F',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '01/10/2003',
    publishedAt: new Date()
  }
});

// Model 1099: CLIO II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO II Box',
    brand: 24,
    motorisation: 'SB10)',
    fuel: 'Petrole',
    startDate: '01/09/1998',
    endDate: '01/10/2003',
    publishedAt: new Date()
  }
});

// Model 1100: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/05/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1101: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: '1.2 16V (BR02',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1102: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'BR0J',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1103: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'BR0P',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1104: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'BR0R',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1105: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'BR11',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1106: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'BR1D',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1107: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'BR1L',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1108: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'CR02',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1109: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'CR0J',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1110: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'CR0P',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1111: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'CR0R )',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1112: CLIO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III',
    brand: 24,
    motorisation: 'CR11',
    fuel: 'Petrole',
    startDate: '01/06/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1113: CLIO III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO III Box',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/08/2010',
    endDate: '01/12/2014',
    publishedAt: new Date()
  }
});

// Model 1114: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '1.2 TCe 120 (BHAU)',
    fuel: 'Petrole',
    startDate: '01/01/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1115: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '0.9 TCe 90',
    fuel: 'Petrole',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1116: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '1 90',
    fuel: 'Diesel',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1117: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '1.2 16V',
    fuel: 'Petrole',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1118: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '1.2 TCe 120',
    fuel: 'Petrole',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1119: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '1.6 RS',
    fuel: 'Petrole',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1120: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '5 90',
    fuel: 'Diesel',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1121: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '75 90',
    fuel: 'Diesel',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1122: CLIO IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV',
    brand: 24,
    motorisation: '90 90',
    fuel: 'Diesel',
    startDate: '01/11/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1123: CLIO IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV Grandtour',
    brand: 24,
    motorisation: '0.9 TCe 90',
    fuel: 'Petrole',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1124: CLIO IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV Grandtour',
    brand: 24,
    motorisation: '1 90',
    fuel: 'Diesel',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1125: CLIO IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV Grandtour',
    brand: 24,
    motorisation: '1.2 Tce 120 (KHM0)',
    fuel: 'Petrole',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1126: CLIO IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV Grandtour',
    brand: 24,
    motorisation: '5 90',
    fuel: 'Diesel',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1127: CLIO IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV Grandtour',
    brand: 24,
    motorisation: '75 90',
    fuel: 'Diesel',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1128: CLIO IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CLIO IV Grandtour',
    brand: 24,
    motorisation: '90 90',
    fuel: 'Diesel',
    startDate: '01/01/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1129: ESPACE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE II',
    brand: 24,
    motorisation: '2.1 TD',
    fuel: 'Diesel',
    startDate: '01/01/1991',
    endDate: '01/10/1996',
    publishedAt: new Date()
  }
});

// Model 1130: ESPACE III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE III',
    brand: 24,
    motorisation: '1.9 dTi',
    fuel: 'Diesel',
    startDate: '01/11/1996',
    endDate: '01/10/2002',
    publishedAt: new Date()
  }
});

// Model 1131: ESPACE III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE III',
    brand: 24,
    motorisation: '12 dCi',
    fuel: 'Diesel',
    startDate: '01/11/1996',
    endDate: '01/10/2002',
    publishedAt: new Date()
  }
});

// Model 1132: ESPACE III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE III',
    brand: 24,
    motorisation: '2 dCi',
    fuel: 'Diesel',
    startDate: '01/11/1996',
    endDate: '01/10/2002',
    publishedAt: new Date()
  }
});

// Model 1133: ESPACE IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE IV',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/11/2002',
    endDate: '01/02/2005',
    publishedAt: new Date()
  }
});

// Model 1134: ESPACE IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE IV',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/11/2002',
    endDate: '01/02/2005',
    publishedAt: new Date()
  }
});

// Model 1135: ESPACE IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE IV',
    brand: 24,
    motorisation: '2.2 dCi',
    fuel: 'Diesel',
    startDate: '01/11/2002',
    endDate: '01/02/2005',
    publishedAt: new Date()
  }
});

// Model 1136: ESPACE IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE IV',
    brand: 24,
    motorisation: '3.0 dCi',
    fuel: 'Diesel',
    startDate: '01/11/2002',
    endDate: '01/02/2005',
    publishedAt: new Date()
  }
});

// Model 1137: ESPACE V (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE V',
    brand: 24,
    motorisation: '1 160',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1138: ESPACE V (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE V',
    brand: 24,
    motorisation: '130 160',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1139: ESPACE V (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE V',
    brand: 24,
    motorisation: '160 160',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1140: ESPACE V (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ESPACE V',
    brand: 24,
    motorisation: '6 160',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1141: GRAND SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC II',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 1142: GRAND SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC II',
    brand: 24,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/04/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1143: GRAND SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC II',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 1144: GRAND SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC II',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 1145: GRAND SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC II',
    brand: 24,
    motorisation: '1.5 dCi (JM1E)',
    fuel: 'Diesel',
    startDate: '01/05/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1146: GRAND SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC III',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1147: GRAND SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC III',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1148: GRAND SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC III',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1149: GRAND SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC III',
    brand: 24,
    motorisation: '1.6 dCi (JZ00',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1150: GRAND SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC III',
    brand: 24,
    motorisation: 'JZ12)',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1151: GRAND SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC IV',
    brand: 24,
    motorisation: '1 160',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1152: GRAND SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC IV',
    brand: 24,
    motorisation: '130 160',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1153: GRAND SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC IV',
    brand: 24,
    motorisation: '160 160',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1154: GRAND SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND SCÉNIC IV',
    brand: 24,
    motorisation: '6 160',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1155: KADJAR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KADJAR',
    brand: 24,
    motorisation: '1.2 TCe 130',
    fuel: 'Petrole',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1156: KADJAR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KADJAR',
    brand: 24,
    motorisation: '1.5 dCi 110',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1157: KADJAR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KADJAR',
    brand: 24,
    motorisation: '1.6 dCi 130',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1158: KADJAR (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KADJAR',
    brand: 24,
    motorisation: '4x4',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1159: KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO',
    brand: 24,
    motorisation: '1.9 dCi 4x4',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1160: KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO',
    brand: 24,
    motorisation: '1.9 dTi',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1161: KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO',
    brand: 24,
    motorisation: 'D 55 1.9',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1162: KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO',
    brand: 24,
    motorisation: 'D 65 1.9',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1163: KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/09/1999',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1164: KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO',
    brand: 24,
    motorisation: '1.9 RXED',
    fuel: 'Diesel',
    startDate: '01/09/1999',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1165: KANGOO / GRAND KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO / GRAND KANGOO',
    brand: 24,
    motorisation: '1.5 dCi (KW0A',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1166: KANGOO / GRAND KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO / GRAND KANGOO',
    brand: 24,
    motorisation: '1.5 dCi (KW0B)',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1167: KANGOO / GRAND KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO / GRAND KANGOO',
    brand: 24,
    motorisation: 'KW0F)',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1168: KANGOO / GRAND KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO / GRAND KANGOO',
    brand: 24,
    motorisation: '1 110',
    fuel: 'Diesel',
    startDate: '01/06/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1169: KANGOO / GRAND KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO / GRAND KANGOO',
    brand: 24,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/06/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1170: KANGOO / GRAND KANGOO (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO / GRAND KANGOO',
    brand: 24,
    motorisation: '5 110',
    fuel: 'Diesel',
    startDate: '01/06/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1171: KANGOO BE BOP (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO BE BOP',
    brand: 24,
    motorisation: '1 75',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1172: KANGOO BE BOP (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO BE BOP',
    brand: 24,
    motorisation: '5 75',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1173: KANGOO BE BOP (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO BE BOP',
    brand: 24,
    motorisation: '75 75',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1174: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '1 110',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1175: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1176: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '5 110',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1177: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '75 110',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1178: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '85 110',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1179: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '90 110',
    fuel: 'Diesel',
    startDate: '01/02/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1180: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '1.2 16V',
    fuel: 'Petrole',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1181: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1182: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1183: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1184: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: 'D 55 1.9',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1185: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: 'D 65 1.9',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1186: KANGOO Express (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KANGOO Express',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/12/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1187: KOLEOS I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KOLEOS I',
    brand: 24,
    motorisation: '0 4x4',
    fuel: 'Diesel',
    startDate: '01/09/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1188: KOLEOS I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KOLEOS I',
    brand: 24,
    motorisation: '2 4x4',
    fuel: 'Diesel',
    startDate: '01/09/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1189: KOLEOS I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'KOLEOS I',
    brand: 24,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/09/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1190: LAGUNA I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA I',
    brand: 24,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/11/1993',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1191: LAGUNA I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA I',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/11/1993',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1192: LAGUNA I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA I',
    brand: 24,
    motorisation: '1.9 dTi',
    fuel: 'Diesel',
    startDate: '01/11/1993',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1193: LAGUNA I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA I',
    brand: 24,
    motorisation: '2.0',
    fuel: 'Petrole',
    startDate: '01/11/1993',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1194: LAGUNA I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA I',
    brand: 24,
    motorisation: '2.2 D',
    fuel: 'Diesel',
    startDate: '01/11/1993',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1195: LAGUNA I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA I',
    brand: 24,
    motorisation: '2.2 dT',
    fuel: 'Diesel',
    startDate: '01/11/1993',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1196: LAGUNA I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA I',
    brand: 24,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/11/1997',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1197: LAGUNA II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II',
    brand: 24,
    motorisation: '1.8 16V (BG06',
    fuel: 'Petrole',
    startDate: '01/03/2001',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 1198: LAGUNA II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/09/2007',
    publishedAt: new Date()
  }
});

// Model 1199: LAGUNA II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II',
    brand: 24,
    motorisation: '2.0 16V',
    fuel: 'Petrole',
    startDate: '01/03/2001',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 1200: LAGUNA II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/09/2007',
    publishedAt: new Date()
  }
});

// Model 1201: LAGUNA II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II',
    brand: 24,
    motorisation: '2.2 dCi',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/09/2007',
    publishedAt: new Date()
  }
});

// Model 1202: LAGUNA II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II',
    brand: 24,
    motorisation: 'BG0J',
    fuel: 'Petrole',
    startDate: '01/03/2001',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 1203: LAGUNA II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II',
    brand: 24,
    motorisation: 'BG0J )',
    fuel: 'Petrole',
    startDate: '01/03/2001',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 1204: LAGUNA II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II',
    brand: 24,
    motorisation: 'BG0M',
    fuel: 'Petrole',
    startDate: '01/03/2001',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 1205: LAGUNA II Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II Grandtour',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 1206: LAGUNA II Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA II Grandtour',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '01/12/2007',
    publishedAt: new Date()
  }
});

// Model 1207: LAGUNA III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA III',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/10/2007',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1208: LAGUNA III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA III',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/10/2007',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1209: LAGUNA III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA III Grandtour',
    brand: 24,
    motorisation: '1.5 dCi (KT0A)',
    fuel: 'Diesel',
    startDate: '01/10/2007',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1210: LAGUNA III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAGUNA III Grandtour',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/10/2007',
    endDate: '01/12/2015',
    publishedAt: new Date()
  }
});

// Model 1211: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '0 160',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1212: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '100 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1213: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '120 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1214: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '120 160',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1215: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '160 160',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1216: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '2 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1217: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '2.5 D',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1218: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '2.8 dTI',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1219: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '3 160',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1220: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '5 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1221: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '1.9 dCi 80',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1222: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '1.9 dTI',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1223: MASTER II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Box',
    brand: 24,
    motorisation: '2.2 dCI 90',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1224: MASTER II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Bus',
    brand: 24,
    motorisation: '2.5 D',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '01/01/2001',
    publishedAt: new Date()
  }
});

// Model 1225: MASTER II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Bus',
    brand: 24,
    motorisation: '2.5 dCi 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '01/01/2001',
    publishedAt: new Date()
  }
});

// Model 1226: MASTER II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Bus',
    brand: 24,
    motorisation: '2.8 dTI',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '01/01/2001',
    publishedAt: new Date()
  }
});

// Model 1227: MASTER II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Bus',
    brand: 24,
    motorisation: '3.0 dCi 140',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '01/01/2001',
    publishedAt: new Date()
  }
});

// Model 1228: MASTER II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Bus',
    brand: 24,
    motorisation: '1 80',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1229: MASTER II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Bus',
    brand: 24,
    motorisation: '2.2 dCI 90',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1230: MASTER II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Bus',
    brand: 24,
    motorisation: '80 80',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1231: MASTER II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Bus',
    brand: 24,
    motorisation: '9 80',
    fuel: 'Diesel',
    startDate: '01/09/2000',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1232: MASTER II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Platform/Chassis',
    brand: 24,
    motorisation: '100 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1233: MASTER II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Platform/Chassis',
    brand: 24,
    motorisation: '120 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1234: MASTER II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Platform/Chassis',
    brand: 24,
    motorisation: '2 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1235: MASTER II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Platform/Chassis',
    brand: 24,
    motorisation: '2.5 D',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1236: MASTER II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Platform/Chassis',
    brand: 24,
    motorisation: '2.8 dTI',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1237: MASTER II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Platform/Chassis',
    brand: 24,
    motorisation: '3.0 dCi 140',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1238: MASTER II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER II Platform/Chassis',
    brand: 24,
    motorisation: '5 120',
    fuel: 'Diesel',
    startDate: '01/07/1998',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1239: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '100 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1240: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '125 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1241: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '125 RWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1242: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '130 RWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1243: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '145 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1244: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '145 RWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1245: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '2 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1246: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '3 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1247: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '130',
    fuel: 'Diesel',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1248: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '135',
    fuel: 'Diesel',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1249: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '165',
    fuel: 'Diesel',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1250: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '170 FWD',
    fuel: 'Diesel',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1251: MASTER III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Box',
    brand: 24,
    motorisation: '2.3 dCi 110',
    fuel: 'Diesel',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1252: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '100 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1253: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '125 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1254: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '125 RWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1255: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '130 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1256: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '130 RWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1257: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '145 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1258: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '145 RWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1259: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '2 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1260: MASTER III Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MASTER III Platform/Chassis',
    brand: 24,
    motorisation: '3 FWD',
    fuel: 'Diesel',
    startDate: '01/02/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1261: MEGANE CC (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE CC',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1262: MEGANE I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE I',
    brand: 24,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/01/1996',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1263: MEGANE I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE I',
    brand: 24,
    motorisation: '1.4 e',
    fuel: 'Petrole',
    startDate: '01/01/1996',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1264: MEGANE I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE I',
    brand: 24,
    motorisation: '1.4 Eco',
    fuel: 'Petrole',
    startDate: '01/01/1996',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1265: MEGANE I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE I',
    brand: 24,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/01/1996',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1266: MEGANE I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE I',
    brand: 24,
    motorisation: '1.6 e',
    fuel: 'Petrole',
    startDate: '01/01/1996',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1267: MEGANE I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE I',
    brand: 24,
    motorisation: '1.9 D Eco',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1268: MEGANE I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE I',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1269: MEGANE I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE I',
    brand: 24,
    motorisation: '1.9 dTi',
    fuel: 'Diesel',
    startDate: '01/01/1996',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1270: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: '(BM1E',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1271: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: '1.5 dCi (BM0F',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1272: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: 'BM0T',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1273: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: 'BM1F',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1274: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: 'BM2B',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1275: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: 'CM0F',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1276: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: 'CM0T',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1277: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: 'CM1E',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1278: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: 'CM1F)',
    fuel: 'Diesel',
    startDate: '01/09/2002',
    endDate: '01/06/2008',
    publishedAt: new Date()
  }
});

// Model 1279: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/11/2002',
    endDate: '01/02/2008',
    publishedAt: new Date()
  }
});

// Model 1280: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/11/2002',
    endDate: '01/02/2008',
    publishedAt: new Date()
  }
});

// Model 1281: MEGANE II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/11/2002',
    endDate: '01/12/2009',
    publishedAt: new Date()
  }
});

// Model 1282: MEGANE II Coupé- Cabriolet (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II Coupé- Cabriolet',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/09/2003',
    endDate: '01/03/2009',
    publishedAt: new Date()
  }
});

// Model 1283: MEGANE II Estate (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II Estate',
    brand: 24,
    motorisation: '1.5 dCi (KM02',
    fuel: 'Diesel',
    startDate: '01/08/2003',
    endDate: '01/07/2009',
    publishedAt: new Date()
  }
});

// Model 1284: MEGANE II Estate (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II Estate',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/08/2003',
    endDate: '01/07/2009',
    publishedAt: new Date()
  }
});

// Model 1285: MEGANE II Estate (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II Estate',
    brand: 24,
    motorisation: 'KM13)',
    fuel: 'Diesel',
    startDate: '01/08/2003',
    endDate: '01/07/2009',
    publishedAt: new Date()
  }
});

// Model 1286: MEGANE II Hatchback Van (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE II Hatchback Van',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/08/2003',
    endDate: '01/02/2008',
    publishedAt: new Date()
  }
});

// Model 1287: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: '1.5 dCi (DZ09',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1288: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: '1.6 dCi (DZ00)',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1289: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: 'DZ0D',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1290: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: 'DZ1F',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1291: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: 'DZ1G)',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1292: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: '1.5 dCi (DZ0A',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1293: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: 'DZ0B',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1294: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: 'DZ0C',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1295: MEGANE III Coupe (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Coupe',
    brand: 24,
    motorisation: 'DZ1A)',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1296: MEGANE III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Grandtour',
    brand: 24,
    motorisation: '1.5 dCi (KZ09',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1297: MEGANE III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Grandtour',
    brand: 24,
    motorisation: 'KZ0D',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1298: MEGANE III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Grandtour',
    brand: 24,
    motorisation: 'KZ1G)',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1299: MEGANE III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Grandtour',
    brand: 24,
    motorisation: '1.5 dCi (KZ0C',
    fuel: 'Diesel',
    startDate: '01/03/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1300: MEGANE III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Grandtour',
    brand: 24,
    motorisation: 'KZ1A',
    fuel: 'Diesel',
    startDate: '01/03/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1301: MEGANE III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Grandtour',
    brand: 24,
    motorisation: 'KZ1M',
    fuel: 'Diesel',
    startDate: '01/03/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1302: MEGANE III Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Grandtour',
    brand: 24,
    motorisation: 'KZ1W)',
    fuel: 'Diesel',
    startDate: '01/03/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1303: MEGANE III Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Hatchback',
    brand: 24,
    motorisation: '1.5 dCi (BZ0C',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1304: MEGANE III Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Hatchback',
    brand: 24,
    motorisation: '1.9 dCi (BZ0N',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1305: MEGANE III Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Hatchback',
    brand: 24,
    motorisation: '2.0 dCi (BZ0L)',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1306: MEGANE III Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Hatchback',
    brand: 24,
    motorisation: 'BZ09',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1307: MEGANE III Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Hatchback',
    brand: 24,
    motorisation: 'BZ0D',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1308: MEGANE III Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Hatchback',
    brand: 24,
    motorisation: 'BZ0J)',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1309: MEGANE III Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE III Hatchback',
    brand: 24,
    motorisation: 'BZ1W)',
    fuel: 'Diesel',
    startDate: '01/11/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1310: MEGANE IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Grandtour',
    brand: 24,
    motorisation: '1 110',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1311: MEGANE IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Grandtour',
    brand: 24,
    motorisation: '1 165',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1312: MEGANE IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Grandtour',
    brand: 24,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1313: MEGANE IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Grandtour',
    brand: 24,
    motorisation: '130 165',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1314: MEGANE IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Grandtour',
    brand: 24,
    motorisation: '165 165',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1315: MEGANE IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Grandtour',
    brand: 24,
    motorisation: '5 110',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1316: MEGANE IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Grandtour',
    brand: 24,
    motorisation: '6 165',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1317: MEGANE IV Grandtour (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Grandtour',
    brand: 24,
    motorisation: '90 110',
    fuel: 'Diesel',
    startDate: '01/04/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1318: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '1 110',
    fuel: 'Diesel',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1319: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '1 130',
    fuel: 'Petrole',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1320: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '1 165',
    fuel: 'Diesel',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1321: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '1.6 Tce 205',
    fuel: 'Petrole',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1322: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '100 130',
    fuel: 'Petrole',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1323: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1324: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '130 130',
    fuel: 'Petrole',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1325: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '130 165',
    fuel: 'Diesel',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1326: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '165 165',
    fuel: 'Diesel',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1327: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '2 130',
    fuel: 'Petrole',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1328: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '5 110',
    fuel: 'Diesel',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1329: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '6 165',
    fuel: 'Diesel',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1330: MEGANE IV Hatchback (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE IV Hatchback',
    brand: 24,
    motorisation: '90 110',
    fuel: 'Diesel',
    startDate: '01/11/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1331: MEGANE Scenic (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE Scenic',
    brand: 24,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/03/1997',
    endDate: '01/09/1999',
    publishedAt: new Date()
  }
});

// Model 1332: MEGANE Scenic (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE Scenic',
    brand: 24,
    motorisation: '1.9 dT',
    fuel: 'Diesel',
    startDate: '01/03/1997',
    endDate: '01/08/1999',
    publishedAt: new Date()
  }
});

// Model 1333: MEGANE Scenic (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE Scenic',
    brand: 24,
    motorisation: '1.9 dTi',
    fuel: 'Diesel',
    startDate: '01/03/1997',
    endDate: '01/09/1999',
    publishedAt: new Date()
  }
});

// Model 1334: MEGANE Scenic (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE Scenic',
    brand: 24,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/04/1998',
    endDate: '01/10/1999',
    publishedAt: new Date()
  }
});

// Model 1335: MEGANE Scenic (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE Scenic',
    brand: 24,
    motorisation: '1 e',
    fuel: 'Petrole',
    startDate: '01/10/1996',
    endDate: '01/09/1999',
    publishedAt: new Date()
  }
});

// Model 1336: MEGANE Scenic (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE Scenic',
    brand: 24,
    motorisation: '1.4 i',
    fuel: 'Petrole',
    startDate: '01/10/1996',
    endDate: '01/09/1999',
    publishedAt: new Date()
  }
});

// Model 1337: MEGANE Scenic (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MEGANE Scenic',
    brand: 24,
    motorisation: '6 e',
    fuel: 'Petrole',
    startDate: '01/10/1996',
    endDate: '01/09/1999',
    publishedAt: new Date()
  }
});

// Model 1338: MODUS / GRAND MODUS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MODUS / GRAND MODUS',
    brand: 24,
    motorisation: '1 90',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1339: MODUS / GRAND MODUS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MODUS / GRAND MODUS',
    brand: 24,
    motorisation: '5 90',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1340: MODUS / GRAND MODUS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MODUS / GRAND MODUS',
    brand: 24,
    motorisation: '75 90',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1341: MODUS / GRAND MODUS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MODUS / GRAND MODUS',
    brand: 24,
    motorisation: '90 90',
    fuel: 'Diesel',
    startDate: '01/09/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1342: MODUS / GRAND MODUS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MODUS / GRAND MODUS',
    brand: 24,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/12/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1343: MODUS / GRAND MODUS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'MODUS / GRAND MODUS',
    brand: 24,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/12/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1344: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: '0 RX4',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1345: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1346: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1347: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: '1.8 16V',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1348: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1349: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: '16 RX4',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1350: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: '2 RX4',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1351: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: '4 RX4',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1352: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'dCi',
    fuel: 'Diesel',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1353: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'dTi',
    fuel: 'Diesel',
    startDate: '01/09/1999',
    endDate: '01/08/2003',
    publishedAt: new Date()
  }
});

// Model 1354: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'FA0_) 1.6 (JA00',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 1355: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'JA0B)',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 1356: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'JA15',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 1357: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'JA16',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 1358: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'JA19',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 1359: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'JA1V',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 1360: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'JA2B',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 1361: SCÉNIC I MPV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC I MPV',
    brand: 24,
    motorisation: 'JA2C',
    fuel: 'Petrole',
    startDate: '01/09/1999',
    endDate: '01/09/2003',
    publishedAt: new Date()
  }
});

// Model 1362: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: '1.5 dCi (JM1E)',
    fuel: 'Diesel',
    startDate: '01/05/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1363: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: '1.5 dCi (JM02',
    fuel: 'Diesel',
    startDate: '01/06/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1364: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: '1.5 dCi (JM0F',
    fuel: 'Diesel',
    startDate: '01/06/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1365: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1366: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: '2.0',
    fuel: 'Petrole',
    startDate: '01/06/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1367: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1368: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: 'JM13)',
    fuel: 'Diesel',
    startDate: '01/06/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1369: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: 'JM16',
    fuel: 'Diesel',
    startDate: '01/06/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1370: SCÉNIC II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC II',
    brand: 24,
    motorisation: 'JM1F)',
    fuel: 'Diesel',
    startDate: '01/06/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1371: SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC III',
    brand: 24,
    motorisation: '1.5 dCi',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1372: SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC III',
    brand: 24,
    motorisation: '1.9 dCi',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1373: SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC III',
    brand: 24,
    motorisation: '1.5 dCi (JZ02',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1374: SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC III',
    brand: 24,
    motorisation: 'JZ0R)',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1375: SCÉNIC III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC III',
    brand: 24,
    motorisation: '1.6 dCi',
    fuel: 'Diesel',
    startDate: '01/04/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1376: SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC IV',
    brand: 24,
    motorisation: '1 110',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1377: SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC IV',
    brand: 24,
    motorisation: '1 160',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1378: SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC IV',
    brand: 24,
    motorisation: '110 110',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1379: SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC IV',
    brand: 24,
    motorisation: '130 160',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1380: SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC IV',
    brand: 24,
    motorisation: '160 160',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1381: SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC IV',
    brand: 24,
    motorisation: '5 110',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1382: SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC IV',
    brand: 24,
    motorisation: '6 160',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1383: SCÉNIC IV (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCÉNIC IV',
    brand: 24,
    motorisation: '95 110',
    fuel: 'Diesel',
    startDate: '01/09/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1384: TALISMAN (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TALISMAN',
    brand: 24,
    motorisation: '1 160',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1385: TALISMAN (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TALISMAN',
    brand: 24,
    motorisation: '1.5 dCi 110',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1386: TALISMAN (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TALISMAN',
    brand: 24,
    motorisation: '130 160',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1387: TALISMAN (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TALISMAN',
    brand: 24,
    motorisation: '160 160',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1388: TALISMAN (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TALISMAN',
    brand: 24,
    motorisation: '6 160',
    fuel: 'Diesel',
    startDate: '01/06/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1389: TRAFIC Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC Box',
    brand: 24,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/05/1989',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1390: TRAFIC Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC Box',
    brand: 24,
    motorisation: '2.1 D',
    fuel: 'Diesel',
    startDate: '01/05/1989',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1391: TRAFIC Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC Box',
    brand: 24,
    motorisation: '2.5 D',
    fuel: 'Diesel',
    startDate: '01/05/1989',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1392: TRAFIC Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC Bus',
    brand: 24,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/06/1994',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1393: TRAFIC Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC Bus',
    brand: 24,
    motorisation: '2.1 D',
    fuel: 'Diesel',
    startDate: '01/06/1994',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1394: TRAFIC Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC Bus',
    brand: 24,
    motorisation: '2.5 D',
    fuel: 'Diesel',
    startDate: '01/06/1994',
    endDate: '01/03/2001',
    publishedAt: new Date()
  }
});

// Model 1395: TRAFIC II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Box',
    brand: 24,
    motorisation: '1.9 dCi 100 (FL0C)',
    fuel: 'Diesel',
    startDate: '01/03/2001',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1396: TRAFIC II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Box',
    brand: 24,
    motorisation: '115 (FL01',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1397: TRAFIC II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Box',
    brand: 24,
    motorisation: '2.0 dCi 90',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1398: TRAFIC II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Box',
    brand: 24,
    motorisation: '2.5 dCi 145 (FL0J)',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1399: TRAFIC II Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Box',
    brand: 24,
    motorisation: 'FL0U)',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1400: TRAFIC II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Bus',
    brand: 24,
    motorisation: '0 115',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1401: TRAFIC II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Bus',
    brand: 24,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1402: TRAFIC II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Bus',
    brand: 24,
    motorisation: '2 115',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1403: TRAFIC II Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Bus',
    brand: 24,
    motorisation: '90 115',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1404: TRAFIC II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Platform/Chassis',
    brand: 24,
    motorisation: '0 115',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1405: TRAFIC II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Platform/Chassis',
    brand: 24,
    motorisation: '115 115',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1406: TRAFIC II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Platform/Chassis',
    brand: 24,
    motorisation: '2 115',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1407: TRAFIC II Platform/Chassis (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC II Platform/Chassis',
    brand: 24,
    motorisation: '90 115',
    fuel: 'Diesel',
    startDate: '01/08/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1408: TRAFIC III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Box',
    brand: 24,
    motorisation: '1 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1409: TRAFIC III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Box',
    brand: 24,
    motorisation: '125 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1410: TRAFIC III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Box',
    brand: 24,
    motorisation: '145 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1411: TRAFIC III Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Box',
    brand: 24,
    motorisation: '6 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1412: TRAFIC III Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Bus',
    brand: 24,
    motorisation: '1 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1413: TRAFIC III Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Bus',
    brand: 24,
    motorisation: '125 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1414: TRAFIC III Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Bus',
    brand: 24,
    motorisation: '145 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1415: TRAFIC III Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Bus',
    brand: 24,
    motorisation: '6 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1416: TRAFIC III Bus (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRAFIC III Bus',
    brand: 24,
    motorisation: '90 145',
    fuel: 'Diesel',
    startDate: '01/07/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1417: TWINGO I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO I',
    brand: 24,
    motorisation: '1 16V',
    fuel: 'Petrole',
    startDate: '01/03/1993',
    endDate: '01/06/2007',
    publishedAt: new Date()
  }
});

// Model 1418: TWINGO I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO I',
    brand: 24,
    motorisation: '16 16V',
    fuel: 'Petrole',
    startDate: '01/03/1993',
    endDate: '01/06/2007',
    publishedAt: new Date()
  }
});

// Model 1419: TWINGO I (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO I',
    brand: 24,
    motorisation: '2 16V',
    fuel: 'Petrole',
    startDate: '01/03/1993',
    endDate: '01/06/2007',
    publishedAt: new Date()
  }
});

// Model 1420: TWINGO I Box (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO I Box',
    brand: 24,
    motorisation: '1.2',
    fuel: 'Petrole',
    startDate: '01/03/1993',
    endDate: '01/08/2004',
    publishedAt: new Date()
  }
});

// Model 1421: TWINGO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO II',
    brand: 24,
    motorisation: '1 90',
    fuel: 'Diesel',
    startDate: '01/03/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1422: TWINGO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO II',
    brand: 24,
    motorisation: '1.6 RS',
    fuel: 'Petrole',
    startDate: '01/03/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1423: TWINGO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO II',
    brand: 24,
    motorisation: '5 90',
    fuel: 'Diesel',
    startDate: '01/03/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1424: TWINGO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO II',
    brand: 24,
    motorisation: '75 90',
    fuel: 'Diesel',
    startDate: '01/03/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1425: TWINGO II (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO II',
    brand: 24,
    motorisation: '90 90',
    fuel: 'Diesel',
    startDate: '01/03/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1426: TWINGO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO III',
    brand: 24,
    motorisation: '0 110',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1427: TWINGO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO III',
    brand: 24,
    motorisation: '1.0 SCe 70',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1428: TWINGO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO III',
    brand: 24,
    motorisation: '110 110',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1429: TWINGO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO III',
    brand: 24,
    motorisation: '9 110',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1430: TWINGO III (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TWINGO III',
    brand: 24,
    motorisation: '90 110',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1431: VEL SATIS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VEL SATIS',
    brand: 24,
    motorisation: '2.0 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1432: VEL SATIS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VEL SATIS',
    brand: 24,
    motorisation: '2.2 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1433: VEL SATIS (renault)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VEL SATIS',
    brand: 24,
    motorisation: '3.0 dCi',
    fuel: 'Diesel',
    startDate: '01/06/2002',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1434: ALTEA (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'ALTEA',
    brand: 25,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1435: IBIZA II (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA II',
    brand: 25,
    motorisation: '1.4i',
    fuel: 'Petrol',
    startDate: '01/03/1993',
    endDate: '01/02/2002',
    publishedAt: new Date()
  }
});

// Model 1436: IBIZA II (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA II',
    brand: 25,
    motorisation: '1 SDI',
    fuel: 'Diesel',
    startDate: '01/04/1993',
    endDate: '01/02/2002',
    publishedAt: new Date()
  }
});

// Model 1437: IBIZA II (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA II',
    brand: 25,
    motorisation: '9 SDI',
    fuel: 'Diesel',
    startDate: '01/04/1993',
    endDate: '01/02/2002',
    publishedAt: new Date()
  }
});

// Model 1438: IBIZA III (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA III',
    brand: 25,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/02/2002',
    endDate: '01/11/2009',
    publishedAt: new Date()
  }
});

// Model 1439: IBIZA III (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA III',
    brand: 25,
    motorisation: '1.9 SDI',
    fuel: 'Diesel',
    startDate: '01/02/2002',
    endDate: '01/11/2009',
    publishedAt: new Date()
  }
});

// Model 1440: IBIZA III (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA III',
    brand: 25,
    motorisation: '1.4 TDI',
    fuel: 'Diesel',
    startDate: '01/05/2002',
    endDate: '01/11/2009',
    publishedAt: new Date()
  }
});

// Model 1441: IBIZA IV (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA IV',
    brand: 25,
    motorisation: '1 TSI',
    fuel: 'Petrole',
    startDate: '01/03/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1442: IBIZA IV (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA IV',
    brand: 25,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/03/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1443: IBIZA IV (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA IV',
    brand: 25,
    motorisation: '2 TSI',
    fuel: 'Petrole',
    startDate: '01/03/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1444: IBIZA IV (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA IV',
    brand: 25,
    motorisation: '6P1) 1.0',
    fuel: 'Petrole',
    startDate: '01/03/2008',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1445: IBIZA IV (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'IBIZA IV',
    brand: 25,
    motorisation: '1.2 TDI',
    fuel: 'Diesel',
    startDate: '01/05/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1446: LEON (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LEON',
    brand: 25,
    motorisation: '0 16V',
    fuel: 'Diesel',
    startDate: '01/07/2005',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 1447: LEON (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LEON',
    brand: 25,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/07/2005',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 1448: LEON (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LEON',
    brand: 25,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/07/2005',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 1449: LEON (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LEON',
    brand: 25,
    motorisation: '16 16V',
    fuel: 'Diesel',
    startDate: '01/07/2005',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 1450: LEON (seat)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LEON',
    brand: 25,
    motorisation: '2 16V',
    fuel: 'Diesel',
    startDate: '01/07/2005',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 1451: FABIA II (skoda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FABIA II',
    brand: 26,
    motorisation: '1.4 TDI',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '01/12/2014',
    publishedAt: new Date()
  }
});

// Model 1452: FABIA II (skoda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FABIA II',
    brand: 26,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/01/2007',
    endDate: '01/12/2014',
    publishedAt: new Date()
  }
});

// Model 1453: OCTAVIA I (skoda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'OCTAVIA I',
    brand: 26,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1996',
    endDate: '01/12/2010',
    publishedAt: new Date()
  }
});

// Model 1454: YETI (skoda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YETI',
    brand: 26,
    motorisation: '0 4x4',
    fuel: 'Diesel',
    startDate: '01/05/2009',
    endDate: '01/12/2017',
    publishedAt: new Date()
  }
});

// Model 1455: YETI (skoda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YETI',
    brand: 26,
    motorisation: '2 4x4',
    fuel: 'Diesel',
    startDate: '01/05/2009',
    endDate: '01/12/2017',
    publishedAt: new Date()
  }
});

// Model 1456: YETI (skoda)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YETI',
    brand: 26,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/05/2009',
    endDate: '01/12/2017',
    publishedAt: new Date()
  }
});

// Model 1457: FORTWO Cabrio (smart)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FORTWO Cabrio',
    brand: 27,
    motorisation: '1.0 Turbo',
    fuel: 'Petrole',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1458: FORTWO Cabrio (smart)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FORTWO Cabrio',
    brand: 27,
    motorisation: '1.0 Turbo Brabus',
    fuel: 'Petrole',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1459: FORTWO Coupe (smart)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FORTWO Coupe',
    brand: 27,
    motorisation: '0.7',
    fuel: 'Petrole',
    startDate: '01/01/2004',
    endDate: '01/01/2007',
    publishedAt: new Date()
  }
});

// Model 1460: FORTWO Coupe (smart)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FORTWO Coupe',
    brand: 27,
    motorisation: '0 Brabus',
    fuel: 'Petrole',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1461: FORTWO Coupe (smart)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FORTWO Coupe',
    brand: 27,
    motorisation: '1 Brabus',
    fuel: 'Petrole',
    startDate: '01/01/2007',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1462: FORTWO Coupe (smart)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FORTWO Coupe',
    brand: 27,
    motorisation: '1.0',
    fuel: 'Petrole',
    startDate: '01/09/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1463: GRAND VITARA II (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND VITARA II',
    brand: 28,
    motorisation: '1 Drive',
    fuel: 'Diesel',
    startDate: '01/03/2006',
    endDate: '01/08/2008',
    publishedAt: new Date()
  }
});

// Model 1464: GRAND VITARA II (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GRAND VITARA II',
    brand: 28,
    motorisation: '9 Drive',
    fuel: 'Diesel',
    startDate: '01/03/2006',
    endDate: '01/08/2008',
    publishedAt: new Date()
  }
});

// Model 1465: JIMNY Closed Off-Road Vehicle (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JIMNY Closed Off-Road Vehicle',
    brand: 28,
    motorisation: '1 4x4',
    fuel: 'Diesel',
    startDate: '01/12/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1466: JIMNY Closed Off-Road Vehicle (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JIMNY Closed Off-Road Vehicle',
    brand: 28,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/12/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1467: JIMNY Closed Off-Road Vehicle (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'JIMNY Closed Off-Road Vehicle',
    brand: 28,
    motorisation: '5 4x4',
    fuel: 'Diesel',
    startDate: '01/12/2003',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1468: SWIFT III (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SWIFT III',
    brand: 28,
    motorisation: '1 4x4',
    fuel: 'Petrole',
    startDate: '01/02/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1469: SWIFT III (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SWIFT III',
    brand: 28,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/02/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1470: SWIFT III (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SWIFT III',
    brand: 28,
    motorisation: '3 4x4',
    fuel: 'Petrole',
    startDate: '01/02/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1471: SWIFT III (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SWIFT III',
    brand: 28,
    motorisation: '4 4x4',
    fuel: 'Petrole',
    startDate: '01/02/2005',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1472: SWIFT IV (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SWIFT IV',
    brand: 28,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/10/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1473: SWIFT IV (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SWIFT IV',
    brand: 28,
    motorisation: 'NZ) 1.2',
    fuel: 'Petrole',
    startDate: '01/10/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1474: SX4 (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SX4',
    brand: 28,
    motorisation: '0 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1475: SX4 (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SX4',
    brand: 28,
    motorisation: '1 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1476: SX4 (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SX4',
    brand: 28,
    motorisation: '1.6 DDIS',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1477: SX4 (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SX4',
    brand: 28,
    motorisation: '2 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1478: SX4 (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SX4',
    brand: 28,
    motorisation: '4 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1479: SX4 (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SX4',
    brand: 28,
    motorisation: '9 4x4',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1480: VITARA (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITARA',
    brand: 28,
    motorisation: '1.9 D All-wheel Drive',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/03/1998',
    publishedAt: new Date()
  }
});

// Model 1481: VITARA (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITARA',
    brand: 28,
    motorisation: '2.0 TD Intercooler All-wheel Drive',
    fuel: 'Diesel',
    startDate: '01/01/1995',
    endDate: '01/03/1998',
    publishedAt: new Date()
  }
});

// Model 1482: VITARA (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITARA',
    brand: 28,
    motorisation: '1 AllGrip',
    fuel: 'Diesel',
    startDate: '01/02/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1483: VITARA (suzuki)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VITARA',
    brand: 28,
    motorisation: '6 AllGrip',
    fuel: 'Diesel',
    startDate: '01/02/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1484: AURIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'AURIS',
    brand: 29,
    motorisation: '1.4 D-4D',
    fuel: 'Diesel',
    startDate: '01/03/2007',
    endDate: '01/09/2012',
    publishedAt: new Date()
  }
});

// Model 1485: AURIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'AURIS',
    brand: 29,
    motorisation: '2.0 D-4D',
    fuel: 'Diesel',
    startDate: '01/03/2007',
    endDate: '01/09/2012',
    publishedAt: new Date()
  }
});

// Model 1486: AVENSIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'AVENSIS',
    brand: 29,
    motorisation: '2.0 D-4D (ADT250_)',
    fuel: 'Diesel',
    startDate: '01/04/2003',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 1487: AYGO (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'AYGO',
    brand: 29,
    motorisation: '1.0 (KGB40)',
    fuel: 'Petrole',
    startDate: '01/05/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1488: COROLLA (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'COROLLA',
    brand: 29,
    motorisation: '1.4 D',
    fuel: 'Diesel',
    startDate: '01/01/2002',
    endDate: '01/02/2007',
    publishedAt: new Date()
  }
});

// Model 1489: COROLLA (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'COROLLA',
    brand: 29,
    motorisation: '2.0 D-4D',
    fuel: 'Diesel',
    startDate: '01/01/2002',
    endDate: '01/02/2007',
    publishedAt: new Date()
  }
});

// Model 1490: HILUX VII Pickup (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'HILUX VII Pickup',
    brand: 29,
    motorisation: '2 4WD',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1491: HILUX VII Pickup (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'HILUX VII Pickup',
    brand: 29,
    motorisation: '3.0 D-4D 4WD',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1492: HILUX VII Pickup (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'HILUX VII Pickup',
    brand: 29,
    motorisation: '4 4WD',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1493: HILUX VII Pickup (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'HILUX VII Pickup',
    brand: 29,
    motorisation: '5 4WD',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1494: LAND CRUISER 90 (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAND CRUISER 90',
    brand: 29,
    motorisation: '0 TD',
    fuel: 'Diesel',
    startDate: '01/04/1996',
    endDate: '01/12/2002',
    publishedAt: new Date()
  }
});

// Model 1495: LAND CRUISER 90 (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAND CRUISER 90',
    brand: 29,
    motorisation: '3 TD',
    fuel: 'Diesel',
    startDate: '01/04/1996',
    endDate: '01/12/2002',
    publishedAt: new Date()
  }
});

// Model 1496: LAND CRUISER 90 (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAND CRUISER 90',
    brand: 29,
    motorisation: '4 TD',
    fuel: 'Diesel',
    startDate: '01/04/1996',
    endDate: '01/12/2002',
    publishedAt: new Date()
  }
});

// Model 1497: LAND CRUISER PRADO (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAND CRUISER PRADO',
    brand: 29,
    motorisation: '2.8 D-4D',
    fuel: 'Diesel',
    startDate: '01/08/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1498: LAND CRUISER PRADO (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'LAND CRUISER PRADO',
    brand: 29,
    motorisation: '3.0 D-4D',
    fuel: 'Diesel',
    startDate: '01/08/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1499: RAV 4 II (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RAV 4 II',
    brand: 29,
    motorisation: '2.0 D 4WD',
    fuel: 'Diesel',
    startDate: '01/05/2001',
    endDate: '01/11/2005',
    publishedAt: new Date()
  }
});

// Model 1500: RAV 4 III (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RAV 4 III',
    brand: 29,
    motorisation: '2 4WD',
    fuel: 'Diesel',
    startDate: '01/02/2006',
    endDate: '01/06/2013',
    publishedAt: new Date()
  }
});

// Model 1501: RAV 4 III (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RAV 4 III',
    brand: 29,
    motorisation: '4 4WD',
    fuel: 'Diesel',
    startDate: '01/02/2006',
    endDate: '01/06/2013',
    publishedAt: new Date()
  }
});

// Model 1502: RAV 4 IV (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RAV 4 IV',
    brand: 29,
    motorisation: '0 4WD',
    fuel: 'Diesel',
    startDate: '01/12/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1503: RAV 4 IV (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RAV 4 IV',
    brand: 29,
    motorisation: '2 4WD',
    fuel: 'Diesel',
    startDate: '01/12/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1504: RAV 4 IV (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'RAV 4 IV',
    brand: 29,
    motorisation: '4 4WD',
    fuel: 'Diesel',
    startDate: '01/12/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1505: VERSO (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VERSO',
    brand: 29,
    motorisation: '2.0 D-4D',
    fuel: 'Diesel',
    startDate: '01/04/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1506: VERSO (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'VERSO',
    brand: 29,
    motorisation: '1.6 D4-D',
    fuel: 'Diesel',
    startDate: '01/11/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1507: YARIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YARIS',
    brand: 29,
    motorisation: '1.0',
    fuel: 'Petrole',
    startDate: '01/03/2003',
    endDate: '01/09/2005',
    publishedAt: new Date()
  }
});

// Model 1508: YARIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YARIS',
    brand: 29,
    motorisation: '1.0 VVT-i',
    fuel: 'Petrole',
    startDate: '01/08/2005',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 1509: YARIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YARIS',
    brand: 29,
    motorisation: '1.3 VVT-i',
    fuel: 'Petrole',
    startDate: '01/08/2005',
    endDate: '01/12/2011',
    publishedAt: new Date()
  }
});

// Model 1510: YARIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YARIS',
    brand: 29,
    motorisation: '1.4 D-4D',
    fuel: 'Diesel',
    startDate: '01/08/2005',
    endDate: '01/12/2012',
    publishedAt: new Date()
  }
});

// Model 1511: YARIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YARIS',
    brand: 29,
    motorisation: '1.4 D',
    fuel: 'Diesel',
    startDate: '01/09/2011',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1512: YARIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YARIS',
    brand: 29,
    motorisation: '1.3',
    fuel: 'Petrole',
    startDate: '01/11/1999',
    endDate: '01/10/2005',
    publishedAt: new Date()
  }
});

// Model 1513: YARIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YARIS',
    brand: 29,
    motorisation: '1.3',
    fuel: 'Petrole',
    startDate: '01/12/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1514: YARIS (toyota)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'YARIS',
    brand: 29,
    motorisation: '1.5',
    fuel: 'Petrole',
    startDate: '01/12/2010',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1515: CADDY III Box (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CADDY III Box',
    brand: 30,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1516: CADDY III Box (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CADDY III Box',
    brand: 30,
    motorisation: '2.0 SDI',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1517: CADDY III Box (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CADDY III Box',
    brand: 30,
    motorisation: 'TDI 16V',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1518: CADDY III Box (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'CADDY III Box',
    brand: 30,
    motorisation: 'TDI 4motion',
    fuel: 'Diesel',
    startDate: '01/04/2004',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1519: EOS (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EOS',
    brand: 30,
    motorisation: '0 16V',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '01/08/2015',
    publishedAt: new Date()
  }
});

// Model 1520: EOS (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EOS',
    brand: 30,
    motorisation: '16 16V',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '01/08/2015',
    publishedAt: new Date()
  }
});

// Model 1521: EOS (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'EOS',
    brand: 30,
    motorisation: '2 16V',
    fuel: 'Diesel',
    startDate: '01/06/2006',
    endDate: '01/08/2015',
    publishedAt: new Date()
  }
});

// Model 1522: FOX Hatchback (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOX Hatchback',
    brand: 30,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/04/2005',
    endDate: '01/07/2011',
    publishedAt: new Date()
  }
});

// Model 1523: FOX Hatchback (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOX Hatchback',
    brand: 30,
    motorisation: '5Z3',
    fuel: 'Petrole',
    startDate: '01/04/2005',
    endDate: '01/07/2011',
    publishedAt: new Date()
  }
});

// Model 1524: FOX Hatchback (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'FOX Hatchback',
    brand: 30,
    motorisation: '5Z4) 1.2',
    fuel: 'Petrole',
    startDate: '01/04/2005',
    endDate: '01/07/2011',
    publishedAt: new Date()
  }
});

// Model 1525: GOLF III (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF III',
    brand: 30,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/10/1991',
    endDate: '01/08/1997',
    publishedAt: new Date()
  }
});

// Model 1526: GOLF III (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF III',
    brand: 30,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/11/1991',
    endDate: '01/08/1997',
    publishedAt: new Date()
  }
});

// Model 1527: GOLF III (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF III',
    brand: 30,
    motorisation: 'GTD',
    fuel: 'Diesel',
    startDate: '01/11/1991',
    endDate: '01/08/1997',
    publishedAt: new Date()
  }
});

// Model 1528: GOLF III (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF III',
    brand: 30,
    motorisation: 'SDI',
    fuel: 'Diesel',
    startDate: '01/11/1991',
    endDate: '01/08/1997',
    publishedAt: new Date()
  }
});

// Model 1529: GOLF III (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF III',
    brand: 30,
    motorisation: 'TD',
    fuel: 'Diesel',
    startDate: '01/11/1991',
    endDate: '01/08/1997',
    publishedAt: new Date()
  }
});

// Model 1530: GOLF III (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF III',
    brand: 30,
    motorisation: 'TDI',
    fuel: 'Diesel',
    startDate: '01/11/1991',
    endDate: '01/08/1997',
    publishedAt: new Date()
  }
});

// Model 1531: GOLF IV (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF IV',
    brand: 30,
    motorisation: '1 4motion',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 1532: GOLF IV (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF IV',
    brand: 30,
    motorisation: '4 4motion',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 1533: GOLF IV (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF IV',
    brand: 30,
    motorisation: '9 4motion',
    fuel: 'Diesel',
    startDate: '01/08/1997',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 1534: GOLF IV (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF IV',
    brand: 30,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/10/1997',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 1535: GOLF IV (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF IV',
    brand: 30,
    motorisation: '1.6',
    fuel: 'Petrole',
    startDate: '01/10/1997',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 1536: GOLF IV (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF IV',
    brand: 30,
    motorisation: '1.6 16V',
    fuel: 'Petrole',
    startDate: '01/10/1997',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 1537: GOLF IV (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF IV',
    brand: 30,
    motorisation: '1.6 FSI',
    fuel: 'Petrole',
    startDate: '01/10/1997',
    endDate: '01/06/2005',
    publishedAt: new Date()
  }
});

// Model 1538: GOLF PLUS (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF PLUS',
    brand: 30,
    motorisation: '0 16V',
    fuel: 'Diesel',
    startDate: '01/01/2005',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 1539: GOLF PLUS (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF PLUS',
    brand: 30,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/01/2005',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 1540: GOLF PLUS (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF PLUS',
    brand: 30,
    motorisation: '16 16V',
    fuel: 'Diesel',
    startDate: '01/01/2005',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 1541: GOLF PLUS (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF PLUS',
    brand: 30,
    motorisation: '2 16V',
    fuel: 'Diesel',
    startDate: '01/01/2005',
    endDate: '01/12/2013',
    publishedAt: new Date()
  }
});

// Model 1542: GOLF V (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF V',
    brand: 30,
    motorisation: '0 16V',
    fuel: 'Diesel',
    startDate: '01/10/2003',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 1543: GOLF V (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF V',
    brand: 30,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2003',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 1544: GOLF V (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF V',
    brand: 30,
    motorisation: '16 16V',
    fuel: 'Diesel',
    startDate: '01/10/2003',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 1545: GOLF V (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF V',
    brand: 30,
    motorisation: '2 16V',
    fuel: 'Diesel',
    startDate: '01/10/2003',
    endDate: '01/11/2008',
    publishedAt: new Date()
  }
});

// Model 1546: GOLF VI (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VI',
    brand: 30,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/02/2009',
    endDate: '01/11/2012',
    publishedAt: new Date()
  }
});

// Model 1547: GOLF VI (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VI',
    brand: 30,
    motorisation: '0 4motion',
    fuel: 'Diesel',
    startDate: '01/10/2008',
    endDate: '01/05/2013',
    publishedAt: new Date()
  }
});

// Model 1548: GOLF VI (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VI',
    brand: 30,
    motorisation: '1.4 TSI',
    fuel: 'Petrole',
    startDate: '01/10/2008',
    endDate: '01/11/2012',
    publishedAt: new Date()
  }
});

// Model 1549: GOLF VI (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VI',
    brand: 30,
    motorisation: '2 4motion',
    fuel: 'Diesel',
    startDate: '01/10/2008',
    endDate: '01/05/2013',
    publishedAt: new Date()
  }
});

// Model 1550: GOLF VI (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VI',
    brand: 30,
    motorisation: '4 4motion',
    fuel: 'Diesel',
    startDate: '01/10/2008',
    endDate: '01/05/2013',
    publishedAt: new Date()
  }
});

// Model 1551: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: '1.0 TSI',
    fuel: 'Petrole',
    startDate: '01/05/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1552: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: '1.2 TSI',
    fuel: 'Petrole',
    startDate: '01/05/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1553: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/05/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1554: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: '1.5 TSI',
    fuel: 'Petrole',
    startDate: '01/05/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1555: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: 'TSI',
    fuel: 'Petrole',
    startDate: '01/05/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1556: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: '1 4motion',
    fuel: 'Diesel',
    startDate: '01/08/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1557: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: '2.0 TDI 4motion',
    fuel: 'Diesel',
    startDate: '01/08/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1558: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: '4 4motion',
    fuel: 'Diesel',
    startDate: '01/08/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1559: GOLF VII (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII',
    brand: 30,
    motorisation: '6 4motion',
    fuel: 'Diesel',
    startDate: '01/08/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1560: GOLF VII Variant (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'GOLF VII Variant',
    brand: 30,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/05/2013',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1561: PASSAT (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT',
    brand: 30,
    motorisation: '0 16V',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1562: PASSAT (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT',
    brand: 30,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1563: PASSAT (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT',
    brand: 30,
    motorisation: '16 16V',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1564: PASSAT (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT',
    brand: 30,
    motorisation: '2 16V',
    fuel: 'Diesel',
    startDate: '01/03/2005',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1565: PASSAT Variant (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT Variant',
    brand: 30,
    motorisation: '0 16V',
    fuel: 'Diesel',
    startDate: '01/04/1996',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1566: PASSAT Variant (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT Variant',
    brand: 30,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/04/1996',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1567: PASSAT Variant (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT Variant',
    brand: 30,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/04/1996',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1568: PASSAT Variant (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT Variant',
    brand: 30,
    motorisation: '16 16V',
    fuel: 'Diesel',
    startDate: '01/04/1996',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1569: PASSAT Variant (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'PASSAT Variant',
    brand: 30,
    motorisation: '2 16V',
    fuel: 'Diesel',
    startDate: '01/04/1996',
    endDate: '01/11/2010',
    publishedAt: new Date()
  }
});

// Model 1570: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.2 TSI',
    fuel: 'Petrole',
    startDate: '01/01/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1571: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: 'TSI 16V',
    fuel: 'Petrole',
    startDate: '01/01/2014',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1572: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '6C1) 1.4 (6R1)',
    fuel: 'Petrole',
    startDate: '01/03/2009',
    endDate: '01/05/2014',
    publishedAt: new Date()
  }
});

// Model 1573: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.2 TSI',
    fuel: 'Petrole',
    startDate: '01/05/2011',
    endDate: '01/05/2014',
    publishedAt: new Date()
  }
});

// Model 1574: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.2 TDI',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1575: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.4TDI',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1576: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.6TDI',
    fuel: 'Diesel',
    startDate: '01/06/2009',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1577: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '0 TSI',
    fuel: 'Petrole',
    startDate: '01/06/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1578: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1 TSI',
    fuel: 'Petrole',
    startDate: '01/06/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1579: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '60 1.4',
    fuel: 'Petrole',
    startDate: '01/10/1994',
    endDate: '01/10/1999',
    publishedAt: new Date()
  }
});

// Model 1580: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '60 1.6',
    fuel: 'Petrole',
    startDate: '01/10/1994',
    endDate: '01/10/1999',
    publishedAt: new Date()
  }
});

// Model 1581: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.4',
    fuel: 'Petrole',
    startDate: '01/10/1999',
    endDate: '01/09/2001',
    publishedAt: new Date()
  }
});

// Model 1582: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.2 12V',
    fuel: 'Petrole',
    startDate: '01/10/2001',
    endDate: '01/11/2009',
    publishedAt: new Date()
  }
});

// Model 1583: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.4 16V',
    fuel: 'Petrole',
    startDate: '01/10/2001',
    endDate: '01/11/2009',
    publishedAt: new Date()
  }
});

// Model 1584: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.4 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/11/2009',
    publishedAt: new Date()
  }
});

// Model 1585: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.9 SDI',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/11/2009',
    publishedAt: new Date()
  }
});

// Model 1586: POLO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'POLO',
    brand: 30,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2001',
    endDate: '01/11/2009',
    publishedAt: new Date()
  }
});

// Model 1587: SCIROCCO (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SCIROCCO',
    brand: 30,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/08/2008',
    endDate: '01/11/2017',
    publishedAt: new Date()
  }
});

// Model 1588: SHARAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SHARAN',
    brand: 30,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1995',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 1589: SHARAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'SHARAN',
    brand: 30,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/09/1995',
    endDate: '01/03/2010',
    publishedAt: new Date()
  }
});

// Model 1590: T-ROC (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'T-ROC',
    brand: 30,
    motorisation: '1.0 TSI',
    fuel: 'Petrole',
    startDate: '01/07/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1591: T-ROC (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'T-ROC',
    brand: 30,
    motorisation: '1.5 TSI',
    fuel: 'Petrole',
    startDate: '01/07/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1592: TIGUAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TIGUAN',
    brand: 30,
    motorisation: '2.0 TDI / 4motion',
    fuel: 'Diesel',
    startDate: '01/01/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1593: TIGUAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TIGUAN',
    brand: 30,
    motorisation: '2.0 TDI / 4motion',
    fuel: 'Diesel',
    startDate: '01/01/2016',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1594: TIGUAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TIGUAN',
    brand: 30,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/09/2007',
    endDate: '01/07/2018',
    publishedAt: new Date()
  }
});

// Model 1595: TIGUAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TIGUAN',
    brand: 30,
    motorisation: 'TDI 4motion',
    fuel: 'Diesel',
    startDate: '01/09/2007',
    endDate: '01/07/2018',
    publishedAt: new Date()
  }
});

// Model 1596: TIGUAN ALLSPACE (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TIGUAN ALLSPACE',
    brand: 30,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/06/2017',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1597: TOUAREG (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOUAREG',
    brand: 30,
    motorisation: '3.0 V6 TDI',
    fuel: 'Diesel',
    startDate: '01/01/2010',
    endDate: '01/03/2018',
    publishedAt: new Date()
  }
});

// Model 1598: TOUAREG (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOUAREG',
    brand: 30,
    motorisation: '2.5 R5 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2002',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 1599: TOUAREG (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOUAREG',
    brand: 30,
    motorisation: '3.0 V6 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2002',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 1600: TOUAREG (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOUAREG',
    brand: 30,
    motorisation: '5.0 V10 TDI',
    fuel: 'Diesel',
    startDate: '01/10/2002',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 1601: TOURAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOURAN',
    brand: 30,
    motorisation: '1.9 TDI',
    fuel: 'Diesel',
    startDate: '01/02/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 1602: TOURAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOURAN',
    brand: 30,
    motorisation: '2.0 TDI / TDI 16V',
    fuel: 'Diesel',
    startDate: '01/02/2003',
    endDate: '01/05/2010',
    publishedAt: new Date()
  }
});

// Model 1603: TOURAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOURAN',
    brand: 30,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/05/2010',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1604: TOURAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOURAN',
    brand: 30,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/05/2010',
    endDate: '01/05/2015',
    publishedAt: new Date()
  }
});

// Model 1605: TOURAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOURAN',
    brand: 30,
    motorisation: '1.6 TDI',
    fuel: 'Diesel',
    startDate: '01/05/2015',
    endDate: '01/05/2016',
    publishedAt: new Date()
  }
});

// Model 1606: TOURAN (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TOURAN',
    brand: 30,
    motorisation: '2.0 TDI',
    fuel: 'Diesel',
    startDate: '01/05/2015',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1607: TRANSPORTER IV Box (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRANSPORTER IV Box',
    brand: 30,
    motorisation: '1.9 D',
    fuel: 'Diesel',
    startDate: '01/07/1990',
    endDate: '01/04/2003',
    publishedAt: new Date()
  }
});

// Model 1608: TRANSPORTER IV Box (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRANSPORTER IV Box',
    brand: 30,
    motorisation: '2 TD',
    fuel: 'Diesel',
    startDate: '01/07/1990',
    endDate: '01/04/2003',
    publishedAt: new Date()
  }
});

// Model 1609: TRANSPORTER IV Box (volkswagen)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'TRANSPORTER IV Box',
    brand: 30,
    motorisation: '4 TD',
    fuel: 'Diesel',
    startDate: '01/07/1990',
    endDate: '01/04/2003',
    publishedAt: new Date()
  }
});

// Model 1610: V40 Hatchback (volvo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'V40 Hatchback',
    brand: 31,
    motorisation: 'D2',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1611: V40 Hatchback (volvo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'V40 Hatchback',
    brand: 31,
    motorisation: 'D3',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// Model 1612: V40 Hatchback (volvo)
await strapi.entityService.create('api::model.model', {
  data: {
    name: 'V40 Hatchback',
    brand: 31,
    motorisation: 'D4',
    fuel: 'Diesel',
    startDate: '01/03/2012',
    endDate: '',
    publishedAt: new Date()
  }
});

// ============================================
// SUMMARY
// ============================================
// Total brands to create: 31
// Total models to create: 1612

