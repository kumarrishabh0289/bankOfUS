const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mail = require('../models/mail');

router.post('/', (req, res, next) => {
    const mail = new Mail({
        _id : new mongoose.Types.ObjectId(),
       
        to: req.body.to,
        from:req.body.from,
        content: req.body.content,
    });
    mail
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Message Sent",
        Sent:mail
    });
});

router.get('/', (req, res, next) => {
    const to = req.query.to;
    Mail.find({ to: to })
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

router.get('/from', (req, res, next) => {
    const from = req.query.to;
    Mail.find({ from: from })
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



module.exports = router;