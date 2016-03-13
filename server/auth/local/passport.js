var LocalStrategy = require('passport-local')
var User = require('../../sqldb').User
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    done(null, user.id)
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    User.find({
      where: {
        email: email.toLowerCase()
      }
    })
      .then(function(user) {
        if (!user) {
          done(null, false, { message: 'This email is not registered.' })
        }
        if (!bcrypt.compareSync(password, user.password)){
          done(null, false, { message: 'This password is not correct.' })
        } else {
          done(null, user)
        }
      })
      .catch(function(err) {
        done(err);
      })
  }))

}
