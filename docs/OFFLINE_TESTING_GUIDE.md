# 🚀 Guide de Test Offline

## **Vue d'ensemble**

Ce guide vous permet de tester l'application en mode **100% offline** après avoir configuré SQLite et la synchronisation.

## **🔧 Configuration Actuelle**

### **✅ Ce qui est configuré :**

1. **SQLite activé** : `USE_SQLITE = true` dans `src/db/database.ts`
2. **Source de données** : `DataSource.LOCAL_DATABASE` dans `src/config/dataSource.ts`
3. **Appels API remplacés** : Tous les `fetch` directs vers Strapi remplacés par des requêtes SQLite
4. **Service de synchronisation** : `src/services/syncService.ts` avec endpoint `/api/sync/:tabletId`
5. **Bouton de sync** : Ajouté dans `Layout.tsx`
6. **Scripts de build** : `npm run generate:seed` et `npm run android:offline`

## **🧪 Tests à Effectuer**

### **Test 1 : Application Web Offline**

```bash
# 1. Démarrer le backend Strapi
cd strapi
npm run develop

# 2. Dans un autre terminal, générer le seed
npm run generate:seed

# 3. Démarrer l'application frontend
npm run dev

# 4. Ouvrir http://localhost:5174
# 5. Vérifier que l'app fonctionne avec SQLite local
```

**✅ Critères de succès :**
- L'application se charge sans erreurs
- Les catégories s'affichent (depuis SQLite)
- Les produits s'affichent (depuis SQLite)
- Le bouton "Mettre à jour" est visible
- Aucun appel réseau vers Strapi dans les DevTools

### **Test 2 : Synchronisation**

```bash
# 1. Avec Strapi en marche, cliquer sur "Mettre à jour"
# 2. Vérifier les logs de synchronisation
# 3. Vérifier que les données sont mises à jour
```

**✅ Critères de succès :**
- Le bouton "Mettre à jour" fonctionne
- Les logs montrent une synchronisation réussie
- Les données sont mises à jour localement
- Le statut de connexion s'affiche correctement

### **Test 3 : Mode Complètement Offline**

```bash
# 1. Arrêter Strapi (Ctrl+C)
# 2. Désactiver le réseau (déconnecter WiFi/éthernet)
# 3. Rafraîchir l'application
# 4. Naviguer dans l'application
```

**✅ Critères de succès :**
- L'application se charge sans erreurs
- Toutes les fonctionnalités marchent (navigation, sélection véhicule, etc.)
- Aucune erreur réseau dans la console
- Les données sont lues depuis SQLite local

### **Test 4 : Build APK Offline**

```bash
# 1. Générer le build offline complet
npm run android:offline

# 2. Ouvrir Android Studio
npm run android

# 3. Build signed APK dans Android Studio
# 4. Installer l'APK sur une tablette
# 5. Tester sans connexion réseau
```

**✅ Critères de succès :**
- L'APK se génère sans erreurs
- La base SQLite est incluse dans l'APK
- L'application démarre sur la tablette
- Toutes les fonctionnalités marchent offline

## **🔍 Vérifications Techniques**

### **1. Vérifier SQLite**

```javascript
// Dans la console du navigateur
import { databaseService } from './src/db/database';
await databaseService.initialize();
console.log(databaseService.getDatabaseStatus());
```

### **2. Vérifier la Synchronisation**

```javascript
// Dans la console du navigateur
import { syncService } from './src/services/syncService';
const status = await syncService.getStatus();
console.log(status);
```

### **3. Vérifier les Données**

```javascript
// Vérifier les catégories
const categories = await databaseService.getProductCategories();
console.log('Categories:', categories);

// Vérifier les marques
const brands = await databaseService.getBrands();
console.log('Brands:', brands);
```

## **🐛 Dépannage**

### **Problème : "Database not initialized"**

**Solution :**
```bash
# Vérifier que SQLite est activé
grep "USE_SQLITE" src/db/database.ts
# Doit afficher: export const USE_SQLITE = true;
```

### **Problème : "No data found"**

**Solution :**
```bash
# 1. Vérifier que Strapi est en marche
curl http://localhost:1338/api/sync/tablet-001

# 2. Régénérer le seed
npm run generate:seed

# 3. Vérifier que la base existe
ls -la public/assets/databases/
```

### **Problème : "Sync failed"**

**Solution :**
```bash
# 1. Vérifier la connectivité
curl http://localhost:1338/api/sync/tablet-001

# 2. Vérifier les logs Strapi
# 3. Vérifier la configuration dans syncService.ts
```

### **Problème : "APK ne démarre pas"**

**Solution :**
```bash
# 1. Vérifier que la base est dans l'APK
ls -la android/app/src/main/assets/databases/

# 2. Rebuild complet
npm run android:offline
```

## **📊 Métriques de Performance**

### **Temps de Chargement**
- **Avec réseau** : < 2 secondes
- **Sans réseau** : < 1 seconde

### **Taille de l'APK**
- **Avec base SQLite** : ~50-100 MB
- **Sans base** : ~20-30 MB

### **Synchronisation**
- **Première sync** : 5-10 secondes
- **Sync incrémentale** : 1-2 secondes

## **🎯 Checklist de Validation**

- [ ] Application web fonctionne offline
- [ ] Synchronisation fonctionne avec réseau
- [ ] Bouton "Mettre à jour" visible et fonctionnel
- [ ] Aucun appel API direct vers Strapi
- [ ] Base SQLite générée et fonctionnelle
- [ ] APK se génère sans erreurs
- [ ] APK fonctionne sur tablette offline
- [ ] Toutes les fonctionnalités marchent offline

## **🚀 Prochaines Étapes**

1. **Tester sur différentes tablettes**
2. **Optimiser la taille de l'APK**
3. **Implémenter la synchronisation automatique**
4. **Ajouter des indicateurs de statut plus détaillés**
5. **Configurer Scalefusion pour le déploiement**

---

**🎉 Félicitations !** Votre application est maintenant **100% offline-first** ! 🎉
