(function() {
  'use strict';

  angular
    .module('webProject', ['ngAnimate',
                            'ngCookies',
                            'ngTouch',
                            'ngSanitize',
                            'ngMessages',
                            'ngAria',
                            'ngResource',
                            'ui.router',
                            'ui.bootstrap',
                            'angular-redactor'
                            ])

    .directive("redactor", function(){
    return {
        restrict: "C",
        require: "?ngModel",
        link: function(scope, element, attrs){
            element.redactor({
                focus: true
            });
        }
    }
});

})();
