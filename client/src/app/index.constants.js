(function() {
  'use strict';

  var config = {
    app: {
      host: 'http://52.25.241.31',
      port: ':80/api'
    },
    dev: {
      host: 'http://localhost',
      port: ':8081/api'
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
