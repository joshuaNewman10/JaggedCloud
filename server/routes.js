module.exports = function(app, express) {

  // serve html and css 
  app.use(express.static(__dirname + '../client'));
  
  // create routhes for authentication, and user and room data storage
  app.use('/auth', require('./auth');
  app.use('/user', require('./user');
  app.use('/room'), require('./room');
};