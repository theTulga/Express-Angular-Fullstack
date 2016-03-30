module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    content: DataTypes.TEXT,
    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    pic: DataTypes.STRING

  }
);
  return Model;
};
