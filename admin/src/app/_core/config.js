(function(){

    'use strict';

    var core = angular.module('app.core');

    var config = {
        appTitle: 'Motion Notion Admin',
        appid: 'admin',
        appmoduleidnumber:1,
        version: '1.0'
    };

    core.value('appconfig', config);

  core.config(function($mdThemingProvider){
    var customPrimary = {
        '50': '#66c5c1',
        '100': '#53beba',
        '200': '#44b3af',
        '300': '#3da19d',
        '400': '#368e8b',
        '500': '#2F7C79',
        '600': '#286967',
        '700': '#215755',
        '800': '#1a4443',
        '900': '#133231',
        'A100': '#78ccc9',
        'A200': '#8bd3d0',
        'A400': '#9ddad8',
        'A700': '#0c201f',
        'contrastDefaultColor': 'light'
    };
    $mdThemingProvider.definePalette('customPrimary',customPrimary);

    var customAccent = {
        '50': '#4d163c',
        '100': '#611c4b',
        '200': '#75215a',
        '300': '#88276a',
        '400': '#9c2d79',
        '500': '#b03289',
        '600': '#cb4aa3',
        '700': '#d15ead',
        '800': '#d772b7',
        '900': '#dc86c1',
        'A100': '#cb4aa3',
        'A200': '#C43898',
        'A400': '#b03289',
        'A700': '#e299cb',
        'contrastDefaultColor': 'light'
    };
    $mdThemingProvider.definePalette('customAccent',customAccent);

    var customWarn = {
        '50': '#fee3cd',
        '100': '#fed6b4',
        '200': '#fdc89b',
        '300': '#fdba82',
        '400': '#fcac69',
        '500': '#FC9E50',
        '600': '#fc9037',
        '700': '#fb821e',
        '800': '#fb7405',
        '900': '#e26904',
        'A100': '#fff1e6',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#c95d03'
    };
    $mdThemingProvider.definePalette('customWarn',customWarn);

    var customBackground = {
        '50': '#e2d2c6',
        '100': '#efe4dc',
        '200': '#efe4dc',
        '300': '#c8aa93',
        '400': '#c09d82',
        '500': '#b79071',
        '600': '#ae8360',
        '700': '#a37652',
        '800': '#926a4a',
        '900': '#815d41',
        'A100': '#FFFFFF',
        'A200': '#efe4dc',
        'A400': '#fcfaf8',
        'A700': '#705139'
    };
    $mdThemingProvider.definePalette('customBackground',customBackground);

    $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       //.warnPalette('customWarn')
       //.backgroundPalette('customBackground')
    })
    

})();
