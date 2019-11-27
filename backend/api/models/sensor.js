const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sensorId: Number,
    machineId: Number,
    sensorType: String,
    desc: String,
    edgeStationId: Number,
    provider:String,
    name:String,
    status:Number,
    startDate:Date,
    startPause:Date,
    totalPause:Number
   });

module.exports = mongoose.model('Sensor', sensorSchema);