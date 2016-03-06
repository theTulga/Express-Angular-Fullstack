(function() {
  'use strict';

  angular
    .module('webProject')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state) {
    var vm = this;
    vm.user = {};
    vm.errors = {};
    vm.submitted = false;


    vm.$state = $state;

    vm.login = function(form){
      vm.submitted = true;

      if (form.$valid){
        vm.Auth.login({
          email: vm.user.email,
          password: vm.user.password
        })
        .then(function(){
          vm.$state.go('main');
        })
        .catch(function(err){
          vm.errors.other = err.message;
        })
      }
    }
  }

})();
