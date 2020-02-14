const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  User.find({}).then(users => res.json(users));
});

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => res.json(user));
});

router.post('/', (req, res) => {
  User.create(req.body).then(user => res.json(user));
});

router.put('/update/:id', (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.params.id
    },
    { $set: req.body },
    { new: true }
  ).then(user => res.json(user));
});

router.delete('/delete/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(user => res.json(user));
});

module.exports = router;
