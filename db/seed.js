const Portfolio = require('../models/portfolio');
const seedData = require('./seeds.json');

Portfolio.remove({})

  .then(() => Portfolio.collection.insert(seedData))

  .then(() => {
    process.exit();
  });
