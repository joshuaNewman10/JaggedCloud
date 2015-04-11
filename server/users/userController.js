var Room = require('../db/models/roomModel');
var User = require('../db/models/userModel');

var handleError = function(error) {
  console.log('the following error has occurred: ' + error);
};



// below function can replace current auth query
module.exports.findOrCreateUser = function(githubID) {

  User.findOne({'githubId': githubID}, function(err, user){
    if (err) {
      User.create({'githubId': githubId}, function(err, user) {
        if (err) { console.log(err); }
        else {
          console.log('user: ', user);
          res.send(201, user);
        }
      });
    }

    else {
      console.log('user: ', user);
      res.send(201, user);
    }

  });

}
