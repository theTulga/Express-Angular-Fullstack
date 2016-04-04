(function() {
  'use strict';

  var config = {
    app: {
      host: 'http://52.25.241.31/api'
    },
    dev: {
      host: 'http://localhost:8081/api'
    },
    env: 'dev'
  }

  var appConfig = {
    userRoles: ['guest', 'user', 'admin']
  }

  angular
    .module('webProject')
    .constant('config', config)
    .constant("appConfig", appConfig)
})();
