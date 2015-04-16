var db = require('../config.js');
var mongoose = require('mongoose');


// SCHEMAS: each schema maps to a 'collection' in MongoDB (analogous to SQL table) and defines the shape of the 'documents' within that colletion (documents are analogous to a row in a SQL table)
var roomSchema = new mongoose.Schema({

// database
  // remove is_open and is_completed -- no booleans at all
  // add end time -- defaults to start time +24 hours (for now at least...)

// ALSO: function that takes in the start and end time, then returns the 'current state'
  // current state could be: (1) INCOMPLETE (not complete / not active) (2) LIVE (not complete / active) (3) COMPLETE (complete / not active) 

// front-end
  // add 'close' button, which sets the end time to Date.now()
  // also 'open' button, which sets the start time to Date.now()

  is_open: {
    type: Boolean,
    default: false,
  },

  is_completed: {
    type: Boolean,
    default: false
  },

  date_created: {
    type: Date,
    default: Date.now
  },

  start_time: Number, // number of milliseconds
  end_time: Number, // number of milliseconds
  created_by: String, // githubId
  canvas: String,
  text: [String],
  notes: String,
  candidateName: String,
  candidateEmail: String
});


// MODELS: a model is a class with which we construct documents (rows in a table)
module.exports = mongoose.model('Room', roomSchema);