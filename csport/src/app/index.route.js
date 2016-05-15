(function() {
  'use strict';

  angular
    .module('csport')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        abstract: true,
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('main.home', {
        url: '',
        templateUrl: 'app/components/homepage/homepage.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('main.post', {
        url: 'post/:id',
        templateUrl: 'app/components/post/post.html',
        controller: 'PostController',
        controllerAs: 'post'
      })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

})();
