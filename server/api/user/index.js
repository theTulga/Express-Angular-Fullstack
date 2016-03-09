'use strict';

var Router = require('express').Router;
var controller = require('./user.controller');

var router = new Router();

// router.get('/', auth.hasRole('admin'), controller.index);
// router.delete('/:id', auth.hasRole('admin'), controller.destroy);
// router.get('/me', auth.isAuthenticated(), controller.me);
// router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
// router.get('/:id', auth.isAuthenticated(), controller.show);

router.post('/', controller.create);
router.get('/aaa', function(req, res, next){
  // req.login({
  //   id: '6',
  //   name: '123',
  //   email: '123@123.com',
  //   role: 'user',
  //   provider: 'local'
  // }, function(err){
  //   if (err) console.log('Error Occured!!!!');
  // });
  if (req.isAuthenticated()){
    res.status(200).json({good: 'to go'});
  }
  else res.status(403).json({bad: 'to access'});
})

exports['default'] = router;
module.exports = exports['default'];
