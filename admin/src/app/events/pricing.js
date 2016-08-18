(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventPricingController',eventPricingController);

    eventPricingController.$inject = ['$scope','common','$filter','eventservice'];

    function eventPricingController($scope,common,$filter,eventservice){       
        //METHODS
        $scope.common = common;
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.getCosts = getCosts;
        $scope.savePricing = savePricing;
        $scope.getSuggestedPrice = getSuggestedPrice;

        //VARIABLES
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.peopleImagePath = '/assets/images/people/';
        $scope.etitle = 'Expenses and Pricing';
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[], ticketcosts:[], contractorcosts:[]};
        $scope.marginpercentage = 20;
        $scope.registrationprice = 0;

        //Init Function
        $scope.init();
        function init(){
            $scope.getEventByID();
            $scope.getCosts();
            console.log($scope.event);
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

        //Get Contractor Costs
        function getCosts(){
            var params = {id: $scope.eventid}
            eventservice.getEventCosts(params).then(
                function(results){
                    $scope.event.ticketcosts = results.TICKETRATES;
                    $scope.event.contractorcosts = results.DAYRATES;
                }    
            );
        }

        //Get Suggested Registration
        function getSuggestedPrice(){
            var suggested = 0;
            var addmargin = 0;

            //Add Ticket Costs
            for(var i=0; i < $scope.event.ticketcosts.length; i++){
                var suggested = suggested + $scope.event.ticketcosts[i].TOTALCOST;
            }

            //Add Contractor Dayrate Costs
            for(var j=0; j < $scope.event.contractorcosts.length; j++){
                var suggested = suggested + $scope.event.contractorcosts[j].TOTALCOST;
            }

            if($scope.marginpercentage){
                addmargin = suggested * ($scope.marginpercentage / 100);
                suggested = suggested + addmargin;
            }
            $scope.registrationprice = suggested;
            
            return suggested;
        }

        //Save Event Pricing
        function savePricing(){
            console.log();
        }

    };

})();
