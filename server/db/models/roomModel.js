var mongoose = require('mongoose');


// SCHEMAS: each schema maps to a 'collection' in MongoDB (analogous to SQL table) and defines the shape of the 'documents' within that colletion (documents are analogous to a row in a SQL table)
var roomSchema = new mongoose.Schema({
  date_created: {
    type: Date,
    default: Date.now
  },
  users: [],
  canvas: String,
  text: String
});
// NOTE: currently each room has one canvas and one text file -- may need to increase these to an array later


// MODELS: a model is a class with which we construct documents (rows in a table)
module.exports = mongoose.model('Room', roomSchema);