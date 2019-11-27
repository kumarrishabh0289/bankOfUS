const mongoose = require('mongoose');

const sensorDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sensorId: Number,
    machineId: Number,
    sensorType: String,
    desc: String,
    edgeStationId: Number,
    provider:String,
    name:String,
    status:Number,
    data: String,
    startDate:Date,
    totalPause:Number
   });

module.exports = mongoose.model('SensorData', sensorDataSchema);