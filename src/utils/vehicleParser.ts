/**
 * Vehicle Data Parser Utility
 * 
 * Parses vehicle data from CSV format and extracts:
 * - Model (e.g., "Q7 (4LB)")
 * - Motorization (e.g., "3.0 TDI quattro")
 * - Fuel type (e.g., "Diesel")
 * - Creation date (e.g., "2006-03")
 * - Last compatible date (e.g., "2015-08")
 * - Battery types: AGM, EFB, Conventionnelle
 */

export interface ParsedVehicleData {
  model: string;
  motorization: string;
  fuelType: string;
  creationDate: string;
  lastCompatibleDate: string;
  agm?: string; // F4XX format
  efb?: string; // F3XX or FLXXXX format
  conventionnelle?: string; // FXX format (2 characters)
  rawData: string;
}

export interface BatteryTypeInfo {
  agm?: string;
  efb?: string;
  conventionnelle?: string;
}

/**
 * Detects battery types from the remaining parts after parsing basic vehicle info
 * 
 * Rules:
 * - AGM: Always starts with "F4" and has exactly 3 characters
 * - EFB: Always starts with "F3" (3 characters) or "FL" (more than 3 characters)
 * - Conventionnelle: Always starts with "F" and has exactly 2 characters
 */
function detectBatteryTypes(remainingParts: string[]): BatteryTypeInfo {
  const batteryInfo: BatteryTypeInfo = {};
  
  for (const part of remainingParts) {
    const trimmedPart = part.trim();
    
    // AGM: F4XX (exactly 3 characters)
    if (trimmedPart.startsWith('F4') && trimmedPart.length === 3) {
      batteryInfo.agm = trimmedPart;
    }
    // EFB: F3XX (3 characters) or FLXXXX (more than 3 characters)
    else if ((trimmedPart.startsWith('F3') && trimmedPart.length === 3) || 
             (trimmedPart.startsWith('FL') && trimmedPart.length > 3)) {
      batteryInfo.efb = trimmedPart;
    }
    // Conventionnelle: FXX (exactly 2 characters)
    else if (trimmedPart.startsWith('F') && trimmedPart.length === 2) {
      batteryInfo.conventionnelle = trimmedPart;
    }
  }
  
  return batteryInfo;
}

/**
 * Parses a single vehicle data line from the CSV
 * 
 * Expected format: "Q7 (4LB) 3.0 TDI quattro Diesel 2006-03 2015-08 F44 FL1050 F4"
 * 
 * @param line - Raw line from CSV
 * @returns Parsed vehicle data or null if parsing fails
 */
export function parseVehicleLine(line: string): ParsedVehicleData | null {
  if (!line || line.trim() === '') {
    return null;
  }

  const trimmedLine = line.trim();
  const parts = trimmedLine.split(/\s+/);
  
  if (parts.length < 6) {
    console.warn('Invalid vehicle data format - insufficient parts:', trimmedLine);
    return null;
  }

  try {
    // Find the model (first part, may contain parentheses)
    let modelIndex = 0;
    let model = parts[modelIndex];
    
    // If the model contains parentheses, it might span multiple parts
    if (model.includes('(') && !model.includes(')')) {
      // Look for the closing parenthesis
      let tempModel = model;
      let i = modelIndex + 1;
      while (i < parts.length && !tempModel.includes(')')) {
        tempModel += ' ' + parts[i];
        i++;
      }
      model = tempModel;
      modelIndex = i - 1;
    }

    // Find motorization (starts after model, ends before fuel type)
    let motorizationIndex = modelIndex + 1;
    let motorization = '';
    
    // Look for fuel type keywords
    const fuelTypes = ['Diesel', 'Petrole', 'Essence', 'Hybride', 'Electrique'];
    let fuelTypeIndex = -1;
    
    for (let i = motorizationIndex; i < parts.length; i++) {
      if (fuelTypes.includes(parts[i])) {
        fuelTypeIndex = i;
        break;
      }
    }
    
    if (fuelTypeIndex === -1) {
      console.warn('No fuel type found in vehicle data:', trimmedLine);
      return null;
    }
    
    // Build motorization from parts between model and fuel type
    for (let i = motorizationIndex; i < fuelTypeIndex; i++) {
      motorization += (motorization ? ' ' : '') + parts[i];
    }
    
    const fuelType = parts[fuelTypeIndex];
    
    // Find dates (format: YYYY-MM)
    const datePattern = /^\d{4}-\d{2}$/;
    let creationDate = '';
    let lastCompatibleDate = '';
    let dateIndex = fuelTypeIndex + 1;
    
    // Look for the first date
    if (dateIndex < parts.length && datePattern.test(parts[dateIndex])) {
      creationDate = parts[dateIndex];
      dateIndex++;
    }
    
    // Look for the second date
    if (dateIndex < parts.length && datePattern.test(parts[dateIndex])) {
      lastCompatibleDate = parts[dateIndex];
      dateIndex++;
    }
    
    // Get remaining parts for battery type detection
    const remainingParts = parts.slice(dateIndex);
    const batteryInfo = detectBatteryTypes(remainingParts);
    
    return {
      model,
      motorization,
      fuelType,
      creationDate,
      lastCompatibleDate,
      ...batteryInfo,
      rawData: trimmedLine
    };
    
  } catch (error) {
    console.error('Error parsing vehicle line:', error, 'Line:', trimmedLine);
    return null;
  }
}

