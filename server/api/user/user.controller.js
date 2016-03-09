var User = require('../../sqldb').User;
var config = require('../../config/environment')

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  User.findAll({
    attributes: [
      'id',
      'name',
      'email',
      'role',
      'provider'
    ]
  })
    .then(function(users){
      return res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  newUser.save()
    .then(function(user) {
      req.login(user, function(err){
        if (err) next(err);
        return res.status(201).send('Success!');
      });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.find({
    where: {
      id: userId
    }
  })
    .then(function(user){
      if (!user){
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err){
      return next(err);
    })
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.destroy({ id: req.params.id })
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.find({
    where: {
      id: userId
    }
  })

    .then(function(user){
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(function(){
            return res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user.id;

  User.find({
    where: {
      id: userId
    },
    attributes: [
      'id',
      'name',
      'email',
      'role',
      'provider'
    ]
  })
    .then(function(user){
      if (!user) return res.status(401).end();
      res.json(user);
    })

    .catch(function(err){
      return next(err);
    });
}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
}
