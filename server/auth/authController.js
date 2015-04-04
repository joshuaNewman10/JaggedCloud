var passport = require('./githubConfig.js').passport;

module.exports.signin = function(req, res){
    passport.authenticate('github'),
    function(req, res){
      // The request will be redirected to Github for authentication, so this
      // function will not be called.
  }
};

module.exports.callback = function(req, res) {
    passport.authenticate('github', { successRedirect: '/', failureRedirect: '/signin' });
};

module.exports.logout = function(req, res) {
  req.session.destroy(function(err){
    if (err) console.error('Error destroying session: ' + err);
    req.logout();
    res.redirect('/');
  });
}

module.exports.isAuthenticated = function(req, res) {
  res.send(req.isAuthenticated() ? req.user : false);
}