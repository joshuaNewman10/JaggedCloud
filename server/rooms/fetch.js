var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');

var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
};


module.exports.fetch = function(req, res) {
  console.log('In room controller fetch');
  var roomId = req.body.roomId;
  var githubId = req.user;


// TODO: only give back data if is_open is set to true

  console.log('request: ', roomId);
  Room.findById(roomId, function(err, room){
    var candidateRoom = {}
    // candidateRoom.canvas = 
    if (err) { 
      handleError(err); 
      res.send(404, 'no room data');
    }

    else if (room && room.isOpen) {
// check if current user is the person who made the room -- if yes, send back all data
      if(githubId === room.githubId) {
        res.send(200, room);
      }
// if no, send back only part of the data
      else {
        res.send(200, candidateRoom)
      }
    }
  });
};