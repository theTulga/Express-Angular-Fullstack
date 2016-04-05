(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('HomepageController', HomepageController);

  /** @ngInject */
  function HomepageController(config, send, $log) {
    var vm = this;
    vm.posts = [];
    vm.tours = [];
    vm.popular = [];
    send.request('/post', 'GET')
      .then(function(res) {
        vm.posts = res;
      }, function(err) {
        $log.debug(err);
      })

    send.request('/tournament', 'GET')
      .then(function(res) {
        vm.tours = res;
      }, function(err) {
        $log.debug(err);
      })

      send.request('/post/popular', 'GET')
        .then(function(res) {
          vm.popular = res;
        }, function(err) {
          $log.debug(err);
        })

  }

})();
