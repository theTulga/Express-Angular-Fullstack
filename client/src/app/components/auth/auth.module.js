// (function() {
//   'use strict'
//
//   angular
//       .module('webProject')
//       .service('auth', Auth)
//
//   /** @ngInject */
//   function Auth($location, $http, $cookies, $q, appConfig, Util, User, config) {
//     var safeCb = Util.safeCb;
//     var currentUser = {};
//     var userRoles = appConfig.userRoles || [];
//     var prefix = '';
//     if(config.env === 'dev')        prefix += config.dev.host + config.dev.port;
//     else                            prefix += config.app.host + config.app.port;
//
//     var autherino = {
//       login: function login (ref, callback){
//         var email = ref.email
//         var password = ref.password
//         return $http.post('/auth/local', {
//           email: email,
//           password: password
//         })
//           .then(function(res) {
//             $cookies.put('token', res.data.token);
//             currentUser = User.get();
//             return currentUser.$promise;
//           })
//           .then(function(user) {
//             safeCb(callback)(null, user);
//             return user;
//           })
//           .catch(function(err) {
//             Auth.logout();
//             safeCb(callback)(err.data);
//             return $q.reject(err.data);
//           });
//       },
//
//       logout: function logout(){
//         $cookies.remove('token');
//         currentUser = {};
//       },
//
//       createUser: function createUser(user, callback){
//         return User.save(user,
//           function(data) {
//             $cookies.pul('token', data.token);
//             currentUser = User.get();
//             return safeCb(callback)(null, user);
//           },
//           function(err) {
//             Auth.logout();
//             return safeCb(callback)(err);
//           }).$promise;
//       },
//
//       changePassword: function changePassword(oldPassword, newPassword, callback) {
//         return User.changePassword({ id: currentUser.id }, {
//           oldPassword: oldPassword,
//           newPassword: newPassword
//         }, function() {
//           return safeCb(callback)(null);
//         }, function(err) {
//           return safeCb(callback)(err);
//         }).$promise;
//       },
//
//       getCurrentUser: function getCurrentUser(callback) {
//         if (arguments.length === 0){
//           return currentUser;
//         }
//
//         var value = (currentUser.hasOwnProperty('$promise')) ?
//           currentUser.$promise : currentUser;
//         return $q.when(value)
//           .then(function(user) {
//             safeCb(callback)(user);
//             return user;
//           }, function() {
//             safeCb(callback)({});
//             return {};
//           })
//       },
//
//       isLoggedIn: function isLoggedIn(callback) {
//         if (arguments.length === 0){
//           return currentUser.hasOwnProperty('role');
//         }
//
//         return Auth.getCurrentUser(null)
//           .then(function(user) {
//             var is = user.hasOwnProperty('role');
//             safeCb(callback)(is);
//             return is;
//           })
//       },
//
//       hasRole: function hasRole(role, callback) {
//         var hasRole = function(r, h) {
//           return userRoles.indexOf(r) >= userRoles.indexOf(h);
//         }
//
//         if (arguments.length < 2) {
//           return hasRole(currentUser.role, role);
//         }
//
//         return Auth.getCurrentUser(null)
//           .then(function(user) {
//             var has = (user.hasOwnProperty('role')) ?
//               hasRole(user.role, role) : false;
//             safeCb(callback)(has);
//             return has;
//           })
//       },
//
//       isAdmin: function isAdmin() {
//         return Auth.hasRole
//           .apply(Auth, [].concat.apply(['admin'], arguments));
//       },
//
//       getToken: function getToken(){
//         return $cookies.get('token');
//       }
//     };
//
//     return autherino;
//   }
// })();
