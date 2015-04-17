var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');
var mandrill = require('../email/message');

var handleError = function(error) {
  console.error('the following error has occurred: ' + error);
};

<<<<<<< HEAD
var roomState = function(startTime, endTime) {
  // set the currentTime equal to the current time in ms
  var currentTime = Date.now();
=======
// TODO: increase startTime by 24hr -- this is wrong
// var roomState = roomState(startTime, endTime);
 

var roomState = function(startTime, endTime) {
  if (Date.now() < Date.parse(startTime)){
    return 'preInterview';
  }
  else if (Date.now() >= Date.parse(startTime) && Date.now() < Date.parse(endTime)){
    return 'live';
  }
  else if (Date.now() >= Date.parse(endTime)){
    return 'complete';
  }
  else {
    console.log('error processing room state');
  }
}
>>>>>>> resolve merge conflicts

  // if the startTime is greater than the currentTime, the interview has not begun
  if (currentTime < startTime){
   return 'preInterview';
  }

  // if the currentTime is between the endTime and the startTime, the interview is live
  else if (currentTime >= startTime && currentTime < endTime){
   return 'live';
  }

  // if the currentTime is greater than the endTime, the interview is over
  else if (currentTime >= endTime){
   return 'complete';
  }

  // if none of the states apply, we've hit an error
  else {
   console.error('error processing room state');
  }
};

/**
 * RoomController.create:
 * This function creates a new interview room
 */
