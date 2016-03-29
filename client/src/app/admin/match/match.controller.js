(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('aMatchController', MatchController);

  /** @ngInject */
  function MatchController($log, send) {
    var vm = this;
    vm.match = {};
    vm.teams = [];
    vm.team1 = {};
    vm.team2 = {};


    vm.submit = function(){
      vm.match.fTeam_id = vm.team1.id;
      vm.match.sTeam_id = vm.team2.id;
      send.request('/match', 'POST', vm.match)
        .then(
          function(res){
            $log.debug(res);
          },
          function(err){
            $log.debug('error', err);
          });
    }

    send.request('/team', 'GET')
      .then(
        function(res) {
          vm.teams = res;
        },
        function(err) {
          $log.debug(err);
        }
      )

  }
})();
