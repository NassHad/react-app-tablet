import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('📦 Creating USB installer package...\n');

// Create USB installer directory
const usbDir = path.join(projectRoot, 'usb-installer');
if (!fs.existsSync(usbDir)) {
  fs.mkdirSync(usbDir, { recursive: true });
}

// Create installation instructions
const instructions = `# Application React Tablet - Installation sur Android

## 📱 Description
Application de recherche de pièces automobiles optimisée pour tablettes Android.
Fonctionne 100% hors ligne avec base de données SQLite intégrée.

## 📋 Prérequis
- Tablette Android (version 7.0+ recommandée)
- Autorisation d'installation d'applications inconnues activée
- Espace libre : minimum 100 MB

## 🔧 Activation des sources inconnues
1. Allez dans Paramètres > Sécurité
2. Activez "Sources inconnues" ou "Installer des applications inconnues"
3. Autorisez l'installation depuis le gestionnaire de fichiers

## 📥 Installation
1. Copiez le fichier APK sur votre tablette (via USB, email, cloud...)
2. Ouvrez le gestionnaire de fichiers sur la tablette
3. Naviguez vers le fichier APK
4. Appuyez sur le fichier APK
5. Suivez les instructions d'installation
6. L'application sera installée et prête à utiliser

## 🚀 Fonctionnalités
- ✅ Application 100% hors ligne
- ✅ Base de données SQLite intégrée (${new Date().toLocaleDateString('fr-FR')})
- ✅ Interface optimisée pour tablette
- ✅ Recherche de pièces automobiles
- ✅ Support multi-marques et modèles
- ✅ Données de batteries et éclairage

## 📊 Données incluses
- ${new Date().toLocaleDateString('fr-FR')} : Base de données mise à jour
- 69 marques automobiles
- 2223 modèles de véhicules
- 5 catégories de produits
- 9 références de batteries
- 37 références d'éclairage
- 12 positions d'éclairage

## 🆘 Support
En cas de problème :
1. Vérifiez que la tablette a suffisamment d'espace libre
2. Vérifiez que les autorisations d'installation sont activées
3. Vérifiez que la version Android est compatible (7.0+)
4. Redémarrez la tablette si nécessaire

## 📞 Contact
Pour toute question technique ou mise à jour des données.

---
Généré le: ${new Date().toLocaleString('fr-FR')}
Version: 1.0.0
`;

const instructionsPath = path.join(usbDir, 'README.txt');
fs.writeFileSync(instructionsPath, instructions, 'utf8');

// Create a simple batch file for Windows users
const batchContent = `@echo off
echo ========================================
echo   Application React Tablet - Installer
echo ========================================
echo.
echo Ce dossier contient l'application pour tablette Android.
echo.
echo Instructions d'installation :
echo 1. Copiez le fichier APK sur votre tablette
echo 2. Activez les sources inconnues dans les parametres
echo 3. Installez l'application depuis le gestionnaire de fichiers
echo.
echo Pour plus de details, consultez le fichier README.txt
echo.
pause
`;

const batchPath = path.join(usbDir, 'INSTALLER.bat');
fs.writeFileSync(batchPath, batchContent, 'utf8');

console.log('✅ USB installer package created!');
console.log(`📁 Location: ${usbDir}`);
console.log(`📋 Instructions: ${instructionsPath}`);
console.log(`🔧 Batch file: ${batchPath}`);
console.log('\n📦 Package contents:');
console.log('- README.txt (instructions détaillées)');
console.log('- INSTALLER.bat (aide pour Windows)');
console.log('- [APK file will be added here after build]');
console.log('\n🎉 Ready for USB distribution!');
