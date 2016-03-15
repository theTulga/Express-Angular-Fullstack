var Post = require('../../sqldb').Post;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  Post.findAll()
    .then(function (posts) {
      res.status(200).json(posts);
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {

  var newPost = Post.build(req.body);
  newPost.save()
    .then(function (user) {
      res.json({ message: 'Success' });
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
    })
    .catch(function (err) {
      return next(err);
    });
}
