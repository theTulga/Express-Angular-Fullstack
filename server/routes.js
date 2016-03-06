/**
 * Main application routes
 */

var errors = require('./components/errors');
var path = require('path');
var config = require('./config/environment');

exports['default'] = function(app){

  //app.use('/api/matchs', require('./api/match'))

  // app.use('/auth', require('./auth'))

  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

 app.route('/*')
  .get( function(req, res) {
    console.log('HANDLING here!')
    return res.sendFile(path.resolve(config.root, 'client/.tmp/serve/index.html'));
  });
};
module.exports = exports['default'];
