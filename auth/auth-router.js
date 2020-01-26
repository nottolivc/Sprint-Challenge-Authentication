const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const secret = require('../auth/authenticate').jwtToken;
const jwt = require('jsonwebtoken');


const { authenticate } = require('../auth/authenticate-middleware.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user
  }

  const options = {
    expiresIn: '7d'
  }

  return jwt.sign(payload, secret, options)
};

function register(req, res) {
  const user = req.body
  const token = generateToken(user.username);
  if (user.username && user.password) {
    user.password = bcrypt.hashSync(user.password, 12);
    db('users').insert(user)
    .then(response => {
      res.status(200).json({user: user.username, token})
    })
  } else {
    res.status(400).json({message: 'username and password not provided.'})
  }
}

function login(req, res) {
  const { username, password } = req.body
  if (username && password) {
    db('users').where({username}).first()
    .then(response => {
      const user = response
      if (user) {
        const token = generateToken(response.username)
        res.status(200).json({token: token})
      } 
    })
    .catch(err => req.status(500).json({message:'error logging in!'}))
  } else {
    res.status(400).json({message: 'invalid credentials!'})
  }
}



