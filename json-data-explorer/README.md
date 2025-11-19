# 🚀 JSON Data Explorer

Une application Angular moderne pour explorer, visualiser et manipuler des données JSON. Inspirée du design de Postman/Insomnia, cette application offre plusieurs vues pour analyser vos données JSON.

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## ✨ Fonctionnalités

- 📤 **Upload de fichiers JSON** avec drag & drop
- 📋 **Vue Table** : Tableau dynamique avec tri, recherche et pagination
- 🌳 **Vue Tree** : Structure hiérarchique expandable/collapsible
- ✨ **Beautifier/Minifier** : Formatage JSON avec indentation personnalisable
- 🎨 **Syntax Highlighting** : Coloration syntaxique automatique
- 🔍 **Recherche et filtrage** dans toutes les vues
- 🌓 **Mode sombre/clair** avec persistance
- 💾 **LocalStorage** : Sauvegarde automatique des données
- 📱 **Design responsive** et moderne
- ⚡ **Performance optimisée** avec Angular signals

## 🛠️ Technologies Utilisées

- **Angular 17+** - Framework frontend
- **TypeScript** - Langage de programmation
- **Angular Signals** - Gestion d'état réactive
- **Highlight.js** - Coloration syntaxique
- **SCSS** - Styles avancés
- **Standalone Components** - Architecture modulaire

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18.x ou supérieure)
- **npm** (version 9.x ou supérieure)
- **Angular CLI** (version 17.x ou supérieure)

## 🚀 Installation

1. **Cloner le dépôt**
```bash
cd json-data-explorer
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
ng serve
```

4. **Ouvrir dans le navigateur**
```
http://localhost:4200
```

## 📖 Guide d'utilisation

### 1. Upload de JSON

- **Drag & Drop** : Glissez-déposez un fichier `.json` dans la zone prévue
- **Browse** : Cliquez sur la zone pour sélectionner un fichier
- **Paste** : Collez directement votre JSON dans la zone de texte

### 2. Vue Table

- **Tri** : Cliquez sur les en-têtes de colonnes pour trier
- **Recherche** : Utilisez la barre de recherche pour filtrer les données
- **Pagination** : Naviguez entre les pages et ajustez le nombre de lignes

### 3. Vue Tree

- **Expand/Collapse** : Cliquez sur les flèches pour déplier/replier les nœuds
- **Navigation** : Explorez la structure hiérarchique de votre JSON
- **Types** : Identification visuelle des types de données

### 4. Beautifier

- **Beautify** : Formate le JSON avec indentation (2, 4 ou 8 espaces)
- **Minify** : Compresse le JSON en supprimant les espaces
- **Validate** : Vérifie la validité de la syntaxe JSON
- **Copy** : Copie le JSON dans le presse-papiers
- **Clear** : Efface le contenu de l'éditeur

### 5. Vue Raw

- **Syntax Highlighting** : Affichage avec coloration syntaxique
- **Copy** : Copie le JSON formaté
- **Download** : Télécharge le JSON comme fichier

## 🎨 Thèmes

L'application propose deux thèmes :

- **🌙 Dark Mode** (par défaut) : Parfait pour le travail de nuit
- **☀️ Light Mode** : Mode clair pour plus de luminosité

Basculez entre les thèmes via l'icône dans la navbar. Le choix est sauvegardé automatiquement.

## 🏗️ Architecture du Projet

```
json-data-explorer/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── json-uploader/
│   │   │   ├── json-table/
│   │   │   ├── json-tree/
│   │   │   ├── beautifier/
│   │   │   └── syntax-highlighter/
│   │   ├── services/
│   │   │   ├── json.service.ts
│   │   │   └── theme.service.ts
│   │   ├── models/
│   │   │   ├── json-node.interface.ts
│   │   │   ├── json-table-row.interface.ts
│   │   │   └── json-data.interface.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── styles.scss
│   └── index.html
├── package.json
├── tsconfig.json
├── angular.json
└── README.md
```

## 🔧 Scripts Disponibles

```bash
# Développement
ng serve                    # Lance le serveur de dev sur http://localhost:4200

# Build
ng build                    # Build de production dans dist/
ng build --configuration production  # Build optimisé

# Tests
ng test                     # Lance les tests unitaires
ng e2e                      # Lance les tests end-to-end

# Code Quality
ng lint                     # Vérifie la qualité du code
```

## 📦 Build de Production

Pour créer une version optimisée pour la production :

```bash
ng build --configuration production
```

Les fichiers de build seront générés dans le dossier `dist/json-data-explorer/`.

## 🚀 Déploiement

### Déploiement sur GitHub Pages

```bash
ng build --configuration production --base-href "/json-data-explorer/"
npx angular-cli-ghpages --dir=dist/json-data-explorer/browser
```

### Déploiement sur Netlify

1. Connectez votre dépôt GitHub à Netlify
2. Configurez les paramètres de build :
   - **Build Command** : `ng build --configuration production`
   - **Publish Directory** : `dist/json-data-explorer/browser`

### Déploiement sur Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🧪 Tests

Le projet inclut des tests unitaires pour les composants et services principaux.

```bash
# Lancer tous les tests
ng test

# Tests avec couverture
ng test --code-coverage

# Tests en mode watch
ng test --watch
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Fonctionnalités Futures

- [ ] Export en CSV/Excel
- [ ] Comparaison de deux fichiers JSON
- [ ] Historique des fichiers uploadés
- [ ] Thèmes personnalisables
- [ ] Support du XML
- [ ] API REST intégrée pour tester les endpoints
- [ ] Mode offline avec Service Worker
- [ ] Partage de JSON via URL

## 🐛 Bugs Connus

Aucun bug majeur connu pour le moment. Si vous en trouvez, merci de créer une issue sur GitHub.

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Développé avec ❤️ en utilisant Angular et TypeScript.

## 🙏 Remerciements

- [Angular](https://angular.io/) - Framework frontend
- [Highlight.js](https://highlightjs.org/) - Coloration syntaxique
- [Heroicons](https://heroicons.com/) - Icônes SVG
- Inspiration design : Postman, Insomnia

---

**Note** : Cette application fonctionne entièrement côté client. Aucune donnée n'est envoyée à un serveur externe. Toutes les données sont stockées localement dans votre navigateur.

## 📸 Captures d'écran

### Vue Upload
Interface intuitive avec drag & drop pour charger vos fichiers JSON.

### Vue Table
Tableau dynamique avec tri, recherche et pagination pour explorer vos données.

### Vue Tree
Navigation hiérarchique avec expand/collapse pour visualiser la structure.

### Vue Beautifier
Éditeur avec formatage, validation et copie rapide.

### Vue Raw
Affichage avec coloration syntaxique professionnelle.

---

**⭐ Si vous aimez ce projet, n'hésitez pas à lui donner une étoile sur GitHub !**
