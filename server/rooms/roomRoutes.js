var create = require('./create.js');
var fetch = require('./fetch.js');
var fetchAll = require('./fetchAll.js');
var save = require('./save.js');


module.exports = function(router){

  router.post('/save', save.save);

  router.post('/create', create.create);

  router.get('/get', fetch.fetch);

  router.get('/get:id', fetch.fetch);

  router.get('/home', fetchAll.fetchAllRooms);

};