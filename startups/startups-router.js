const router = require('express').Router();
const Startups = require('./startups-model');

// Get all startups
router.get('/', (req, res) => {
  Startups.find()
    .then(startups => {
      res.status(200).json(startups);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'Server could not get startups'
      });
    });
});

// Get a specific startup by it's startup ID
router.get('/:id', (req, res) => {
  Startups.findById(req.params.id)
    .then(startup => {
      if (startup) {
        res.status(200).json(startup);
      } else {
        res.status(404).json({
          error: 'Startup with that ID does not exist'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Server could not find startup' });
    });
});

// Get a specific startup by ID of the user who posted it (userId field)
router.get('/users/:userId', (req, res) => {
  Startups.findByUserId(req.params.userId)
    .then(startup => {
      if (startup) {
        res.status(200).json(startup);
      } else {
        res.status(404).json({
          error: 'User with that ID does not exist'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Server could not get startups' });
    });
});

// Add a new startup
router.post('/', (req, res) => {
  Startups.add(req.body)
    .then(startup => {
      res.status(201).json(startup);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'Server could not post startup'
      });
    });
});

// Update an existing startup
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Startups.edit(changes, id)
    .then(startup => {
      res
        .status(200)
        .json({ message: 'Startup successfully updated', startup });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'Server could not update startup'
      });
    });
});

// Delete an existing startup
router.delete('/:id', (req, res) => {
  Startups.del(req.params.id)
    .then(startup => {
      if (startup) {
        res.status(200).json({ message: 'Startup successfully deleted' });
      } else {
        res.status(404).json({
          error: 'Startup with that ID does not exist'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'Server could not delete startup'
      });
    });
});

module.exports = router;
