/**
 * Main application routes
 */

var errors    = require('./components/errors')
var path      = require('path')
var config    = require('./config/environment')
var express   = require('express')
var multer    = require('multer')

exports['default'] = function(app, passport) {

  if (app.get('env') === 'production'){
    console.log('11111')
    app.use(function(req, res, next){
      res.setHeader('Access-Control-Allow-Origin', 'http://52.25.241.31');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    })
  }
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __dirname + '/images/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({
    storage: storage
  })
  require('./auth')(app, passport)

  app.use('/api/image', upload.single('file'), require('./image_upload'))
  app.use('/api/images', express.static(__dirname + '/images'))
  app.use('/api/post', upload.single('pic'), require('./api/post'))
  app.use('/api/match', require('./api/match'))
  app.use('/api/team', upload.single('logo'), require('./api/team'))
  app.use('/api/tournament', upload.single('logo'), require('./api/tournament'))
  app.use('/api/participant', require('./api/participant'))


  // app.use('/api/user', require('./api/user'))
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  app.route('/*')
    .get(function(req, res) {
      return res.sendFile(path.resolve(config.root, 'client/.tmp/serve/index.html'));
    });
};
module.exports = exports['default'];
