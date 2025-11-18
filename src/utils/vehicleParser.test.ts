/**
 * Test file for vehicle parser utility
 * Run this to test the parser with your CSV data
 */

import { 
  parseVehicleLine, 
  parseVehicleData, 
  groupVehiclesByModel, 
  filterVehiclesByBatteryType,
  testData 
} from './vehicleParser';

// Test individual line parsing
console.log('=== Testing Individual Line Parsing ===');
const testLine = 'Q7 (4LB) 3.0 TDI quattro Diesel 2006-03 2015-08 F44 FL1050 F4';
const parsedLine = parseVehicleLine(testLine);
console.log('Parsed line:', JSON.stringify(parsedLine, null, 2));

// Test full CSV parsing
console.log('\n=== Testing Full CSV Parsing ===');
const csvContent = testData.join('\n');
const allVehicles = parseVehicleData(csvContent);
console.log(`Parsed ${allVehicles.length} vehicles:`);
allVehicles.forEach((vehicle, index) => {
  console.log(`${index + 1}. ${vehicle.model} - ${vehicle.motorization} (${vehicle.fuelType})`);
  if (vehicle.agm) console.log(`   AGM: ${vehicle.agm}`);
  if (vehicle.efb) console.log(`   EFB: ${vehicle.efb}`);
  if (vehicle.conventionnelle) console.log(`   Conventionnelle: ${vehicle.conventionnelle}`);
});

// Test grouping by model
console.log('\n=== Testing Grouping by Model ===');
const grouped = groupVehiclesByModel(allVehicles);
Object.keys(grouped).forEach(model => {
  console.log(`${model}: ${grouped[model].length} variants`);
});

// Test filtering by battery type
console.log('\n=== Testing Battery Type Filtering ===');
const agmVehicles = filterVehiclesByBatteryType(allVehicles, 'agm');
const efbVehicles = filterVehiclesByBatteryType(allVehicles, 'efb');
const conventionnelleVehicles = filterVehiclesByBatteryType(allVehicles, 'conventionnelle');

console.log(`AGM vehicles: ${agmVehicles.length}`);
console.log(`EFB vehicles: ${efbVehicles.length}`);
console.log(`Conventionnelle vehicles: ${conventionnelleVehicles.length}`);

// Show some examples
console.log('\n=== AGM Vehicle Examples ===');
agmVehicles.slice(0, 3).forEach(vehicle => {
  console.log(`${vehicle.model} - AGM: ${vehicle.agm}`);
});

console.log('\n=== EFB Vehicle Examples ===');
efbVehicles.slice(0, 3).forEach(vehicle => {
  console.log(`${vehicle.model} - EFB: ${vehicle.efb}`);
});

console.log('\n=== Conventionnelle Vehicle Examples ===');
conventionnelleVehicles.slice(0, 3).forEach(vehicle => {
  console.log(`${vehicle.model} - Conventionnelle: ${vehicle.conventionnelle}`);
});
