(function() {
  'use strict';

  angular
    .module('webProject')
    .config(configuration)

  /** @ngInject */
  function configuration($logProvider, redactorOptions, NotificationProvider) {
    redactorOptions.imageResizeable = true;
    redactorOptions.imageLink = false;
    redactorOptions.imageEditable = false;
    redactorOptions.visual = true;
    // redactorOptions.lang = 'mn';
    redactorOptions.buttons =  ['formatting', 'bold', 'italic', 'deleted',
        'unorderedlist', 'orderedlist', 'outdent', 'indent',
         'image', 'video', 'file','table', 'link', 'alignment', 'horizontalrule']
    // redactorOptions.plugins = ['source']

    NotificationProvider.setOptions({
      delay: 3000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top'
    });



    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
