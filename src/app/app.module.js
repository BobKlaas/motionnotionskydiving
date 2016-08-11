
(function(){

    'use strict';

    //Create Module
    var app = angular.module('app',['app.core','app.home','app.coach','app.event','app.media']);
        app.controller('appController',appController);
        
    appController.$inject = ['$scope','$log','common','logger','$location'];

        app.run(function(ngMeta){
            ngMeta.init();
        });


        function appController($scope,$log,common,logger,$location){
            $scope.common = common;
            $scope.navCollapsed = 1;
            $scope.currentPath = _hostName + $location.path();
            $scope.host = _hostName;
            $scope.adminID = ((_AdminID == '')?undefined:_AdminID);
        }

        //Header Custom Directive
        app.directive("customheader",function(){
            return{
                 restrict: 'E'
                ,templateUrl: '/src/app/partials/header.html'
            };
        });

         //Header Custom Directive
        app.directive("cancellationpolicy",function(){
            return{
                 restrict: 'E'
                ,templateUrl: '/src/app/partials/cancellationpolicy.html'
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
