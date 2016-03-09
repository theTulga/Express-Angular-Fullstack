(function(){
  'use strict';

  angular
    .module('webProject')
    .controller('SignUpController', SignUpController);

    /** @ngInject */
    function SignUpController (send, $log){
      var vm = this;
      vm.user = {}
      vm.error = false;
      vm.success = false;

      vm.register = function(){
        send.request('/user/', 'POST', vm.user).then(function(res){
          $log.debug('/user/  POST',res);
          vm.success = true;
          vm.user = {};
        }, function(err){
          $log.debug('/user/  POST',err);
          vm.error = true;
        })


      }
    }

})()
