var sqldb = require('../../sqldb')
var match = sqldb.match;
var team = sqldb.team;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  match.findAll()
    .then(function (matchs) {
      res.status(200).json(matchs);
    }).catch(handleError(res));
}

exports.list = function(req, res, next){
  match.findAll({
    where: {
      ended: false,
    },
    limit: 10,
    include: [{
        model: team,
        as:    'fTeam'
      }, {
        model: team,
        as:    'sTeam'
      }]
  })
    .then(function (matchs) {
      res.status(200).json(matchs);
      return null;
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {

  var newmatch = match.build(req.body);
  newmatch.save()
    .then(function (user) {
      res.json({ message: 'Success' });
      return null
    }).catch(function(err) {
      handleError(res);
      return null
    });
}

exports.show = function (req, res, next) {
  var matchId = req.params.id;

  match.find({
    where: {
      id: matchId
    },
    include: [{
      model: team,
      as:    'fteam'
    }, {
      model: team,
      as:    'steam'
    }]
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
