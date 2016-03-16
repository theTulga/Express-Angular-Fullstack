(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('TeamController', TeamController);

  /** @ngInject */
  function TeamController($log, send) {
    var vm = this;
    vm.team = {};

    vm.submit = function(){
      send.request('/team', 'POST', vm.team, true)
        .then(
          function(res){
            $log.debug('success', res);
          },
          function(err){
            $log.debug('error', err);
          });
    }
  }
})();
