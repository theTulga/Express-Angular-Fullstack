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
    return User.find({
      where: {
        username: username.toLowerCase()
      }
    })
      .then(function(user) {
        if (!user) {
          done(null, false, { message: 'This username is not registered.' })

        }
        if (!bcrypt.compareSync(password, user.password)){
          done(null, false, { message: 'This password is not correct.' })

        } else {
          done(null, user)

        }

      })
      .catch(function(err) {
        done(err)
        
      })
  }))

}
