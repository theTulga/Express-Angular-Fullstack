module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tournament', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    prizePool: DataTypes.INTEGER,
    category: DataTypes.STRING,
    sDate: DataTypes.DATE,
    eDate: DataTypes.DATE,
    logo: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    timestamps: true
  });
};
