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
1. Clonez ce dépôt :

2. Installez les dépendances du projet :

3. Créez un fichier `.env` à la racine du projet et ajoutez-y les variables d'environnement nécessaires (vous pouvez vous baser sur le fichier `.env.example` fourni) :

DB_URI=mongodb+srv://votre-utilisateur:votre-mot-de-passe@votre-cluster.mongodb.net/votre-base-de-donnees?retryWrites=true&w=majority


4. Démarrez le serveur :

npm start


Le serveur devrait maintenant être en fonctionnement à l'adresse `http://localhost:3000`.

## API Endpoints

Ici, vous pouvez lister les endpoints de votre API et donner une brève description de leur utilisation.

Exemple :

- `POST /api/users/signup` : Inscription d'un nouvel utilisateur
- `POST /api/users/login` : Connexion d'un utilisateur existant
- `GET /api/items` : Récupérer la liste des articles, avec filtrage et tri en option
- ...


## Auteur

[Laurent REUZE](https://github.com/votre-nom-d-utilisateur)
