module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('draft', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    heroName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pick: {
      type: DataTypes.BOOLEAN
    }
    match_id: DataTypes.INTEGER,
  });
  return Model;
};
