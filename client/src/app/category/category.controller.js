(function(){
  'use strict';

  angular
    .module('webProject')
    .controller('CategoryController', CategoryController);

    /** @ngInject */
    function CategoryController (send, $log, $stateParams){
      var vm = this;
      vm.url =  $stateParams.category ? '/post/' + $stateParams.category : '/post';
      vm.posts = [];
      send.request(vm.url, 'GET')
        .then(function(res) {
          vm.posts = res;
        }, function(err) {
          $log.debug(err);
        })
    }

})()
