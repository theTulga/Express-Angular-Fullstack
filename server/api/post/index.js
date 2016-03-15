var Router = require('express').Router;
var controller = require('./post.controller');
var router = new Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);

// router.delete('/:id', controller.destroy);
// router.get('/me', controller.me);
// router.put('/:id/password', controller.changePassword);



exports['default'] = router;
module.exports = exports['default'];
