var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport')

// Login
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
    if (password != user.password) return done(null, false, { message: 'Incorrect password.'});
    return done(null, user);
  })
}

// SignUp
function localSignup(User, email, password, done){
  console.log('4')
  User.find({
    where: {
      email: email.toLowerCase()
    }
  }).then(function(user){
    if(user){
      return done(null, false, {
        message: 'This email is in use.'
      });
    }
    var newUser = {
      username: email,
      password: bcrypt.hashSync(password, null, null)
    };

    User.create(newUser)
    .then(function(user){
      newUser.id = user.insertId;
      return done(null, newUser);
    })
  }).catch(function(err){
    return done(err);
  })
}

exports.setup = function (User, config){
  console.log('User Setup has started')
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.find({
        attributes: ['id', 'username', 'password'],
        where: {
          id: id
        }
      })
      .then(function(res) {
        var user = res.dataValues;
        done(null, user);
      }).catch(function(err) {
        done(err)
      });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done){
    return localAuthenticate(User, email, password, done);
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, function(email, password, done){
    return localSignup(User, email, password, done);
  }))
}
