var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');

var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
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