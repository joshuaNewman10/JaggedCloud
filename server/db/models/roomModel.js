var db = require('../config.js');
var mongoose = require('mongoose');


// SCHEMAS: each schema maps to a 'collection' in MongoDB (analogous to SQL table) and defines the shape of the 'documents' within that colletion (documents are analogous to a row in a SQL table)
var roomSchema = new mongoose.Schema({

  is_completed: {
    type: Boolean,
    default: false
  },

  date_created: {
    type: Date,
    default: Date.now
  },

  end_time: Number, // number of milliseconds
  start_time: Number, // number of milliseconds
  created_by: String, // githubId
  canvas: String,
  text: [{editorId: Number,
          data: String}],
  notes: {type: String, default: '// This is a private editor to take notes on.\n// It is not shared with your candidate.'},
  candidateName: String,
  candidateEmail: String
});


// MODELS: a model is a class with which we construct documents (rows in a table)
module.exports = mongoose.model('Room', roomSchema);