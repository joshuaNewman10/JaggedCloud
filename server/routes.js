var morgan = require('morgan');

module.exports = function(app, express) {

  // create routers
  var authRouter = express.Router();
  var userRouter = express.Router();
  var roomRouter = express.Router();

  // http request logger for development 
  app.use(morgan('dev'));

  // serve html and css 
  app.use(express.static(__dirname + '/../client'));
  
  // create paths for authentication, and user and room data storage
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/room', roomRouter);
  
  // require the needed route files and pass in the router
  require('./auth/authRoutes.js')(authRouter);
  require('./users/userRoutes.js')(userRouter);
  require('./rooms/roomRoutes.js')(roomRouter);
};