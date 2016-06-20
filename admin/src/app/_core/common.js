(function(){

    'use strict';

    angular
        .module('app.core')
        .factory('common', common);

    common.$inject = ['$filter','$log','$http','$q','$location','$mdSidenav', '$mdDialog','$routeParams','utility','logger','deviceDetector'];

    function common($filter,$log,$http,$q,$location,$mdSidenav,$mdDialog,$routeParams,utility,logger,deviceDetector) {

        $log.log('App.Core Common has loaded.');

        var factory = {
            navigateToLink      : navigateToLink,
            routeTo             : routeTo,
            $log                : $log,
            $http               : $http,
            $q                  : $q,
            $location           : $location,
            $mdSidenav          : $mdSidenav,
            $mdDialog           : $mdDialog,
            $routeParams        : $routeParams,
            // Global Utility Functions
            utility                : utility,
            // 3rd-Party Logger
            logger              : logger,
            deviceDetector      : deviceDetector
        }

        return factory;

        //Link Navigation Function
        function navigateToLink(link,_blank){
            if(_blank !== undefined){
                window.open(link);
            }else{
                window.location.href = link;
            }
        };

        function routeTo(path,params){
            if(params !== undefined){
                $location.path(path).search(params);
            }else{
                $location.path(path);
            }
        };

    };

})();
