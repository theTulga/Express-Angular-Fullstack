(function() {
  'use strict'
  angular
      .module('csport')
      .filter('limitHtml', function() {
        return function(text, limit) {

            var changedString = String(text).replace(/<[^>]+>/gm, '');

            return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
        }
      })
      .filter('timeFilter', function() {
        return function(millseconds) {
          var seconds = Math.floor(millseconds / 1000);
          var days = Math.floor(seconds / 86400);
          var hours = Math.floor((seconds % 86400) / 3600);
          var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
          var timeString = '';
          if(days > 0) timeString += (days > 1) ? (days + "d ") : (days + "d ");
          if(hours > 0) timeString += (hours > 1) ? (hours + "h ") : (hours + "h ");
          if(days < 1 && minutes >= 0) timeString += (minutes > 1) ? (minutes + "m ") : (minutes + "m ");
          return timeString;
      }
      });
})();
