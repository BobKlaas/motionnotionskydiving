(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('loginservice',loginservice)
        //.factory('portfolioservice',portfolioservice)
        //.factory('alertservice',alertservice)
        //.factory('detailservice',detailservice)
        //.factory('reportservice',reportservice);

  
    //********************************************************
    //LOGIN Service
    //********************************************************
    loginservice.$inject = ['utility'];

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
    


})();