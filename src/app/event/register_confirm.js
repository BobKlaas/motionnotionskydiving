(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventRegisterConfirmController',eventRegisterConfirmController);

    eventRegisterConfirmController.$inject = ['$scope','common','eventservice'];

    function eventRegisterConfirmController($scope,common,eventservice) {       
        console.log('Event view controller has been called');

        //METHODS
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.buildSlotsString = buildSlotsString;
        $scope.loadCustomer = loadCustomer;
        $scope.setCustomer = setCustomer;
        
        //VARIABLES
        $scope.common = common;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.peopleImagePath = '/assets/images/people/';
        $scope.customerid = common.$routeParams.customerid;
        $scope.event = {details:[], contractors:[], customers:[]};
        
        $scope.customer = {
             id: common.$routeParams.customerid
            ,eventid: ''
            ,firstname: ''
            ,lastname: ''
            ,emailaddress: ''
            ,phonenumber: ''
            ,jumpslogged: ''
            ,uspalicense: ''
            ,primarydisciplineid: ''
            ,homedropzoneid: ''
            ,homedropzonename: ''
            ,homedropzone: {id:'',name:' '}
            ,paymentreceived: 0
            ,type: 1
        }

        //Init Function
        $scope.init();
        function init(){
            $scope.loadCustomer(common.$routeParams.customerid);
        }

        //Load Existing Customer
        function loadCustomer(){
            var params = {id: common.$routeParams.customerid};
            eventservice.getCustomerByID(params).then(
                function(results){
                    $scope.setCustomer(results[0]);
                    $scope.getEventByID();
                }    
            );     
        }

        //Setter for Customer Object
        function setCustomer(customer){
            $scope.customer = {
                 id: customer.ID
                ,eventid: customer.EVENTID
                ,firstname: customer.FIRSTNAME
                ,lastname: customer.LASTNAME
                ,emailaddress: customer.EMAILADDRESS
                ,phonenumber: customer.PHONENUMBER
                ,jumpslogged: customer.JUMPSLOGGED
                ,uspalicense: customer.USPALICENSE
                ,primarydisciplineid: customer.PRIMARYDISCIPLINEID
                ,homedropzoneid: customer.HOMEDROPZONEID
                ,homedropzonename: customer.HOMEDROPZONENAME
                ,homedropzone: {id:customer.HOMEDROPZONEID,name:customer.HOMEDROPZONE}
                ,paymentreceived: customer.PAYMENTRECEIVED
                ,type: customer.TYPE
            }
        }

        //Get Coach by ID
        function getEventByID(){
            var params = {id: $scope.customer.eventid}
            eventservice.getEventByID(params).then(
                function(results){
                    $scope.event.details = results.DETAILS[0];
                    $scope.event.contractors = results.CONTRACTORS;
                    $scope.event.customers = results.CUSTOMERS;
                    console.log(results);
                }    
            );            
        }

        //Build Slots String
        function buildSlotsString(slotsleft,slots){
            var string = '';

            if(slotsleft < 1){
                string = 'CAMP FULL'
            }else{
                string = 'Slots: '+slotsleft+' of '+slots+' available';
            }
            return string;
        }

    };

})();
