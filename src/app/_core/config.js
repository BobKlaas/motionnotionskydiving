(function(){

    'use strict';

    var core = angular.module('app.core');

    var config = {
         appTitle: 'Motion Notion'
        ,version: '1'
    };

    core.value('config', config);

    core.config(function($mdThemingProvider){
        $mdThemingProvider.definePalette('MotionNotionPalette', {
            '50': '#FFFFFF',
            '100': '#C5CAE9',
            '200': '#254eb6',
            '300': '#2145a0',
            '400': '#4BB0B7',
            '500': '#4BB0B7',
            '600': '#4BB0B7',
            '700': '#4BB0B7',
            '800': '#4BB0B7',
            '900': '#4BB0B7',
            'A100': '#4c75db',
            'A200': '#6286df',
            'A400': '#7796e3',
            'A700': '#02050c',
            'contrastDefaultColor': 'light'
        });

    $mdThemingProvider.theme('default').primaryPalette('MotionNotionPalette')
    });


    //UI-Mask Configs
    core.config(['uiMask.ConfigProvider', function(uiMaskConfigProvider){
        uiMaskConfigProvider.addDefaultPlaceholder(false);
    }]);


    // TODO: look up how to use .value .constant .config etc.

})();
