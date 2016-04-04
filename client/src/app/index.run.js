(function() {
  'use strict';

  angular
    .module('webProject')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, redactorOptions, $cookies, config) {

    if (config.env === 'dev'){
      redactorOptions.imageUpload = config.dev.host + '/image?XSRF-TOKEN=' + $cookies.get('XSRF-TOKEN');
    }
    else {
      redactorOptions.imageUpload = config.app.host + '/image?XSRF-TOKEN=' + $cookies.get('XSRF-TOKEN');
    }
    $rootScope.$on('$stateChangeError', function() {
      $state.go('login');
    })
    $log.debug('runBlock end');
  }

})();
