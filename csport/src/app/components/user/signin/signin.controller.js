(function() {
  'use strict';

  angular
    .module('csport')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, send, $state) {
    var vm = this;
    vm.user = {};

    vm.login = function(){
      send.request('/auth/local/login', 'POST', vm.user)
        .then(
          function(res){
            $log.debug('/auth/local/login POST', res.message);
            $state.go('admin')
          },
          function(err){
            $log.debug('error', err);
          });
    }
  }
})();
