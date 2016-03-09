(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, send) {
    var vm = this;
    vm.user = {};

    vm.login = function(){
      send.request('/auth/local', 'POST', vm.user)
        .then(
          function(res){
            $log.debug('success', res);
          },
          function(err){
            $log.debug('error', err);
          });
    }
  }
})();
