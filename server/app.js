var express             = require('express'),
    sqldb               = require('./sqldb'),
    config              = require('./config/environment'),
    http                = require('http'),
    favicon             = require('serve-favicon'),
    morgan              = require('morgan'),
    path                = require('path'),
    passport            = require('passport')

var app = express();


// require('./auth')(app, passport)
require('./config/express')(app, passport)
require('./auth/local/passport')(passport)
require('./routes')(app, passport)
var server = http.createServer(app)

// Start server
function startServer() {
  server.listen(config.port, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}
sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
