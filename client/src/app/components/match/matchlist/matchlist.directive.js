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

      var shortHumanizer = humanizeDuration.humanizer({
        language: 'short',
        languages: {
          short: {
            y: function() { return 'y' },
            mo: function() { return 'mo' },
            w: function() { return 'w' },
            d: function() { return 'd' },
            h: function() { return 'h' },
            m: function() { return 'm' },
            s: function() { return 's' },
            ms: function() { return 'ms' },
          }
        },
        units: ['d', 'h'],
        delimiter: ' '
      })

      var shortHumanizerMinutes = humanizeDuration.humanizer({
        language: 'shortEn',
        languages: {
          shorten: {
            y: function() { return 'y' },
            mo: function() { return 'mo' },
            w: function() { return 'w' },
            d: function() { return 'd' },
            h: function() { return 'h' },
            m: function() { return 'm' },
            s: function() { return 's' },
            ms: function() { return 'ms' },
          }
        },
        unit: ['m'],
        round: true,
        delimiter: ' '
      })

      send.request('/match/list', 'GET').then(function(res){
        vm.matches = res;
        angular.forEach(vm.matches, function(entry, index){

          var now = moment();
          var time = moment(entry.date);
          var a = now.diff(time);
          
          if (a > 0 && a < 60 * 60 * 1000){
            vm.matches[index].timeLeft = humanizeDuration(a, {round: true, units: ['m'], delimiter: '', spacer: ''})
          } else {
            vm.matches[index].timeLeft = humanizeDuration(a, {round: true, units: ['d', 'h'], delimiter: '', spacer: ''})
          }
        })
      }, function(err){
        $log.debug(err);
      })
    }
  }

})();
