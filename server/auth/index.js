var User = require('../sqldb').User;
var config = require('../config/environment')
var express = require('express')
var router = express.Router()

require('./local/passport').setup(User, config);
router.use('/local', require('./local'));

exports['default'] = router;
module.exports = exports['default'];
