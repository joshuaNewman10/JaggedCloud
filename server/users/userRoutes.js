var userController = require('./userController.js');

module.exports = function(router){
  router.post('/save', userController.findOrCreateUser);
};