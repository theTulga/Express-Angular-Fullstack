(function() {
  'use strict';

  angular
    .module('csport')
    .controller('PlayerController', PlayerController);

  /** @ngInject */
  function PlayerController(send, $log, $stateParams) {
    var vm = this;
    vm.post = {};
    send.request('/post/' + $stateParams.id, 'GET')
      .then(function(res) {
        vm.post = res;
      }, function(err) {
        $log.debug(err);
      })
  }
})();
