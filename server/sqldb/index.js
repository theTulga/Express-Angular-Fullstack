/**
 * Sequelize initialization module
 */

'use strict';
var config = require('../config/environment')
var Sequelize = require('sequelize')

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(
    config.sequelize.database,
    config.sequelize.user,
    config.sequelize.pass,
    config.sequelize.options)
};


var models = [
  'user', 'post', 'team', 'match',
  'tournament', 'participant', 'read',
  'game'
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
  var Team = db.team,
      Match = db.match,
      Tournament = db.tournament,
      Participant = db.participant,
      Read = db.read,
      Post = db.post,
      Game = db.game


      Team.hasMany(Match, {as: 'fMatches', foreignKey: 'fTeam_id'})
      Match.belongsTo(Team, {as: 'fTeam', foreignKey: 'fTeam_id'})

      Team.hasMany(Match, {as: 'sMatches', foreignKey: 'sTeam_id'})
      Match.belongsTo(Team, {as: 'sTeam', foreignKey: 'sTeam_id'})

      Tournament.hasMany(Match, {as: 'matches', foreignKey: 'tournament_id'})
      Match.belongsTo(Tournament, {as: 'tournament', foreignKey: 'tournament_id'})

  Tournament.hasMany(Participant, {as: 'participants', foreignKey: 'tournament_id'})
  Participant.belongsTo(Tournament, {as: 'tournament', foreignKey: 'tournament_id'})

  Tournament.hasMany(Participant, {as: 'qualifiedTeams', foreignKey: 'qualifiedT_id'})
  Participant.belongsTo(Tournament, {as: 'qualifiedT', foreignKey: 'qualifiedT_id'})

  Team.hasMany(Participant, {as: 'tournaments', foreignKey: 'team_id'})
  Participant.belongsTo(Team, {as: 'team', foreignKey: 'team_id'})

      Post.hasOne(Read, {as: 'read', foreignKey: 'post_id'})
      Read.belongsTo(Post, {as: 'post', foreignKey: 'post_id'})

  Match.hasMany(Game, {as: 'games', foreignKey: 'match_id'})
  Game.belongsTo(Match, {as: 'match', foreignKey: 'match_id'})

      Team.hasMany(Game, {as: 'won_games', foreignKey: 'winner_id'})
      Team.hasMany(Game, {as: 'lost_games', foreignKey: 'loser_id'})
      Game.belongsTo(Team, {as: 'won_team', foreignKey: 'winner_id'})
      Game.belongsTo(Team, {as: 'lost_team', foreignKey: 'loser_id'})


}();

module.exports = db;
