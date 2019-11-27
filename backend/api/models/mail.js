const mongoose = require('mongoose');

const mailSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    to: String,
    from:String,
    content: String,
    time : { type : Date, default: Date.now }
       
   });

module.exports = mongoose.model('Mail', mailSchema);