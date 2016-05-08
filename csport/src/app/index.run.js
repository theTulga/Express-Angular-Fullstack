(function() {
  'use strict';

  angular
    .module('csport')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
