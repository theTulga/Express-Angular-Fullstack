module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Team', {
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
    region: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    owner: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    sponsor: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    logo: {
      type: DataTypes.STRING,
      defaultValue: null
    }
    // }, {
    //   instanceMethods: {
    //     countTasks: function() {
    //       // how to implement this method ?
    //     }
    //   }
  }, {
    timestamps: true
  });
};
