const mongoose = require('mongoose')

	const productSchema = new mongoose.Schema({
		name: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		category: { type: String, required: true, unique: false }
	});

module.exports = mongoose.model('product', productSchema)