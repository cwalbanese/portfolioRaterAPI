const mongoose = require('../db/connection');

const PortfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  userId: String,
  description: { type: String, required: true },
  link: { type: String, required: true },
  imageUrl: { type: String, required: true },
  posts: [String, String, String]
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
