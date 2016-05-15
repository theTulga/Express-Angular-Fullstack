var express             = require('express'),
    favicon             = require('serve-favicon'),
    morgan              = require('morgan'),
    errorHandler        = require('errorhandler'),
    path                = require('path'),
    lusca               = require('lusca'),
    compression         = require('compression'),
    config              = require('./environment'),
    lusca               = require('lusca'),
    session             = require('express-session'),
    eSS                 = require('express-sequelize-session'),
    Store               = eSS(session.Store),
    bodyParser          = require('body-parser'),
    cookieParser        = require('cookie-parser'),
    errorHandler        = require('errorhandler'),
    sqldb               = require('../sqldb')

module.exports = function(app, passport) {
  var env = app.get('env');
  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000
    },
    resave: true,
    store: new Store(sqldb.sequelize)
  }));
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(express.static(path.join(config.root, '/csport/dist')))
  app.use(express.static(path.join(config.root, '/csport/src')))
  app.use(favicon(path.join(config.root, 'csport/dist', 'favicon.ico')))
  app.use(morgan('dev'));
  app.use(errorHandler());
}
