(function(){

    'use strict';

    angular
        .module('app.core')
        .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {

            $routeProvider
                .when('/contractors', {
                     templateUrl: 'src/app/contractors/contractors.html'
                    ,controller: 'contractorsController'
                })
                .when('/contractors/create/step1/', {
                     templateUrl: 'src/app/contractors/create_step1.html'
                    ,controller: 'contractorCreateStep1Controller'
                })
                .when('/contractors/edit/step1/:uniquename?', {
                     templateUrl: 'src/app/contractors/create_step1.html'
                    ,controller: 'contractorCreateStep1Controller'
                })
                .when('/contractors/edit/step2/:uniquename', {
                     templateUrl: 'src/app/contractors/create_step2.html'
                    ,controller: 'contractorCreateStep2Controller'
                })
                .when('/contractors/edit/step3/:uniquename', {
                     templateUrl: 'src/app/contractors/create_step3.html'
                    ,controller: 'contractorCreateStep3Controller'
                })
                .when('/events', {
                     templateUrl: 'src/app/events/list.html'
                    ,controller: 'eventListController'
                })
                .when('/events/registered/:eventid/', {
                     templateUrl: 'src/app/events/registered.html'
                    ,controller: 'eventRegisteredController'
                })
                .when('/events/create/', {
                     templateUrl: 'src/app/events/create.html'
                    ,controller: 'eventCreateController'
                })
                .when('/events/edit/:eventid/', {
                     templateUrl: 'src/app/events/create.html'
                    ,controller: 'eventCreateController'
                })
                .when('/events/team/:eventid/', {
                     templateUrl: 'src/app/events/addteam.html'
                    ,controller: 'eventTeamController'
                })
                .when('/events/pricing/:eventid/', {
                     templateUrl: 'src/app/events/pricing.html'
                    ,controller: 'eventPricingController'
                })
                .when('/events/overview/:eventid/', {
                     templateUrl: 'src/app/events/overview.html'
                    ,controller: 'eventOverviewController'
                })
                .when('/media/', {
                     templateUrl: 'src/app/media/browse.html'
                    ,controller: 'mediaBrowseController'
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
