const fs = require('fs');
const path = require('path');

// Read the parsed JSON file
const jsonPath = path.join(__dirname, 'osram_bulbs_parsed.json');
const jsonContent = fs.readFileSync(jsonPath, 'utf8');
const bulbData = JSON.parse(jsonContent);

// Extract unique brands (filter out invalid entries)
const brandSet = new Set();
bulbData.forEach(entry => {
  if (entry.brand && 
      entry.brand.trim() !== '' && 
      !entry.brand.startsWith('*') && 
      !entry.brand.includes(';') &&
      entry.brand.length > 1) {
    brandSet.add(entry.brand.trim());
  }
});

// Convert to array and sort alphabetically
const uniqueBrands = Array.from(brandSet).sort();

// Create brand objects with the required structure
const brands = uniqueBrands.map((brandName, index) => {
  // Create slug from brand name
  const slug = brandName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();

  return {
    id: index + 1,
    name: brandName,
    slug: slug,
    isActive: true
  };
});

// Write brands JSON file
const outputPath = path.join(__dirname, 'osram_brands.json');
fs.writeFileSync(outputPath, JSON.stringify(brands, null, 2));

console.log(`\nBrands extraction complete!`);
console.log(`Total unique brands: ${brands.length}`);
console.log(`Output file: ${outputPath}`);

// Show sample brands
console.log(`\nSample brands:`);
console.log(JSON.stringify(brands.slice(0, 5), null, 2));

// Show all brand names
console.log(`\nAll brands:`);
brands.forEach(brand => {
  console.log(`${brand.id}: ${brand.name} (${brand.slug})`);
});
