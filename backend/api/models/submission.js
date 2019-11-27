const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student: String,
    url: String,
    quiz_id:String,
    assignment_id:String,
    grade:String,
    status:String,
    course_id:String,
    marks:String,
    answer:String,
      
   });

module.exports = mongoose.model('Submission', submissionSchema);