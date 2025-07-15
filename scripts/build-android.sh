#!/bin/bash

# Script de build Android pour AutoParts Kiosk
# Usage: ./scripts/build-android.sh

set -e

echo "🚀 Démarrage du build Android..."

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire racine du projet."
    exit 1
fi

# Installer les dépendances si nécessaire
echo "📦 Installation des dépendances..."
npm install

# Build de l'application web
echo "🔨 Build de l'application web..."
npm run build

# Synchroniser avec Capacitor
echo "📱 Synchronisation avec Capacitor..."
npx cap sync

# Vérifier que la plateforme Android existe
if [ ! -d "android" ]; then
    echo "📱 Ajout de la plateforme Android..."
    npx cap add android
fi

# Ouvrir Android Studio pour le build final
echo "🎯 Ouverture d'Android Studio..."
echo "📋 Instructions pour le build final:"
echo "1. Dans Android Studio, allez dans Build > Build Bundle(s) / APK(s) > Build APK(s)"
echo "2. L'APK sera généré dans android/app/build/outputs/apk/debug/"
echo "3. Pour un build de production, utilisez Build > Generate Signed Bundle / APK"
echo ""
echo "💡 Pour tester sur un émulateur:"
echo "   npx cap run android"
echo ""
echo "💡 Pour tester sur un appareil connecté:"
echo "   npx cap run android --target=your-device-id"

npx cap open android 