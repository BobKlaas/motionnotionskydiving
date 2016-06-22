(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventListController',eventListController);

    eventListController.$inject = ['$scope','common','contractorservice'];

    function eventListController($scope,common,contractorservice) {       
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
