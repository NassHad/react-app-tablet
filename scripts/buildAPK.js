import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🚀 Starting APK build process...\n');

async function buildAPK() {
  try {
    // Step 1: Generate fresh database
    console.log('📊 Step 1: Generating fresh database...');
    execSync('npm run generate:seed', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
    console.log('✅ Database generated successfully\n');

    // Step 2: Build React app
    console.log('⚛️ Step 2: Building React application...');
    execSync('npm run build', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
    console.log('✅ React app built successfully\n');

    // Step 3: Copy database to dist folder
    console.log('📁 Step 3: Copying database to dist folder...');
    const sourceDb = path.join(projectRoot, 'public', 'assets', 'databases', 'react-app-db.db');
    const distDbDir = path.join(projectRoot, 'dist', 'assets', 'databases');
    const distDb = path.join(distDbDir, 'react-app-db.db');
    
    // Ensure dist/assets/databases directory exists
    if (!fs.existsSync(distDbDir)) {
      fs.mkdirSync(distDbDir, { recursive: true });
    }
    
    // Copy database file
    fs.copyFileSync(sourceDb, distDb);
    console.log('✅ Database copied to dist folder\n');

    // Step 4: Sync with Capacitor
    console.log('📱 Step 4: Syncing with Capacitor...');
    execSync('npx cap sync android', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
    console.log('✅ Capacitor sync completed\n');

    // Step 5: Build APK
    console.log('🔨 Step 5: Building APK...');
    execSync('npx cap build android', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
    console.log('✅ APK build completed\n');

    // Step 6: Find and copy APK
    console.log('📦 Step 6: Locating APK file...');
    const apkPath = path.join(projectRoot, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
    
    if (fs.existsSync(apkPath)) {
      const apkSize = fs.statSync(apkPath).size;
      const apkSizeMB = (apkSize / (1024 * 1024)).toFixed(2);
      console.log(`✅ APK found: ${apkPath}`);
      console.log(`📊 APK size: ${apkSizeMB} MB`);
      
      // Create USB installer directory
      const usbDir = path.join(projectRoot, 'usb-installer');
      if (!fs.existsSync(usbDir)) {
        fs.mkdirSync(usbDir, { recursive: true });
      }
      
      // Copy APK to USB installer directory
      const usbApkPath = path.join(usbDir, 'react-app-tablet.apk');
      fs.copyFileSync(apkPath, usbApkPath);
      
      // Create installation instructions
      const instructions = `# Installation Instructions

## Application React Tablet - Installation sur Android

### Fichiers inclus:
- react-app-tablet.apk (${apkSizeMB} MB)

### Prérequis:
- Tablette Android (version 7.0+ recommandée)
- Autorisation d'installation d'applications inconnues activée

### Installation:
1. Copiez le fichier react-app-tablet.apk sur votre tablette
2. Ouvrez le gestionnaire de fichiers sur la tablette
3. Naviguez vers le fichier APK
4. Appuyez sur le fichier APK
5. Suivez les instructions d'installation
6. L'application sera installée et prête à utiliser

### Fonctionnalités:
- Application 100% hors ligne
- Base de données SQLite intégrée
- Interface optimisée pour tablette
- Recherche de pièces automobiles

### Support:
En cas de problème, vérifiez que:
- La tablette a suffisamment d'espace libre
- Les autorisations d'installation sont activées
- La version Android est compatible (7.0+)

Généré le: ${new Date().toLocaleString('fr-FR')}
`;

      const instructionsPath = path.join(usbDir, 'README.txt');
      fs.writeFileSync(instructionsPath, instructions, 'utf8');
      
      console.log(`\n🎉 APK build completed successfully!`);
      console.log(`📁 USB installer package created in: ${usbDir}`);
      console.log(`📱 APK file: ${usbApkPath}`);
      console.log(`📋 Instructions: ${instructionsPath}`);
      
    } else {
      console.log('❌ APK file not found. Build may have failed.');
      console.log('Expected location:', apkPath);
    }

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildAPK();
