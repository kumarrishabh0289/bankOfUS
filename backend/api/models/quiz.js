const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course_id: String,
    content: String,
    url: String,
    id: Number,
    due:String,
      
   });

module.exports = mongoose.model('Quiz', quizSchema);