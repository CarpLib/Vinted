# Vinted Clone - BackEnd en JavaScript

Ce projet est une reproduction du back-end du site [Vinted](https://www.vinted.fr/), un marché en ligne pour les vêtements d'occasion. Le but de ce projet est d'apprendre et de pratiquer les compétences en développement web, en particulier en JavaScript et dans la création d'API RESTFUL.

## Technologies utilisées

- Node.js
- Express
- MongoDB
- Mongoose
- Cloudinary pour le stockage des images
- crypto-js pour le hachage des mots de passe
- uid2 pour la génération de sring aléatoire

## Fonctionnalités

- Inscription et connexion des utilisateurs
- Gestion des articles (ajout, modification, suppression)
- Recherche d'articles avec filtrage et tri

## Comment installer et exécuter le projet
1. Clonez ce dépôt : https://github.com/CarpLib/Vinted.git

2. Installez les dépendances du projet : npm install

3. Créez un fichier `.env` à la racine du projet et ajoutez-y les variables d'environnement nécessaires :

`MONGODB_URI=mongodb://127.0.0.1:27017/Vinted`

`COULDINARY_CLOUD_NAME=xxxxxxxxxx`

`COULDINARY_API_KEY=xxxxxxxxxxx`

`COULDINARY_API_SECRET=xxxxxxxxxxxx`

`PORT=3000`

4. Démarrez le serveur :

npm start


Le serveur devrait maintenant être en fonctionnement à l'adresse `http://localhost:3000`.

## API Endpoints

Ici, vous pouvez lister les endpoints de votre API et donner une brève description de leur utilisation.

Exemple :

- `POST /user/signup` : Inscription d'un nouvel utilisateur
  - `Points d'entrée` :
    - username
    - email
    - password
    - newsletter (boolean)
    - avatar (file)
- `POST /user/login` : Connexion d'un utilisateur existant
- `POST /offer/publish` : Publier une nouvelle offre
- `PUT /offer/update` : Mettre à jour une offre
- `DELETE /offer/delete` : Supprimer une offre
- `GET /offers` : Recherche des offres avec tri et filtrage
- `GET /offer/:id` : Recherche d'une offre en particulier


## Auteur

[Laurent REUZE](https://github.com/CarpLib)
