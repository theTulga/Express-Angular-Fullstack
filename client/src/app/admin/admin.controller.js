(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('AdminController', AdminController)
    .directive('fileModel', fileModel);


  /** @ngInject */
  function AdminController($log, send) {
    var vm = this;
    vm.post = {};

    vm.login = function(){
      send.request('/auth/local', 'POST', vm.user)
        .then(
          function(res){
            $log.debug('success', res);
          },
          function(err){
            $log.debug('error', err);
          });
    }
  }
  function fileModel ($parse){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        var model = $parse(attrs.fileModel);
        var modelSetter =  model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          })
        })
      }
    }
  }

})();
