const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const User = require('../models/user');
var jwt = require('jsonwebtoken');


router.get('/getall', (req, res, next) => {
    console.log("passed",req.query)
    var t = []
	const accountnumber = req.query.accountnumber;
	Transaction.find({$or: [{receiver: accountnumber},{sender: accountnumber}]})
		.exec()
		.then(docs => {
            console.log(docs);
		
			if (docs) {
				res.status(200).json(docs);
			} else {
				res.status(404).json({message: "not a valid accountnumber"});
			}
			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			})
		})
			
});

router.get('/', (req, res, next) => {
	Transaction.find()
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			})
		})
});


router.post('/new', (req, res, next) => {
	console.log("request", req.body)
	const user = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        sendername: req.body.sendername,
        receivername: req.body.receivername,
		sender: req.body.sender,
        receiver: req.body.receiver,
        amount: req.body.amount,
        type: req.body.type, //recurring or one time
        date: Date.now(),
	    external: req.body.external,
        routingnumbersender: req.body.routingnumbersender,
        routingnumbereceiver: req.body.routingnumbereceiver,
		bankname: req.body.bankname,
		startdate:req.body.startdate,
		enddate:req.body.enddate,
		frequency:req.body.frequency
	});
	user
		.save()
		.then(result => {
			console.log(result);
			res.status(200).json({message: "transaction Created"});
		})
		.catch(err => {
			console.log(err.errmsg)
			res.status(202).json({error: err});
			
		});
	
	
});


router.patch("/refundfee", (req, res) => {
    const id = req.body.mongoid; //the transaction id
    const accountnumber = req.body.accountnumber;// the amount to be refunded

    Transaction.remove({_id: id})
        .exec()
        .then(result => {
            console.log( "Deleted transaction Successfully" );
        })
        .then( //now refund the amount
            User.update({accountnumber: accountnumber}, {
                $set: {
                    balance: req.body.balance,
                }
            })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: "Account balance was updated Successfully"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        })
        
});


router.get('/searchdebit', (req, res, next) => {
    console.log("passed",req.query)
    
	const accountnumber = req.query.accountnumber;
	Transaction.find({receiver: accountnumber})
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
                res.status(200).json(doc);
			} else {
				res.status(404).json({message: "not a valid accountnumber"});
			}
			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		})
});

router.get('/searchcredit', (req, res, next) => {
    console.log("passed",req.query)
    
	const accountnumber = req.query.accountnumber;
	Transaction.find({sender: accountnumber})
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
                res.status(200).json(doc);
			} else {
				res.status(404).json({message: "not a valid accountnumber"});
			}
			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		})
});



module.exports = router;