const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const EdgeStation = require('../models/edgestation');
const Machine = require('../models/machine');

router.get('/', (req, res) => {
	EdgeStation.find()
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

router.get('/email', (req, res) => {
	const email = req.query.email;
	EdgeStation.find({userEmail: email})
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

router.post('/', (req, res) => {
	const edgeStation = new EdgeStation({
		_id: new mongoose.Types.ObjectId(),
		edgeStationId: req.body.edgeStationId,
		name: req.body.name,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		address: req.body.address,
		city: req.body.city,
		country: req.body.country,
		state: req.body.state,
		userEmail: req.body.userEmail
	});
	edgeStation
		.save()
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
	res.status(201).json({
		message: "New Edge Station Created",
	});
});

router.patch("/addMachine", (req, res) => {
	const machineId = req.body.machineId;
	Machine.update({machineId: machineId}, {
			$set: {
				machineStatus: 1,
			}
		})
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: "Machine was added Successfully"
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.patch("/deleteMachine", (req, res) => {
	const machineId = req.body.machineId;
	Machine.update({machineId: machineId}, {
			$set: {
				machineStatus: 0,
			}
		})
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: "Machine was deleted Successfully"
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