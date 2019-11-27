const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course_id: String,
    content: String,
    id: Number,

});

module.exports = mongoose.model('Announcement', announcementSchema);