var sqldb = require('../../sqldb')
var Match = sqldb.Match;
var Team = sqldb.Team;

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
    }).catch(function(err) {
      console.log('err in newMatch.save()',err)
      handleError(res);
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
    })
    .catch(function (err) {
      return next(err);
    });
}
