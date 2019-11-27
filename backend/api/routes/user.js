const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');

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
	console.log("request", req.body);
	
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
		role: req.body.role,
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

router.get('/:userId', (req, res, next) => {
	const email = req.params.userId;
	User.findOne({email: email})
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({message: "not a valid ID"});
			}
			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		})
});

module.exports = router;