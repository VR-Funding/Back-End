const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets');

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    email: user.email,
    investor: user.investor
  };
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
};
