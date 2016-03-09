/**
 * Express configuration
 */

'use strict';

var express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    lusca = require('lusca'),
    passport = require('passport'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session)

var config = require('./environment'),
    sqldb = require('../sqldb')

module.exports = function(app) {
  var env = app.get('env');
  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({
    cookie: {
      secure: true
    },
    module: 'connect-redis',
    secret: config.secrets.session,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
      host: '127.0.0.1'
    })
  }));
  if ('test' !== env) {
    app.use(lusca({
      // csrf: {
      //   angular: true
      // },
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, //1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */

  if (env === 'production'){
    app.set('appPath', path.join(config.root, 'client/dist'));
  }else{
    app.set('appPath', path.join(config.root, 'client/src'));
  }


  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client/dist', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(express.static(path.join(config.root, '/client/dist')));
    app.use(express.static(path.join(config.root, '/client/src')));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, 'client/.tmp/serve')));
    app.use(express.static(app.get('appPath')));
    app.use(express.static(path.join(config.root, '/client/')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
}
