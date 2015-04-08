// var express = require('express');
// var http = require('http');
// var app = express();
// var db = require('./db/config.js');
// var io = require('socket.io')(http);

// console.log('Server.js: Environmental variables:', process.env);

// io.on('connection', function(socket){
//   console.log('a user connected');
// });


// var port = process.env.port || 3000;
// require('./routes')(app, express);


// app.listen(port, function() {
//   console.log('listening on ', port);
// });

var express = require('express');
var http = require('http');
var app = express();
var db = require('./db/config.js');

console.log('Server.js: Environmental variables:', process.env);
var port = process.env.port || 3000;

require('./routes')(app, express);


var server = http.createServer(app).listen(port, function() {
  console.log('Server listening on port', port);
});

<<<<<<< HEAD
//Sockets Setup
//io is the overall connection
//Within io you can have many specific channels/pipes which are called sockets
//We listen for specific events on sockets
//We can also send events to ALL sockets via io.emit
=======
>>>>>>> 74d303bb093e5bb5e9da0891e6ebfe56e506e3f4
var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('a user connected');
  io.emit('greeting', 'HELLO WORLD heres some data from sockets!');
  socket.on('disconnect', function(){
      console.log('user disconnected');
  });
  socket.on('coords', function(data) {
<<<<<<< HEAD
    io.emit('coordinates', data);
  });
=======
    console.log(data);
    io.emit('coordinates', {data: data});
  });

>>>>>>> 74d303bb093e5bb5e9da0891e6ebfe56e506e3f4
});
