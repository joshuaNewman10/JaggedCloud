var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');

var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
};



module.exports.fetchOne = function(req, res) {
  console.log('req.body',req.body);
  var roomId = req.body.roomId;
  var githubId = req.user;
  var startTime = req.body.time;
  var isOpen = Date.now() >= Date.parse(startTime);

  Room.findById(roomId, function(err, room){
    console.log('ROOM: ',room);
    // var canvas = room.canvas;
    // var text = room.text;
    // var candidateRoom = {
    //   canvas: canvas,
    //   text: text
    // }

    if (err) { 
      handleError(err); 
      res.send(404, 'no room data');
    }

    else if (room && !isOpen) {
      res.send(404, 'room not available');
    }

// if current user is room creator send back all room data, else send candiateRoom
    else if (room && isOpen) {
      if(githubId === room.creted_by) {
        res.send(200, room);
      }
      else {
        res.send(200, candidateRoom);
      }
    }

  });
};