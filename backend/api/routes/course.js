const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course');


router.get('/', (req, res, next) => {
	Course.find()
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

router.get('/email', (req, res, next) => {
	const email = req.query.email;
	Course.find({faculty_email: email})
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({message: "not a valid Email ID"});
			}
			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		})
	
});


router.post('/', (req, res, next) => {
	const course = new Course({
		_id: new mongoose.Types.ObjectId(),
		course_id: req.body.id,
		name: req.body.name,
		faculty_email: req.body.faculty,
		ta_email: req.body.ta,
		department: req.body.department,
		room: req.body.room,
		capacity: req.body.capacity,
		waiting: req.body.waiting,
		term: req.body.term,
		current_wait: 0,
		total_enroll: 0,
	});
	course
		.save()
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
	res.status(201).json({
		message: "New Course Created",
		
	});
});

module.exports = router;