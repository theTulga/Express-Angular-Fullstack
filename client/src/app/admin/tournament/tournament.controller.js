(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('adminTournamentController', adminTournamentController);

  /** @ngInject */
  function adminTournamentController($log, send, Notification) {
    var vm = this;
    vm.tours = [];
    vm.tournament = {};

    vm.getTours = function(){
      send.request('/tournament', 'GET')
        .then(
          function(res) {
            vm.tours = res;
          },
          function(err) {
            $log.debug (err);
          }
        )
    }; vm.getTours();

    vm.edit = function(id){
      angular.forEach(vm.tours, function(entry) {
        if (entry.id === id)
          return vm.tournament = entry;
      })
    }

    vm.submit = function(){
      send.request('/tournament', 'POST', vm.tour, true)
        .then(
          function(res) {
            if(res.message === 'Success'){
              Notification.success('Амжилттай хадгаллаа.');
              vm.tour = {};
              vm.getTours();
            }
          },
          function(err) {
            Notification.error('Хадгалалт амжилтгүй.');
            $log.debug(err)
          }
        )
    }

  }
})();
