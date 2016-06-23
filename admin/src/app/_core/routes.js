(function(){

    'use strict';

    angular
        .module('app.core')
        .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'src/app/home/home.html',
                    controller: 'homeController'
                })
                .when('/login', {
                    templateUrl: 'src/app/login/login.html',
                    controller: 'loginController'
                })
                .otherwise({redirectTo:'/'});

                $locationProvider.html5Mode(true);
        }]);

        //Set Page Title based on route value
        angular.module('app').run(['$location', '$rootScope', function($location, $rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous){
                if (current.hasOwnProperty('$$route')){
                    $rootScope.pagetitle = current.$$route.title;

                }
                if(previous == undefined){
                    $rootScope.initAppLoad = true;
                }else{
                    $rootScope.initAppLoad = false;
                }
            });
        }]);
})();
