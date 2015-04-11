var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');

var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
};


module.exports.fetchAllRooms = function(req, res) {
  var githubId = req.user;
  var rooms = [];
  
// find user by id and retrieve rooms
  User.find({github_id: githubId}, 'rooms', function(err, user){
    if (err) { 
      handleError(err); 
      res.send(404, 'cannot find user by ID');
    }

    else if (user) {
      var rooms = user.rooms;
      console.log('user object: ', user);
      console.log('rooms: ', rooms);
      
      // for (var i = 0; i < rooms.length; i++) {
      //   console.log('in for loop. room: ', rooms);
      //   Room.findById(rooms[i], function(err, room){
      //     if (err) { 
      //       handleError(err); 
      //       res.send(404, 'no room data');
      //     }

      //     else if (room) {
      //       // var roomData = {};
      //       rooms.push(room);
      //       res.send(200, rooms);
      //     }
      //   });
      // }

    }
  });
}

//   return: date_created, start_time, created_by, room_id
