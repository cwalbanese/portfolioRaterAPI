const Portfolio = require('../models/portfolio');
const User = require('../models/user');
const seedData = require('./seeds.json');
const userData = require('./users.json');

Portfolio.deleteMany({})

  .then(() => Portfolio.collection.insertMany(seedData))

  .then(() => {
    process.exit();
  });

User.deleteMany({})

  .then(() => User.collection.insertMany(userData))

  .then(() => {
    process.exit();
  });
