(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('HomepageController', HomepageController);

  /** @ngInject */
  function HomepageController(config, send, $log) {
    var vm = this;
    vm.posts = [];
    send.request('/post', 'GET')
      .then(function(res) {
        vm.posts = res;
      }, function(err) {
        $log.debug(err);
      })
  }
})();
