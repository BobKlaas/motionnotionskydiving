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
                .when('/next', {
                     templateUrl: 'src/app/home/home.html#myCarousel'
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
                .when('/coaches', {
                     templateUrl: 'src/app/coach/list.html'
                    ,controller: 'coachListController'
                    ,meta: {
                         title: "Coaches"
                        ,description: "Check out or list of experienced motion coaches."
                        ,url: "http://www.motionnotionskydiving.com/coaches"
                    }
                })
                .when('/coaches/view/:id', {
                     templateUrl: 'src/app/coach/view.html'
                    ,controller: 'coachViewController'
                    ,meta: {
                         title: "Coaches"
                        ,description: "Check out or list of experienced motion coaches."
                        ,url: "http://www.motionnotionskydiving.com/coaches"
                    }
                })
                .when('/events', {
                     templateUrl: 'src/app/event/list.html'
                    ,controller: 'eventListController'
                    ,meta: {
                         title: "Events"
                        ,description: "Check out or list of skydiving events."
                        ,url: "http://www.motionnotionskydiving.com/events"
                    }
                })
                .when('/events/view/:eventid', {
                     templateUrl: 'src/app/event/view.html'
                    ,controller: 'eventListController'
                    ,meta:{
                         title: ""
                        ,description: ""
                        ,url: ""
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
