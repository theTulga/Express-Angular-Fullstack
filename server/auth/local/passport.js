var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
function localAuthenticate(User, email, password, done){
  User.find({
    where: {
      email: email.toLowerCase()
    }
  }).then(function(user){
    if(!user){
      return done(null, false, {
        message: 'This email is not registered.'
      });
    }
    user.authenticate(password, function(authError, authenticated){
      if(authError){
        return done(authError);
      }
      if(!authenticated){
        return done(null, false, {message: 'This password is not correct.'});
      } else{
        return done(null, user);
      }
    })
  })
}

exports.setup = function (User, config){
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done){
    return localAuthenticate(User, email, password, done);
  }))
}