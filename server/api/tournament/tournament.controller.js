var sqldb = require('../../sqldb')

var Tournament = sqldb.tournament
var Participant = sqldb.participant
var Team = sqldb.team

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  Tournament.findAll()
    .then(function (tours) {
      res.status(200).json(tours);
      return null
    }).catch(handleError(res));
}

exports.create = function (req, res, next) {
  console.log('req.body',req.body)
  var newTournament = Tournament.build(req.body)
  console.log('newTournament',newTournament)
  if (req.file) newTournament.logo = req.file.originalname
  newTournament.save()
    .then(function (tournament) {
      res.json({ message: 'Success' })
      return null;
    }).catch(function(err) {
      console.log('err in newTournament.save()',err)
      handleError(res);
      return null
    });
}

exports.update = function (req, res, next) {
  delete req.body.createdAt;
  delete req.body.updatedAt;
  delete req.body.tPrice;
  delete req.body.cPrice;
  console.log('req.body',req.body)
  if (req.file) req.body.setDataValue("logo", req.file.originalname)

  Tournament.update(req.body, {
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

exports.show = function (req, res, next) {
  var tour_id = req.params.id;

  Tournament.find({
    where: {
      id: tour_id
    },
    include: [{
      model: Participant,
      as: 'participants',
      include:[{
        model: Team,
        as: 'team'
      }]
    }]
  })
    .then(function (tournament) {
      if (!tournament) {
        return res.status(404).end();
      }

      res.json(tournament);
      return null
    })
    .catch(function (err) {
      return next(err);
    });
}
