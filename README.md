# PEIP2 Anglais : site interactif (Marc Vasseur, Polytech Lille)

Comptes élèves (NOM + code à 4 chiffres, validés par l'enseignant), tableau de bord, historique des exercices et carnet de corrections.
Même principe que TOEIC Entraînement : site sur Vercel, données JSON dans un dépôt GitHub privé séparé.
**Les données ne sont jamais écrites dans le dépôt du site : aucun redéploiement quand un élève travaille.**

## Mise en route (une seule fois)

1. **Dépôt du site** : créer un dépôt GitHub (par exemple `peip2-anglais`), y déposer tous les fichiers de ce dossier, puis l'importer dans Vercel (Framework : Other, pas de commande de build).
2. **Dépôt de données** : tu peux réutiliser le dépôt privé `marcvasseurpolytech-dot/toeic-entrainement-data` (les fichiers iront dans un dossier `peip2/`, sans toucher à ceux du TOEIC) ou créer un autre dépôt privé.
3. **Variables d'environnement Vercel** (Settings, Environment Variables) :
   - `GITHUB_TOKEN` : le même jeton que pour le site TOEIC (droit d'écriture sur le dépôt de données).
   - `DATA_REPO` : par exemple `marcvasseurpolytech-dot/toeic-entrainement-data`.
   - `ADMIN_HASH` : empreinte SHA-256 du mot de passe admin. Pour la calculer : `printf 'ton-mot-de-passe' | shasum -a 256`. Obligatoire : sans elle, l'administration reste fermée.
   - Facultatif : `SESSION_SECRET` (une longue chaîne aléatoire ; sinon dérivée de GITHUB_TOKEN) et `DATA_PREFIX` (dossier de données, `peip2` par défaut).
4. **Classes** : les classes proposées à l'inscription sont dans `api/_lib.js` (constante `CLASSES`). Remplace les quatre groupes d'exemple par les vrais.
5. Déployer. L'administration est sur `/admin`.

## Fonctionnement

- Inscription : l'élève choisit sa classe et un code ; le compte reste en attente jusqu'à ce que tu cliques sur « Valider » dans `/admin` (ou « Tout valider »).
- Code oublié : `/admin`, bouton « Nouveau code » (tu en donnes un nouveau à l'élève).
- Suppression d'un élève : supprime aussi son historique et son carnet. Sa session cesse de fonctionner à la prochaine vérification.
- Données par élève : `peip2/attempts/<NOM>.json` et `peip2/notes/<NOM>.json` (un fichier par élève, pour éviter les conflits d'écriture). Liste des comptes : `peip2/students.json`.
- Le carnet s'enregistre après 1,5 s d'inactivité, et aussi quand l'élève change de page ou ferme l'onglet.
- Une panne de GitHub ne peut pas effacer de données : une lecture qui échoue est signalée à l'élève, jamais traitée comme un fichier vide.

## Ajouter un chapitre

Créer `data/gXX.js` sur le modèle de `data/g01.js` (types d'items décrits en tête), puis l'ajouter dans `data/index.js`.

## Contrôles

- `node tests/audit.mjs` : vérifie les 132 items (réponses acceptées, doublons, traductions, tirets interdits).
- `node tests/devserver.cjs` puis `python3 tests/e2e.py` : site complet avec un faux GitHub local (inscription, validation, exercices, carnet, admin, panne de GitHub).
- `node tests/concurrency.mjs` : écritures simultanées d'un même élève.

## Limites connues

- Les réponses attendues sont dans le JavaScript du site, et le score est calculé dans le navigateur de l'élève : adapté à l'entraînement, pas à une évaluation notée.
- Le code à 4 chiffres est une protection légère (comme sur le site TOEIC) : suffisant pour séparer les comptes, pas pour des données sensibles.
- Les réponses d'un exercice en cours sont gardées dans le navigateur (pas synchronisées entre appareils) ; l'historique et le carnet, eux, sont sur le serveur.
