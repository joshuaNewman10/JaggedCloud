// INITIATION: add mongoose to project and open connection to database on locally running MongoDB instance 
var mongoose = require('mongoose');
mongoose.connect(<MONGODB connection goes here>) --> example: 'mongodb://localhost/test'


// CONNECTION: pending to database on local host; need notification if connected successfully or error occured
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log('MongoDB connection open!');
});