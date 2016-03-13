var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../sqldb').User;

var validateJwt = expressJwt({
  secret: config.secrets.session
})


var isAuthenticated = function(){
  return compose()
    //Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next){
      User.find({
        where: {
          id: req.user.id
        }
      })
        .then(function(user){
          if (!user){
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(function(err){
          next(err);
        })
    })
}

exports.isAuthenticated = isAuthenticated;

var hasRole = function(roleRequired) {
  if (!roleRequired){
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next){
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    })
}

exports.hasRole = hasRole;

var signToken = function(id, role){
  return jwt.sign({ id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

exports.signToken = signToken;

var setTokenCookie = function(req, res){
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user.id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}

exports.setTokenCookie = setTokenCookie;
