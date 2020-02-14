const Portfolio = require('../models/portfolio');
const User = require('../models/user');
const seedData = require('./seeds.json');
const userData = require('./users.json');

Portfolio.remove({})

  .then(() => Portfolio.collection.insert(seedData))

  .then(() => {
    process.exit();
  });

User.remove({})

  .then(() => User.collection.insert(userData))

  .then(() => {
    process.exit();
  });
