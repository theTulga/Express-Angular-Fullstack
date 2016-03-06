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
          controllerAs: 'CC'
        })
    })

})()
