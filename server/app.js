var express             = require('express'),
    sqldb               = require('./sqldb'),
    config              = require('./config/environment'),
    http                = require('http'),
    favicon             = require('serve-favicon'),
    morgan              = require('morgan'),
    path                = require('path'),
    passport            = require('passport')

var app = express();

app.use(function(req, res){
  res.setHeader("Access-Control-Allow-Origin", 'http://52.25.214.31');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
})

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
