(function(){

    'use strict';

    angular
        .module('app.core')
        .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {

            $routeProvider
                .when('/contractors', {
                    templateUrl: 'src/app/contractors/contractors.html',
                    controller: 'contractorsController'
                })
                .when('/events', {
                    templateUrl: 'src/app/events/list.html',
                    controller: 'eventListController'
                })
                .otherwise({redirectTo:'/events'});

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
