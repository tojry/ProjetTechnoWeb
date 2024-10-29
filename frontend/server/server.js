const fs = require('fs');
const https = require('https');
const jsonServer = require('json-server');

const middlewares = jsonServer.defaults();
const server = jsonServer.create();

server.use(middlewares);
server.use(jsonServer.bodyParser);

let usersData = require('./data/users/users.json')
const loginData = require('./data/login/login.json')

server.get('/users', (req, res) => {
    res.status(200).send(usersData)
})

server.post('/users', (req, res) => {

  if(usersData.users.find(user => user.id === req.body.id) !== undefined){
    res.status(403).send();
  }else{
    usersData.users.push(req.body);
    res.status(200).send();
  }
})


server.post('/login', (req, res) => {

  if(usersData.users.find(user => user.id === req.body.id) === undefined || usersData.users.find(user => user.id === req.body.id).password !== req.body.password){
    res.status(401).send();
  }else{
    res.status(200).send(loginData)
  }
})


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
