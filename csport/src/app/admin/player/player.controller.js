(function() {
  'use strict';

  angular
    .module('csport')
    .controller('adminPlayerController', adminPlayerController);

  /** @ngInject */
  function adminPlayerController($log, send, Notification) {
    var vm = this;
    vm.teams = [];
    vm.player = {};



    send.request('/team', 'GET')
      .then(
        function(res) {
          vm.teams = res;
        },
        function(err) {
          $log.debug(err);
        }
      )

    vm.submit = function(){
      send.request('/player', 'POST', vm.player, true)
        .then(
          function(res){
            if (res.message === 'Success'){
              Notification.success('Амжилттай хадгаллаа.');
              vm.post = {};
            }
          },
          function(err){
            Notification.error('Хадгалалт амжилтгүй.');
            $log.debug(err);
          });
    }

    vm.select = function(id){
      vm.player.team_id = id;
    }

  }
})();
