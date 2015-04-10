var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');

var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
};


// TODO: set created_by to githubId -- need to receive github id

module.exports.create = function(req, res) {
  console.log(req.body);
  var user = req.body.name;
  var startTime = req.body.time;
  var email = req.body.email;
  var name = req.body.name;
  var githubId = req.body.githubId;
  var startTime = req.body.time;
  var isOpen = Date.now() >= Date.parse(startTime);

  Room.create({ created_by: email, start_time: startTime, is_open: isOpen }, function(err, room){
    if (err) { handleError(err); }
    else if (room) {
      console.log('room successfully created! ' + room);
      res.send(201, room);
    }      
  });

};

// update pattern: Model.update(conditions, doc, [options], [callback])
module.exports.save = function(req, res) {
  var roomId = req.body.roomId;
  var canvas = req.body.canvas;
  var text = req.body.textEditor;

  Room.findOneAndUpdate({'_id': roomId}, {canvas: canvas, text: text}, {upsert: true},
    function(err, room){
      if (err) { handleError(err); }
      else if (room) {
        console.log(room._id + ': room successfully updated');
        res.send(201, room);      
      }
    }
  );
};


module.exports.fetch = function(req, res) {
  console.log('In room controller fetch');
  var roomId = req.body.roomId;

// first check if the room exists
// check if user made the room -- if yes, send back all data
// if no, send back only part of the data
// TODO: only give back data if is_open is set to true

  console.log('request: ', roomId);
  Room.findById(roomId, function(err, room){
    if (err) { 
      handleError(err); 
      res.send(404, 'no room data');
    }
    else if (room) {
      res.send(200, room);
    }
  });
};



module.exports.fetchAllRooms = function(req, res) {
  console.log('req.session' + req.session);

  console.log('test');
  var userId = req.session;
  var rooms = [];
  
// find user by id and retrieve their 'future rooms'
// roomIds will be an array -- each element should be just a roomId (not an object)
  var roomIds = User.findById(userId, 'future_rooms', function(err, userRooms){
    console.log('in the callback');
    if (err) { 
      handleError(err); 
      console.log('cannot find user');
      res.send(404, 'cannot find user by ID');
    }
    else if (userRooms) {
      console.log('user rooms: ' + userRooms);
    }
  });

// not sure if this will work -- iterate over roomIds array
  for (var i = 0; i < roomIds.length; i++) {
    Room.findById(roomIds[i], function(err, room){
      if (err) { 
        handleError(err); 
        res.send(404, 'no room data');
      }
      else if (room) {
        // var roomData = {};
        rooms.push(room);
        res.send(200, rooms);
      }
    });
  } 

}


// return an array of objects with the following (each obj is a room)
// Snapshot of all rooms
//   date created
//   start time
//   created_by
//   roomId





