var roomController = require('./roomController.js');


// TODO: specify /url for the following


module.exports = function(router){
  router.post('/save', roomController.save);
};

module.exports = function(router){
  router.post('/???', roomController.create);
};

module.exports = function(router){
  router.post('/???', roomController.fetch);
};