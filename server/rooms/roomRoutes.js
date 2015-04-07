var roomController = require('./roomController.js');

module.exports = function(router){
  router.post('/save', roomController.save);
};