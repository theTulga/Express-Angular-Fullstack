(function() {
  'use strict';

  angular
    .module('webProject')
    .directive('match', match);

  /** @ngInject */
  function match() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/match/matchlist/matchlist.html',
      controller: MatchController,
      controllerAs: 'MM'
    };

    return directive;

    /** @ngInject */
    function MatchController(send, $log, moment) {
      var vm = this;

      vm.matches = [];

      vm.calculateDiff = function(givenTime){
        return moment(givenTime).fromNow(true)
      }

      send.request('/get/matches', 'GET').then(function(res){
        vm.matches = res;
      }, function(err){
        $log.debug(err);
      })
    }
  }

})();
