var sqldb = require('../../sqldb')
var Participant = sqldb.participant
var Tournament = sqldb.tournament

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.show = function(req, res, next){
  var tour_id = req.params.id;

  Participant.findAll({
    where: {
      tournament_id: tour_id
    }
  })
    .then(function (parts) {
      res.status(200).json(parts);
    }).catch(handleError(res));
}

exports.destroy = function(req, res, next){
  var tour_id = req.params.id;
  Participant.destroy({
    where: {
      tournament_id: tour_id
    }
  })
    .then(function (parts) {
      res.json({ message: 'success' });
      return null;
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {
  var teams = req.body.teams;
  var tour_id = req.body.tour_id;
  var k = true;
  Participant.destroy({
    where:{
      tournament_id: tour_id
    }
  })
    .then(function(parts) {

      teams.forEach(function(entry) {
        var tmp = {};
        tmp.tournament_id = req.body.tour_id;
        tmp.team_id = entry.team.id;
        var newPart = Participant.build(tmp);
        newPart.save()
          .then(function(part) {
            console.log('Created Participant ', part.dataValues)
            return null
          }).catch(function(err) {
            k = false;
            handleError(res)
            return null
          })
      })
      if (k) res.json({ message: 'Success' })
      return null
    }).catch(handleError(res));
}
