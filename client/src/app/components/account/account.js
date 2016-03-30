(function(){
  'use strict';

  angular
    .module('webProject')
    .config(function($stateProvider){
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/components/account/login/login.html',
          controller: 'LoginController',
          controllerAs: 'LL'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'app/components/account/signup/signup.html',
          controller: 'SignUpController',
          controllerAs: 'Sign'
        })
    })

})()
