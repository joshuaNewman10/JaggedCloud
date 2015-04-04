var authController = require('./authController.js');

module.exports = function(router){

  router.get('/github', authController.signin);

  router.get('/github/callback', authController.callback);

  router.post('/checkloggedin', authController.isAuthenticated);

  router.get('/logout', authController.logout);
};