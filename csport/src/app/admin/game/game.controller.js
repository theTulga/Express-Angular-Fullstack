(function() {
  'use strict';

  angular
    .module('csport')
    .controller('adminGameController', adminGameController);

  /** @ngInject */
  function adminGameController($log, send, Notification) {
    var vm = this;
    vm.matches = [];
    vm.teams = [];
    vm.team1 = {};
    vm.team2 = {};

    vm.selectMatch = function(id) {
      $log.debug('incoming ID', id)
      angular.forEach(vm.matches, function(entry) {

        $log.debug(entry.id)
        if (entry.id === id){
          $log.debug('entry.fTeam', entry.fTeam);
          $log.debug('entry.sTeam', entry.sTeam);
          vm.team1 = entry.fTeam;
          vm.team2 = entry.sTeam;
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

    send.request('/match', 'GET')
      .then(
        function(res) {
          vm.matches = res;
        },
        function(err) {
          $log.debug(err);
        }
      )

  }
})();
