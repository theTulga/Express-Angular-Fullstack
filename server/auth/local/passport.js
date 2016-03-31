var LocalStrategy = require('passport-local')
var User = require('../../sqldb').User
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    done(null, id)
  })

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, done) {
    User.find({
        where: {
          username: username.toLowerCase()
        }
      })
      .then(function(user) {
        if (!user) {
          return done(null, false, {
            message: 'This username is not registered.'
          })
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {
            message: 'This password is not correct.'
          })
        } else {
          done(null, user)
          return null;
        }
      })
      .then(function(data1, data2) {
        console.log('2nd DATA', data1, data2);
      })
      .catch(function(err) {
        done(err)
      })
    return null;
  }))
}
