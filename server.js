'use strict';

var express = require('express');
var moment = require('moment');

var app = express();
app.get('/whoami', function(req,res)
{
	var requestdata = req.headers;
	console.log(requestdata)
	var output = {
		'ipaddress': req.headers['x-forwarded-for'],
		'language': req.headers['accept-language'].split(',')[0],
		'software': req.headers['user-agent'].split('(')[1].split(')')[0]
	};
    res.send(JSON.stringify(output));
});


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});