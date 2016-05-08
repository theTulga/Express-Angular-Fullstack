module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    winner_id: DataTypes.INTEGER,
    loser_id: DataTypes.INTEGER,
    match_id: DataTypes.INTEGER,
  });
  return Model;
};
