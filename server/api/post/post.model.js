module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    content: DataTypes.TEXT,
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }
);

  return Model;
};
