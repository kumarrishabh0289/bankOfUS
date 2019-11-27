const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Submission = require('../models/submission');
var multer = require('multer');
const path = require("path");

router.get('/', (req, res, next) => {
    Submission.find()
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


router.get('/assignment', (req, res, next) => {
    const student = req.query.student;
    const course_id = req.query.course_id;
    Submission.find({ student: student, assignment_id: { $gt: [] }, course_id: course_id })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "not a valid Email ID" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

});

router.get('/quiz', (req, res, next) => {
    const student = req.query.student;
    const course_id = req.query.course_id;
    Submission.find({ student: student, quiz_id: { $gt: [] }, course_id: course_id })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "not a valid Email ID" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

});

router.post('/', (req, res, next) => {
    const submission = new Submission({
        _id: new mongoose.Types.ObjectId(),
        student: req.body.student,
        url: req.body.url,
        quiz_id: req.body.quiz_id,
        assignment_id: req.body.assignment_id,
        grade: "",
        status: "submitted",
        course_id: req.body.course_id,
        marks: "100",
        answer: req.body.answer,
    });
    submission
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST  to /submission",
        Created: submission
    });
});

router.patch("/", (req, res, next) => {
   
    Submission.update({student : req.body.student, assignment_id: req.body.assignment_id }, { $set: {grade:req.body.grade, status:"graded"} })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message:"Update Was Successfull"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.patch("/quizgrade", (req, res, next) => {
   
    Submission.update({student : req.body.student, quiz_id: req.body.quiz_id }, { $set: {grade:req.body.grade, status:"graded"} })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message:"Update Was Successfull"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

const storage = multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename: function (req, file, cb) {
        cb(null, "CANVAS" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 999999999999999999999999 },
}).single("myImage");


router.post('/upload', (req, res, next) => {
    upload(req, res, (err) => {

        console.log("Request ---", req.body);
        console.log("Request file ---", JSON.stringify(req.file));  //Here you get file.
        var filepath = req.file;
        var filepath = filepath.filename;

        const submission = new Submission({
            _id: new mongoose.Types.ObjectId(),
            student: req.body.student,
            url: filepath,
            quiz_id: req.body.quiz_id,
            assignment_id: req.body.assignment_id,
            grade: "",
            status: "submitted",
            course_id: req.body.course_id,
            marks: "100",
            answer: "",
        });
        submission
            .save()
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
        res.status(201).json({
            message: "Submitted Successfully ",
            Created: submission
        });



    });

});
module.exports = router;