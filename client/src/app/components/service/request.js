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
    var request = function(route, method, data, image){
      if (!data){
        method = 'GET'
      }
      if (!image)
        return $http({
                  url: prefix + route,
                  method: method,
                  withCredentials: true,
                  data: data,
                  cache: false
                })
                  .then(function(response){
                    return response.data;
                  })
      if (image){
        var fd = new FormData();

        for(var key in data){
          fd.append(key, data[key]);
        }
        return $http.post( prefix + route, fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
          .then(function(response){
            return response.data;
          })
      }
    }

    return {
      request: request
    };
  }
})();
