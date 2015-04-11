var create = require('./create.js');
var fetchOne = require('./fetchOne.js');
var fetchAll = require('./fetchAll.js');
var save = require('./save.js');


module.exports = function(router){

  router.post('/save', save.save);

  router.post('/create', create.create);

  router.get('/get', fetchOne.fetchOne);

  router.get('/get:id', fetchOne.fetchOne);

  router.get('/home', fetchAll.fetchAll);

};