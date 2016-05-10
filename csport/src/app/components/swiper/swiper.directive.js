(function() {
  'use strict';

  angular
    .module('csport')
    .directive('swiper', swiper);

  /** @ngInject */
  function swiper() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/swiper/swiper.html',
      controller: SwiperController,
      controllerAs: 'SS'
    };

    return directive;
    /** @ngInject */
    function SwiperController(send, $log) {
      var vm = this;
      vm.posts = [];

      send.request('/post/top', 'GET')
        .then(function(res) {
          vm.posts = res;
        }, function(err) {
          $log.debug(err);
        })
    }
  }

})();
