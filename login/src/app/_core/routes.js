(function(){

    'use strict';

    angular
        .module('app.core')
        .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'src/app/login/login.html',
                    controller: 'loginController'
                })
                .otherwise({redirectTo:'/'});

                $locationProvider.html5Mode(true);
        }]);

})();
