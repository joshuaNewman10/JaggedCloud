var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
}

// for all queries, confirm what I am expecting:  { roomID: Integer, canvas: String, textData: String }


// update pattern: Model.update(conditions, doc, [options], [callback])
// TODO: check if reference to roomID is correct syntax

module.exports.save = function(req, res) {
  var roomID = req.data.roomID;
  var canvas = req.data.canvas;
  var text = req.data.textData;

  Room.findOneAndUpdate({'_id': roomID}, {canvas: canvas, text: text}, {upsert: true},
    function(err, room){
      if (err) { handleError(err); }
      else if (room) {
        console.log(room + ': room successfully updated');
        res.send(201, room);      
      }
    }
  });
}


module.exports.fetch = function(req, res) {
  var roomID = req.data.roomID;

  Room.findById('_id', function(err, room){
    if (err) { handleError(err); }
    else if (room) {
      res.send(200, room)
    }
  });
}










