(function(){
  'use strict';

  angular
    .module('webProject')
    .config(function($stateProvider){
      $stateProvider
        .state('admin', {
          url: '/admin',
          templateUrl: 'app/components/admin/admin.html',
          controller: 'AdminController',
          controllerAs: 'AA'
        })
        .state('admin.post', {
          url: '/post',
          templateUrl: 'app/components/admin/post/post.html',
          controller: 'PostController',
          controllerAs: 'PP'
        })
    })
    // .config(function(redactorOptions) {
    //   redactorOptions.buttons = ['formatting', 'bold', 'italic', 'image'];
    // })

})()
