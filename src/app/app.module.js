
(function(){

    'use strict';

    //Create Module
    var app = angular.module('app',['app.core','app.home','app.coach','app.event','app.media']);
        app.controller('appController',appController);
        
    appController.$inject = ['$scope','$log','common','logger'];

        app.run(function(ngMeta){
            ngMeta.init();
        });

        function appController($scope,$log,common,logger){
            $scope.common = common;
            $scope.navCollapsed = 1;
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

        //Custom Slideshow Directive
        app.directive("customslideshow",function(){
            return{
                 restrict: 'E'
                ,templateUrl: '/src/app/partials/slideshow.html'
            };
        });
})();