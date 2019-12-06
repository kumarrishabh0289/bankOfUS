const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quiz = require('../models/quiz');


router.get('/', (req, res, next) => {
    Quiz.find()
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
    Quiz.find({ course_id: course_id })
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
    const quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        course_id: req.body.course_id,
        content: req.body.content,
        url: req.body.url,
        id: req.body.id,
        due: req.body.due,
    });
    quiz
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST  to /Quiz",
        Created: quiz
    });
});


module.exports = router;