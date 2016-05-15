(function() {
  'use strict';

  angular
    .module('csport')
    .directive('match', match);

  /** @ngInject */
  function match() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/match/match.html',
      controller: MatchListController,
      controllerAs: 'Mlist'
    };

    return directive;

    /** @ngInject */
    function MatchListController(send, $log, moment) {
      var vm = this;
      vm.matches = [];

      send.request('/match/list', 'GET').then(function(res){
        vm.matches = res;
        angular.forEach(vm.matches, function(entry, index){

          var now = moment();
          var time = moment(entry.date);
          vm.matches[index].timeLeft = now.diff(time);
        })
      }, function(err){
        $log.debug(err);
      })
    }
  }

})();
