(function() {
  'use strict';

  angular
    .module('csport')
    .directive('navbarInner', navbarInner);

  /** @ngInject */
  function navbarInner() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbars/inner/navbar.html',
      controller: NavbarTwoController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function NavbarTwoController() {

    }
  }

})();
