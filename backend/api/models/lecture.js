const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course_id: String,
    content: String,
    id: Number,
    url: String,

});

module.exports = mongoose.model('Lecture', lectureSchema);