const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const startupsRouter = require('../startups/startups-router.js');

const server = express();

const corsConfig = {
  origin: 'https://front-end.venturer.now.sh/',
  credentials: true
};

server.use(helmet());
server.use(cors(corsConfig));
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/startups', authenticate, startupsRouter);

server.get('/', (req, res) => {
  res.json({ server: 'online' });
});

module.exports = server;
