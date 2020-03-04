const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('./auth-model');
const generateToken = require('./generate-token');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json({ newUser: saved });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Server could not register user' });
    });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body;

  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.fullName}!`,
          id: user.id,
          image: user.image,
          token
        });
      } else {
        res.status(401).json({ error: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Server could not log user in' });
    });
});

router.get('/logout', (req, res) => {
  res
    .status(200)
    .send({ token: null })
    .json({ message: 'Successfully logged out' });
});

module.exports = router;
