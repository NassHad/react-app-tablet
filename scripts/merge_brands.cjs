const fs = require('fs');
const path = require('path');

// Read both brand files
const brandsPath = path.join(__dirname, 'brands.json');
const osramBrandsPath = path.join(__dirname, 'osram_brands.json');

const brandsContent = fs.readFileSync(brandsPath, 'utf8');
const osramBrandsContent = fs.readFileSync(osramBrandsPath, 'utf8');

const brands = JSON.parse(brandsContent);
const osramBrands = JSON.parse(osramBrandsContent);

console.log(`Original brands.json: ${brands.length} brands`);
console.log(`OSRAM brands.json: ${osramBrands.length} brands`);

// Create a map to track unique brands by slug
const brandMap = new Map();

// Add brands from brands.json first (these are the existing ones)
brands.forEach((brand, index) => {
  const slug = brand.slug.toLowerCase();
  brandMap.set(slug, {
    id: index + 1,
    name: brand.name,
    slug: brand.slug,
    isActive: true,
    source: 'existing'
  });
});

// Add brands from OSRAM, but avoid duplicates
let nextId = brands.length + 1;
let addedCount = 0;
let duplicateCount = 0;

osramBrands.forEach(osramBrand => {
  const slug = osramBrand.slug.toLowerCase();
  
  if (brandMap.has(slug)) {
    // Check if names are different but slugs are same
    const existing = brandMap.get(slug);
    if (existing.name !== osramBrand.name) {
      console.log(`Name conflict for slug "${slug}": "${existing.name}" vs "${osramBrand.name}"`);
      // Keep the existing one, but log the conflict
    }
    duplicateCount++;
  } else {
    brandMap.set(slug, {
      id: nextId++,
      name: osramBrand.name,
      slug: osramBrand.slug,
      isActive: true,
      source: 'osram'
    });
    addedCount++;
  }
});

// Convert map to array and sort by name
const mergedBrands = Array.from(brandMap.values()).sort((a, b) => {
  return a.name.localeCompare(b.name);
});

// Reassign IDs sequentially
mergedBrands.forEach((brand, index) => {
  brand.id = index + 1;
});

// Write merged brands file
const outputPath = path.join(__dirname, 'merged_brands.json');
fs.writeFileSync(outputPath, JSON.stringify(mergedBrands, null, 2));

console.log(`\nMerging complete!`);
console.log(`Total merged brands: ${mergedBrands.length}`);
console.log(`Added from OSRAM: ${addedCount}`);
console.log(`Duplicates found: ${duplicateCount}`);
console.log(`Output file: ${outputPath}`);

// Show statistics by source
const existingCount = mergedBrands.filter(b => b.source === 'existing').length;
const osramCount = mergedBrands.filter(b => b.source === 'osram').length;

console.log(`\nFinal breakdown:`);
console.log(`- From existing brands.json: ${existingCount}`);
console.log(`- From OSRAM data: ${osramCount}`);

// Show sample of merged brands
console.log(`\nSample merged brands:`);
console.log(JSON.stringify(mergedBrands.slice(0, 10), null, 2));

// Show brands that were added from OSRAM
const addedBrands = mergedBrands.filter(b => b.source === 'osram');
console.log(`\nBrands added from OSRAM (${addedBrands.length}):`);
addedBrands.forEach(brand => {
  console.log(`- ${brand.name} (${brand.slug})`);
});
