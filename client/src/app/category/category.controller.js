(function(){
  'use strict';

  angular
    .module('webProject')
    .controller('CategoryController', CategoryController);

    /** @ngInject */
    function CategoryController (send, $log, $stateParams){
      var vm = this;
      vm.url = '/post/category/' + $stateParams.category;
      vm.posts = [];
      send.request(vm.url, 'GET')
        .then(function(res) {
          vm.posts = res;
        }, function(err) {
          $log.debug(err);
        })
    }

})()
