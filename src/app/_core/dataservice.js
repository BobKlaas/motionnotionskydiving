(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('loginservice',loginservice)
        .factory('contractorservice',contractorservice)
        .factory('eventservice',eventservice)
        //.factory('detailservice',detailservice)
        //.factory('reportservice',reportservice);

  
    //********************************************************
    //LOGIN Service
    //********************************************************
    loginservice.$inject = ['utility'];
    contractorservice.$inject = ['utility'];
    eventservice.$inject = ['utility'];

    //LOGIN Service___________________________________________________________________>
    function loginservice(utility) {
        var service = {
             userLogin: userLogin
            ,getAlert: getAlert
        };
        return service;

        //Get Alerts
        function userLogin(params){
            return utility.HttpService.sendRequest('/project/analytic/getByEmployee/'+params.employeenumber);
        }

        //Get Alert
        function getAlert(params){
            return utility.HttpService.sendRequest('/project/analytic/get/'+params.alertid);
        }

    }


    //Contractors Service___________________________________________________________________>
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
    }
    


})();