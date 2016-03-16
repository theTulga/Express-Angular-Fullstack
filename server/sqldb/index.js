/**
 * Sequelize initialization module
 */

'use strict';
var config = require('../config/environment')
var Sequelize = require('sequelize')

var db = {
  Sequelize,
  sequelize: new Sequelize(
    config.sequelize.database,
    config.sequelize.user,
    config.sequelize.pass,
    config.sequelize.options)
};


var models = [
  'User', 'Post', 'Team', 'Match'
  // 'Post', 					'Draft',
  // 'Team', 					'Game',
  // 'User', 					'Participant',
  // 'Match', 					'Prize',
	// 'Tournament', 		'Winner',
	// 'Stream'
];
var set_database_so_hard = function(){
  if (db[models[0]]) return

  models.forEach(function(model) {
		if (!db[model]){
			db[model] = db.sequelize.import('../api/' + model + '/' + model + '.model.js');
			db[model].sync();
		}
	})
}();

var set_relations = function(){
  var Team = db.Team,
      Match = db.Match
      // Tournament = db.Tournament


  Team.hasMany(Match, {as: 'fMatches', foreignKey: 'fTeam_id'})
  Match.belongsTo(Team, {as: 'fTeam', foreignKey: 'fTeam_id'})

  Team.hasMany(Match, {as: 'sMatches', foreignKey: 'sTeam_id'})
  Match.belongsTo(Team, {as: 'sTeam', foreignKey: 'sTeam_id'})

  // Tournament.hasMany(Match, {as: 'matches', foreignKey: 'tournament_id'})
  // Match.belongsTo(Tournament, {as: 'tournament', foreignKey: 'tournament_id'})
}();

// Insert models below
// db.Match = db.sequelize.import('../api/match/match.model');
// db.Thing = db.sequelize.import('../api/thing/thing.model');
// db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
