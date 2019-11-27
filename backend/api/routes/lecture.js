const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Lecture = require('../models/lecture');
var multer = require('multer');
const path = require("path");

router.get('/', (req, res, next) => {
    Lecture.find()
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
    Lecture.find({ course_id: course_id })
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
    const lecture = new Lecture({
        _id: new mongoose.Types.ObjectId(),
        course_id: req.body.course_id,
        content: req.body.content,
        url: req.body.url,
        id: req.body.id,
        due: req.body.due,
    });
    lecture
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST  to /lecture",
        Created: lecture
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
    limits: { fileSize: 999999999999999999999999},
}).single("myImage");

router.post('/upload', (req, res, next) => {
    upload(req, res, (err) => {

        console.log("Request ---", req.body);
        console.log("Request file ---", JSON.stringify(req.file));  //Here you get file.
        var filepath = req.file;
        var filepath = filepath.filename;
        var id = req.body.id;

        Lecture.update({_id : id}, { $set: {url : filepath}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message:filepath
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
       


    });
   
});



module.exports = router;