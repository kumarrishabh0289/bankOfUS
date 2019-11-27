const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sensor = require('../models/sensor');


router.get('/', (req, res, next) => {
	Sensor.find()
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
    Sensor.find({ machineId: machineId  })
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
	Sensor.findOne().sort({sensorId: 'desc', _id: -1}).limit(1)
		.exec()
		.then(docs => {
			console.log(docs);
			let sensorId = 1;
			if (docs) {
				sensorId = docs.sensorId + 1;
			}
			const sensor = new Sensor({
				_id: new mongoose.Types.ObjectId(),
				machineId: req.body.machineId,
				name: req.body.name,
				sensorType: req.body.sensorType,
				desc: req.body.desc,
				edgeStationId: req.body.edgeStationId,
				provider: req.body.provider,
				status: 1,
                sensorId: sensorId,
                startDate:Date.now(),
                totalPause:0
			});
			sensor
				.save()
				.then(result => {
					console.log(result);
				})
				.catch(err => console.log(err));
			res.status(200).json({
				message: "New sensor Created",
				
			});
		})
});

router.patch("/update", (req, res) => {
    const sensorId = req.body.sensorId;
    if (req.body.status == 2 ||req.body.status == 0 )
    {
        Sensor.updateOne({sensorId: sensorId}, {
			$set: {
                startPause:Date.now(),
				status: req.body.status,
			}
		})
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: "Sensor status was updated Successfully"
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});

    }
    else
    {
        Sensor.findOne({ sensorId: sensorId  })
        .exec()
        .then(doc => {
            if (doc){
                console.log(doc.startPause.getTime());
                var strdate=doc.startPause;
                var diff = Math.abs(new Date().getTime() - doc.startPause.getTime());
                console.log(diff);
                Sensor.update({sensorId: sensorId}, {
                    $set: {
                        startPause:0,
                        status: req.body.status,
                        totalPause:doc.totalPause+diff
                        
                    }
                })
                .exec()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: "Sensor status was updated Successfully"
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });

            }
        })
.catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    })
})
    }

	
});

router.put("/delete", (req, res, next) => {

    Sensor.remove({ sensorId:req.body.sensorId })
        .exec()
        .then(result => {
            res.status(200).json({ message: "Deleted Successfully" });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        })
    })

    
    


module.exports = router;