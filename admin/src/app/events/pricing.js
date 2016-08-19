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
        $scope.getPricing = getPricing;
        $scope.savePricing = savePricing;
        $scope.calculatePricing = calculatePricing;

        //VARIABLES
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.peopleImagePath = '/assets/images/people/';
        $scope.etitle = 'Expenses and Pricing';
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[], ticketcosts:[], contractorcosts:[]};

        $scope.pricing = {
             marginpercentage: 20
            ,totalexpenses: 0
            ,marginamount: 0
            ,subtotal: 0
            ,suggestedregistrationfee: 0
            ,actualregistrationfee: 0
        }
        

        //Init Function
        $scope.init();
        function init(){
            $scope.getEventByID();
            $scope.getPricing();
        }

        //Get Event by ID
        function getEventByID(){
            var params = {id: $scope.eventid}
            eventservice.getEventByID(params).then(
                function(results){
                    $scope.event.details = results.DETAILS[0];
                    $scope.event.contractors = results.CONTRACTORS;
                    $scope.event.customers = results.CUSTOMERS;
                    $scope.calculatePricing();
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
                    $scope.calculatePricing();
                }    
            );
        }

        //Get Total Expenses
        function calculatePricing(){
            var slots = $scope.event.details.SLOTS;
            var marginperc = ($scope.pricing.marginpercentage==null)?0:$scope.pricing.marginpercentage;                

            var newpricing = {
                 marginpercentage: marginperc
                ,totalexpenses: 0
                ,marginamount: 0
                ,subtotal: 0
                ,suggestedregistrationfee: 0
                ,actualregistrationfee: 0
            }            

            //CALCULATE: TOTAL EXPENSES_______________________________________>
            //Add Ticket Costs
            for(var i=0; i < $scope.event.ticketcosts.length; i++){
                newpricing.totalexpenses = newpricing.totalexpenses + $scope.event.ticketcosts[i].TOTALCOST;
            }

            //Add Contractor Dayrate Costs
            for(var j=0; j < $scope.event.contractorcosts.length; j++){
                newpricing.totalexpenses = newpricing.totalexpenses + $scope.event.contractorcosts[j].TOTALCOST;
            }

            //CALCULATE: MARGIN____________________________>
            newpricing.marginamount = (newpricing.totalexpenses * (newpricing.marginpercentage / 100));

            //CALCULATE: SUBTOTAL____________________________>
            newpricing.subtotal = Math.ceil((newpricing.totalexpenses + newpricing.marginamount));            

            //CALCULATE: SUGGESTED REGISTRATION AMOOUNT____________________________>
            newpricing.suggestedregistrationfee = Math.ceil(((newpricing.totalexpenses + newpricing.marginamount) / slots));

            //Force Actual Registration to Suggested Registration
            newpricing.actualregistrationfee = newpricing.suggestedregistrationfee;

            //Set New Pricing
            $scope.pricing = newpricing;
        }

        //Save Event Pricing
        function savePricing(){
            //Set Params
                var params = {
                    marginpercentage: 0
                    registrationfee: 0
                }
                
                //Save Event
                eventservice.updateEventPricing(params).then(
                    function(results){
                        //Show Success
                        common.logger.success('Success','','Pricing was saved successfully for the '+results[0].TITLE+ ' event.');

                        //Navigate to Step 2
                        common.routeTo('/events');
                    }    
                );
        }

    };

})();
