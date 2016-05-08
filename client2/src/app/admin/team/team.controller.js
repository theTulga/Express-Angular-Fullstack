(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('adminTeamController', adminTeamController);

  /** @ngInject */
  function adminTeamController($log, send, Notification) {
    var vm = this;
    vm.team = {};
    vm.teams = [];

    vm.new = function(){
      vm.team = {};
    }

    vm.submit = function(){
      if (vm.team.id){

        send.request('/team', 'PUT', vm.team)
          .then(
            function(res){
              if (res.message === 'Success'){
                Notification.success('Амжилттай хадгаллаа.');
                vm.team = {};
                vm.getTeams();
              }
            },
            function(err){
              Notification.error('Хадгалалт амжилтгүй.');
              $log.debug(err);
            });
      } else {
        send.request('/team', 'POST', vm.team, true)
          .then(
            function(res){
              Notification.success('Амжилттай хадгаллаа.');
              vm.team = {};
              vm.getTeams();
            },
            function(err){
              Notification.error('Хадгалалт амжилтгүй.');
              $log.debug(err);
            });
      }
    }

    vm.getTeams = function() {
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
    vm.getTeams();

    vm.edit = function(id){
      angular.forEach(vm.teams, function(entry) {
        if (entry.id === id)
          return vm.team = entry;
      })
    }

    vm.delete = function(id){
      send.request('/team/' + id, 'DELETE')
      .then(
        function(res) {
          if (res.message === 'Success'){
            Notification.success('Амжилттай устгалаа.');
            vm.getTeams()
          }
        }, function(err) {
          Notification.error('Устгах үйлдэл амжилтгүй.');
          $log.debug(err);
        }
      )
    }
  }
})();
