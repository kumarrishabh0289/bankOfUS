const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ServiceRequest = require('../models/servicerequest');


router.get('/', (req, res, next) => {
	const machineId = req.query.machineId;
	ServiceRequest.find({machineId: machineId})
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({message: "not a valid machineId"});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		})
});


router.post('/add', (req, res, next) => {
	ServiceRequest.findOne().sort({serviceRequestId: 'desc', _id: -1}).limit(1)
		.exec()
		.then(docs => {
			console.log(docs);
			let serviceRequestId = 1;
			if (docs) {
				serviceRequestId = docs.serviceRequestId + 1;
			}
			const serviceRequest = new ServiceRequest({
				_id: new mongoose.Types.ObjectId(),
				machineId: req.body.machineId,
				serviceRequestName: req.body.serviceRequestName,
				date: Date.now(),
				status: "Pending",
				serviceRequestId: serviceRequestId
			});
			serviceRequest
				.save()
				.then(result => {
					console.log(result);
				})
				.catch(err => console.log(err));
			res.status(200).json({
				message: "New service request Created",
				
			});
		})
});

router.patch("/update", (req, res) => {
	const serviceRequestId = req.body.serviceRequestId;
	ServiceRequest.update({serviceRequestId: serviceRequestId}, {
			$set: {
				status: req.body.status,
			}
		})
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: "Service Request status was updated Successfully"
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});


module.exports = router;