var signToken   = require('../auth.service').signToken;
var express     = require('express')
var router      = express.Router();
var User        = require('../../sqldb').user
var bcrypt      = require('bcrypt-nodejs');

exports['default'] = function(passport){
  router.use('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  })

  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      var error = err || info;
      console.log('error',error);
      if (error) return res.status(401).json(error)
      if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'})
      req.login(user, function(err) {
        if (err)  return next(err)
        res.status(200).json({ message: 'Successfully logged in.' })
      });

    })(req, res, next)
  })

  router.get('/', function(req, res) {
    console.log('req.user',req.user)
    if (req.isAuthenticated()) res.status(200).send('true')
    else                       res.status(401).send('false')
  })

  router.post('/', function(req, res, next){
    var newUser = User.build(req.body);
    newUser.setDataValue('password', bcrypt.hashSync(req.body.password, null, null))
    newUser.setDataValue('provider', 'local');
    newUser.setDataValue('role', 'user');
    newUser.save()
      .then(function (user) {
        req.login(user, function(err){
          if (err){
            console.log('Error in req.logIn',err);
          }
        })
        res.status(200).json({ message: 'success' });
        return null;
      })
      .catch(function(err) {
        if (err){
          console.log('Error in newUser.save()',err);
          res.status(500).json({ message: 'error' });
        }
        return null;
      });
  })
  return router;
}

module.exports = exports['default'];
