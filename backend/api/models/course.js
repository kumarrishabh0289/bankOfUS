const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course_id: String,
    name: String,
    faculty_email:String,
    ta_email:String,
    department:String,
    room:String,
    capacity:Number,
    waiting:Number,
    term:String,
    current_wait:Number,
    total_enroll:Number,
    
   });

module.exports = mongoose.model('Course', courseSchema);