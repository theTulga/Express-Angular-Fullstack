var User = require('../sqldb').User;
var config = require('../config/environment')
var passport = require('passport')
var express = require('express')
// Passport Configuration

require('./local/passport').setup(User, config);
// require('./facebook/passport').setup(User, config);
// require('./google/passport').setup(User, config);
// require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
// router.use('/facebook', require('./facebook'));
// router.use('/twitter', require('./twitter'));
// router.use('/google', require('./google'));

exports['default'] = router;
module.exports = exports['default'];
