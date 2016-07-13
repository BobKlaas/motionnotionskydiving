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
            ,'ngMeta'
            ,'vcRecaptcha'
            ,'ui.bootstrap'
            ,'angular.filter'
            ,'ui.mask'
      
            //Other 3rd-Party
            ,'Logger'
            ,'ng.deviceDetector'
            ,'angular-loading-bar'

            // Kendo
            //'kendo.directives',
     
            ,'Utilities'
        ]);

})();
