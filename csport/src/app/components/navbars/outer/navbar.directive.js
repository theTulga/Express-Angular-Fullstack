(function() {
  'use strict';

  angular
    .module('csport')
    .directive('navbarOuter', navbarOuter);

  /** @ngInject */
  function navbarOuter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbars/outer/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function NavbarController() {

    }
  }

})();
