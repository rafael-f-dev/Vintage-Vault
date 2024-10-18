const mongoose = require('mongoose')

	const productSchema = new mongoose.Schema({
		name: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		image: {type: String, required: true },
		category: { type: String, required: true },
		quantity: { type: Number, required: true },
	});

module.exports = mongoose.model('product', productSchema)