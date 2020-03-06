const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const startupsRouter = require('../startups/startups-router.js');

const server = express();

const corsConfig = {
  origin:
    'https://front-end-pink-iota.venturer.now.sh/' ||
    'https://front-end.venturer.now.sh/' ||
    'http://localhost:3000/',
  credentials: true
};

server.use(helmet());
const cors = require('cors');

const corsConfig = {
  origin:
    'https://front-end-pink-iota.venturer.now.sh/' ||
    'https://front-end.venturer.now.sh/' ||
    'http://localhost:3000/',
  credentials: true
};

server.use(cors(corsConfig));
server.use(express.json());

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use('/api/auth', cors(corsConfig), [logger, authRouter]);
server.use('/api/startups', cors(corsConfig), authenticate, [
  logger,
  startupsRouter
]);

server.get('/', (req, res) => {
  res.json({ server: 'online' });
});

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;
