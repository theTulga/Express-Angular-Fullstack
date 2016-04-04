var Router = require('express').Router;
var controller = require('./post.controller');
var router = new Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/top', controller.top);
router.get('/category/:category', controller.category);
router.get('/:id', controller.show);
router.put('/', controller.update);
router.delete('/:id', controller.destroy);
// router.get('/me', controller.me);




exports['default'] = router;
module.exports = exports['default'];
