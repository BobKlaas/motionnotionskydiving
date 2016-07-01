(function(){

    'use strict';

    angular
        .module('Utilities', [])
        .factory('utility', utilities)
        .factory('HttpService',HttpService)
        .directive('httpProgress',httpProgress);

        utilities.$inject = ['$log','$filter','HttpService'];

        function utilities($log,$filter,HttpService) {

            $log.log('Js Utilities has loaded.');

            var factory = {
                routeParams     : routeParams,
                odbcToNGDate    : odbcToNGDate,
                HttpService     : HttpService
            }

            return factory;

            // returns url route friendly string: /:wbs1/:wbs2?/:wbs3? 
            function routeParams(wbs1,wbs2,wbs3){
                var wbs1 = wbs1 || ''; // equivalent to sql coalesce
                var wbs2 = wbs2 || '';
                var wbs3 = wbs3 || '';
                wbs1 = wbs1.toString();
                wbs2 = wbs2.toString();
                wbs3 = wbs3.toString();
                var route = "";
                if( wbs1.length > 0 && wbs1.length < 15 ){
                    route = wbs1;
                    if( wbs2.length > 0 && wbs2.length < 6 ){
                        route += "/" + wbs2;
                        if( wbs3.length > 0 && wbs3.length < 6){
                            route += "/" + wbs3;
                        }
                    }
                    return route;
                }
                return "INVALIDWBS1";
            };

            // convert sql odbc datetime to angular date
            function odbcToNGDate(odbcdate,format){
                var format = format || 'longDate'; // 'shortDate'
                var date = new Date(odbcdate);
                return $filter('date')(date,format);
            }
        };

        HttpService.$inject = ['$http','$q','$log','logger'];

        function HttpService($http,$q,$log,logger){

            var factory = {
                sendRequest: sendRequest
            };
            return factory;

            //Send HTTP Request
            function sendRequest(url,params,method,useSecure){
                if(method == undefined)
                    method="GET";
                else
                    method="POST";
                
                var host = _hostName;
                if(useSecure == undefined)
                    host = _hostName;
                else
                    host = _secureHostName;

                var request = $http({
                     method: method,
                     url: host + url,
                     data: params
                 });
                return(request.then(handleSuccess,handleError));
            };

            //Error Handler
            function handleError(response){
                if(!angular.isObject( response.data ) || ! response.data.message){
                    return($q.reject("An unknown error occurred."));
                }
                logger.error(response.data.message, {}, 'Request Error', {timeOut: 10000,positionClass:'toast-bottom-right'});
                return($q.reject(response.data.message));
            }

            //Success Handler
            function handleSuccess(response){
                return response.data;
            }
        }

        function httpProgress(){
            return {
                restrict: 'E',
                controller: httpProgressController,
                templateUrl: '/assets/js/Utilities/http-progress.html'
            };
        }

        function httpProgressController($scope){
            
        }

})();
