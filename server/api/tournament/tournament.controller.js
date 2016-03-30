var Tournament = require('../../sqldb').Tournament;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  Tournament.findAll()
    .then(function (Tournaments) {
      res.status(200).json(Tournaments);
      return null
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {

  var newTournament = Tournament.build(req.body);
  newTournament.logo = req.file.originalname;
  newTournament.save()
    .then(function (user) {
      res.json({ message: 'Success' });
      return null;
    }).catch(function(err) {
      console.log('err in newTournament.save()',err)
      handleError(res);
      return null
    });
}

exports.show = function (req, res, next) {
  var TournamentId = req.params.id;

  Tournament.find({
    where: {
      id: TournamentId
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
