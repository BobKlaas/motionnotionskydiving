(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventEditController',eventEditController);

    eventEditController.$inject = ['$scope','common','eventservice'];

    function eventEditController($scope,common,eventservice){       
        //METHODS
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        
        //VARIABLES
        $scope.common = common;
        $scope.eventid = common.$routeParams.eventid;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.events = [];
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getEventByID();
        }

        //Get Event by ID
        function getEventByID(){
            var params = {id: $scope.eventid}
            eventservice.getEventByID(params).then(
                function(results){
                    $scope.event.details = results.DETAILS[0];
                    $scope.event.contractors = results.CONTRACTORS;
                    $scope.event.customers = results.CUSTOMERS;
                    console.log(results);
                }    
            );            
        }       

    };

})();
