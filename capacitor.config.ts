import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.autoparts.kiosk',
  appName: 'AutoParts Kiosk',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3b82f6",
      showSpinner: true,
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#3b82f6'
    },
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false,
      iosKeychainPrefix: 'YOUR_APP_NAME',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: 'Biometric login for capacitor sqlite',
        biometricSubTitle: 'Log in using your biometric',
        biometricFallbackTitle: 'Set passcode',
        biometricConfirmationRequired: false
      },
      androidDatabaseLocation: 'default',
      androidIsEncryption: false,
      androidBiometric: {
        biometricAuth: false,
        biometricTitle: 'Biometric login for capacitor sqlite',
        biometricSubTitle: 'Log in using your biometric',
        biometricFallbackTitle: 'Set passcode',
        biometricConfirmationRequired: false
      },
      electronDatabaseLocation: 'C:\\ProgramData\\CapacitorDatabases',
      electronIsEncryption: false,
      electronEncryptionKey: 'YOUR_ELECTRON_ENCRYPTION_KEY',
      electronEncryptionService: 'YOUR_ELECTRON_ENCRYPTION_SERVICE_NAME',
      electronEncryptionDatabase: 'YOUR_ELECTRON_ENCRYPTION_DATABASE_NAME',
      electronEncryptionTable: 'YOUR_ELECTRON_ENCRYPTION_TABLE_NAME',
      electronEncryptionTableSchema: 'YOUR_ELECTRON_ENCRYPTION_TABLE_SCHEMA',
      electronEncryptionTableIndexes: 'YOUR_ELECTRON_ENCRYPTION_TABLE_INDEXES',
      electronEncryptionTableValues: 'YOUR_ELECTRON_ENCRYPTION_TABLE_VALUES'
    }
  },
  android: {
    backgroundColor: '#3b82f6'
  }
};

export default config;
