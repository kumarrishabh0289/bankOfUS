const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./api/routes/user');
const loginRoutes = require('./api/routes/login');
let passport = require("passport");
const passportJWT = require("passport-jwt");


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


app.use('/login', loginRoutes);



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