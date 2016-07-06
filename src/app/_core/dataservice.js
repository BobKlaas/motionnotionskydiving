(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('contractorservice',contractorservice)
        .factory('eventservice',eventservice)
        .factory('dropzoneservice',dropzoneservice)
        .factory('commonservice',commonservice)
        .factory('transactionservice',transactionservice);

  
    //********************************************************
    //LOGIN Service
    //********************************************************
    contractorservice.$inject = ['utility'];
    eventservice.$inject = ['utility'];
    dropzoneservice.$inject = ['utility'];
    commonservice.$inject = ['utility'];
    transactionservice.$inject = ['utility'];


    //CONTRACTOR Service___________________________________________________________________>
    function contractorservice(utility) {
        var service = {
             getContractors: getContractors
            ,getContractorByUniqueName: getContractorByUniqueName
        };
        return service;

        //Get All Active Contractors
        function getContractors(params){
            return utility.HttpService.sendRequest('/rest/api/contractors/get/');
        }

        //Get Contractors by ID
        function getContractorByUniqueName(params){
            return utility.HttpService.sendRequest('/rest/api/contractors/get/'+params.uniquename);
        }

    }

    //EVENTS Service___________________________________________________________________>
    function eventservice(utility) {
        var service = {
             getEvents: getEvents
            ,getEventByID: getEventByID
            ,addCustomerToEvent: addCustomerToEvent
            ,updateCustomerToEvent: updateCustomerToEvent
            ,getEventCustomers: getEventCustomers
            ,getCustomerByID: getCustomerByID
            ,addCustomerPayment: addCustomerPayment
        };
        return service;

        //Get All Events
        function getEvents(params){
            return utility.HttpService.sendRequest('/rest/api/events/get/');
        }
        
        //Get Event By ID
        function getEventByID(params){
            return utility.HttpService.sendRequest('/rest/api/events/get/'+params.id);
        }

        //Add Customer to Event
        function addCustomerToEvent(params){
            return utility.HttpService.sendRequest('/rest/api/events/customer/add/',params,'post');
        }

        //Update Customer to Event
        function updateCustomerToEvent(params){
            return utility.HttpService.sendRequest('/rest/api/events/customer/update/',params,'post');
        }

        //Get All Customers for an Event
        function getEventCustomers(params){
            return utility.HttpService.sendRequest('/rest/api/events/customers/get/');
        }

        //Add Customer by CustomerID
        function getCustomerByID(params){
            return utility.HttpService.sendRequest('/rest/api/events/customers/get/'+params.id);
        }

        //Add Customer Payment Record
        function addCustomerPayment(params){
            return utility.HttpService.sendRequest('/rest/api/events/customers/payment/add/',params,'post');
        }
    }
    

    //DROPZONE Service___________________________________________________________________>
    function dropzoneservice(utility) {
        var service = {
             getDropzones: getDropzones
            ,getDropzoneByName: getDropzoneByName
        };
        return service;

        //Get All Dropzones
        function getDropzones(params){
            return utility.HttpService.sendRequest('/rest/api/dropzones/get/');
        }

        //Get Dropzone by Name
        function getDropzoneByName(params){
            return utility.HttpService.sendRequest('/rest/api/dropzones/get/'+params.name);
        }
    }

    //Common Service___________________________________________________________________>
    function commonservice(utility) {
        var service = {
              getStates: getStates
             ,getDisciplines: getDisciplines
        };
        return service;

        //Get States
        function getStates(params){
            return utility.HttpService.sendRequest('/rest/api/common/states/get/');
        }

        //Get Disciplines
        function getDisciplines(){
            return utility.HttpService.sendRequest('/rest/api/common/skills/get/1');
        }

    }

    //Common Service___________________________________________________________________>
    function transactionservice(utility) {
        var service = {
              paymentrequest: paymentrequest
        };
        return service;

        //Get States
        function paymentrequest(params){
            return utility.HttpService.sendRequest('/rest/api/transaction/paymentrequest/',params,'post');
        }
    }
    

})();