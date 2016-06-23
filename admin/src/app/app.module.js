(function(){

    'use strict';

    //Create Module
    var app = angular.module('app',['app.core','app.home','app.login']);
        app.controller('appController',appController);
        
    appController.$inject = ['$scope','$log','common','logger'];
       

    function appController($scope,$log,common,logger){
        $scope.common = common;
        
    }

    //Header Custom Directive
    app.directive("customheader",function(){
        return{
             restrict: 'E'
            ,templateUrl: '/src/app/partials/header.html'
        };
    });

    //Footer Custom Directive
    app.directive("customfooter",function(){
        return{
             restrict: 'E'
            ,templateUrl: '/src/app/partials/footer.html'
        };
    });
    
})();
