(function() {
  'use strict';

  angular
    .module('csport')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, config) {
    var vm = this;
    if (config.env === 'dev'){
      vm.imagePrefix = config.dev.host + "/api/images/"
    } else {
      vm.imagePrefix = config.app.host + "/api/images/"
    }


  }
})();
