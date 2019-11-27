const mongoose = require('mongoose');

const machineSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	machineId: Number,
	machineType: String,
	desc: String,
	edgeStationId: Number,
	provider: String,
	name: String,
	machineStatus: Number,
	image:String
});

module.exports = mongoose.model('Machine', machineSchema);