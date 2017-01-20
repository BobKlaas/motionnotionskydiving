(function(){

    'use strict';

    angular
        .module('app.core', [
            // Angular Modules
             'ngRoute'
            ,'ngCookies'
            ,'ngAnimate'
            ,'ngMessages'
            ,'ngMaterial'
            ,'ngSanitize'
            ,'ui.bootstrap'
            ,'angular.filter'
            ,'ui.mask'
            ,'youtube-embed'
            ,'vimeoEmbed'
      
            //Other 3rd-Party
            ,'Logger'
            ,'ng.deviceDetector'
            ,'angular-loading-bar'

            // Kendo
            //'kendo.directives',
     
            ,'Utilities'
        ]);

})();
