(function(){

    'use strict';

    var core = angular.module('app.core');

    var config = {
         appTitle: 'Motion Notion'
        ,version: '1'
    };

    core.value('config', config);

    // core.config(function($mdThemingProvider){
    //     $mdThemingProvider.definePalette('MotionNotionPalette', {
    //         '50': '#FFFFFF',
    //         '100': '#C5CAE9',
    //         '200': '#254eb6',
    //         '300': '#2145a0',
    //         '400': '#4BB0B7',
    //         '500': '#4BB0B7',
    //         '600': '#4BB0B7',
    //         '700': '#4BB0B7',
    //         '800': '#4BB0B7',
    //         '900': '#4BB0B7',
    //         'A100': '#4c75db',
    //         'A200': '#6286df',
    //         'A400': '#7796e3',
    //         'A700': '#02050c',
    //         'contrastDefaultColor': 'light'
    //     });
    //$mdThemingProvider.theme('default').primaryPalette('MotionNotionPalette')
    //});

    core.config(function($mdThemingProvider){
    var customPrimary = {
        '50': '#78ccc8',
        '100': '#66c5c1',
        '200': '#53beb9',
        '300': '#44b4af',
        '400': '#3da19d',
        '500': '#368F8B',
        '600': '#2f7c79',
        '700': '#286a67',
        '800': '#215755',
        '900': '#1a4543',
        'A100': '#8bd3d0',
        'A200': '#9ddad7',
        'A400': '#b0e1df',
        'A700': '#133231',
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
        '50': '#F3DFC1',
        '100': '#F3DFC1',
        '200': '#F3DFC1',
        '300': '#fbf5ec',
        '400': '#f7ead6',
        '500': '#F3DFC1',
        '600': '#efd4ac',
        '700': '#ebc996',
        '800': '#e7be81',
        '900': '#e2b36c',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#dea856'
    };
    $mdThemingProvider.definePalette('customBackground',customBackground);

    $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       //.warnPalette('customWarn')
       .backgroundPalette('customBackground')
    })
    
    
    //UI-Mask Configs
    core.config(['uiMask.ConfigProvider', function(uiMaskConfigProvider){
        uiMaskConfigProvider.addDefaultPlaceholder(false);
    }]);


    // TODO: look up how to use .value .constant .config etc.

})();
