const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const User = require('../models/user');


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
		sender: req.body.sender.trim(),
        receiver: req.body.receiver.trim(),
        amount: req.body.amount,
        type: req.body.transactiontype, //recurring or one time
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


router.get("/updatesenderbalance", (req, res) => { 
//now deduct money from sender
User.findOne({accountnumber: req.query.sender})
.exec()
.then(result1 => {
    console.log( "Got Account",result1.balance, req.query.amount );
    console.log("update to", result1.balance + req.query.amount )
    User.update({accountnumber: req.query.sender}, {
        $set: {
            balance: result1.balance - req.query.amount ,
        }
    })
    .exec()
    .then(result2 => {
        console.log(result2);
        res.status(200).json({
            message: "ok"
        });
    })
    .catch(err => {
        console.log("-----------------------------------------------",req.query.sender)
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})
.catch(err => {
    console.log("-----------------------------------------------",req.query.sender)

    console.log(err);
    res.status(500).json({error:err});
})
//end

});

router.get("/updatereceiverbalance", (req, res) => { 
    //now add money to receiver
    User.findOne({accountnumber: req.query.receiver})
    .exec()
    .then(result1 => {
        console.log( "Got Account",result1.balance, req.query.amount );
        console.log("update to", result1.balance + req.query.amount )
        User.update({accountnumber: req.query.receiver}, {
            $set: {
                balance: result1.balance + req.query.amount ,
            }
        })
        .exec()
        .then(result2 => {
            console.log(result2);
            res.status(200).json({
                message: "ok"
            });
        })
        .catch(err => {
            console.log("-----------------------------------------------",req.query.receiver)
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    })
    .catch(err => {
        console.log("-----------------------------------------------",req.query.receiver)
    
        console.log(err);
        res.status(500).json({error:err});
    })
    //end
    
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

            User.findOne({accountnumber: accountnumber})
            .exec()
            .then(doc1 => {
                
            User.update({accountnumber: accountnumber}, {
                $set: {
                    balance: doc1.balance + req.body.balance,
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