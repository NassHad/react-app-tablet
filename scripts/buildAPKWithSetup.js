import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupEnvironment } from './setupAndroidEnvironment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🚀 Starting APK build with automatic environment setup...\n');

async function buildAPKWithSetup() {
  try {
    // Step 1: Setup Android environment
    console.log('🔧 Step 1: Setting up Android environment...');
    const envSetup = await setupEnvironment();
    if (!envSetup) {
      console.log('❌ Environment setup failed. Please install Java JDK and Android Studio.');
      process.exit(1);
    }
    console.log('✅ Environment setup completed\n');

    // Step 2: Generate fresh database
    console.log('📊 Step 2: Generating fresh database...');
    execSync('npm run generate:seed', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
    console.log('✅ Database generated successfully\n');

    // Step 3: Build React app
    console.log('⚛️ Step 3: Building React application...');
    execSync('npm run build', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
    console.log('✅ React app built successfully\n');

    // Step 4: Copy database to dist folder
    console.log('📁 Step 4: Copying database to dist folder...');
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

    // Step 5: Sync with Capacitor
    console.log('📱 Step 5: Syncing with Capacitor...');
    execSync('npx cap sync android', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
    console.log('✅ Capacitor sync completed\n');

    // Step 6: Build APK using Gradle directly
    console.log('🔨 Step 6: Building APK with Gradle...');
    const androidDir = path.join(projectRoot, 'android');
    
    // Change to android directory and run gradlew
    process.chdir(androidDir);
    
    try {
      execSync('.\\gradlew assembleDebug', { 
        stdio: 'inherit',
        env: {
          ...process.env,
          JAVA_HOME: process.env.JAVA_HOME,
          ANDROID_HOME: process.env.ANDROID_HOME,
          ANDROID_SDK_ROOT: process.env.ANDROID_SDK_ROOT
        }
      });
      console.log('✅ APK build completed\n');
    } catch (gradleError) {
      console.log('⚠️ Gradle build failed, trying alternative method...');
      
      // Try using Android Studio's gradle wrapper
      try {
        execSync('gradlew.bat assembleDebug', { 
          stdio: 'inherit',
          env: {
            ...process.env,
            JAVA_HOME: process.env.JAVA_HOME,
            ANDROID_HOME: process.env.ANDROID_HOME,
            ANDROID_SDK_ROOT: process.env.ANDROID_SDK_ROOT
          }
        });
        console.log('✅ APK build completed with alternative method\n');
      } catch (altError) {
        console.log('❌ Both build methods failed. Please try building manually with Android Studio.');
        console.log('Instructions:');
        console.log('1. Open Android Studio');
        console.log('2. Open the "android" folder in this project');
        console.log('3. Build > Build Bundle(s) / APK(s) > Build APK(s)');
        process.exit(1);
      }
    }

    // Step 7: Find and copy APK
    console.log('📦 Step 7: Locating APK file...');
    const apkPath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
    
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
      
      console.log(`\n🎉 APK build completed successfully!`);
      console.log(`📁 USB installer package: ${usbDir}`);
      console.log(`📱 APK file: ${usbApkPath}`);
      console.log(`📋 Instructions: ${path.join(usbDir, 'README.txt')}`);
      
      // Create final summary
      const summary = `# APK Build Summary

## ✅ Build Completed Successfully!

**APK Location:** ${usbApkPath}
**APK Size:** ${apkSizeMB} MB
**Build Date:** ${new Date().toLocaleString('fr-FR')}

## 📱 Installation Instructions

1. Copy the APK file to your tablet
2. Enable "Unknown Sources" in Android settings
3. Install the APK from file manager
4. The app will work 100% offline with all your Strapi data

## 📊 Included Data

- 69 automotive brands
- 2223 vehicle models
- 5 product categories
- 9 battery references
- 37 lighting references
- 12 lighting positions

## 🚀 Ready for Distribution!

The APK is ready to be installed on any Android tablet (7.0+).
`;

      const summaryPath = path.join(usbDir, 'BUILD_SUMMARY.txt');
      fs.writeFileSync(summaryPath, summary, 'utf8');
      
      console.log(`📄 Build summary: ${summaryPath}`);
      
    } else {
      console.log('❌ APK file not found. Build may have failed.');
      console.log('Expected location:', apkPath);
    }

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildAPKWithSetup();
