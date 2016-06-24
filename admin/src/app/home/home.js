(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventsController', eventsController);

    eventsController.$inject = ['$scope','common'];

    function eventsController($scope,common) {       
        //METHODS
        $scope.init = init;

        //VARIABLES

        $scope.init();
        function init(){
            console.log($scope.user);
        }
    };

})();

