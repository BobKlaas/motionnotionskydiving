(function(){

    'use strict';

    angular
        .module('app.home')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','common'];

    function homeController($scope,common) {       
        //METHODS
        $scope.init = init;

        //VARIABLES

        $scope.init();
        function init(){
            console.log($scope.user);
        }
    };

})();

