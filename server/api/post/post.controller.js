var Post = require('../../sqldb').Post;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
    return null;
  };
}

exports.index = function(req, res, next){
  Post.findAll({
    order: '"createdAt" DESC'
  })
    .then(function (posts) {
      res.status(200).json(posts);
      return null;
    })
    .catch(function(err) {
      console.log(err)
      res.status(500).end;
    })
    // }).catch(handleError(res));
}

exports.top = function(req, res, next){
  Post.findAll({
    where: {
      top: true
    },
    limit: 8
  })
    .then(function (posts) {
      res.status(200).json(posts);
      return null;
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {
  console.log('req.body',req.body)
  console.log('req.file',req.file)
  var newPost = Post.build(req.body)
  if (req.body.top) newPost.setDataValue("pic", req.file.originalname)
  newPost.save()
    .then(function (user) {
      res.json({ message: 'Success' });
      return null
    }).catch(handleError(res));
}

exports.show = function (req, res, next) {
  var postId = req.params.id;

  Post.find({
    where: {
      id: postId
    }
  })
    .then(function (item) {
      if (!item) {
        return res.status(404).end();
      }
      res.json(item);
      return null;
    })
    .catch(function (err) {
      return next(err);
    });
}
