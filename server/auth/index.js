var LocalStrategy = require('passport-local').Strategy
var express       = require('express')

exports['default'] = function(app, passport) {
  var router = express.Router();
  app.use('/api/auth/local', require('./local')(passport))
  return router;
}

module.exports = exports['default'];
