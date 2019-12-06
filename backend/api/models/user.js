const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: String,
	password: String,
	role: String,
	accountnumber: String,
	status: String ,
	balance: Number,
	routingnumber: String
});

module.exports = mongoose.model('User', userSchema);