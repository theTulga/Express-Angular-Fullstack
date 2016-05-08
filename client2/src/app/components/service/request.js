(function() {
  'use strict'

  angular
      .module('webProject')
      .service('send', Send)

  /** @ngInject */
  function Send($http, $log, config) {
    var prefix = '';
    if(config.env === 'dev')        prefix += config.dev.host;
    else                            prefix += config.app.host;
    var request = function(route, method, data, image){
      $log.debug('********Request*********')
      data ? $log.debug('%s %s %s',route, method, data)
      :      $log.debug('%s %s',route, method)


      if (!method){
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
                    $log.debug("------Response-------\n%s",route,response.data);
                    return response.data;
                  })
      if (image){
        var fd = new FormData();
        $log.debug('data',data);
        for(var key in data){
          fd.append(key, data[key]);
        }
        $log.debug('fd',fd);
        return $http( {
          url: prefix + route,
          method: method,
          data: fd,
          // }, {
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
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
