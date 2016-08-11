(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventViewController',eventViewController);

    eventViewController.$inject = ['$scope','common','eventservice'];

    function eventViewController($scope,common,eventservice) {       
    	console.log('Event view controller has been called');

    	//METHODS
    	$scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.buildSlotsString = buildSlotsString;
    	
		//VARIABLES
		$scope.common = common;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.peopleImagePath = '/assets/images/people/';
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[]};
		
    	//Init Function
    	$scope.init();
    	function init(){
            $scope.getEventByID($scope.eventid);
    	}

        //Get Event by ID
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

        //Build Slots String
        function buildSlotsString(slotsleft,slots){
            var string = '';

            if(slotsleft < 1){
                string = 'CAMP FULL'
            }else{
                string = 'Slots: '+slotsleft+' of '+slots+' available';
            }
            return string;
        }

    };

})();
