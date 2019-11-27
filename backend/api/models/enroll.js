const mongoose = require('mongoose');

const enrollSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course_id: String,
    student: String,
    enroll_id: String,
    status: String,
    number:String,
      
   });

module.exports = mongoose.model('Enroll', enrollSchema);