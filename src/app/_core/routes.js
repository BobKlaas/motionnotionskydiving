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
                .when('/contact', {
                     templateUrl: 'src/app/home/contact.html'
                    ,controller: 'contactController'
                    ,meta: {
                         title: "Contact Us"
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
                        ,url: "http://www.motionnotionskydiving.com/about/"
                    }
                })
                .when('/coaches', {
                     templateUrl: 'src/app/coach/list.html'
                    ,controller: 'coachListController'
                    ,meta: {
                         title: "Coaches"
                        ,description: "Check out or list of experienced motion coaches."
                        ,url: "http://www.motionnotionskydiving.com/coaches/"
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
                 .when('/media', {
                     templateUrl: 'src/app/media/media.html'
                    ,controller: 'mediaController'
                    ,meta: {
                         title: "Media"
                        ,description: "Checkout out our training videos and epic video cuts from our recent skydiving events."
                        ,url: "http://www.motionnotionskydiving.com/media/"
                    }
                })
                .when('/events', {
                     templateUrl: 'src/app/event/list.html'
                    ,controller: 'eventListController'
                    ,meta: {
                         title: "Events"
                        ,description: "Check out or list of skydiving events."
                        ,url: "http://www.motionnotionskydiving.com/events/"
                    }
                })
                .when('/events/view/:eventid', {
                     templateUrl: 'src/app/event/view.html'
                    ,controller: 'eventViewController'
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
