/**
 * Main application routes
 */

var errors = require('./components/errors');
var path = require('path');

exports['default'] = function(app){

  //app.use('/api/matchs', require('./api/match'))

  // app.use('/auth', require('./auth'))

  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

 app.route('/*')
  .get( function(req, res) {
    return res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });
};
module.exports = exports['default'];
