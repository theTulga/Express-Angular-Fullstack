(function() {
  'use strict';

  angular
    .module('webProject')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, redactorOptions, $cookies, config) {

    redactorOptions.imageUpload = config.dev.host + '/image?XSRF-TOKEN=' + $cookies.get('XSRF-TOKEN');

    $rootScope.$on('$stateChangeError', function() {
      $state.go('login');
    })
    $log.debug('runBlock end');
  }

})();
