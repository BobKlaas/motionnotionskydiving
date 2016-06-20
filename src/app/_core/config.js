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
            '400': '#1c3c8b',
            '500': '#183376',
            '600': '#142a61',
            '700': '#2E3532',
            '800': '#0b1836',
            '900': '#070e21',
            'A100': '#4c75db',
            'A200': '#6286df',
            'A400': '#7796e3',
            'A700': '#02050c',
            'contrastDefaultColor': 'light'
        });

    $mdThemingProvider.theme('default').primaryPalette('MotionNotionPalette')
    });

    // TODO: look up how to use .value .constant .config etc.

})();
