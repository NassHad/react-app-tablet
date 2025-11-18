import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Testing CSV processing...');

const inputFile = path.join(__dirname, 'GUIDE AMPOULES OSRAM.csv');
console.log(`📁 Looking for file: ${inputFile}`);

if (fs.existsSync(inputFile)) {
  console.log('✅ File exists!');
  const content = fs.readFileSync(inputFile, 'utf8');
  console.log(`📖 File size: ${content.length} characters`);
  console.log(`📄 First 200 characters:`);
  console.log(content.substring(0, 200));
} else {
  console.log('❌ File not found!');
  console.log('📁 Available files:');
  const files = fs.readdirSync(__dirname);
  files.forEach(file => console.log(`   - ${file}`));
}
