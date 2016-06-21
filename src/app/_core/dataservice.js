(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('loginservice',loginservice)
        .factory('coachservice',coachservice)
        .factory('eventsservice',eventsservice)
        //.factory('detailservice',detailservice)
        //.factory('reportservice',reportservice);

  
    //********************************************************
    //LOGIN Service
    //********************************************************
    loginservice.$inject = ['utility'];
    coachservice.$inject = ['utility'];
    eventsservice.$inject = ['utility'];

    //LOGIN Service___________________________________________________________________>
    function loginservice(utility) {
        var service = {
            userLogin: userLogin,
            getAlert: getAlert
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


    //COACHES Service___________________________________________________________________>
    function coachservice(utility) {
        var service = {
            getCoaches: getCoaches,
            getCoachByID: getCoachByID
        };
        return service;

        //Get All Active Coaches
        function getCoaches(params){
            return utility.HttpService.sendRequest('/rest/api/contractors/get/');
        }

        //Get Coach by ID
        function getCoachByID(params){
            return utility.HttpService.sendRequest('/project/analytic/get/'+params.coachid);
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