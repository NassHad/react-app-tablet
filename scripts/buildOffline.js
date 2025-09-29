import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DB_PATH = path.join(__dirname, '..', 'public', 'assets', 'databases', 'react-app-db.db');
const ANDROID_DB_PATH = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'assets', 'databases', 'react-app-db.db');

async function main() {
  try {
    console.log('🚀 Starting offline build process...');
    
    // 1. Generate seed database
    console.log('📦 Step 1: Generating seed database...');
    execSync('npm run generate:seed', { stdio: 'inherit' });
    
    // 2. Verify seed database exists
    if (!fs.existsSync(PUBLIC_DB_PATH)) {
      throw new Error('Seed database not found. Run npm run generate:seed first.');
    }
    
    const stats = fs.statSync(PUBLIC_DB_PATH);
    console.log(`✅ Seed database generated: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
    // 3. Create Android assets directory
    console.log('📁 Step 2: Creating Android assets directory...');
    const androidAssetsDir = path.dirname(ANDROID_DB_PATH);
    if (!fs.existsSync(androidAssetsDir)) {
      fs.mkdirSync(androidAssetsDir, { recursive: true });
    }
    
    // 4. Copy database to Android assets
    console.log('📋 Step 3: Copying database to Android assets...');
    fs.copyFileSync(PUBLIC_DB_PATH, ANDROID_DB_PATH);
    console.log(`✅ Database copied to Android assets: ${ANDROID_DB_PATH}`);
    
    // 5. Build frontend
    console.log('🔨 Step 4: Building frontend...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // 6. Sync with Capacitor
    console.log('🔄 Step 5: Syncing with Capacitor...');
    execSync('npx cap sync', { stdio: 'inherit' });
    
    console.log('🎉 Offline build completed successfully!');
    console.log('');
    console.log('📱 Next steps:');
    console.log('1. Open Android Studio: npm run android');
    console.log('2. Build signed APK in Android Studio');
    console.log('3. Install APK on tablet');
    console.log('4. Test offline functionality');
    
  } catch (error) {
    console.error('❌ Offline build failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
