var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
}



// for save, expecting:  { roomID: someID, canvas: longString }
module.exports.save = function(req, res) {
  var canvas = req.data.canvas;
  var roomID = req.data.roomID;
// TODO: come back to this -- will need to save the text as well
  var text =

  var query = Room.findById(roomID, function(err, room){
    if (err) { return handleError(err); }
// how do I refer to the room ID?  It should be automatically generated; not sure how to reference it
    console.log('successfully found roomID ' + room.id);
  });

// Now, can I use var query and invoke functions on it? Or do I have use a promise? Concerned that it if takes the db more time to fetch the room obj, then there could be an error when trying to refer to query
  query.
};


module.exports.save = function(req, res) {
  var canvas = req.data.canvas;
  var roomID = req.data.roomID;
  Room.update({id: roomID}, {canvasData: canvas}, {upsert: true}, function(err){
    if (err) { return handleError(err); }
  });
// need to check if res.send() is the correct method
  res.send(201, function() { console.log('room successfully updated'); });
}

// Model.update(conditions, doc, [options], [callback])
// MyModel.update({ age: { $gt: 18 } }, { oldEnough: true }, fn);

