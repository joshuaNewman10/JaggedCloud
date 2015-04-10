var db = require('../config.js');
var mongoose = require('mongoose');


// SCHEMAS: each schema maps to a 'collection' in MongoDB (analogous to SQL table) and defines the shape of the 'documents' within that colletion (documents are analogous to a row in a SQL table)
var roomSchema = new mongoose.Schema({

  date_created: {
    type: Date,
    default: Date.now
  },

  is_open: {
    type: Boolean,
    default: false,
  },
  
  canvas: String,
  text: [String], // each element will be a string
  notes: String,
  start_time: Date,
  created_by: String, // this is an email; will be a user object
});


// MODELS: a model is a class with which we construct documents (rows in a table)
module.exports = mongoose.model('Room', roomSchema);