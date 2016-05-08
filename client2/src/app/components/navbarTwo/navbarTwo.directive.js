(function() {
  'use strict';

  angular
    .module('webProject')
    .directive('navbarTwo', navbarTwo);

  /** @ngInject */
  function navbarTwo() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbarTwo/navbarTwo.html',
      controller: NavbarTwoController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarTwoController() {

    }
  }

})();
