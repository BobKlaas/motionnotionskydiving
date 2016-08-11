(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventRegisteredController',eventRegisteredController);

    eventRegisteredController.$inject = ['$scope','common','eventservice'];

    function eventRegisteredController($scope,common,eventservice){       
        //METHODS
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.getEventCustomers = getEventCustomers;
        
        //VARIABLES
        $scope.common = common;
        $scope.eventid = common.$routeParams.eventid;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.event = [];
        $scope.registered = [];
        $scope.reserve = [];

        
        //Init Function
        $scope.init();
        function init(){
            $scope.getEventByID();
            $scope.getEventCustomers();
        }

        //Get Event by ID
        function getEventByID(){
            var params = {id: $scope.eventid}
            eventservice.getEventByID(params).then(
                function(results){
                    $scope.event.details = results.DETAILS[0];
                    $scope.event.contractors = results.CONTRACTORS;
                    $scope.event.customers = results.CUSTOMERS;
                }    
            );            
        }

        //Get Registered List
        function getEventCustomers(){
            var params = {eventid: $scope.eventid}
            eventservice.getEventCustomers(params).then(
                function(results){
                    for(var i=0; i < results.length; i++){
                        if(results[i].TYPE == 1)
                            $scope.registered.push(results[i]);
                        else
                            $scope.reserve.push(results[i]);
                    }
                }    
            );       
        }


    };

})();
