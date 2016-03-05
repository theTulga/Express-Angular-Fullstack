(function() {
  'use strict';

  var config = {
    app: {
      host: 'http://52.25.241.31',
      port: ':80/api'
    },
    dev: {
      host: 'http://localhost',
      port: ':8080/api'
    },
    env: 'dev'
  };

  angular
    .module('webProject')
    .constant('config', config)


})();
