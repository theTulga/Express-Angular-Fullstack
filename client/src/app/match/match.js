(function() {
  'use strict';

  angular
    .module('webProject')
    .config(function($stateProvider) {
      $stateProvider
      .state('main.match', {
        url: '/match/:id',
        templateUrl: 'app/match/match.html',
        controller: 'MatchController',
        controllerAs: 'cMatch'
      })
    })

})();
