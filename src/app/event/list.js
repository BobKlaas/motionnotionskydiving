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
        $scope.showToastFull = showToastFull;
    	
		//VARIABLES
		$scope.common = common;
        $scope.eventsImagePath = '/assets/images/events/';
         $scope.events = {all:[],chunked:[]};
        $scope.message ="";
		
    	//Init Function
        $scope.init();
        function init(){
            $scope.getEvents();
        }

        //Get Events
        function getEvents(){
            var params = {active:1}
            eventservice.getEventsByStatus(params).then(
                function(results){
                    //All Contractors
                    $scope.events.all = results; 

                    //Chunk The Array
                    $scope.events.chunked = common.chunkdata(results,2);

                    if(!results.length)
                        $scope.message ="We currently don't have any events scheduled. However, we are working on the next awesome event, so check back soon!";
                },function(error){
                    $scope.message ="Error loading events. Please reload the page.";
                }    
            );            
        }

        //Filter Data
        function filterdata(){
            var filtered = $filter('filter')($scope.events.all,$scope.searchtext);
            $scope.events.chunked = common.chunkdata(filtered,3);
        }


        //Show Camp is full
        function showToastFull(title){
            common.logger.warn('The '+title+' is currently full. However, you can still register on our reserve list.','','Event Full');
        };
        

    };

})();
