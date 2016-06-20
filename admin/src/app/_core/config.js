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


})();
