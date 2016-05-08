(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('PostController', PostController);

  /** @ngInject */
  function PostController(send, $log, $stateParams) {
    var vm = this;
    vm.post = {};
    send.request('/post/' + $stateParams.id, 'GET')
      .then(function(res) {
        vm.post = res;
      }, function(err) {
        $log.debug(err);
      })
  }
})();
