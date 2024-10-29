# ProjetTechnoWeb


## Progression du front (sans le style, juste le côté fonctionnel)

### Routes vers le serveur accessibles depuis l'interface
```
- POST    /user
  Body: { id: string, password: string }
  Erreur: 403 si le nom d'utilisateur existe déjà

- GET     /user       (Token avec l'id de l'utilisateur dans le header de la requête)
  Réponse: { id: string } (pour l'instant, il faudra aussi récupérer les quiz créés par l'utilisateur plus tard)

- POST    /login
  Body: { id: string, password: string}
  Réponse: { token: string } (à voir pour le format du token)
  Erreur: 401 si le nom d'utilisateur ou le mot de passe est incorrect

```
- [x] Page de création de compte
- [x] Page de connexion
- [x] Page d'info de l'utilisateur
- [x] Déconnexion
- [ ] Page de création de quiz
- [ ] Page de réponse à un quiz
- [ ] Suppression d'un quiz
- [ ] Affichage de la liste des quiz
- [ ] Affichage de le liste des quiz d'une catégorie
- [ ] Recherche d'un quiz
