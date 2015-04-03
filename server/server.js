var express = require('express');
var http = require('http');

var app = express();

var port = process.env.port || 3000;

require('./routes')(app, express);

app.listen(port);