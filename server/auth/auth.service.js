var passport = require('passport')
var config = require('../config/environment')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var compose = require('composable-middleware')
var User = require('../sqldb').User

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
exports.isAuthenticated = function(){
  return compose()
    //Validate jwt
    .use(function(req, res, next){
      //allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next){
      User.find({
        where: {
          _id: req.user._id
        }
      })
        .then(function(user){
          if(!user){
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(function(err){
          return next(err);
        })
    })
}
exports.hasRole = function(roleRequired){
  if(!roleRequired){
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next){
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRole.indexOf(roleRequired)) {
        next();
      } else{
        res.status(403).send('Forbidden');
      }
    })
}

/**
 * Returns a jwt token signed by the app secret
 */
exports.signToken = function(id, role){
  return jwt.sign({ _id: id, role: role}, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

exports.setTokenCookie = function(req, res){
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t  logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}
