(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventPolicyController',eventPolicyController);

    eventPolicyController.$inject = ['$scope','common'];

    function eventPolicyController($scope,common){       
    	console.log('Event list controller has been called');

    	//METHODS
    	$scope.init = init;
		//VARIABLES
		$scope.common = common;
		
    	//Init Function
        $scope.init();
        function init(){
            
        }        

    };

})();
