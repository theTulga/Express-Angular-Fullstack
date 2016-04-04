var Router = require('express').Router;
var controller = require('./tournament.controller');
var router = new Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);

// router.delete('/:id', controller.destroy);
// router.get('/me', controller.me);


exports['default'] = router;
module.exports = exports['default'];
