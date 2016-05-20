'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var moment = require('moment');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.get('/timeservice/:time', function(req,res)
{
	var requestdata = req.params.time;
	var unixdate = null;
	var normaldate = null;
	
	if (requestdata >= 0) 
	{
		console.log('Unix Date Detected');
		console.log('unix: ' + requestdata);
	    unixdate = requestdata;
	    normaldate = unixToNormal(requestdata)
	}
	
    if (isNaN(requestdata) && moment(requestdata, "MMMM D, YYYY").isValid()) 
    {
    	console.log('Normal Date Detected')
    	console.log('normal: ' + requestdata);
    	normaldate = requestdata;
	    unixdate = normalToUnix(requestdata);
	    
    }
    
    var output = { "unix": unixdate, "date": normaldate };
    res.send(JSON.stringify(output));
});

function normalToUnix(date) {
	console.log('unix: '+moment(date, "MMMM D, YYYY").format("X"));
    return moment(date, "MMMM D, YYYY").format("X");
}

function unixToNormal(date) {
	console.log('normal: '+moment.unix(date).format("MMMM D, YYYY"));
    return moment.unix(date).format("MMMM D, YYYY");
}

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});