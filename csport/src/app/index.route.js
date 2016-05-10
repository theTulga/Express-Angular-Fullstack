(function() {
  'use strict';

  angular
    .module('csport')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
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

    $urlRouterProvider.otherwise('/');
  }

})();
