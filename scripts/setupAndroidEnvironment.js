import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🔧 Setting up Android environment...\n');

// Find Java installation
function findJavaInstallation() {
  const possiblePaths = [
    'C:\\Program Files\\Eclipse Adoptium\\jdk-17*',
    'C:\\Program Files\\Java\\jdk-17*',
    'C:\\Program Files\\Android\\Android Studio\\jbr',
    'C:\\Program Files\\Android\\Android Studio\\jre'
  ];

  for (const pattern of possiblePaths) {
    try {
      const result = execSync(`dir "${pattern}" /b 2>nul`, { encoding: 'utf8' });
      if (result.trim()) {
        const javaPath = path.join(pattern.replace('*', result.trim().split('\n')[0]));
        if (fs.existsSync(javaPath)) {
          console.log(`✅ Found Java at: ${javaPath}`);
          return javaPath;
        }
      }
    } catch (e) {
      // Continue searching
    }
  }
  
  return null;
}

// Find Android SDK
function findAndroidSDK() {
  const possiblePaths = [
    process.env.ANDROID_HOME,
    process.env.ANDROID_SDK_ROOT,
    path.join(process.env.LOCALAPPDATA, 'Android', 'Sdk'),
    path.join(process.env.USERPROFILE, 'AppData', 'Local', 'Android', 'Sdk')
  ];

  for (const sdkPath of possiblePaths) {
    if (sdkPath && fs.existsSync(sdkPath)) {
      console.log(`✅ Found Android SDK at: ${sdkPath}`);
      return sdkPath;
    }
  }
  
  return null;
}

async function setupEnvironment() {
  try {
    // Find Java
    const javaPath = findJavaInstallation();
    if (!javaPath) {
      console.log('❌ Java JDK not found. Please install Java JDK 17 or later.');
      console.log('Download from: https://adoptium.net/');
      return false;
    }

    // Find Android SDK
    const androidSdkPath = findAndroidSDK();
    if (!androidSdkPath) {
      console.log('❌ Android SDK not found. Please install Android Studio.');
      console.log('Download from: https://developer.android.com/studio');
      return false;
    }

    // Set environment variables for this session
    process.env.JAVA_HOME = javaPath;
    process.env.ANDROID_HOME = androidSdkPath;
    process.env.ANDROID_SDK_ROOT = androidSdkPath;
    
    // Add to PATH
    const platformTools = path.join(androidSdkPath, 'platform-tools');
    const buildTools = path.join(androidSdkPath, 'build-tools');
    
    if (fs.existsSync(platformTools)) {
      process.env.PATH = `${platformTools};${process.env.PATH}`;
    }
    
    // Find latest build tools version
    if (fs.existsSync(buildTools)) {
      const versions = fs.readdirSync(buildTools).filter(v => v.match(/^\d+\.\d+\.\d+$/));
      if (versions.length > 0) {
        const latestVersion = versions.sort().pop();
        const latestBuildTools = path.join(buildTools, latestVersion);
        if (fs.existsSync(latestBuildTools)) {
          process.env.PATH = `${latestBuildTools};${process.env.PATH}`;
          console.log(`✅ Using build-tools version: ${latestVersion}`);
        }
      }
    }

    console.log(`✅ Environment configured:`);
    console.log(`   JAVA_HOME: ${process.env.JAVA_HOME}`);
    console.log(`   ANDROID_HOME: ${process.env.ANDROID_HOME}`);
    console.log(`   PATH updated with Android tools`);
    
    return true;
  } catch (error) {
    console.error('❌ Error setting up environment:', error.message);
    return false;
  }
}

export { setupEnvironment };
