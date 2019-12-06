const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Enroll = require('../models/enroll');
const Course = require('../models/course');
const Permission = require('../models/permission');


router.get('/', (req, res, next) => {
    Enroll.find()
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

router.get('/status', (req, res, next) => {
    const status = req.query.status;
    const course = req.query.course;
    Enroll.find({ status: status, course_id: course })
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

router.get('/email', (req, res, next) => {
    console.log("reached here");
    const student = req.query.email;
    console.log("student", student);
    Enroll.find({ student: student })
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

router.get('/one', (req, res, next) => {
    Enroll.findOne().sort({ enroll_id: 'desc', _id: -1 }).limit(1)
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

//Drop A Courese From Student Dashboard
router.put("/", (req, res, next) => {
    const email = req.body.email;
    const course_id = req.body.course_id;

    Enroll.remove({ course_id: course_id, student: email })
        .exec()
        .then(result => {

            Course.findOne({ course_id: req.body.course_id })
                .exec()
                .then(docs => {
                    console.log(docs);
                    var total_enroll = docs.total_enroll;
                    console.log("total_enroll", total_enroll);
                    total_enroll = total_enroll - 1;
                    console.log("total_enroll", total_enroll);
                    Course.update({ course_id: course_id }, {
                        $set: {
                            total_enroll: total_enroll,

                        }
                    })
                        .exec()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({ message: "Dropped Successfully" });

                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });


                })
        })


        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            });
        });
});


router.patch("/", (req, res, next) => {


    const email = updateOps.email;
    console.log("updateOps", updateOps);
    console.log("email", email);
    Profile.update({ email: email }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Update Was Successfull"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


//Student Enroll for a Course 
router.post('/', (req, res, next) => {
    Enroll.findOne({ course_id: req.body.course_id, student: req.body.student, })
        .exec()
        .then(course => {
            if (course) {
                res.status(201).json({ message: "Student Already Enrolled" });
            }
            else {
                Course.findOne({ course_id: req.body.course_id })
                    .exec()
                    .then(course => {
                        console.log("From database", course);
                        if (course) {

                            var capacity = course.capacity;
                            var waiting = course.waiting;
                            var current_wait = course.current_wait;
                            current_wait = current_wait + 1;
                            var total_enroll = course.total_enroll;
                            total_enroll = total_enroll + 1;
                            if (total_enroll >= capacity) {
                                console.log("Class is Full");
                                if (current_wait >= waiting) {
                                    console.log("Exceeded Max wait limit for this class");
                                    res.status(201).json({
                                        message: "Exceeded Max wait limit for this class"

                                    });


                                }
                                else {
                                    console.log("available for waitlist, Current Waitlist", current_wait);
                                    Enroll.findOne().sort({ enroll_id: 'desc', _id: -1 }).limit(1)
                                        .exec()
                                        .then(docs => {
                                            console.log(docs);
                                            var enroll_id = Number(docs.enroll_id) + 1;
                                            const enroll = new Enroll({
                                                _id: new mongoose.Types.ObjectId(),
                                                permission: req.body.permission,
                                                course_id: req.body.course_id,
                                                student: req.body.student,
                                                status: "waitlist",
                                                enroll_id: enroll_id,
                                                number: current_wait,
                                            });
                                            enroll
                                                .save()
                                                .then(result => {

                                                    console.log(result);

                                                    Course.update({ course_id: req.body.course_id }, { $set: { current_wait: current_wait } })
                                                        .exec()
                                                        .then(result => {
                                                            console.log(result);

                                                        })
                                                        .catch(err => {
                                                            console.log(err);
                                                            res.status(500).json({
                                                                error: err
                                                            });
                                                        });
                                                })
                                                .catch(err => console.log(err));
                                            res.status(201).json({
                                                message: "Enrollment Done With Wait-List",
                                                current_wait: current_wait,

                                            });

                                        }).catch(err => {
                                            console.log(err);
                                            res.status(500).json({
                                                error: err
                                            })
                                        })
                                }
                            }
                            else {
                                console.log("Avalable for Enroll, Current Status:", total_enroll);
                                Enroll.findOne().sort({ enroll_id: 'desc', _id: -1 }).limit(1)
                                    .exec()
                                    .then(docs => {
                                        console.log(docs);
                                        var enroll_id = Number(docs.enroll_id) + 1;
                                        const enroll = new Enroll({
                                            _id: new mongoose.Types.ObjectId(),
                                            permission: req.body.permission,
                                            course_id: req.body.course_id,
                                            student: req.body.student,
                                            status: "enrolled",
                                            enroll_id: enroll_id,
                                            number: total_enroll,
                                        });
                                        enroll
                                            .save()
                                            .then(result => {

                                                console.log(result);

                                                Course.update({ course_id: req.body.course_id }, { $set: { total_enroll: total_enroll } })
                                                    .exec()
                                                    .then(result => {
                                                        console.log(result);

                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                        res.status(500).json({
                                                            error: err
                                                        });
                                                    });
                                            })
                                            .catch(err => console.log(err));
                                        res.status(201).json({
                                            message: "Enrollment Done",
                                            total_enroll: total_enroll,

                                        });

                                    }).catch(err => {
                                        console.log(err);
                                        res.status(500).json({
                                            error: err
                                        })
                                    })
                            }


                        }
                        else {
                            res.status(404).json({ message: "not a valid Course" });
                        }

                    })
            }
        })




        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});


//Student Enroll for a Course  with Permission Number
router.post('/permission', (req, res, next) => {
    Enroll.findOne({ course_id: req.body.course_id, student: req.body.student, })
        .exec()
        .then(course => {
            if (course) {
                res.status(201).json({ message: "Student Already Enrolled" });
            }
            else {
                Course.findOne({ course_id: req.body.course_id })
                    .exec()
                    .then(course => {
                        console.log("From database", course);
                        if (course) {
                            Permission.find({permission_id: req.body.permission, used:"no", course_id: req.body.course_id })
                                .exec()
                                .then(doc => {
                                    console.log("From database", doc);
                                    if (doc.length>=1) {
                                      
                                        var total_enroll = course.total_enroll;
                                        total_enroll = total_enroll + 1;

                                        console.log("Avalable for Enroll, Current Status:", total_enroll);
                                        Enroll.findOne().sort({ enroll_id: 'desc', _id: -1 }).limit(1)
                                            .exec()
                                            .then(docs => {
                                                console.log(docs);
                                                var enroll_id = Number(docs.enroll_id) + 1;
                                                const enroll = new Enroll({
                                                    _id: new mongoose.Types.ObjectId(),
                                                    permission: req.body.permission,
                                                    course_id: req.body.course_id,
                                                    student: req.body.student,
                                                    status: "enrolled",
                                                    enroll_id: enroll_id,
                                                    number: total_enroll,
                                                });
                                                enroll
                                                    .save()
                                                    .then(result => {

                                                        console.log(result);

                                                        Course.update({ course_id: req.body.course_id }, { $set: { total_enroll: total_enroll } })
                                                            .exec()
                                                            .then(result => {
                                                                Permission.update({ permission_id: req.body.permission }, { $set: { used: "yes" } })
                                                                .exec()
                                                                .then(result => {
                                                                    
                                                                    console.log(result);
    
                                                                })

                                                            })
                                                            .catch(err => {
                                                                console.log(err);
                                                                res.status(500).json({
                                                                    error: err
                                                                });
                                                            });
                                                    })
                                                    .catch(err => console.log(err));
                                                    res.status(201).json({
                                                    message: "Enrollment Done with Permission Number",
                                                    total_enroll: total_enroll,

                                                });

                                            }).catch(err => {
                                                console.log(err);
                                                res.status(500).json({
                                                    error: err
                                                })
                                            })


                                    }
                                    else {
                                        res.status(201).json({ message: "not a Valid Permission ID" });
                                    }

                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ error: err });
                                })

                        }
                        else {
                            res.status(404).json({ message: "Not a valid Course" });
                        }

                    })
            }
        })




        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

module.exports = router;