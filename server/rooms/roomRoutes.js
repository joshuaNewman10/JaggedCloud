var roomController = require('./roomController.js');


// TODO: specify /url for the following


module.exports = function(router){

  router.post('/save', roomController.save);

  router.post('/create', roomController.create);

  router.get('/get', roomController.fetch);

  router.get('/get:id', roomController.fetch);

};