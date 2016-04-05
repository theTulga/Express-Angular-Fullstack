module.exports = function(sequelize, DataTypes) {
  return sequelize.define('read', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    post_id: {
      type: DataTypes.INTEGER,
      unique: true
    },
    count: DataTypes.INTEGER
  }, {
    timestamps: true
  });
};
