'use strict';

var express = require('express');
var moment = require('moment');

var app = express();
app.get('/:time', function(req,res)
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

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});