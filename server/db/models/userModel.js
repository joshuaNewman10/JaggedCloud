var db = require('../config.js');
var mongoose = require('mongoose');


// TODO: check syntax for referencing objectID in another schema


// SCHEMA: each schema maps to a 'collection' in MongoDB (analogous to SQL table) and defines the shape of the 'documents' within that colletion (documents are analogous to a row in a SQL table)
var userSchema = new mongoose.Schema({
  
  name: {
    first: String,
    last: String
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  github_id: String,
  access_token: String,
  refresh_token: String,
  profile_photo: String,

  date_created: {
    type: Date,
    default: Date.now
  },

  used_rooms: [{ type: Schema.Types.ObjectId, ref: '???' }],
  scheduled_rooms: [{ type: Schema.Types.ObjectId, ref: '???' }]
  
});


// MODELS: a model is a class with which we construct documents (rows in a table)
module.exports = mongoose.model('User', userSchema);

