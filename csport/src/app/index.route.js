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

      // Admin
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'AA',
        resolve: {
          login: onlyAdmin
        }
      })

      .state('user', {
        url: '/',
        abstract: true,
        template: '<div ui-view> </div>'
      })
        .state('user.signin', {
          url: 'signin',
          templateUrl: 'app/components/user/signin/signin.html',
          controller: 'LoginController',
          controllerAs: 'LL'
        })
        .state('user.signup', {
          url: 'signup',
          templateUrl: 'app/components/user/signup/signup.html',
          controller: 'SignUpController',
          controllerAs: 'Sign'
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
