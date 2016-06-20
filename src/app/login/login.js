(function(){

    'use strict';

    angular
        .module('app.login')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope','common'];

    function loginController($scope,common) {       
        //Set Vars
        $scope.common = common;
        $scope.testvar = 'Login';
        $scope.login = login;

        $scope.user = {};


        function login(){
            console.log($scope.user);
        }
    };

})();

