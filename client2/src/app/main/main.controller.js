(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(config) {
    var vm = this;
    vm.imagePrefix = '';

    if(config.env === 'dev')        vm.imagePrefix += config.dev.host + '/images/';
    else                            vm.imagePrefix += config.app.host + '/images/';
  }
})();