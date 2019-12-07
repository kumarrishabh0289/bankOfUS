const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var jwt = require('jsonwebtoken');



router.get('/', (req, res, next) => {
	User.find()
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


router.post('/register', (req, res, next) => {
	console.log("request", req.body)
	accno = Math.floor(Math.random() * 1000000000) + 1234567;
	routingnumber = Math.floor(Math.random() * 100000) + 123456; 
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
		accountnumber: accno,
		balance: 0,
		routingnumber: routingnumber,
		status: "Active",
		mobile:req.body.mobile,
		type:req.body.type
		
	});
	user
		.save()
		.then(result => {
			console.log(result);
			res.status(200).json({message: "User Created"});
		})
		.catch(err => {
			console.log(err.errmsg)
			res.status(202).json({error: err});
			
		});
	
	
});


router.get('/email', (req, res, next) => {
	const email = req.query.email;
	User.findOne({email: email})
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({message: "Not a valid ID"});
			}
			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		})
});

router.put("/delete", (req, res, next) => {

    User.remove({ email:req.body.email })
        .exec()
        .then(result => {
            res.status(200).json({ message: "Deleted Successfully" });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        })
	
})

router.patch("/updatebalance", (req, res) => {
    const accountnumber = req.body.accountnumber;// the amount to be added
	let amount = req.body.amount;
    User.findOne({accountnumber: accountnumber})
        .exec()
        .then(result => {
			console.log( "Got Account",result.balance, amount );
			console.log( typeof result.balance)
			console.log( typeof amount)
			console.log("update to", result.balance + amount )
			User.update({accountnumber: accountnumber}, {
                $set: {
                    balance: result.balance + amount ,
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
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        })
        
});


router.get('/check', (req, res, next) => {
	
	const sender = req.query.sender;
	const amount = req.query.amount;
	const  receiver = req.query.receiver;
	User.findOne({accountnumber: receiver})
	.exec()
	.then(doc => {
		console.log("From database", doc);
		if (doc) {
		} else {
			res.status(404).json({message: "not a valid receiver ID"});
			
		}		
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	})

	User.findOne({accountnumber: sender})
		.exec()
		.then(doc1 => {
			console.log("From database", doc1);
			if (doc1) {
                if (doc1.balance - req.query.amount < 0)
                {
                    res.status(403).json({message: "Negative balance not possible"}); //invalid
                }
                else{
					console.log("-------------", doc1.balance - req.query.amount)
                    res.status(200).json({message: "Possible to transact" });
                }
			} else {
				res.status(403).json({message: "not a valid sender ID"});
			}		
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		})
});

module.exports = router;