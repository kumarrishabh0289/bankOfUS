const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: String,
	image: String,
	mobile: String,
	about: String,
	city: String,
	country: String,
	company: String,
	school: String,
	hometown: String,
	languages: String,
	gender: String,
});

module.exports = mongoose.model('Profile', profileSchema);