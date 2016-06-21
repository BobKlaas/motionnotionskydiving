(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('loginservice',loginservice)
        .factory('contractorservice',contractorservice)
        .factory('eventsservice',eventsservice)
        //.factory('detailservice',detailservice)
        //.factory('reportservice',reportservice);

  
    //********************************************************
    //LOGIN Service
    //********************************************************
    loginservice.$inject = ['utility'];
    contractorservice.$inject = ['utility'];
    eventsservice.$inject = ['utility'];

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
            ,getContractorByID: getContractorByID
        };
        return service;

        //Get All Active Contractors
        function getContractors(params){
            return utility.HttpService.sendRequest('/rest/api/contractors/get/');
        }

        //Get Contractors by ID
        function getContractorByID(params){
            return utility.HttpService.sendRequest('/rest/api/contractors/get/'+params.id);
        }

    }

    //EVENTS Service___________________________________________________________________>
    function eventsservice(utility) {
        var service = {
            getEvents: getEvents
        };
        return service;

        //Get All Events
        function getEvents(params){
            return utility.HttpService.sendRequest('/rest/api/events/get/');
        }
    }
    


})();