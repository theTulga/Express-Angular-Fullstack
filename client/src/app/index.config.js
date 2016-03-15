(function() {
  'use strict';

  angular
    .module('webProject')
    .config(configuration)

  /** @ngInject */
  function configuration($logProvider, redactorOptions, config) {

    redactorOptions.imageUpload = config.dev.host + config.dev.port + '/image';
    redactorOptions.imageResizeable = true;
    redactorOptions.imageLink = false;
    redactorOptions.imageEditable = false;
    redactorOptions.visual = true;
    // redactorOptions.lang = 'mn';

    redactorOptions.buttons =   ['formatting', 'bold', 'italic', 'deleted',
        'unorderedlist', 'orderedlist', 'outdent', 'indent',
         'image', 'video', 'file','table', 'link', 'alignment', 'horizontalrule']
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
