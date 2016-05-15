(function() {
  'use strict';

  var config = {
    app: {
      host: 'http://52.34.105.69'
    },
    dev: {
      host: 'http://localhost:8081'
    },
    env: 'app'
  }

  var appConfig = {
    userRoles: ['guest', 'user', 'admin']
  }

  angular
    .module('csport')
    .constant('config', config)
    .constant("appConfig", appConfig)

})();
