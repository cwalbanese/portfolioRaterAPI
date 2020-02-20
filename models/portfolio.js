const mongoose = require('../db/connection');

const PortfolioSchema = new mongoose.Schema({
	name: { type: String, required: true },
	title: { type: String, required: true },
	userId: String,
	description: { type: String, required: true },
	link: { type: String, required: true },
	imageUrl: { type: String, required: true },
	posts: [
		{
			text: String,
			userId: String
		}
	],
	rating: { type: Number, default: 0 }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
