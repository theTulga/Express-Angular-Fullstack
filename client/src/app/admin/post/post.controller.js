(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('aPostController', PostController);

  /** @ngInject */
  function PostController($log, send) {
    var vm = this;
    vm.post = {};

    vm.submit = function(){
      send.request('/post', 'POST', vm.post, vm.post.top)
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
