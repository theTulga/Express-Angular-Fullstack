(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('PostController', PostController);

  /** @ngInject */
  function PostController($log, send) {
    var vm = this;
    vm.post = {};

    vm.submit = function(){
      send.request('/post', 'POST', vm.post)
        .then(
          function(res){
            $log.debug(res);
          },
          function(err){
            $log.debug('error', err);
          });
    }
  }
})();
