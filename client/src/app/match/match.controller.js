(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('MatchController', MatchController);

  /** @ngInject */
  function MatchController(config, send, $log, $stateParams) {
    var vm = this;
    vm.match = {};
    send.request('/match/' + $stateParams.id, 'GET')
      .then(function(res) {
        vm.match = res;
      }, function(err) {
        $log.debug(err);
      })
  }
})();
