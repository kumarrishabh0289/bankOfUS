const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    permission_id: Number,
    course_id: String,
    used: String,

});

module.exports = mongoose.model('Permission', permissionSchema);