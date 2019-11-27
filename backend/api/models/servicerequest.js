const mongoose = require('mongoose');

const serviceRequestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serviceRequestId: Number,
    machineId: Number,
    date: Date,
    serviceRequestName:String,
    status:String
   });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);