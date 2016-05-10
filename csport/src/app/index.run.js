(function() {
  'use strict';

  angular
    .module('csport')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state) {
    var lintIgnore;
    lintIgnore = $rootScope.$on('$stateChangeError', function() {
      $state.go('login');
    })

    $log.debug('runBlock end');
  }

})();
