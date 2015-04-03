var mongoose = require('mongoose');
var express = require('express');
var http = require('http');

var app = express();

var port = process.env.port || 3000;

require('./routes')(app, express);

app.listen(port);




// INITIATION: open mongoose connection to database on locally running MongoDB instance
mongoose.connect(<MONGODB connection goes here>) --> example: 'mongodb://localhost/test'


// CONNECTION: pending to database on local host; need notification if connected successfully or error occured
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log('MongoDB connection open!');
});