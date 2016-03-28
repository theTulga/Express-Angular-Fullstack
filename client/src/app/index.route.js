(function() {
  'use strict';

  angular
    .module('webProject')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'MM'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'AA',
        resolve: {
          login: onlyAdmin
        }
      })
      .state('main.category', {
        url: ':category',
        templateUrl: 'app/category/category.html',
        controller: 'CategoryController',
        controllerAs: 'CC'
      })


    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }
  var onlyAdmin = function ($q, $log, send){
    var defer = $q.defer();
    send.request('/auth/local/', 'GET')
      .then(function(res) {
        if (res) defer.resolve();
      }, function(err) {
        if (err) defer.reject();
      })

    return defer.promise;
  }

})();
