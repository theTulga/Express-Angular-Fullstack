var express = require('express')
var Router = express.Router
var router = new Router()

router.post('/', saveFile)
router.use('/get', function(req, res, next){console.log('hello World')}, express.static(__dirname + '/images'))

function saveFile(req, res, next){
  console.log('req.body',req.body)
  console.log('req.file',req.file)
  res.status(200).json({ filelink: '/api/images/'+ req.file.originalname })
}

module.exports = router;
