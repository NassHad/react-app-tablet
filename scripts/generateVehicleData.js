import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, 'csv_db_brand_model_date.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV content
const lines = csvContent.split('\n');
const entries = [];

// Function to clean model names by removing technical codes in parentheses
const cleanModelName = (modelName) => {
  // Remove technical codes in parentheses like (B/C57_,_) or (S57_)
  // But keep important model information like "Box", "SW", "Convertible", etc.
  let cleaned = modelName
    .replace(/\([^)]*\)/g, '') // Remove everything in parentheses
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces
  
  // Remove remaining technical codes that might be left
  cleaned = cleaned
    .replace(/\s*\/\s*$/, '') // Remove trailing slashes
    .replace(/^\s*\/\s*/, '') // Remove leading slashes
    .replace(/\|\s*\.\d+/, '') // Remove |.2, |.3, etc.
    .replace(/\|\s*\+/, '') // Remove |+
    .replace(/\|\s*[A-Z\s]+$/, '') // Remove | RELAY, | DISPATCH, etc.
    .replace(/\s*\([^)]*$/, '') // Remove incomplete parentheses at the end
    .replace(/\s*\/\s*[A-Z\s]*$/, '') // Remove trailing slashes with text
    .replace(/\s+\d+\.\d+\s*\/\s*\d+V/, '') // Remove engine specs like "1.2 / 16V"
    .replace(/\s+\d+\.\d+\s+dCi/, '') // Remove diesel specs like "1.5 dCi"
    .trim();
  
  return cleaned;
};

// Skip header lines (first 2 lines)
for (let i = 2; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line) {
    const parts = line.split(';');
    if (parts.length >= 3) {
      const cleanedModel = cleanModelName(parts[1].trim());
      entries.push({
        brand: parts[0].trim(),
        model: cleanedModel,
        dateRange: parts[2].trim()
      });
    }
  }
}

// Generate TypeScript file content
const tsContent = `// Vehicle data from CSV file
export interface VehicleDataEntry {
  brand: string;
  model: string;
  dateRange: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  brandId: number;
  name: string;
}

export interface DateRange {
  id: number;
  modelId: number;
  range: string;
}

// Raw CSV data - ALL ${entries.length} entries from the CSV file
const CSV_DATA: VehicleDataEntry[] = [
${entries.map(entry => `  { brand: '${entry.brand.replace(/'/g, "\\'")}', model: '${entry.model.replace(/'/g, "\\'")}', dateRange: '${entry.dateRange.replace(/'/g, "\\'")}' }`).join(',\n')}
];

// Process the CSV data to create structured data
let brands: Brand[] = [];
let models: Model[] = [];
let dateRanges: DateRange[] = [];

// Initialize the data structures
const initializeData = () => {
  const brandMap = new Map<string, number>();
  const modelMap = new Map<string, number>();
  let brandId = 1;
  let modelId = 1;
  let dateRangeId = 1;

  CSV_DATA.forEach(entry => {
    // Add brand if not exists
    if (!brandMap.has(entry.brand)) {
      brandMap.set(entry.brand, brandId);
      brands.push({ id: brandId, name: entry.brand });
      brandId++;
    }

    const currentBrandId = brandMap.get(entry.brand)!;

    // Add model if not exists
    const modelKey = \`\${entry.brand}-\${entry.model}\`;
    if (!modelMap.has(modelKey)) {
      modelMap.set(modelKey, modelId);
      models.push({ id: modelId, brandId: currentBrandId, name: entry.model });
      modelId++;
    }

    const currentModelId = modelMap.get(modelKey)!;

    // Add date range
    dateRanges.push({ id: dateRangeId, modelId: currentModelId, range: entry.dateRange });
    dateRangeId++;
  });
};

// Initialize data on module load
initializeData();

// Export functions to get data
export const getBrands = (): Brand[] => {
  return brands.sort((a, b) => a.name.localeCompare(b.name));
};

export const getModelsByBrand = (brandId: number): Model[] => {
  return models
    .filter(model => model.brandId === brandId)
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getDateRangesByModel = (modelId: number): DateRange[] => {
  return dateRanges
    .filter(dateRange => dateRange.modelId === modelId)
    .sort((a, b) => a.range.localeCompare(b.range));
};

export const getBrandById = (brandId: number): Brand | undefined => {
  return brands.find(brand => brand.id === brandId);
};

export const getModelById = (modelId: number): Model | undefined => {
  return models.find(model => model.id === modelId);
};
`;

// Write the generated file
const outputPath = path.join(__dirname, '..', 'src', 'utils', 'vehicleData.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`✅ Generated vehicleData.ts with ${entries.length} entries`);
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Total entries processed: ${entries.length}`);
