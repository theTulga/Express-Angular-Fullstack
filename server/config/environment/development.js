'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'sqlite://',
    database: 'test',
    user: 'root',
    pass: 'rooterino',
    options: {
      host: 'localhost',
    	dialect : 'mysql',
    	pool: {
    		max: 5,
    		min: 0,
    		idle: 10000
    	},
    	logging: false
    }
  }
};
