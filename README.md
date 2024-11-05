# ProjetTechnoWeb

Théo JOFFROY et Matthieu GALANTE

## Installation et exécution
```
git clone https://github.com/tojry/ProjetTechnoWeb.git
```
Puis dans chaque sous-dossier (frontend et backend)
```
yarn install
yarn run start
```
La page du site est accessible à l'adresse https://localhost:4200/ 

Les routes vers le serveur commencent par https://localhost:3000/

(Ne pas oublier le https, et le navigateur peut signaler un problème de certificat à cause du fait qu'il soit auto-signé)

La base de données est hébergée par MongoDB Atlas, elle est donc déjà initialisée.

## Documentation swagger
https://localhost:3000/documentation

## Description des endpoints
```
- POST    /user
  Body: { id: string, password: string }
  Erreur: 409 si le nom d'utilisateur existe déjà
  -> Création d'un nouvel utilisateur

- GET     /user       (Token avec l'id de l'utilisateur dans le header de la requête)
  Réponse: { id: string, createdQuizs: Quiz[] } (avec createdQuizs la liste des quiz dont l'author est égal à l'id)
  -> Récupération des infos d'un utilisateur

- POST    /login
  Body: { id: string, password: string}
  Réponse: { token: string } (à voir pour le format du token)
  Erreur: 401 si le nom d'utilisateur ou le mot de passe est incorrect
  -> Connexion

- POST  /quiz
  Body: Quiz = { author: string, title: string, category: string, questions: Question[] } 
  avec Question = { question: string, answers: string[], correctAnswer: number }
  (l'id du quiz doit être généré par le back)
  -> Création d'un nouveau quiz

- DELETE /quiz/:id
  Erreurs: 401 si l'id associé au token dans le header est différent de l'id de l'auteur du quiz
           404 si l'id du quiz n'existe pas
  -> Suppression d'un quiz

- GET   /quiz
  Réponse: { quiz: Quiz[] } (liste de tous les quizs)
  -> Récupération de la liste de tous les quiz publiés

- GET   /quiz/:id   (id du quiz)
  Réponse: { quiz: Quiz }
  Erreur: 404 si aucun quiz ne correspond à l'id
  -> Récupération d'un quiz (pour y répondre)

- GET   /quiz/category/:category  
  Réponse: { quiz: Quiz[] }
  (Retourner juste une liste vide si aucun quiz n'existe dans cette catégorie)
  -> Récupération des quiz d'une certaine catégorie

- PUT   /quiz/:id
  Body: Quiz = { author: string, title: string, category: string, questions: Question[] } 
  avec Question = { question: string, answers: string[], correctAnswer: number }
  Erreurs: 401 si si l'id associé au token dans le header est différent de l'id de l'auteur du quiz
           404 si aucun quiz ne correspond à l'id
  -> Modification d'un quiz

- GET /quiz/search?keyword=
  -> Recherche de quiz à partir d'un mot-clé

```
