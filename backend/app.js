const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./api/routes/user');
const profileRoutes = require('./api/routes/profile');
const loginRoutes = require('./api/routes/login');
const edgeStationRoutes = require('./api/routes/edgestation');
const sensorRoutes = require('./api/routes/sensor');
const machineRoutes = require('./api/routes/machine');
const serviceRequestRoutes = require('./api/routes/servicerequest');
const sensorDataRoutes = require('./api/routes/sensordata');

let passport = require("passport");
const passportJWT = require("passport-jwt");
var multer = require('multer');
const path = require("path");
var Gallery = require('express-photo-gallery');
require('./api/auth/auth');

mongoose.connect('mongodb+srv://openhome:' +
	process.env.MONGO_PASSWORD +
	'@cluster0-uqjyp.mongodb.net/test?retryWrites=true&w=majority',
	{
		useNewUrlParser: true
	}
);

mongoose.set('useCreateIndex', true)
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use(cors({origin: 'http://localhost:3000', credentials: true}));


app.use(passport.initialize());


passport = require("passport");


app.post("/secret", passport.authenticate('jwt', {session: false}, null), function (req, res) {
	
	console.log("success", req.body.data);
	
	res.json({'message': "Success"});
});

app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/login', loginRoutes);
app.use('/edgestation', edgeStationRoutes);
app.use('/sensor', sensorRoutes);
app.use('/machine', machineRoutes);
app.use('/servicerequest', serviceRequestRoutes);
app.use('/sensordata', sensorDataRoutes);





var options = {
  title: 'My Awesome Photo Gallery'
};

app.use('/droneimage', Gallery('../Backend', options));




const storage = multer.diskStorage({
  destination: "",
  filename: function (req, file, cb) {
      cb(null, "DRONE" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 999999999999999999999999},
}).single("myImage");


app.post('/nodedrone', (req, res, next) => {
  upload(req, res, (err) => {

      console.log("Request ---", req.body);
      console.log("Request file ---", JSON.stringify(req.file));  //Here you get file.
      // var filepath = req.file;
      // var filepath = filepath.filename;
      res.status(200).json({
        "message":"done"
    });
      

  });
 
});



app.use((req, res, next) => {
	const error = new Error('Api not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;