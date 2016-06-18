var Team = require('../../sqldb').team
var Player = require('../../sqldb').player

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  Team.findAll({
    include: [{
      model: Player,
      as: 'players'
    }]
  })
    .then(function (Teams) {
      res.status(200).json(Teams);
      return null
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {

  var newTeam = Team.build(req.body);
  if (req.file) newTeam.logo = req.file.originalname;
  newTeam.save()
    .then(function (user) {
      res.json({ message: 'Success' });
      return null;
    }).catch(function(err) {
      console.log('err in newTeam.save()',err)
      handleError(res);
      return null
    });
}

exports.destroy = function (req, res, next) {
  var id = req.params.id;
  Team.destroy({
    where: {
      id: id
    }
  }).then(
    function(team) {
      res.json({message: 'Success'})
      return null
    }).catch(function(err) {
      console.log('err in Team.destroy',err)
      handleError(res)
      return null
    })
}
exports.show = function (req, res, next) {
  var TeamId = req.params.id;

  Team.find({
    where: {
      id: TeamId
    },
    include: [{
      model: Player,
      as: 'players'
    }]
  })
    .then(function (item) {
      if (!item) {
        return res.status(404).end();
      }
      res.json(item);
      return null
    })
    .catch(function (err) {
      return next(err);
    });
}
