(function(){
  'use strict';

  angular
    .module('csport')
    .config(function($stateProvider){
      $stateProvider
        .state('admin.post', {
          url: '/post',
          templateUrl: 'app/admin/post/post.html',
          controller: 'adminPostController',
          controllerAs: 'aPost'
        })
        .state('admin.team', {
          url: '/team',
          templateUrl: 'app/admin/team/team.html',
          controller: 'adminTeamController',
          controllerAs: 'aTeam'
        })
        .state('admin.match', {
          url: '/match',
          templateUrl: 'app/admin/match/match.html',
          controller: 'adminMatchController',
          controllerAs: 'aMatch'
        })
        .state('admin.tournament', {
          url: '/tournament',
          templateUrl: 'app/admin/tournament/tournament.html',
          controller: 'adminTournamentController',
          controllerAs: 'aTour'
        })
        .state('admin.tourpic', {
          url: '/participant',
          templateUrl: 'app/admin/participant/participant.html',
          controller: 'adminParticipantController',
          controllerAs: 'aPart'
        })
        .state('admin.game', {
          url: '/game',
          templateUrl: 'app/admin/game/game.html',
          controller: 'adminGameController',
          controllerAs: 'aGame'
        })
        .state('admin.player', {
          url: '/player',
          templateUrl: 'app/admin/player/player.html',
          controller: 'adminPlayerController',
          controllerAs: 'aPlayer'
        })
    })

})()
