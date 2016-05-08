var sqldb = require('../../sqldb')
var Game = sqldb.game
var Team = sqldb.team
var Match = sqldb.match

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
    return null
  };
}

exports.show = function(req, res, next){
  var match_id = req.params.id;

  Game.findAll({
    where: {
      match_id: match_id
    }
  })
    .then(function (games) {
      res.status(200).json(games);
    }).catch(handleError(res));
}

// exports.destroy = function(req, res, next){
//   var tour_id = req.params.id;
//   Participant.destroy({
//     where: {
//       tournament_id: tour_id
//     }
//   })
//     .then(function (parts) {
//       res.json({ message: 'success' });
//       return null;
//     }).catch(handleError(res));
// }

exports.create = function (req, res, next) {
  var newGame = Game.build(req.body)
  newGame.save()
    .then(function() {
      res.status(200).json({ message: 'Success'})
      return null
    }).catch(handleError(res));
}
