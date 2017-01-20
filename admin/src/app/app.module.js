(function(){

    'use strict';

    //Create Module
    var app = angular.module('app',['app.core','app.home','app.contractors','app.events','app.media']);
        app.controller('appController',appController);
        
    appController.$inject = ['$scope','$log','common','logger','$mdSidenav','$mdMedia'];
       

    function appController($scope,$log,common,logger,$mdSidenav,$mdMedia){
        $scope.common = common;
        $scope.toggleSidenavLeft = toggleSidenavLeft;
        
        //Open Sidenav
        function toggleSidenavLeft() {
          $mdSidenav('left').toggle();
        }        
    }

    //Header Custom Directive
    app.directive("customheader",function(){
        return{
             restrict: 'E'
            ,templateUrl: 'src/app/partials/header.html'
        };
    });

    //Footer Custom Directive
    app.directive("customfooter",function(){
        return{
             restrict: 'E'
            ,templateUrl: '/src/app/partials/footer.html'
        };
    });

    //Sidenav
    app.directive("customsidenav",function(){
        return{
             restrict: 'E'
            ,templateUrl: 'src/app/partials/sidenav.html'
        };
    });

    
})();
