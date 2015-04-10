module.exports.save = function(req, res) {
  console.log('Trying to save a user.')
};


// below function can be replace current auth query


// Check if user is already in the database -- if not, create a new user
// TODO: use .then() method to save the newly created user to the database
var findOrCreateUser = function(githubID) {

  var query = User.findOne({'githubId': githubID});
  
  if(!query) {
    User.create({'githubId': githubId}, function(err, user) {
      if (err) { console.log(err); }
      else { console.log('githubId is ' + user.githubId); }
    });
  }

}



// NOTE: the method .create() creates a new document AND saves it to the database -- do not have to also execute .save(). In fact, that caused an error for that we couldn't figure out at first