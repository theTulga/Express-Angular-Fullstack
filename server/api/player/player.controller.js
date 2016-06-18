var sqldb = require('../../sqldb')
var Player = sqldb.player

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
      res.json({ message: 'Success' });
      return null;
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {
  var newPlayer = Player.build(req.body)
  if (req.file) newPlayer.setDataValue("pic", req.file.originalname)
  newPlayer.save()
    .then(function() {
      res.json({ message: 'Success' });
      return null
    })
    .catch(function(err) {
      console.log('err in newPlayer.save()',err)
      handleError(res);
      return null
    })
}
