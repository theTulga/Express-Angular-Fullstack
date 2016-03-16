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
        .state('admin.team', {
          url: '/team',
          templateUrl: 'app/components/admin/team/team.html',
          controller: 'TeamController',
          controllerAs: 'TT'
        })
        .state('admin.match', {
          url: '/match',
          templateUrl: 'app/components/admin/match/match.html',
          controller: 'MatchController',
          controllerAs: 'MM'
        })
    })

})()
