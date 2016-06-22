(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventViewController',eventViewController);

    eventViewController.$inject = ['$scope','common','eventservice'];

    function eventViewController($scope,common,eventservice) {       
    	console.log('Event list controller has been called');

    	//METHODS
    	$scope.init = init;
    	
		//VARIABLES
		$scope.common = common;
        $scope.eventid = common.$routeParams.eventid;
		
    	//Init Function
    	$scope.init();
    	function init(){
    	   console.log($scope.eventid);
    	}

    };

})();
