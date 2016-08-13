(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventTeamController',eventTeamController);

    eventTeamController.$inject = ['$scope','common','eventservice'];

    function eventTeamController($scope,common,eventservice){       
        //METHODS
        $scope.common = common;
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.saveEvent = saveEvent;
        
        //VARIABLES        
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.etitle = 'Add Team';
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[]};   
        
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
                    console.log($scope.event);
                }    
            );            
        }

        //Save Event
        function saveEvent(){

        }


    };

})();
