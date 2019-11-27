const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/user');
const jwt = require('jsonwebtoken');


router.post("/", (req, res) => {
	console.log("data", req.body);
	
	user.findOne({email: req.body.email})
		.exec()
		.then(doc => {
			console.log("From database", doc);
			
			if (doc.password === req.body.password && doc.role === req.body.role) {
				res.cookie('cookie', 'cookie', {maxAge: 900000, httpOnly: false, path: '/'});
				
				const body = {user: doc.name};
				const token = jwt.sign({user: body}, 'rishabh');
				res.status(200).json({
					email: doc.email,
					name: doc.name,
					role: doc.role,
					jwt: 'Bearer ' + token,
				});
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