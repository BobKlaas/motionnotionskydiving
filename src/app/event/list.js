(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventListController',eventListController);

    eventListController.$inject = ['$scope','common','eventservice'];

    function eventListController($scope,common,eventservice){       
    	console.log('Event list controller has been called');

    	//METHODS
    	$scope.init = init;
        $scope.getEvents = getEvents;
    	
		//VARIABLES
		$scope.common = common;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.events = [];
		
    	//Init Function
        $scope.init();
        function init(){
            $scope.getEvents();
        }

        //Get Events
        function getEvents(){
            eventservice.getEvents().then(
                function(results){
                    $scope.events = results; 
                    console.log($scope.events);
                }    
            );            
        }

        

    };

})();
