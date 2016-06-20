(function(){

    'use strict';

    angular
        .module('app.core')
        .config(['$routeProvider','$locationProvider','ngMetaProvider',function($routeProvider,$locationProvider,ngMetaProvider){

            $routeProvider
                .when('/', {
                     templateUrl: 'src/app/home/home.html'
                    ,controller: 'homeController'
                    ,meta: {
                         title: "Home"
                        ,description: "Page Description"
                        ,url: "http://www.motionnotionskydiving.com/"
                    }
                })
                .when('/about', {
                     templateUrl: 'src/app/home/about.html'
                    ,controller: 'aboutController'
                    ,meta: {
                         title: "About Page Title"
                        ,description: "About Page Description"
                        ,url: "http://www.motionnotionskydiving.com/about"
                    }
                })
                .when('/login', {
                     templateUrl: 'src/app/login/login.html'
                    ,controller: 'loginController'
                    ,meta: {
                         title: "Login Page Title"
                        ,description: "Login Page Description"
                        ,url: "http://www.motionnotionskydiving.com/login"
                    }
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
