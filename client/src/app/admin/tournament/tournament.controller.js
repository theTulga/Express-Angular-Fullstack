(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('aTournamentController', aTournamentController);

  /** @ngInject */
  function aTournamentController($log, send) {
    var vm = this;
    vm.tournament = {};

    vm.submit = function(){
      send.request('/tournament', 'POST', vm.tournament, true)
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
