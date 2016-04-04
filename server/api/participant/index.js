var Router = require('express').Router;
var controller = require('./participant.controller');
var router = new Router();

router.post('/', controller.create);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);
// router.put('/', controller.update);

// router.get('/me', controller.me);

exports['default'] = router;
module.exports = exports['default'];
