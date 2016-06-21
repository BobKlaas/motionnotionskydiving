(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventListController',eventListController);

    eventListController.$inject = ['$scope','common','coachservice'];

    function eventListController($scope,common,coachservice) {       
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
