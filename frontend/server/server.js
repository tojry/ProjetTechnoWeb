const fs = require('fs');
const https = require('https');
const jsonServer = require('json-server');

const middlewares = jsonServer.defaults();
const server = jsonServer.create();

server.use(middlewares);
server.use(jsonServer.bodyParser);

let usersData = require('./data/users/users.json')
const loginData = require('./data/login/login.json')
let quizData = require('./data/quiz/quiz.json')

server.get('/users', (req, res) => {
  res.status(200).send(loginData);
});

server.get('/quiz', (req, res) => {
  res.status(200).send(quizData);
});

server.get('/user', (req, res) => {

    if(loginData.users.find(user => user.token === req.headers.authorization.replace("Bearer ", "")) === undefined){
      res.status(401).send();
    }else{
      const userId = usersData.users.find(
        user => (user.id === loginData.users.find(
          u => u.token === req.headers.authorization.replace("Bearer ", ""))
          .id)
      ).id;

      res.status(200).send(
        { 
          id: userId,
          createdQuizs: quizData.quiz.filter(q => q.author === userId)
        }
      );
    }
});

server.post('/user', (req, res) => {

  if(usersData.users.find(user => user.id === req.body.id) !== undefined){
    res.status(409).send();
  }else{
    usersData.users.push(req.body);
    loginData.users.push({id: req.body.id, token: 'token_' + req.body.id});
    res.status(200).send();
  }
});

server.post('/user/login', (req, res) => {

  if(usersData.users.find(user => user.id === req.body.id) === undefined || usersData.users.find(user => user.id === req.body.id).password !== req.body.password){
    res.status(401).send();
  }else{
    res.status(200).send(loginData.users.find(user => user.id === req.body.id));
  }
});

server.post('/quiz', (req, res) => {
  
  const q = {
    ...req.body,
    id: quizData.quiz.length
  }
  quizData.quiz.push(q);
  res.status(200).send();
});

server.get('/quiz/:id', (req, res) => {

  if(quizData.quiz.find(q => q.id.toString() === req.params.id) === undefined){
    res.status(404).send();
  }else{
    res.status(200).send(quizData.quiz.find(q => q.id.toString() === req.params.id));
  }
})

server.get('/quiz/category/:category', (req, res) => {

  res.status(200).send(quizData.quiz.filter(q => q.category.toString() === req.params.category));
  
})

server.put('/quiz/:id', (req, res) => {

  const bearerId = loginData.users.find(user => user.token === req.headers.authorization.replace("Bearer ", ""))?.id;

  if(quizData.quiz.find(q => q.id.toString() === req.params.id) === undefined){
    res.status(404).send();
  }else if(bearerId === undefined || bearerId !== quizData.quiz.find(q => q.id.toString() === req.params.id).author){
    res.status(401).send();
  }else{
    quizData.quiz = quizData.quiz.map(q => q.id.toString() === req.params.id ? req.body : q);
    res.status(200).send();
  }
});

server.delete('/quiz/:id', (req, res) => {
  
  const bearerId = loginData.users.find(user => user.token === req.headers.authorization.replace("Bearer ", ""))?.id;

  if(bearerId === undefined || bearerId !== quizData.quiz.find(q => q.id.toString() === req.params.id).author){
    res.status(401).send();
  }else{
    quizData.quiz = quizData.quiz.filter(q => q.id.toString() !== req.params.id);
    res.status(200).send();
  }  
});

https
  .createServer(
    {
      key: fs.readFileSync('ssl/key.pem'),
      cert: fs.readFileSync('ssl/cert.pem'),
    },
    server
  )
  .listen(3000, () => {
    console.log(
      'Go to https://localhost:3000/'
    );
  });

const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
