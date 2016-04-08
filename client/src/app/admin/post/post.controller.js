(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('adminPostController', adminPostController);

  /** @ngInject */
  function adminPostController($log, send, Notification) {
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
      var ok = false;
      if (vm.post.pic) ok = true;
      if (ok){
        if (vm.post.id){
          send.request('/post', 'PUT', vm.post, true)
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
          send.request('/post', 'POST', vm.post, true)
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
      if (!ok) {
        Notification.error('Мэдээнд зураг сонгож өгнө үү');
      }
    }
    vm.new = function(){
      vm.post = {};
    }
    vm.getPosts();


  }
})();
