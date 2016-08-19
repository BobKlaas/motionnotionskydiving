(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('contractorservice',contractorservice)
        .factory('eventservice',eventservice)
        .factory('dropzoneservice',dropzoneservice)
        .factory('commonservice',commonservice)        

  
    //********************************************************
    //LOGIN Service
    //********************************************************
    contractorservice.$inject = ['utility'];
    eventservice.$inject = ['utility'];
    dropzoneservice.$inject = ['utility'];
    commonservice.$inject = ['utility'];


    //CONTRACTOR Service___________________________________________________________________>
    function contractorservice(utility) {
        var service = {
             getContractors: getContractors
            ,updateContractorStatus:updateContractorStatus
            ,getContractorRoles: getContractorRoles
        };
        return service;

        //Get All Active Contractors
        function getContractors(params){
            return utility.HttpService.sendRequest('/rest/api/contractors/get/');
        }

        //Get All Active Contractors
        function getContractorRoles(params){
            return utility.HttpService.sendRequest('/rest/api/contractors/roles/get/');
        }

        //Toggles the status of a contractor
        function updateContractorStatus(params){
            return utility.HttpService.sendRequest('/rest/api/contractors/update/status',params,'post');
        }
    }

    //EVENTS Service___________________________________________________________________>
    function eventservice(utility) {
        var service = {
             getEvents: getEvents
            ,getEventByID: getEventByID
            ,updateEventStatus: updateEventStatus
            ,getEventCustomers: getEventCustomers
            ,updateEventContractors: updateEventContractors
            ,createEvent: createEvent
            ,updateEvent: updateEvent
            ,getEventPricing: getEventPricing
            ,updateEventPricing: updateEventPricing
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

        //Update Event Status
        function updateEventStatus(params){
            return utility.HttpService.sendRequest('/rest/api/events/update/status/',params,'post');
        }

        //Save Event Contractors
        function updateEventContractors(params){
            return utility.HttpService.sendRequest('/rest/api/events/contractors/update/',params,'post');
        }

        //Get All Customers for an Event
        function getEventCustomers(params){
            return utility.HttpService.sendRequest('/rest/api/events/customers/event/'+params.eventid);
        }

        //Create Event
        function createEvent(params){
            return utility.HttpService.sendRequest('/rest/api/events/create/',params,'post');
        }

        //Update Event
        function updateEvent(params){
            return utility.HttpService.sendRequest('/rest/api/events/update/',params,'post');
        }

        //Update Event Pricing
        function updateEventPricing(params){
            return utility.HttpService.sendRequest('/rest/api/events/pricing/update/',params,'post');
        }

        //Get Event Pricing
        function getEventPricing(params){
            return utility.HttpService.sendRequest('/rest/api/events/pricing/get/'+params.id);
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



})();