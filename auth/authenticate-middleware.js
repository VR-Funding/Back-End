const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Server could not verify token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ error: 'You shall not pass without a token' });
  }
};
