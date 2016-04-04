(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('adminPostController', adminPostController);

  /** @ngInject */
  function adminPostController($log, send) {
    var vm = this;
    vm.post = {};
    vm.posts = [];

    vm.getPosts = function(){
      send.request('/post', 'GET')
        .then(
          function(res) {
            vm.posts = res;
          },
          function(err) {
            $log.debug ('Error',err);
          }
        )
    }

    vm.edit = function(id){
      angular.forEach(vm.posts, function(entry) {
        if (entry.id === id)
          return vm.post = entry;
      })
    }

    vm.delete = function(id){
      $log.debug('sending Delete Request')
      send.request('/post/' + id, 'DELETE')
        .then(
          function(res) {
            if (res.message === 'Success'){
              Notification.success('Амжилттай устгалаа.');
              vm.getPosts()
            }
          }
        )
    }

    vm.submit = function(){
      if (vm.post.id){
        send.request('/post', 'PUT', vm.post, vm.post.top)
          .then(
            function(res){
              if (res.message === 'Success'){
                Notification.success('Амжилттай хадгаллаа.');
                vm.post = {};
                vm.getPosts();
              }
            },
            function(err){
              Notification.error('Хадгалалт амжилтгүй.');
              $log.debug(err);
            });
      } else {
        send.request('/post', 'POST', vm.post, vm.post.top)
          .then(
            function(res){
              if (res.message === 'Success'){
                Notification.success('Амжилттай хадгаллаа.');
                vm.post = {};
                vm.getPosts();
              }
            },
            function(err){
              Notification.error('Хадгалалт амжилтгүй.');
              $log.debug(err);
            });
      }
    }
    vm.new = function(){
      vm.post = {};
    }
    vm.getPosts();


  }
})();
