(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventReserveListController',eventReserveListController);

    eventReserveListController.$inject = ['$scope','common','eventservice','dropzoneservice','commonservice'];

    function eventReserveListController($scope,common,eventservice,dropzoneservice,commonservice) {       
        console.log('Register controller has been called');

        //METHODS
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.proceedToPayment = proceedToPayment;
        $scope.getStates = getStates;
        $scope.getDisciplines = getDisciplines;
        $scope.dropzoneSearch = dropzoneSearch;
        $scope.setCustomer = setCustomer;
        $scope.addCustomerToEvent = addCustomerToEvent;
                
        //VARIABLES
        $scope.common = common;
        $scope.states = [];
        $scope.disciplines = [];
        $scope.uspaLicenses = [{id: 1, name: 'A'},{id: 2, name: 'B'},{id: 3, name: 'C'},{id: 3, name: 'D'}];
        $scope.customerid = common.$routeParams.customerid;
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[]};
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.regtitle = 'Reserve List Registration';
        $scope.action = 'reserve';
        $scope.btnSubmitTitle = 'SUBMIT';

        $scope.customer = {
             id: common.$routeParams.customerid
            ,eventid: common.$routeParams.eventid
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
            ,type: 2
        }
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getStates();
            $scope.getDisciplines();
            $scope.getEventByID($scope.eventid);   
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

        //Get States
        function getStates(){
            commonservice.getStates().then(
                function(results){
                    $scope.states = results;
                }    
            );            
        }

        //Get Disciplines
        function getDisciplines(){
            commonservice.getDisciplines().then(
                function(results){
                    $scope.disciplines = results;
                }    
            );            
        }

        //Get Dropzone by Name
        function dropzoneSearch(searchText){
            var dropzonenames = [];
            var params = {name: searchText};
            $scope.customer.homedropzonename = searchText;
            return dropzoneservice.getDropzoneByName(params).then(
                function(response){                    
                    angular.forEach(response, function(value, key) {
                        var dropzone = {};
                        dropzone.id = value['ID'];
                        dropzone.name = value['NAME'];
                        dropzonenames.push(dropzone);
                    },dropzonenames);
                    return dropzonenames;
                },
                function(error){
                    $log.log(error);
                    return [];
                }
            );
        };


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

        //Add Customer To Event
        function addCustomerToEvent(){
            var params = $scope.customer;
            
            //Save Customer to Event
            eventservice.addCustomerToEvent(params).then(
                function(results){
                    if(results[0].ID !== undefined){
                        common.routeTo('/events/register/confirmation/'+results[0].ID);
                    }else{
                        common.logger.error('There was an error trying to save your information. Please try again.','','Registration Error');    
                    }
                },function(error){
                    common.logger.error('There was an error and we were unable to register you on the reserve list. Please try again or contact us directly via our contact page.','','Registration Error');
                }    
            );            
        }

        //Save Registration and Proceed to Payment
        function proceedToPayment(){
            //Set Home Dropzone
            if($scope.customer.homedropzone !== null){
                $scope.customer.homedropzoneid = $scope.customer.homedropzone.id;
                $scope.customer.homedropzonename = $scope.customer.homedropzone.name;
            }

            //Add Customer to Reserve List
            $scope.addCustomerToEvent();
        }

    };

})();
