var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');

var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
};


// find user by id and retrieve rooms
module.exports.fetchAll = function(req, res) {
  var githubId = req.user;
  var roomsArray = [];
  
  User.findOne({github_id: githubId}, 'rooms', function(err, user){
    if (err) { 
      handleError(err); 
      res.send(404, 'cannot find user by ID');
    }

    else {
      var rooms = user.rooms;

      for (var i = 0; i < rooms.length; i++) {
        Room.findById(rooms[i], function(err, room){

          if (err) { 
            handleError(err); 
            res.send(404, 'no room data');
          }

          else {
            var roomData = {
// TODO: created_by is not showing up -- check create function
              created_by: room.created_by,
              start_time: room.start_time,
              is_open: room.is_open,
              id: room._id
            }
            roomsArray.push(roomData);
          }

          console.log('length', roomsArray.length);
          if (roomsArray.length === rooms.length) {
            console.log('ROOMS ARRAY: ', roomsArray);
            res.send(202, roomsArray);
          }

        });
        

      }
      
    }
  });


}

