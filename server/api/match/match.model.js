module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('Match', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    gameSeries: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    ended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fTeam_id:{
      type:DataTypes.INTEGER
    },
    sTeam_id:{
      type:DataTypes.INTEGER
    }

  });
  return Model;
};
