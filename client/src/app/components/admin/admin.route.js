(function(){
  'use strict';

  angular
    .module('webProject')
    .config(function($stateProvider){
      $stateProvider
        .state('admin', {
          url: '/admin',
          templateUrl: 'app/components/admin/admin.html'
          // controller: 'AdminController',
          // controllerAs: 'AA'
        })
        // .state('signup', {
        //   url: '/signup',
        //   templateUrl: 'app/components/account/signup/signup.html',
        //   controller: 'SignUpController',
        //   controllerAs: 'SS'
        // })
    })

})()
