const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SensorData = require('../models/sensordata');


router.get('/', (req, res, next) => {
	SensorData.find()
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



router.get('/sensoronmachine', (req, res, next)=>{
    
    const machineId = req.query.machineId
    SensorData.find({ machineId: machineId  })
        .exec()
        .then(doc => {
        console.log("From database",doc);
        if (doc){
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({message:"not a valid machineId"});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })
        
});


router.post('/add', (req, res, next) => {

			const sensor = new SensorData({
				_id: new mongoose.Types.ObjectId(),
				machineId: req.body.machineId,
				name: req.body.name,
				sensorType: req.body.sensorType,
				desc: req.body.desc,
				edgeStationId: req.body.edgeStationId,
				provider: req.body.provider,
				status: 1,
                sensorId: req.body.sensorId,
                startDate: req.body.startDate,
                totalPause:req.body.totalPause,
                data:req.body.data
			});
			sensor
				.save()
				.then(result => {
					console.log(result);
				})
				.catch(err => console.log(err));
			res.status(200).json({
				message: "New sensor data Created",
				
			});
		})


module.exports = router;