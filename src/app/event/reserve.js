(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventReserveListController',eventReserveListController);

    eventReserveListController.$inject = ['$scope','common','eventservice'];

    function eventReserveListController($scope,common,eventservice) {       
    	console.log('Event list controller has been called');

    	//METHODS
    	$scope.init = init;
        $scope.getEventByID = getEventByID;
    	
		//VARIABLES
		$scope.common = common;
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[]};
		
    	//Init Function
    	$scope.init();
    	function init(){
            $scope.getEventByID($scope.eventid);
    	}

        //Get Coach by ID
        function getEventByID(){
            var params = {id: $scope.eventid}
            eventservice.getEventByID(params).then(
                function(results){
                    $scope.event.details = results.DETAILS[0];
                    $scope.event.contractors = results.CONTRACTORS;
                    $scope.event.customers = results.CUSTOMERS;
                    console.log(results);
                }    
            );            
        }

    };

})();