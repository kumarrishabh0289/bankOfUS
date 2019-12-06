const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    sender: String,
    receiver: String,
    amount: Number,
    type: String, //recurring or one time
    date: Date,
    receivername: String,
    sendername: String,
    external: String,
    routingnumbersender: String,
    routingnumbereceiver: String,
    bankname:String //applicable when the receiver is external
});

module.exports = mongoose.model('Transaction', transactionSchema);