module.exports.create = function(req, res) {
<<<<<<< HEAD
  var startTime = Date.parse(req.body.time);
  var endTime = startTime + 86400000; // create the default end time of 24hrs (86400000ms) later than the start time
  var githubId = req.user;
  var sendEmail = req.body.sendEmail;
  var email = req.body.email;
<<<<<<< HEAD
  var name = req.body.name;
  var isOpen = Date.now() >= startTime;

=======
=======
  var githubId = req.user;
  var name = req.body.name;
  var email = req.body.email;
>>>>>>> resolve merge conflicts
  var startTime = req.body.time;
  var endTime = (startTime + 24);

<<<<<<< HEAD
  Room.create({ created_by: githubId, start_time: startTime, end_time: endTime, is_open: isOpen, candidateName: name, candidateEmail: email }, function(err, room){
=======
  // create new interview room
  Room.create({ created_by: githubId, candidateName: name, candidateEmail: email, start_time: startTime, end_time: endTime }, function(err, room){
    // error creating room
>>>>>>> resolve merge conflicts
    if (err) {
      handleError(err);
      res.status(404).send('error occurred; no room created');
    }
    // no error creating room
    else{
      // no room created, send error
      if (!room) {
        handleError(err);
        res.status(404).send('error occurred; no room created');
      }
      // room created successfully
      else {
        console.log('room successfully created!');

        // find user and push room to user's rooms array
        User.findOneAndUpdate({github_id: githubId}, {$push: {rooms: room._id}}, {upsert: true}, function(err, user){
          // error finding user
          if (err) {
            handleError(err);
            res.status(404).send('error finding user');
          }
          else {
            // user doesn't exist
            if (!user) {
              handleError(err);
              res.status(404).send('error finding user');
            }
            // user exists; send email to candidate
            else {
              console.log('successfully added new room to user!' + user);
              mandrill.sendMessage({email:email, fullname: name});
            }
          }
        });
        res.status(201).send(room);
      }      
    }
<<<<<<< HEAD
    else if (room) {
      console.log('room successfully created!');

      User.findOneAndUpdate({github_id: githubId}, {$push: {rooms: room._id}}, {upsert: true}, function(err, user){
        if (err) {
          handleError(err);
          res.send(404, 'user not found');
        }
        else if (user) {
          console.log('successfully added new room to user!' + user);
          if ( sendEmail ) {
            mandrill.sendMessage({email:email, fullname: name});
          }
        }
      });
      res.send(201, room);
    }      
=======
>>>>>>> resolve merge conflicts
  });
};

/**
 * RoomController.save:
 * This function saves the data in the interview room
 */
module.exports.save = function(req, res) {
  var roomId = req.body.roomId;
  var canvas = req.body.canvas;
  var text = req.body.textEditor;

  // find the room and update data
  Room.findOneAndUpdate({_id: roomId}, {canvas: canvas, text: text}, {upsert: true},
    function(err, room){
      // error finding room
      if (err) {
        handleError(err);
        res.status(404).send('error finding room');
      }
      // no error finding room
      else {
        // no room found
        if (!room){
          handleError(err);
          res.status(404).send('room not found');
        }
        else {
          // room found and data saved
          handleError(err);
          res.status(201).send(room);      
        }
      }
    }
  );
};

<<<<<<< HEAD
module.exports.exists = function(req, res) {
  var roomId = req.params.id;
  
  if (roomId.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    Room.findById(roomId, function(err, room) {
      // if an error occurs console the error
      if(err) {
        console.error('Error: ', err);
      }
      // if a room exists, return true;
      if(room) {
        console.log('Found room: ', room._id);
        res.status(200).send({exists: true});
      // if  a room does not exist, return false;
      } else {
        console.log('No room, instead found: ', room);
        res.status(200).send({exists: false});
      }
    });
  }
  else {
    res.status(200).send({exists: false});
  }
};

module.exports.access = function(req, res) {
  var roomId = req.params.id;

  if (roomId.match(/^[0-9a-fA-F]{24}$/)) {
    Room.findById(roomId, function(err, room) {
      // if an error occurs console the error
      if(err) {
        console.error('Error:', err);
      }
      // if a room is found;
      if(room) {
        console.log('Found room', room._id);
        // if the user requesting the room is the room's creator or the room is live, access is true
        if(room.created_by = req.user || roomState(room.startTime, room.endTime) === 'live') {
          console.log('Room', room._id, 'is accessible');
          res.status(200).send({access: true});
        // if the user requesting the room is not the room's creator and the room is not live, access is false  
        } else {
          console.log('Room', room._id, 'is not accessible')
          res.status(200).send({access: false});
        }
      // if  a room does not exist, return false;
      } else {
        console.log('Room', room_id, 'was not found');
        res.status(200).send({access: false});
      }
    });
  }
  else {
    res.status(200).send({access: false});
  }
}

// need to use req.PARAMS.id here because this is a get request
<<<<<<< HEAD
// maybe: complete candidateRoom object that contains only the data the the candidate should see
// (right now they're the same, but may add box for interviewer to take notes)
=======
// TODO: once notes implemented, complete candidateRoom obj containing only data for candidate (no notes)
>>>>>>> remove is_Open boolean
=======
/**
 * RoomController.fetchOne:
 * This function retrieves the data from one specific room
 */
>>>>>>> resolve merge conflicts
module.exports.fetchOne = function(req, res) {
  // to retrieve roomdId, use req.PARAMS.id because this is a get request
  var roomId = req.params.id;
  var githubId = req.user;
  console.log(roomId);

  // find room by githubId
  Room.findById(roomId, function(err, room){
    if(room) {
      var isOpen = (Date.now() > room.start_time) || githubId === room.created_by;
      console.log('is the room open', isOpen)
      if(isOpen) {
        res.send(200, room)
        return;
      }
    }
    if(err) { 
      handleError(err);
    }
    // if current user is room creator send back all room data, else send candidateRoom
    else {
<<<<<<< HEAD
      res.status(404).send(); // change to candidateRoom once obj is complete
=======
      console.log('i hit an else');
      res.status(200).send({data: '404'});
>>>>>>> resolve merge conflicts
    }
  });
};


/**
 * RoomController.fetchAll:
 * This function retrieves all of the user's rooms
 */
module.exports.fetchAll = function(req, res) {
  var githubId = req.user;
  var roomsArray = [];
  User.findOne({github_id: githubId}, function(err, user){
    if (err) { 
      handleError(err); 
      res.send(200, 'cannot find user by ID');
    }
    else if(user) {
      var rooms = user.rooms;

      // If the user's room list is empty, send back the empty array
      if(rooms.length === 0){
        res.send(202, roomsArray);
      }
      // If the user has rooms, send back data about each
      else {
        for (var i = 0; i < rooms.length; i++) {
          Room.findById(rooms[i], function(err, room){
            if (err) { 
              handleError(err); 
            }
            else if (room) {
              var roomData = {
                created_by: room.created_by,
                start_time: room.start_time,
                candidateName: room.candidateName,
                candidateEmail: room.candidateEmail,
                id: room._id,
                text: room.text[0],
                canvas: room.canvas
              }
              roomsArray.push(roomData);
            }
            else {
              roomsArray.push({});
            }
            if (roomsArray.length === rooms.length) {
              res.send(202, roomsArray);
            }
          });
        }
      }
    } 
    else {
      res.send(304, 'User not found!');
    }
  });
}

/**
 * RoomController.remove:
 * This function deletes a room and also removes it from the user's rooms array
 */
module.exports.remove = function(req, res) {
// this one is req.BODY.id because we are using a delete request (so not sending a body)
  var roomId = req.params.id;
  var githubId = req.user;
  Room.findOneAndRemove({_id: roomId}, function(err, room) {
    if (err) { 
      handleError(err); 
      res.status(404).send('room not found');
    }
    // If a room could be found, find the user and remove that room from their list
    else if (room) {
      User.findOne({github_id: githubId}, function(err, user){
        if (err) { 
          handleError(err); 
          res.send(404, 'user not found');
        }
        else if (user) {
          var rooms = user.rooms;

          // Find the room to remove and remove it
          for (var i = 0; i < rooms.length; i++) {
            if (rooms[i] === roomId) {
              rooms.splice(i, 1);
              user.rooms = rooms;
            }
          }

          // Save the new list and send response
          user.save().then(function(){
            res.send(200, room);
          });
        }
      });
    }
  });
<<<<<<< HEAD
};
=======
};

>>>>>>> resolve merge conflicts
