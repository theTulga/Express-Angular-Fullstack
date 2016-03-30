var Team = require('../../sqldb').team;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  Team.findAll()
    .then(function (Teams) {
      res.status(200).json(Teams);
      return null
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {

  var newTeam = Team.build(req.body);
  newTeam.logo = req.file.originalname;
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

exports.show = function (req, res, next) {
  var TeamId = req.params.id;

  Team.find({
    where: {
      id: TeamId
    }
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
