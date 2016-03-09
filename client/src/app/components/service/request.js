(function() {
  'use strict'

  angular
      .module('webProject')
      .service('send', Send)

  /** @ngInject */
  function Send($http, $log, config) {
    var prefix = '';
    if(config.env === 'dev')        prefix += config.dev.host + config.dev.port;
    else                            prefix += config.app.host + config.app.port;
    $log.debug('Service Loaded');
    var request = function(route, method, data){
      if (!data){
        method = 'GET'
      }
      return $http({
        url: prefix + route,
        method: method,
        withCredentials: true,
        data: data,
        cache: false
      }).then(function(response){
        return response.data;
      })

    }


    var post = function(uploadUrl, data){
      var fd = new FormData();

      for(var key in data){
        fd.append(key, data[key]);
      }

      return $http.post(
        prefix + uploadUrl,
        fd,
        {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        }
      ).then(function(response){
        return response.data;
      })


    }

    return {
      request: request,
      post: post
    };
  }
})();
