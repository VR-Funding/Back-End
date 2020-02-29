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
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
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
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ error: 'Server could not log user out' });
      } else {
        res.status(200).json({ message: 'Successfully logged out' });
      }
    });
  } else {
    res.status(200).json({ message: 'You are already logged out' });
  }
});

module.exports = router;
