const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Permission = require('../models/permission');

router.get('/', (req, res, next) => {
    Permission.find()
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

router.get('/course', (req, res, next) => {
    const course_id = req.query.course;
    Permission.find({ course_id: course_id })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "not a valid ID" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

});

router.post('/', (req, res, next) => {
    
    Permission.findOne().sort({ permission_id: 'desc', _id: -1 }).limit(1)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                var permission_id = doc.permission_id;
                permission_id = parseInt(permission_id);
                
                i = 0;
                while (i < req.body.number) {
                    i = i + 1;
                    permission_id = permission_id + 1;
                    const permission = new Permission({
                        _id: new mongoose.Types.ObjectId(),
                        permission_id: permission_id,
                        course_id: req.body.course_id,
                        used: "no",
                    });
                    permission.save()
                        
                     
                }

                res.status(200).json({message: "Codes Created"});
            }
            else {
                res.status(404).json({ message: "not a valid ID" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })


    
});

module.exports = router;