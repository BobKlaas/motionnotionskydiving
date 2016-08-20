(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventOverviewController',eventOverviewController);

    eventOverviewController.$inject = ['$scope','common','eventservice','contractorservice'];

    function eventOverviewController($scope,common,eventservice,contractorservice){       
        console.log('Event list controller has been called');

        //METHODS
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.getPricing = getPricing;
        
        //VARIABLES
        $scope.common = common;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.peopleImagePath = '/assets/images/people/';
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[], pricing: []};
        $scope.searchtext;
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getEventByID();
            $scope.getPricing();
        }

        //Get Event By ID
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

        //Get Contractor Costs
        function getPricing(){
            var params = {id: $scope.eventid}
            eventservice.getEventPricing(params).then(
                function(results){
                    $scope.event.ticketcosts = results.TICKETRATES;
                    $scope.event.contractorcosts = results.DAYRATES;
                    $scope.event.pricing = results.PRICING[0];
                    console.log(results);
                }    
            );
        }


    };

})();
