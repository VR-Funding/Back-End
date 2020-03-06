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
server.use(cors(corsConfig));
server.use(express.json());

server.use('/api/auth', [logger, authRouter]);
server.use('/api/startups', authenticate, [logger, startupsRouter]);

server.get('/', (req, res) => {
  res.json({ server: 'online' });
});

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;