/**
 * Parses multiple vehicle data lines from CSV content
 * 
 * @param csvContent - Raw CSV content
 * @returns Array of parsed vehicle data
 */
export function parseVehicleData(csvContent: string): ParsedVehicleData[] {
  const lines = csvContent.split('\n');
  const parsedData: ParsedVehicleData[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and header lines
    if (trimmedLine === '' || trimmedLine.startsWith('AUDI') || trimmedLine.includes('Brand')) {
      continue;
    }
    
    const parsed = parseVehicleLine(trimmedLine);
    if (parsed) {
      parsedData.push(parsed);
    }
  }
  
  return parsedData;
}

/**
 * Groups parsed vehicle data by model
 * 
 * @param vehicleData - Array of parsed vehicle data
 * @returns Object with model names as keys and arrays of vehicle data as values
 */
export function groupVehiclesByModel(vehicleData: ParsedVehicleData[]): Record<string, ParsedVehicleData[]> {
  return vehicleData.reduce((groups, vehicle) => {
    const model = vehicle.model;
    if (!groups[model]) {
      groups[model] = [];
    }
    groups[model].push(vehicle);
    return groups;
  }, {} as Record<string, ParsedVehicleData[]>);
}

/**
 * Filters vehicles by battery type
 * 
 * @param vehicleData - Array of parsed vehicle data
 * @param batteryType - 'agm', 'efb', or 'conventionnelle'
 * @returns Filtered array of vehicle data
 */
export function filterVehiclesByBatteryType(vehicleData: ParsedVehicleData[], batteryType: 'agm' | 'efb' | 'conventionnelle'): ParsedVehicleData[] {
  return vehicleData.filter(vehicle => {
    switch (batteryType) {
      case 'agm':
        return !!vehicle.agm;
      case 'efb':
        return !!vehicle.efb;
      case 'conventionnelle':
        return !!vehicle.conventionnelle;
      default:
        return false;
    }
  });
}

/**
 * Example usage and test data
 */
export const exampleUsage = `
// Example usage:
const csvData = \`
AUDI
A1 1.6 TDI Diesel 2010-05 2015-04 F40
Q7 (4LB) 3.0 TDI quattro Diesel 2006-03 2015-08 F44 FL1050 F4
A3 1.6 TDI Diesel 2012-10 F32
\`;

const parsedVehicles = parseVehicleData(csvData);
console.log('Parsed vehicles:', parsedVehicles);

// Group by model
const grouped = groupVehiclesByModel(parsedVehicles);
console.log('Grouped by model:', grouped);

// Filter by battery type
const agmVehicles = filterVehiclesByBatteryType(parsedVehicles, 'agm');
console.log('AGM vehicles:', agmVehicles);
`;

// Export for testing
export const testData = [
  'AUDI',
  'A1 1.6 TDI Diesel 2010-05 2015-04 F40',
  'A1, A1 Sportback 1.4 TDI, 1.6 TDI Diesel 2011-03 2018-10 F32',
  'A1, A1 Sportback 1.2 TFSI Petrole 2010-05 2015-04 F40',
  'A1, A1 Sportback 1.0 TFSI, 1.4 TFSI Petrole 2010-05 2018-10 F31',
  'A3 (8L1), A3 Convertible (8P7), A3 Sportback (8PA) 1.6 TDI, 1.9 TDI, 2.0 TDI quattro, 2.0 TDI 16V, 2.0 TDI 16V quattro Diesel 1996-09 2013-03 F32',
  'A3, A3 Sportback 1.6 TDI, 1.6 TDI quattro, 2.0 TDI, 2.0 TDI quattro, 30 TDI (1.6) Diesel 2012-10 F32',
  'A4 (8D2, B5), A4 Avant (8D5, B5), A4 Convertible (8H7, B6, 8HE, B7) 1.9 TDI, 2.0 TDI 16V, 2.5 TDI, 2.5 TDI quattro, Diesel 1995-01 2015-12',
  'A5 (8T3), A5 Sportback (8TA) 2.7 TDI, 3.0 TDI quattro Diesel 2007-06 2012-03 F44',
  'A6 (4B2, C5, 4F2, C6, 4G2, 4GC, C7), A6 Avant (4B5, C5, 4F5, C6) 2.5 TDI, 2.5 TDI quattro, 2.7 TDI, 2.7 TDI quattro 3.0 TDI quattro Diesel 1997-07 2018-09 FL800 F42',
  'Q3 (8UB, 8UG), Q3 (F3B) 2.0 TDI, 2.0 TDI quattro, 35 TDI quattro (2.0) Diesel 2011-06 F32',
  'Q5 (8RB) 2.0 TDI quattro Diesel 2008-11 F44',
  'Q5 (8RB) 2.0 TDI, 2.0 TDI quattro Diesel 2012-06 F32',
  'Q7 (4LB) 3.0 TDI quattro Diesel 2006-03 2015-08 F44 FL1050 F4'
];
