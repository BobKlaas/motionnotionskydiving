(function(){

    'use strict';

    angular
        .module('app.login')
        .controller('loginController', loginController)
        .controller('loginProgressController', loginProgressController);

    loginController.$inject = ['$scope','common','loginservice'];
    loginProgressController.$inject = ['$scope','$interval'];

    //Controller: loginProgressController    
    function loginProgressController($scope,$interval){
        $scope.mode = 'query';
        $scope.determinateValue = 30;
        $interval(function() {
            $scope.determinateValue += 1;
            if($scope.determinateValue > 100) {
                $scope.determinateValue = 30;
            }
        },100,0,true);
    }

    //Controller: loginController
    function loginController($scope,common,loginservice) {       
        //METHODS
        $scope.login = login;

        //Set Vars
        $scope.common = common;
        $scope.testvar = 'Login';      
        $scope.user = {username:'',password:''};
        $scope.loginfailed = 0;
        $scope.loginbutton = {
             text: 'Login'
            ,disabled: 0
        }

        //Login User
        function login(){
            var params = $scope.user;
            $scope.loginbutton.disabled = 1;
            loginservice.authenticate(params).then(
                function(results){
                    if(results.RESULT[0].LOGINVALID && results.RESULT[0].SESSIONCREATED){
                        common.navigateToLink('/admin');
                    }else{
                        $scope.loginfailed = 1;
                        $scope.loginbutton.disabled = 0;
                    }
                }    
            );      
        }

    };

})();

