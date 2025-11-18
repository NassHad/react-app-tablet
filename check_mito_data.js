const Database = require('better-sqlite3');
const db = new Database('./public/assets/databases/react-app-db.db');

console.log('🔍 Vérification des données Alfa Romeo Mito...\n');

// 1. Vérifier si la marque Alfa Romeo existe
const brands = db.prepare('SELECT * FROM brands WHERE name LIKE "%alfa%" OR name LIKE "%romeo%"').all();
console.log('🏷️ Marques Alfa Romeo trouvées:', brands);

// 2. Vérifier les modèles Mito
const models = db.prepare('SELECT * FROM models WHERE name LIKE "%mito%"').all();
console.log('🚗 Modèles Mito trouvés:', models);

// 3. Vérifier les produits d'éclairage pour Mito
const lightProducts = db.prepare('SELECT * FROM lights_products WHERE model_slug LIKE "%mito%"').all();
console.log('💡 Produits d\'éclairage pour Mito:', lightProducts.length, 'trouvés');

// 4. Vérifier les positions d'éclairage
const positions = db.prepare('SELECT * FROM positions').all();
console.log('📍 Positions d\'éclairage disponibles:', positions.map(p => p.name));

// 5. Vérifier les données d'éclairage
const lightData = db.prepare('SELECT * FROM light_data LIMIT 5').all();
console.log('🔦 Exemple de données d\'éclairage:', lightData);

// 6. Vérifier les relations entre modèles et marques
const mitoWithBrand = db.prepare(`
  SELECT m.*, b.name as brand_name 
  FROM models m 
  JOIN brands b ON m.brand_slug = b.slug 
  WHERE m.name LIKE "%mito%"
`).all();
console.log('🔗 Mito avec marque:', mitoWithBrand);

// 7. Vérifier les produits d'éclairage par marque
const alfaLightProducts = db.prepare(`
  SELECT lp.*, b.name as brand_name, m.name as model_name
  FROM lights_products lp
  JOIN brands b ON lp.brand_slug = b.slug
  JOIN models m ON lp.model_slug = m.slug
  WHERE b.name LIKE "%alfa%" OR b.name LIKE "%romeo%"
`).all();
console.log('💡 Produits d\'éclairage Alfa Romeo:', alfaLightProducts.length, 'trouvés');

db.close();
