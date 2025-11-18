# 🔄 Flux de synchronisation (offline-first)

1. **Mode offline par défaut**
   - Toutes les données sont lues depuis SQLite.
   - Aucune requête directe à Strapi.
   - Les produits et compatibilités sont préchargés dans la DB locale.

2. **Mode sync manuel**
   - L’utilisateur ou le technicien déclenche la mise à jour.
   - L’app appelle l’API Strapi `/api/sync/:tabletId`.
   - Si une nouvelle version est disponible :
     - Téléchargement du JSON complet.
     - Mise à jour transactionnelle dans SQLite.
     - Mise à jour de la table `meta` avec le nouveau `db_version`.

3. **Retour hors ligne**
   - Une fois les données mises à jour, la tablette peut à nouveau fonctionner sans Internet.
   - Tous les écrans lisent depuis SQLite.
