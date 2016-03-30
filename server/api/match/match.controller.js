var sqldb = require('../../sqldb')
var Match = sqldb.match;
var Team = sqldb.team;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  Match.findAll()
    .then(function (matchs) {
      res.status(200).json(matchs);
    }).catch(handleError(res));
}

exports.list = function(req, res, next){
  Match.findAll({
    where: {
      ended: false,
    },
    limit: 10,
    include: [{
        model: Team,
        as:    'fTeam'
      }, {
        model: Team,
        as:    'sTeam'
      }]
  })
    .then(function (matchs) {
      res.status(200).json(matchs);
      return null;
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {

  var newMatch = Match.build(req.body);
  newMatch.save()
    .then(function (user) {
      res.json({ message: 'Success' });
      return null
    }).catch(function(err) {
      handleError(res);
      return null
    });
}

exports.show = function (req, res, next) {
  var MatchId = req.params.id;

  Match.find({
    where: {
      id: MatchId
    },
    include: [{
      model: Team,
      as:    'fTeam'
    }, {
      model: Team,
      as:    'sTeam'
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
