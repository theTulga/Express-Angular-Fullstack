module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    tournament_id: DataTypes.INTEGER,
    qualifiedT_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER
  }, {
    timestamps: true
  });
};
