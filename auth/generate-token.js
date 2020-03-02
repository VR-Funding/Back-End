const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets');

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    fullName: user.fullName,
    investor: user.investor
  };
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
};
