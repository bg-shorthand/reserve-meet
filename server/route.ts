const router = require('express').Router();
const Admin = require('./model.ts');

// Find All
router.get('/', (req, res) => {
  Admin.findAll()
    .then(Admins => {
      if (!Admins.length) return res.status(404).send({ err: 'Admin not found' });
      res.send(Admins);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
