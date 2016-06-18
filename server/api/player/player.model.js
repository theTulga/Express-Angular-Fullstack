module.exports = function(sequelize, DataTypes) {
  return sequelize.define('player', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    team_id: DataTypes.INTEGER,
    name: DataTypes.INTEGER,
    title: DataTypes.INTEGER,
    pic: DataTypes.STRING,
    short: DataTypes.TEXT
  }, {
    timestamps: true
  });
};
