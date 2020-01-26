const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { authenticate } = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter = require('../users/users-router.js');


const server = express();


server.use(helmet());
server.use(cors());

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/users', authenticate, usersRouter);


server.get("/", (req, res, next) => {
  res.send("<h1>Welcome to the API</h1>")
})

server.use((req, res, next) => {
  res.status(404).json({ message: "404: Invalid path"})
})

server.use((err, req, res, next) => {
  res.status(500).json({ message: "500: Server error"})
})

module.exports = server;