(function() {
  'use strict';

  angular
    .module('webProject')
    .run(runBlock)
    .filter('limitHtml', function() {
        return function(text, limit) {

            var changedString = String(text).replace(/<[^>]+>/gm, '');
            var length = changedString.length;

            return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
        }
      })

  /** @ngInject */
  function runBlock($log, $rootScope, $state, redactorOptions, $cookies, config) {
    if (config.env === 'dev'){
      redactorOptions.imageUpload = config.dev.host + '/image';
    } else {
      redactorOptions.imageUpload = config.app.host + '/image';
    }


    // if (config.env === 'dev'){
    //   redactorOptions.imageUpload = config.dev.host + '/image?CSRF-TOKEN=' + $cookies.get('XSRF-TOKEN');
    // }
    // else {
    //   redactorOptions.imageUpload = config.app.host + '/image?CSRF-TOKEN=' + $cookies.get('XSRF-TOKEN');
    // }
    $rootScope.$on('$stateChangeError', function() {
      $state.go('login');
    })
    $log.debug('runBlock end');
  }

})();
