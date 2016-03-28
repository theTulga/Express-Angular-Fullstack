(function(){
  'use strict';

  angular
    .module('webProject')
    .config(function($stateProvider){
      $stateProvider
        .state('admin.post', {
          url: '/post',
          templateUrl: 'app/admin/post/post.html',
          controller: 'PostController',
          controllerAs: 'PP'
        })
        .state('admin.team', {
          url: '/team',
          templateUrl: 'app/admin/team/team.html',
          controller: 'TeamController',
          controllerAs: 'TT'
        })
        .state('admin.match', {
          url: '/match',
          templateUrl: 'app/admin/match/match.html',
          controller: 'createMatchController',
          controllerAs: 'MM'
        })
    })

})()
