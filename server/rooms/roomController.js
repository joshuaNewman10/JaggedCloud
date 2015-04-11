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
// module.exports.save = function(req, res) {
//   var roomId = req.body.roomId;
//   var canvas = req.body.canvas;
//   var text = req.body.textEditor;

//   Room.findOneAndUpdate({'_id': roomId}, {canvas: canvas, text: text}, {upsert: true},
//     function(err, room){
//       if (err) { handleError(err); }
//       else if (room) {
//         console.log(room._id + ': room successfully updated');
//         res.send(201, room);      
//       }
//     }
//   );
// };


// module.exports.fetch = function(req, res) {
//   console.log('In room controller fetch');
//   var roomId = req.body.roomId;
//   var githubId = req.user;

// // TODO: only give back data if is_open is set to true
//   console.log('request: ', roomId);
//   Room.findById(roomId, function(err, room){
//     var candidateRoom = {}
//     candidateRoom.canvas = 
//     if (err) { 
//       handleError(err); 
//       res.send(404, 'no room data');
//     }

//     else if (room && room.isOpen) {
// // check if current user is the person who made the room -- if yes, send back all data
//       if(githubId === room.githubId) {
//         res.send(200, room);
//       }
// // if no, send back only part of the data
//       else {
//         res.send(200, candidateRoom)
//       }
//     }
//   });
// };


// module.exports.fetchAllRooms = function(req, res) {
//   var githubId = req.user;
//   var rooms = [];
  
// // find user by id and retrieve rooms
//   User.find({github_id: githubId}, 'rooms', function(err, user){
//     if (err) { 
//       handleError(err); 
//       res.send(404, 'cannot find user by ID');
//     }

//     else if (user) {
//       var rooms = user.rooms;
//       console.log('user object: ', user);
//       console.log('rooms: ', rooms);
      
//       for (var i = 0; i < rooms.length; i++) {
//         console.log('in for loop. room: ', rooms);
//         Room.findById(rooms[i], function(err, room){
//           if (err) { 
//             handleError(err); 
//             res.send(404, 'no room data');
//           }

//           else if (room) {
//             // var roomData = {};
//             rooms.push(room);
//             res.send(200, rooms);
//           }
//         });
//       }
//     }
//   });
// }


//   return: date_created, start_time, created_by, room_id
