# Configuration SureLock pour AutoParts Kiosk

## Vue d'ensemble

SureLock est un logiciel de verrouillage d'appareils Android qui permet de transformer une tablette en kiosque interactif. Cette configuration garantit que les utilisateurs ne peuvent pas sortir de l'application AutoParts Kiosk.

## Installation

1. **Télécharger SureLock** depuis le Google Play Store ou le site officiel
2. **Installer l'application** sur la tablette
3. **Configurer les permissions** nécessaires

## Configuration de base

### 1. Mode Kiosque
```
Settings > Kiosk Mode > Enable
```

### 2. Application autorisée
```
Settings > Allowed Apps > Add App
- Sélectionner "AutoParts Kiosk"
- Activer "Auto-launch"
```

### 3. Restrictions système
```
Settings > System Restrictions
- Désactiver "Home Button"
- Désactiver "Recent Apps"
- Désactiver "Status Bar"
- Désactiver "Navigation Bar"
- Désactiver "Volume Buttons"
- Désactiver "Power Button" (optionnel)
```

### 4. Sécurité
```
Settings > Security
- Activer "Prevent Uninstall"
- Activer "Hide Settings"
- Activer "Disable USB Debugging"
```

## Configuration avancée

### Mode de démarrage automatique
```
Settings > Auto-start
- Activer "Start on Boot"
- Définir le délai: 30 secondes
```

### Gestion des erreurs
```
Settings > Error Handling
- Activer "Auto-restart on Crash"
- Définir le délai: 10 secondes
```

### Monitoring
```
Settings > Monitoring
- Activer "Usage Statistics"
- Activer "Crash Reports"
- Activer "Network Monitoring"
```

## Configuration réseau

### Connexion WiFi
```
Settings > Network
- Configurer le WiFi pour la synchronisation
- Activer "Auto-reconnect"
```

### Proxy (si nécessaire)
```
Settings > Network > Proxy
- Adresse: [votre-proxy]
- Port: [port-proxy]
- Authentification si nécessaire
```

## Tests et validation

### Test de verrouillage
1. Démarrer SureLock
2. Lancer AutoParts Kiosk
3. Tester les boutons système (Home, Recent, etc.)
4. Vérifier qu'ils sont désactivés

### Test de redémarrage
1. Redémarrer la tablette
2. Vérifier que SureLock se lance automatiquement
3. Vérifier que AutoParts Kiosk se lance automatiquement

### Test de récupération
1. Simuler un crash de l'application
2. Vérifier que l'app se relance automatiquement
3. Vérifier que les données sont préservées

## Maintenance

### Mise à jour de l'application
```
Settings > App Management
- Activer "Auto-update"
- Configurer l'URL de mise à jour
```

### Sauvegarde des données
```
Settings > Backup
- Activer "Auto-backup"
- Configurer la fréquence: Quotidienne
- Configurer la destination: Cloud ou serveur local
```

### Monitoring à distance
```
Settings > Remote Management
- Activer "Remote Access"
- Configurer l'URL du serveur de gestion
- Configurer les identifiants d'authentification
```

## Dépannage

### L'application ne se lance pas
1. Vérifier les permissions SureLock
2. Vérifier que l'app est dans la liste autorisée
3. Redémarrer la tablette

### Boutons système encore actifs
1. Vérifier les restrictions système
2. Redémarrer SureLock
3. Vérifier la version Android

### Problèmes de réseau
1. Vérifier la configuration WiFi
2. Tester la connectivité
3. Vérifier les paramètres proxy

## Sécurité

### Accès administrateur
- Garder un mot de passe d'accès admin
- Documenter les procédures de récupération
- Former le personnel de maintenance

### Sauvegarde de configuration
- Exporter la configuration SureLock
- Sauvegarder les paramètres réseau
- Documenter les procédures de restauration

## Support

Pour toute question ou problème :
- Consulter la documentation SureLock
- Contacter le support technique
- Consulter les logs d'erreur dans SureLock

---

**Note importante** : Cette configuration doit être testée en profondeur avant le déploiement en production. 