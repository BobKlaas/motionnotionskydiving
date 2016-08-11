(function(){

    'use strict';


  //Create Module
    var app = angular.module('app.event');
        app.controller('eventRegisterStep2Controller',eventRegisterStep2Controller);
        app.controller('erProgressController',erProgressController);
        
    eventRegisterStep2Controller.$inject = ['$scope','common','eventservice','dropzoneservice','commonservice','transactionservice','notifyservice'];
    erProgressController.$inject = ['$scope','$interval'];
   

    //Controller: erProgressController    
    function erProgressController($scope,$interval){
        $scope.mode = 'query';
        $scope.determinateValue = 30;
        $interval(function() {
            $scope.determinateValue += 1;
            if($scope.determinateValue > 100) {
                $scope.determinateValue = 30;
            }
        },100,0,true);
    }

    //Controller: eventRegisterStep2Controller  
    function eventRegisterStep2Controller($scope,common,eventservice,dropzoneservice,commonservice,transactionservice,notifyservice){       
        console.log('Register controller has been called');

        //METHODS
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.getCustomerByID = getCustomerByID;
        $scope.getStates = getStates;
        $scope.setCustomer = setCustomer;
        $scope.processPayment = processPayment;
        $scope.requestPayment = requestPayment;
        $scope.savePayment = savePayment;
        $scope.toggleLoadingIndicator = toggleLoadingIndicator;
        $scope.sendRegistrationComplete = sendRegistrationComplete;

        //VARIABLES
        $scope.common = common;
        $scope.states = [];
        $scope.disciplines = [];
        $scope.teamemail = _TeamEmail;
        $scope.cardtypes = [{id: 1,name:'Visa'},{id:2,name:'Mastercard'},{id:3,name:'Discover'}];
        $scope.eventid = common.$routeParams.eventid;
        $scope.customerid = common.$routeParams.customerid;
        $scope.event = {details:[], contractors:[], customers:[]};
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.paymentfailed=0;
        $scope.submitbutton = {
             text: 'Submit Payment'
            ,disabled: 0
        }

        
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
            ,currency: ''
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

        //Request Payment from Paypal
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
                    if(results.state == "approved"){
                        var cc = results.payer.funding_instruments[0].credit_card;
                        var amount = results.transactions[0].amount.total;

                        //Set Payment Object
                        $scope.payment = {
                             event_customer_id: $scope.customer.id
                            ,pp_id: results.id
                            ,pp_state: results.state
                            ,pp_card_type: cc.type
                            ,pp_card_fname: cc.first_name
                            ,pp_card_lname: cc.last_name
                            ,pp_card_expire_month: ''
                            ,pp_card_expire_year: ''
                            ,pp_card_number: ''
                            ,amountpaid: amount
                            ,address: $scope.billing.address1
                            ,address2: $scope.billing.address2
                            ,city: $scope.billing.city
                            ,state: $scope.billing.state
                            ,zipcode: $scope.billing.zipcode
                        }

                        //Save Payment
                        $scope.savePayment($scope.payment);
                    }else{
                        //Set Payment Failed
                        $scope.paymentfailed=1;
                        $scope.toggleLoadingIndicator(0);
                        common.logger.error('We could not process your payment. Please double check your payment information and try again.','','Payment Failed');
                    }
                },function(error){
                    $scope.paymentfailed=1;
                    $scope.toggleLoadingIndicator(0);
                    common.logger.error('We could not process your payment. Please double check your payment information and try again.','','Payment Failed');
                }   
            );
        }

        //Inserts a record of the payment receipt
        function savePayment(params){
             transactionservice.addCustomerPayment(params).then(
                function(results){
                    //Send Registration Complete Email
                    $scope.sendRegistrationComplete();
                } 
            );
        }

        //Sends Registration Complete Email
        function sendRegistrationComplete(){
            var params = {customerid: $scope.customer.id};
            notifyservice.sendRegistrationComplete(params).then(
                function(){
                    //Turn loading indicator off
                    $scope.toggleLoadingIndicator(0);

                    //Email Sent
                    //common.logger.info('Email Sent');
                    common.routeTo('/events/register/confirmation/'+$scope.payment.event_customer_id);
                },function(error){
                    //Turn loading indicator off
                    $scope.toggleLoadingIndicator(0);
                    
                    //Route to confirmation page
                    common.routeTo('/events/register/confirmation/'+$scope.payment.event_customer_id);
                }  
            );
        }

        //Toggle loading indicator and submit button
        function toggleLoadingIndicator(flag){
            if(flag !== null && flag==1){
                $scope.submitbutton = {
                     text: 'Processing Payment...'
                    ,disabled: 1
                }
            }else{
                $scope.submitbutton = {
                     text: 'Submit Payment'
                    ,disabled: 0
                }
            }
        }

        //Save Registration and Proceed to Payment
        function processPayment(){
            //Show Loading Indicator
            $scope.toggleLoadingIndicator(1);

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
