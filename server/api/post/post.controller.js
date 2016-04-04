var Post = require('../../sqldb').post;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  Post.findAll({
    limit: 10,
    order: 'createdAt DESC'

  })
    .then(function (posts) {
      res.status(200).json(posts);
      return null;
    })
    .catch(function(err) {
      console.log(err)
      res.status(500).end;
      return null
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
  var newPost = Post.build(req.body)
  if (req.body.top) newPost.setDataValue("pic", req.file.originalname)
  newPost.save()
    .then(function (user) {
      res.json({ message: 'Success' });
      return null
    }).catch(function(err) {
      console.log('err in newPost.save()',err)
      handleError(res);
      return null
    });
}

exports.update = function (req, res, next) {
  delete req.body.createdAt;
  delete req.body.updatedAt;
  console.log(req.body)
  if (req.file && req.body.top) req.body.setDataValue("pic", req.file.originalname)

  Post.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function (user) {
    res.json({ message: 'Success' });
    return null
  }).catch(function(err) {
    console.log('err in Post.update()',err)
    handleError(res);
    return null
  });
}

exports.destroy = function (req, res, next) {
  var id = req.params.id;
  Post.destroy({
    where:{
      id: id
    }
  }).then(function (user) {
    res.json({ message: 'Success' });
    return null
  }).catch(function(err) {
    console.log('err in Post.update()',err)
    handleError(res);
    return null
  });
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

var categories = ['*(&@&!)', 'dota', 'csgo', 'lol'];

exports.category = function (req, res, next) {
  var category = req.params.category;
  if (categories.indexOf(category))
    Post.findAll({
      where: {
        category: category
      },
      limit: 10
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

  else {
    console.log('categories.indexOf(category)',categories.indexOf(category) )
    console.log('ELSE!',category);
    res.status(404).end();
  }
}
