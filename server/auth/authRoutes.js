var authController = require('./authController.js');

module.exports = function(router){
  router.post('/signin', authController.signin);
};