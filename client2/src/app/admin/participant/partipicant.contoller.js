(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('adminParticipantController', adminParticipantController);

  /** @ngInject */
  function adminParticipantController($log, send, Notification) {
    var vm = this;
    vm.logo;
    vm.tours = [];
    vm.teams = [];
    vm.tour = {};

    vm.check = function(id){
      var ok = false;
      angular.forEach(vm.tour.participants, function(entry) {
        if (entry.team.id === id) {
          return ok = true;
        }
      })
      return ok;
    }

    vm.savePart = function(){
      send.request('/participant', 'POST', {
        tour_id: vm.tour.id,
        teams: vm.tour.participants
      }).then(
        function(res) {
          if (res.message === 'Success'){
            Notification.success('Амжилттай хадгаллаа.');
          }
        },
        function(err) {
          Notification.error('Хадгалалт амжилтгүй.');
          $log.debug(err);
        }
      )
    };

    vm.selectTour = function(id) {
      send.request('/tournament/' + id, 'GET')
        .then(
          function(res) {
            vm.tour = res;
          },
          function(err) {
            $log.debug(err);
          }
        )
    }

    vm.getTours = function(){
      send.request('/tournament', 'GET')
        .then(
          function(res) {
            vm.tours = res;
          },
          function(err) {
            $log.debug ('Error',err);
          }
        )
    }; vm.getTours();

    vm.getTeams = function(){
      send.request('/team', 'GET')
        .then(
          function(res) {
            vm.teams = res;
          },
          function(err) {
            $log.debug (err);
          }
        )
    }; vm.getTeams();

    vm.removeTeam = function(index){
      vm.tour.participants.splice(index, 1);
    }

    vm.pushTeam = function(id){
      angular.forEach(vm.teams, function(entry) {
        if (entry.id === id && !vm.check(entry.id)) return vm.tour.participants.push({ team: entry});
      })
    }
  }
})();
