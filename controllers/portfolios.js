const express = require('express');
const Portfolio = require('../models/portfolio');
const router = express.Router();

router.get('/', (req, res) => {
  Portfolio.find({}).then(contacts => res.json(contacts));
});

router.get('/:id', (req, res) => {
  Portfolio.findOne({ _id: req.params.id }).then(portfolio =>
    res.json(portfolio)
  );
});

router.post('/', (req, res) => {
  Portfolio.create(req.body).then(portfolio => res.json(portfolio));
});

router.put('/update/:id', (req, res) => {
  Portfolio.findOneAndUpdate(
    {
      _id: req.params.id
    },
    { $set: req.body },
    { new: true }
  ).then(portfolio => res.json(portfolio));
});

router.delete('/delete/:id', (req, res) => {
  Portfolio.deleteOne({ _id: req.params.id }).then(portfolio =>
    res.json(portfolio)
  );
});

module.exports = router;
