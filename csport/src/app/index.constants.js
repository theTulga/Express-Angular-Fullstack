(function() {
  'use strict';

  var config = {
    app: {
      host: 'http://52.25.241.31'
    },
    dev: {
      host: 'http://localhost:8081'
    },
    env: 'dev'
  }

  var appConfig = {
    userRoles: ['guest', 'user', 'admin']
  }

  angular
    .module('csport')
    .constant('config', config)
    .constant("appConfig", appConfig)

})();
