(function(){

    'use strict';

    angular
        .module('app', [
            // Core
            'app.core',

            // Features
            'app.login'
        ])
        .controller('appController',appController);

        appController.$inject = ['$scope','$log','common','logger'];

        function appController($scope,$log,common,logger){
            $scope.common = common;
            
        }
})();
