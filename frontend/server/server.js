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

  res.status(200).send(loginData);
  
})

server.get('/user', (req, res) => {

    if(loginData.users.find(user => user.token === req.headers.authorization.replace("Bearer ", "")) === undefined){
      res.status(401).send(req.headers.authorization);
    }else{
      res.status(200).send(
        { id: 
          usersData.users.find(
            user => (user.id === loginData.users.find(
              u => u.token === req.headers.authorization.replace("Bearer ", ""))
              .id)
          ).id 
        }
      );
    }
})

server.post('/user', (req, res) => {

  if(usersData.users.find(user => user.id === req.body.id) !== undefined){
    res.status(403).send();
  }else{
    usersData.users.push(req.body);
    loginData.users.push({id: req.body.id, token: 'token_' + req.body.id});
    res.status(200).send();
  }
})

server.post('/login', (req, res) => {

  if(usersData.users.find(user => user.id === req.body.id) === undefined || usersData.users.find(user => user.id === req.body.id).password !== req.body.password){
    res.status(401).send();
  }else{
    res.status(200).send(loginData.users.find(user => user.id === req.body.id));
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
