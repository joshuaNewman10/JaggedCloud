var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
}


// TODO: for all queries, confirm what I am expecting:  { roomID: Integer, canvas: String, textData: String }
// TODO: check if reference to roomID is correct syntax



// instantiation pattern: var partyRoom = new Room() --> need to pass data into room upon instantiation?
module.exports.create = function(req, res) {
  Room.create({}, function(err, room){
    if (err) { handleError(err); }
    else if (room) {
      console.log(room + ': room successfully created');
      res.send(201, room);      
  });
}


// update pattern: Model.update(conditions, doc, [options], [callback])
module.exports.save = function(req, res) {
  var roomID = req.data.roomId;
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
  );
}


module.exports.fetch = function(req, res) {
// first check if the room exists
// check if user made the room -- if yes, send back all data
// if no, send back only part of the data
  var roomID = req.data.roomID;

  Room.findById('_id', function(err, room){
    if (err) { handleError(err); }
    else if (room) {
      res.send(200, room)
    }
  });
}