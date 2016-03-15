(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('AdminController', AdminController);

  /** @ngInject */
  function AdminController($log, send) {
    var vm = this;
    vm.post = {};

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
