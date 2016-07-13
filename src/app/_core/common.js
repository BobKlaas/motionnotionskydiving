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
            showslideshow       : showslideshow,
            formatDateRange     : formatDateRange,
            buildfilepath       : buildfilepath,
            getSocialUrls       : getSocialUrls,
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

        //Route to Path
        function routeTo(path,params){
            if(params !== undefined){
                $location.path(path).search(params);
            }else{
                $location.path(path);
            }
        };

        //Show Slideshow on Homepage Only
        function showslideshow(){
            if($location.$$url == '' || $location.$$url == '/')
                return 1;
            else
                return 0;
        };

        //Format Date: Month DD to DD YYYY
        function formatDateRange(startdate,enddate){
            var sdate = Date.parse(startdate);
            var edate = Date.parse(enddate);
            var fdate = $filter('date')(sdate,'LLLL dd');
            fdate = fdate + ' to '+ $filter('date')(edate,'dd yyyy');

            return fdate;
        }

        //Build Path
        function buildfilepath(path,filename){
            return path+filename;
        }

        //Returns Social URL's
        function getSocialUrls(){
            var socialurls = {
                 facebook:_FacebookURL
                ,google:_GoogleURL
                ,youtube:_YouTubeURL
                ,instagram:_InstagramURL
            }
            return socialurls;
        }

    };

})();
