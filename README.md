# AutoParts Kiosk - Application Kiosque Automobile

Application tablette Android offline pour le rayon automobile d'une grande surface, permettant aux clients de trouver des produits compatibles avec leur véhicule.

## 🎯 Objectif

Permettre aux clients en magasin de trouver facilement des produits compatibles avec leur véhicule grâce à un parcours utilisateur intuitif :

1. **Sélection du type de véhicule** (voiture, camion, moto)
2. **Choix de la catégorie de produit** (balais, batteries, huiles, ampoules)
3. **Sélection de la marque et du modèle** du véhicule
4. **Réponses aux questions spécifiques** selon le produit
5. **Affichage des produits compatibles**
6. **Consultation des détails** d'un produit

## 🛠️ Technologies

- **Frontend** : React 18 + TypeScript + Vite
- **UI** : Tailwind CSS + Headless UI
- **Navigation** : React Router DOM
- **Mobile** : Capacitor (Android)
- **Base de données** : SQLite (offline)
- **CMS** : Strapi (synchronisation)

## 📱 Fonctionnalités

### ✅ Implémentées
- [x] Interface utilisateur moderne et responsive
- [x] Navigation multi-écrans avec React Router
- [x] Sélection du type de véhicule
- [x] Choix des catégories de produits
- [x] Sélection des marques et modèles
- [x] Questions spécifiques par produit
- [x] Affichage des produits compatibles
- [x] Détails des produits
- [x] Design adapté aux tablettes
- [x] Animations et transitions fluides

### 🔄 En cours
- [ ] Intégration SQLite avec Capacitor
- [ ] Synchronisation avec Strapi
- [ ] Gestion offline/online
- [ ] Build Android APK

### 📋 À venir
- [ ] Tests sur tablette
- [ ] Configuration SureLock
- [ ] Optimisations performance
- [ ] Gestion des erreurs

## 🚀 Installation et développement

### Prérequis
- Node.js 18+
- npm ou yarn
- Android Studio (pour le build Android)

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd react-app-tablet

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

### Build pour production
```bash
# Build web
npm run build

# Build Android
npx cap sync
npx cap open android
```

## 📁 Structure du projet

```
react-app-tablet/
├── src/
│   ├── components/          # Composants réutilisables
│   ├── screens/            # Écrans de l'application
│   │   ├── VehicleTypeScreen.tsx
│   │   ├── CategoryScreen.tsx
│   │   ├── BrandScreen.tsx
│   │   ├── ModelScreen.tsx
│   │   ├── QuestionsScreen.tsx
│   │   ├── ProductsScreen.tsx
│   │   └── ProductDetailsScreen.tsx
│   ├── routes/             # Configuration du routing
│   │   └── AppRouter.tsx
│   ├── db/                 # Gestion SQLite
│   │   └── database.ts
│   ├── types/              # Types TypeScript
│   │   └── index.ts
│   ├── utils/              # Utilitaires
│   └── App.tsx
├── android/                # Projet Android Capacitor
├── public/                 # Assets statiques
├── tailwind.config.js      # Configuration Tailwind
├── capacitor.config.ts     # Configuration Capacitor
└── package.json
```

## 🗄️ Base de données SQLite

### Tables principales
- `vehicle_types` : Types de véhicules (voiture, camion, moto)
- `vehicles` : Marques et modèles de véhicules
- `product_categories` : Catégories de produits
- `products` : Produits disponibles
- `vehicle_compatibilities` : Compatibilités véhicule-produit
- `specific_questions` : Questions spécifiques par produit

### Synchronisation
Les données sont synchronisées depuis Strapi via une API REST et stockées localement en SQLite pour un fonctionnement offline.

## 🎨 Interface utilisateur

### Design System
- **Couleurs** : Palette bleue professionnelle
- **Typographie** : Inter (système)
- **Animations** : Transitions fluides et feedback visuel
- **Responsive** : Adapté aux tablettes (1024px+)

### Parcours utilisateur
1. **Écran d'accueil** → Sélection du type de véhicule
2. **Catégories** → Choix du type de produit
3. **Marques** → Sélection de la marque
4. **Modèles** → Choix du modèle spécifique
5. **Questions** → Réponses aux questions spécifiques
6. **Produits** → Liste des produits compatibles
7. **Détails** → Informations détaillées du produit

## 📱 Configuration Android

### Capacitor
```bash
# Ajouter la plateforme Android
npx cap add android

# Synchroniser les fichiers
npx cap sync

# Ouvrir dans Android Studio
npx cap open android
```

### SureLock (Kiosque)
Configuration à faire dans Android Studio pour verrouiller l'application en mode kiosque.

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run build        # Build pour production
npm run preview      # Prévisualiser le build

# Capacitor
npx cap sync         # Synchroniser avec les plateformes natives
npx cap open android # Ouvrir le projet Android
npx cap run android  # Lancer sur émulateur/appareil
```

## 📊 Données de test

L'application utilise actuellement des données de test (mock data) pour simuler :
- Marques de véhicules (Renault, Peugeot, BMW, etc.)
- Modèles par marque
- Produits par catégorie
- Questions spécifiques

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**Développé avec ❤️ pour l'expérience client optimale**
