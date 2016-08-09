(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('loginservice',loginservice)

  
    //********************************************************
    //LOGIN Service
    //********************************************************
    loginservice.$inject = ['utility'];

    function loginservice(utility) {
        var service = {
            authenticate: authenticate     
        };
        return service;

        //Authenticate User
        function authenticate(params){
            return utility.HttpService.sendRequest('/rest/api/admin/authenticate/',params,'post');
        }

     

    }
    


})();