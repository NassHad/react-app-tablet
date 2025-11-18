const fs = require('fs');
const path = require('path');

const dataSourcePath = path.join(__dirname, '..', 'src', 'config', 'dataSource.ts');

console.log('🔄 Switching data source mode...\n');

// Read current configuration
const currentContent = fs.readFileSync(dataSourcePath, 'utf8');

// Check current mode
const isWebMode = currentContent.includes('currentSource: DataSource.STRAPI');
const isAPKMode = currentContent.includes('currentSource: DataSource.LOCAL_DATABASE');

if (isWebMode) {
  console.log('📱 Current mode: WEB (Strapi localhost:1338)');
  console.log('🔄 Switching to APK mode (Local Database)...');
  
  // Switch to APK mode
  let newContent = currentContent
    .replace('currentSource: DataSource.STRAPI', 'currentSource: DataSource.LOCAL_DATABASE')
    .replace('fallbackToMock: true', 'fallbackToMock: false')
    .replace('// Use STRAPI for web development', '// Use LOCAL_DATABASE for offline APK');
  
  fs.writeFileSync(dataSourcePath, newContent);
  console.log('✅ Switched to APK mode (Local Database)');
  
} else if (isAPKMode) {
  console.log('📱 Current mode: APK (Local Database)');
  console.log('🔄 Switching to WEB mode (Strapi localhost:1338)...');
  
  // Switch to web mode
  let newContent = currentContent
    .replace('currentSource: DataSource.LOCAL_DATABASE', 'currentSource: DataSource.STRAPI')
    .replace('fallbackToMock: false', 'fallbackToMock: true')
    .replace('// Use LOCAL_DATABASE for offline APK', '// Use STRAPI for web development');
  
  fs.writeFileSync(dataSourcePath, newContent);
  console.log('✅ Switched to WEB mode (Strapi localhost:1338)');
  
} else {
  console.log('❌ Could not determine current mode');
  process.exit(1);
}

console.log('\n📋 Next steps:');
console.log('1. Run "npm run dev" for web development');
console.log('2. Run "npm run build:apk:auto" for APK generation');
console.log('3. Use this script to switch between modes anytime');
