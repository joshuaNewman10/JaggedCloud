var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');

var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
};


// do we want to store other information with the room id? perhaps -- person having interview and their email address
module.exports.create = function(req, res) {
  var startTime = req.body.time;
  var githubId = req.user;
  var email = req.body.email;
  var isOpen = Date.now() >= Date.parse(startTime);

  Room.create({ created_by: githubId, start_time: startTime, is_open: isOpen }, function(err, room){
    if (err) { handleError(err); }
    else if (room) {
      console.log('room successfully created! ' + room);

// save the room to the user who created it
      User.findOneAndUpdate({github_id: githubId}, {$push: {rooms: [room._id]}}, {upsert: true}, function(err, user){
        if (err) { handleError(err); }
        else if (user) {
          console.log('successfully added new room to user : ', user);
        }
      });
      res.send(201, room);
    }      
  });

};