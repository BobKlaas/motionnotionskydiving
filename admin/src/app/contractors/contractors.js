(function(){

    'use strict';

    angular
        .module('app.contractors')
        .controller('contractorsController', contractorsController);

    contractorsController.$inject = ['$scope','common'];

    function contractorsController($scope,common) {       
        //METHODS
        $scope.init = init;

        //VARIABLES

        $scope.init();
        function init(){
            console.log('Contractors controller has been called');
        }
    };

})();

