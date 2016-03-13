// (function() {
//   'use strict'
//
//   angular
//       .module('webProject')
//       .factory('Util', UtilService)
//
//   /** @ngInject */
//   function UtilService($window) {
//     var Util = {
//       safeCb: function safeCb(cb) {
//         return (angular.isFunction(cb)) ? cb : angular.noop;
//       },
//       urlParse: function urlParse(url){
//         var a = document.createElement('a');
//         a.href = url;
//
//         if(a.host === '') {
//           a.href = a.href;
//         }
//
//         return a;
//       },
//
//       isSameOrigin: function isSameOrigin(url, origins) {
//         url = Util.urlParse(url);
//         origins = (origins && [].concat(origins)) || [];
//         origins = origins.map(Util.urlParse);
//         origins.push($window.location);
//         origins = origins.filter(function(o) {
//           return url.hostname === o.hostname &&
//             url.port === o.port &&
//             url.protocol === o.protocol;
//         })
//
//         return (origins.length >= 1);
//       }
//     };
//
//     return Util;
//   }
//
// })();
