# 🎯 JSON Data Explorer - Commandes Utiles

## 📦 Installation et Démarrage

```bash
# Cloner et installer
git clone <repository-url>
cd json-data-explorer
npm install

# Démarrage dev
npm start
# ou
ng serve

# Ouvrir automatiquement le navigateur
ng serve --open
```

## 🔨 Développement

```bash
# Générer un composant
ng generate component components/mon-composant
ng g c components/mon-composant

# Générer un service
ng generate service services/mon-service
ng g s services/mon-service

# Générer une interface
ng generate interface models/mon-interface

# Générer un guard
ng generate guard guards/mon-guard
```

## 🧪 Tests

```bash
# Tests unitaires
ng test

# Tests avec couverture
ng test --code-coverage
ng test --no-watch --code-coverage

# Tests d'un fichier spécifique
ng test --include='**/json.service.spec.ts'

# Tests e2e (si configuré)
ng e2e
```

## 🏗️ Build

```bash
# Build de développement
ng build

# Build de production
ng build --configuration production

# Build avec analyse du bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/json-data-explorer/stats.json

# Build sans SSR
ng build --configuration production --prerender=false
```

## 🚀 Déploiement

### GitHub Pages
```bash
# Build et déploiement
ng build --configuration production --base-href "/json-data-explorer/"
npx angular-cli-ghpages --dir=dist/json-data-explorer/browser

# Ou avec package ngh
npm install -g angular-cli-ghpages
ngh --dir=dist/json-data-explorer/browser
```

### Netlify
```bash
# Configuration netlify.toml
[build]
  command = "ng build --configuration production"
  publish = "dist/json-data-explorer/browser"

# Déploiement CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel
```bash
# Installation
npm install -g vercel

# Déploiement
vercel --prod

# Configuration vercel.json
{
  "buildCommand": "ng build --configuration production",
  "outputDirectory": "dist/json-data-explorer/browser"
}
```

### Firebase
```bash
# Installation
npm install -g firebase-tools

# Login et init
firebase login
firebase init hosting

# Build et déploiement
ng build --configuration production
firebase deploy
```

## 🧹 Maintenance

```bash
# Nettoyer le cache Angular
ng cache clean

# Nettoyer node_modules
rm -rf node_modules package-lock.json
npm install

# Mettre à jour Angular
ng update @angular/cli @angular/core

# Vérifier les packages obsolètes
npm outdated

# Mettre à jour tous les packages
npm update

# Audit de sécurité
npm audit
npm audit fix
```

## 📊 Analyse et Qualité

```bash
# Lint
ng lint

# Lint avec auto-fix
ng lint --fix

# Format avec Prettier (si configuré)
npx prettier --write "src/**/*.{ts,html,scss}"

# Analyse de complexité
npx madge --circular --extensions ts src/

# Analyse des dépendances
npm ls
npm ls --depth=0
```

## 🐛 Debug

```bash
# Debug avec sourcemaps
ng serve --source-map

# Verbose output
ng serve --verbose

# Mode production local
ng serve --configuration production

# Changer le port
ng serve --port 4300

# Ouvrir dans un navigateur spécifique
ng serve --open --browser chrome
```

## 📦 Scripts Package.json

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "test": "ng test",
    "test:ci": "ng test --no-watch --code-coverage",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "analyze": "ng build --stats-json && webpack-bundle-analyzer dist/json-data-explorer/stats.json"
  }
}
```

## 🔧 Variables d'Environnement

```bash
# Développement
ng serve

# Production
ng serve --configuration production

# Custom environment
ng serve --configuration staging
```

## 📝 Git

```bash
# Commit conventionnel
git commit -m "feat: ajouter export CSV"
git commit -m "fix: corriger bug de pagination"
git commit -m "docs: mettre à jour README"

# Tags de version
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

## 🌐 Serveur Local avec SSL

```bash
# Générer certificat auto-signé
ng serve --ssl

# Avec certificat custom
ng serve --ssl --ssl-cert ./ssl/cert.pem --ssl-key ./ssl/key.pem
```

## 💡 Tips

```bash
# Watch les changements de fichiers
ng serve --poll

# Désactiver le cache du navigateur
ng serve --live-reload

# Profiler l'application
ng build --source-map --stats-json
# Puis ouvrir chrome://tracing

# Voir la configuration Angular
ng config

# Lister les blueprints disponibles
ng generate --help
```

## 🔍 Troubleshooting

```bash
# Problème de mémoire
export NODE_OPTIONS="--max-old-space-size=8192"
ng build --configuration production

# Réinstaller Angular CLI
npm uninstall -g @angular/cli
npm cache clean --force
npm install -g @angular/cli@latest

# Problème de permissions (Linux/Mac)
sudo chown -R $(whoami) ~/.npm
```

## 📚 Ressources

- [Angular Docs](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [Highlight.js](https://highlightjs.org/)

---

**Dernière mise à jour** : Novembre 2024
