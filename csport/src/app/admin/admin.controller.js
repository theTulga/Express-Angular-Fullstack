(function() {
  'use strict';

  angular
    .module('csport')
    .controller('AdminController', AdminController)
    .directive('fileModel', fileModel);


  /** @ngInject */
  function AdminController($log, send, config) {
    var vm = this;
    vm.post = {};

    if (config.env === 'dev'){
      vm.imagePrefix = config.dev.host + "/api/images/"
    } else {
      vm.imagePrefix = config.app.host + "/api/images/"
    }

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
