const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Announcement = require('../models/announcement');


router.get('/', (req, res, next) => {
    Announcement.find()
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
    Announcement.find({ course_id: course_id })
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
    const announcement = new Announcement({
        _id: new mongoose.Types.ObjectId(),
        course_id: req.body.course_id,
        content: req.body.content,
        id: req.body.id,
    });
    announcement
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST  to /announcement",
        Created: announcement
    });
});


module.exports = router;