(function() {
  'use strict';

  angular
    .module('csport')
    .controller('adminGameController', adminGameController);

  /** @ngInject */
  function adminGameController($log, send, Notification) {
    var vm = this;
    vm.match = {};
    vm.teams = [];
    vm.team1 = {};
    vm.team2 = {};

    vm.setTeam = function(team, id) {
      angular.forEach(vm.teams, function(entry) {
        if (entry.id === id){
          if (team === 1) return vm.team1 = entry;
          if (team === 2) return vm.team2 = entry;
        }
      })
    }


    vm.submit = function(){
      vm.match.fTeam_id = vm.team1.id;
      vm.match.sTeam_id = vm.team2.id;
      send.request('/match', 'POST', vm.match)
        .then(
          function(res){
            if (res.message === 'Success'){
              Notification.success('Амжилттай хадгаллаа.');
            }
          },
          function(err){
            Notification.error('Хадгалалт амжилтгүй.');
            $log.debug(err);
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
