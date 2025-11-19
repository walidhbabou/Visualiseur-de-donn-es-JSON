# 🚀 Guide de Démarrage Rapide

## Installation Rapide

```bash
# 1. Naviguer dans le dossier
cd json-data-explorer

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
ng serve

# 4. Ouvrir dans le navigateur
# http://localhost:4200
```

## Premier Test

1. **Ouvrir l'application** dans votre navigateur
2. **Tester avec les données d'exemple** :
   - Utilisez le fichier `sample-data.json` fourni dans le projet
   - Glissez-déposez le dans la zone d'upload
   - Ou copiez-collez son contenu

3. **Explorer les différentes vues** :
   - Table : Voir les données en tableau
   - Tree : Explorer la structure
   - Beautify : Formater le JSON
   - Raw : Voir avec coloration syntaxique

## Fonctionnalités Principales

### Upload
- **Drag & Drop** : Glissez un fichier `.json`
- **Browse** : Cliquez pour sélectionner
- **Paste** : Collez directement le JSON

### Table View
- Cliquez sur les colonnes pour trier
- Utilisez la barre de recherche
- Ajustez le nombre de lignes par page

### Tree View
- Cliquez sur ▶ pour développer
- Cliquez sur ▼ pour replier
- Explorez la hiérarchie

### Beautifier
- **Beautify** : Formate avec indentation
- **Minify** : Compresse le JSON
- **Validate** : Vérifie la syntaxe
- **Copy** : Copie dans le presse-papiers

### Raw View
- Coloration syntaxique automatique
- Bouton Copy pour copier
- Bouton Download pour télécharger

## Raccourcis Clavier

- `Ctrl+C` / `Cmd+C` : Copier le JSON
- `Ctrl+V` / `Cmd+V` : Coller du JSON dans l'uploader

## Personnalisation

### Changer le thème
Cliquez sur l'icône ☀️/🌙 dans la navbar

### Ajuster l'indentation
Dans la vue Beautifier, choisissez entre 2, 4 ou 8 espaces

### Taille de la pagination
Dans la vue Table, sélectionnez 10, 25, 50 ou 100 lignes

## Données de Test

Exemple de JSON complexe pour tester toutes les fonctionnalités :

```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "isActive": true,
      "tags": ["developer", "angular", "typescript"],
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "country": "USA"
      }
    }
  ],
  "metadata": {
    "total": 1,
    "timestamp": "2024-11-18T12:00:00Z"
  }
}
```

## Résolution de Problèmes

### L'application ne démarre pas
```bash
# Vérifier la version de Node
node --version  # Doit être >= 18.x

# Vérifier la version d'Angular CLI
ng version

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur de compilation
```bash
# Nettoyer le cache
ng cache clean

# Relancer
ng serve
```

### Le JSON ne s'affiche pas
- Vérifiez que le JSON est valide
- Essayez de le valider sur jsonlint.com
- Regardez la console du navigateur (F12)

## Support

Pour toute question ou problème :
1. Consultez le README complet
2. Vérifiez les exemples dans `sample-data.json`
3. Ouvrez une issue sur GitHub

## Développement

### Créer un nouveau composant
```bash
ng generate component components/mon-composant
```

### Créer un nouveau service
```bash
ng generate service services/mon-service
```

### Lancer les tests
```bash
ng test
```

### Build de production
```bash
ng build --configuration production
```

---

**Bon développement ! 🎉**
