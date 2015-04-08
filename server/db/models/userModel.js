var db = require('../config.js');

var mongoose = require('mongoose');


// SCHEMA: each schema maps to a 'collection' in MongoDB (analogous to SQL table) and defines the shape of the 'documents' within that colletion (documents are analogous to a row in a SQL table)
var userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  githubId: String,
  accessToken: String,
  refreshToken: String,
  email: String,
  date_created: {
    type: Date,
    default: Date.now
  },
  profile_photo: String,
  rooms: []
});


// MODELS: a model is a class with which we construct documents (rows in a table)
module.exports = mongoose.model('User', userSchema);
