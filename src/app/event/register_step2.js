(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventRegisterStep2Controller',eventRegisterStep2Controller);

    eventRegisterStep2Controller.$inject = ['$scope','common','eventservice','dropzoneservice','commonservice','transactionservice'];

    function eventRegisterStep2Controller($scope,common,eventservice,dropzoneservice,commonservice,transactionservice) {       
        console.log('Register controller has been called');

        //METHODS
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.getCustomerByID = getCustomerByID;
        $scope.getStates = getStates;
        $scope.setCustomer = setCustomer;
        $scope.processPayment = processPayment;
        $scope.updateCustomerToEvent = updateCustomerToEvent;
        $scope.requestPayment = requestPayment;
        $scope.savePayment = savePayment;

        //VARIABLES
        $scope.common = common;
        $scope.states = [];
        $scope.disciplines = [];
        $scope.cardtypes = [{id: 1,name:'Visa'},{id:2,name:'Mastercard'},{id:3,name:'Discover'}];
        $scope.eventid = common.$routeParams.eventid;
        $scope.customerid = common.$routeParams.customerid;
        $scope.event = {details:[], contractors:[], customers:[]};
        $scope.eventsImagePath = '/assets/images/events/';
        
        $scope.customer = {
             id: common.$routeParams.customerid
            ,eventid: ''
            ,firstname: ''
            ,lastname: ''
            ,emailaddress: ''
            ,phonenumber: ''
            ,address: ''
            ,address2: ''
            ,city: ''
            ,stateid: ''
            ,zipcode: ''
            ,jumpslogged: ''
            ,uspalicense: ''
            ,primarydisciplineid: ''
            ,homedropzoneid: ''
            ,homedropzonename: ''
            ,homedropzone: {id:'',name:' '}
            ,paymentreceived: 0
            ,type: 1
        }

        $scope.billing = {
             address1: ''
            ,address2: ''
            ,city: ''
            ,state: ''
            ,zipcode: ''
            ,cardtype: ''
            ,cardnumber: ''
            ,cardholderfname: ''
            ,cardholderlname: ''
            ,amount: ''
            ,currency: 'USD'
            ,cardexpiration: ''
            ,cardseccode: ''
        }

        $scope.payment = {
             event_customer_id: ''
            ,pp_id: ''
            ,pp_state: ''
            ,pp_card_type: ''
            ,pp_card_fname: ''
            ,pp_card_lname: ''
            ,pp_card_expire_month: ''
            ,pp_card_expire_year: ''
            ,pp_card_number: ''
        }
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getCustomerByID($scope.customerid);
            $scope.getStates();
        }

         //Get States
        function getStates(){
            commonservice.getStates().then(
                function(results){
                    $scope.states = results;
                }    
            );            
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

        //Get Customer by ID
        function getCustomerByID(){
            var params = {id: $scope.customerid}
            eventservice.getCustomerByID(params).then(
                function(results){
                    //Set Custom Object
                    $scope.setCustomer(results[0]);

                    //Get Event Details
                    $scope.eventid = results[0].EVENTID;
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
                ,address: customer.ADDRESS
                ,address2: customer.ADDRESS2
                ,city: customer.CITY
                ,stateid: customer.STATEID
                ,zipcode: customer.ZIPCODE
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
        function updateCustomerToEvent(){
            var params = $scope.customer;

            //Save Customer to Event
            eventservice.updateCustomerToEvent(params).then(
                function(results){
                    if(results[0].ID > 0){
                        common.routeTo('/events/register/step2/'+results[0].EVENTID+'/'+results[0].ID);
                    }else{
                        common.logger.error('There was an error trying to save your information. Please try again.','','Registration Error');    
                    }
                },function(error){
                    common.logger.error('There was an error and we were unable to register you for this event. Please try again or contact us directly via our contact page.','','Registration Error');
                }    
            );            
        }

        function requestPayment(){
            var params = {
                 card_type: $scope.billing.cardtype
                ,card_number: $scope.billing.cardnumber
                ,card_exp_month: $scope.billing.cardexpiration.substring(0,2)
                ,card_exp_year: $scope.billing.cardexpiration.substring(2,6)
                ,card_firstname: $scope.billing.cardholderfname
                ,card_lastname: $scope.billing.cardholderlname
                ,amount: $scope.billing.amount
                ,description: $scope.event.details.TITLE
            }

            transactionservice.paymentrequest(params).then(
                function(results){
                    var cc = results.payer.funding_instruments[0].credit_card;
                    if(results.state == "approved"){
                        //Set Payment Object
                        $scope.payment = {
                             event_customer_id: $scope.customer.id
                            ,pp_id: results.id
                            ,pp_state: results.state
                            ,pp_card_type: cc.type
                            ,pp_card_fname: cc.first_name
                            ,pp_card_lname: cc.last_name
                            ,pp_card_expire_month: cc.expire_month
                            ,pp_card_expire_year: cc.expire_year
                            ,pp_card_number: cc.number
                        }

                        //Save Payment
                        $scope.savePayment();
                    }else{
                        common.logger.error('We could not process your payment. Please double check your payment information and try again.','','Payment Failed');
                    }
                },function(error){
                    common.logger.error('We could not process your payment. Please double check your payment information and try again.','','Payment Failed');
                }   
            );
        }

        //Inserts a record of the payment receipt
        function savePayment(params){
             eventservice.addCustomerPayment(params).then(
                function(results){
                    common.logger.success('You PAID!!!!');
                } 
            );
        }

        //Save Registration and Proceed to Payment
        function processPayment(){
            //Update Customer Address
            $scope.customer.address = $scope.billing.address1;
            $scope.customer.address2 = $scope.billing.address2;
            $scope.customer.city = $scope.billing.city;
            $scope.customer.stateid = $scope.billing.state;
            $scope.customer.zipcode = $scope.billing.zipcode;

            //Update Billing
            $scope.billing.amount = $scope.event.details.REGISTRATIONFEE;

            //Request Payment
            $scope.requestPayment();
        }

    };

})();