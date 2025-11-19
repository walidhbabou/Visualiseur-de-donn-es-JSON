# 📋 CHANGELOG

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

## [1.0.0] - 2024-11-19

### ✨ Ajouté
- **Upload JSON** : Interface drag & drop pour charger des fichiers JSON
- **Vue Table** : Tableau dynamique avec tri, recherche et pagination
- **Vue Tree** : Visualisation hiérarchique expandable/collapsible
- **Beautifier** : Formatage et minification JSON avec options d'indentation
- **Syntax Highlighter** : Coloration syntaxique avec Highlight.js
- **Navbar** : Navigation entre les vues avec indicateur de données
- **Dark/Light Mode** : Basculement entre thèmes avec persistance
- **LocalStorage** : Sauvegarde automatique des données

### 🎨 Design
- Interface inspirée de Postman/Insomnia
- Thème sombre par défaut (Tokyo Night inspired)
- Thème clair alternatif
- Design responsive pour mobile/tablet/desktop
- Animations et transitions fluides

### ⚡ Performance
- Angular 17+ avec Signals pour réactivité optimale
- Standalone Components pour réduction du bundle
- Lazy Loading des routes
- SSR (Server-Side Rendering) supporté
- Code Splitting automatique

### 🛠️ Technique
- **Frontend** : Angular 17+, TypeScript 5+
- **State Management** : Angular Signals
- **Syntax Highlighting** : Highlight.js
- **Styling** : SCSS avec variables CSS
- **Architecture** : Standalone Components, Services, Interfaces

### 📦 Composants Créés
1. `NavbarComponent` - Barre de navigation principale
2. `JsonUploaderComponent` - Upload de fichiers JSON
3. `JsonTableComponent` - Vue table avec tri et pagination
4. `JsonTreeComponent` - Vue tree hiérarchique
5. `BeautifierComponent` - Éditeur avec formatage
6. `SyntaxHighlighterComponent` - Affichage avec coloration

### 🔧 Services Créés
1. `JsonService` - Gestion des données JSON
2. `ThemeService` - Gestion du thème dark/light

### 📝 Interfaces Créées
1. `JsonNode` - Structure pour l'arbre JSON
2. `JsonTableRow` / `TableColumn` - Structure pour la table
3. `JsonData` - Données JSON avec métadonnées

### 🧪 Tests
- Tests unitaires pour JsonService
- Gestion des cas limites
- Validation des fonctions principales

### 📚 Documentation
- README complet avec guide d'utilisation
- QUICK_START guide pour démarrage rapide
- PROJECT_STRUCTURE détaillant l'architecture
- CHANGELOG pour suivi des versions
- Commentaires JSDoc dans le code

### 🔒 Sécurité
- Validation stricte du JSON
- Aucune donnée envoyée au serveur
- Stockage local uniquement
- Protection contre l'injection XSS

---

## Roadmap Future (v1.1.0+)

### Fonctionnalités Prévues
- [ ] Export CSV/Excel
- [ ] Comparaison de 2 fichiers JSON (diff viewer)
- [ ] Historique des fichiers uploadés
- [ ] Thèmes personnalisables
- [ ] Support XML
- [ ] JSONPath query builder
- [ ] GraphQL support
- [ ] API REST testing (comme Postman)
- [ ] Partage via URL
- [ ] Mode offline avec Service Worker
- [ ] Plugins système
- [ ] Multi-language support (i18n)

### Améliorations Techniques
- [ ] Tests e2e avec Cypress
- [ ] CI/CD avec GitHub Actions
- [ ] Docker containerization
- [ ] PWA (Progressive Web App)
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

---

## Types de Changements
- ✨ **Ajouté** : Nouvelles fonctionnalités
- 🔄 **Modifié** : Changements de fonctionnalités existantes
- ❌ **Déprécié** : Fonctionnalités bientôt supprimées
- 🗑️ **Supprimé** : Fonctionnalités supprimées
- 🐛 **Corrigé** : Corrections de bugs
- 🔒 **Sécurité** : Corrections de vulnérabilités
- ⚡ **Performance** : Améliorations de performance
- 🎨 **Design** : Changements visuels

---

**Note** : Ce projet suit le [Semantic Versioning](https://semver.org/).
