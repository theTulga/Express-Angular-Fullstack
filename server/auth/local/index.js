'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express = require('express')
var _passport = require('passport')
var passport = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = express.Router();

router.post('/', passport.default.authenticate('local') );



// router.post('/', function(req, res, next){
//   passport.default.authenticate('local', function(err, user, info){
//     var error = err || info;
//     if (error){
//       res.status(500).end();
//     }
//     if (user) res.status(200).send(user);
//   })
// })

exports['default'] = router;
module.exports = exports['default'];
