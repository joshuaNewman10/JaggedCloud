var express = require('express');
var http = require('http');
var db = require('./db/config.js');

console.log('Server.js: Environmental variables:', process.env);
var app = express();

var port = process.env.port || 3000;

require('./routes')(app, express);

app.listen(port);