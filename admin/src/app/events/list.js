(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventListController',eventListController);

    eventListController.$inject = ['$scope','common','eventservice','$filter'];

    function eventListController($scope,common,eventservice,$filter){       
        console.log('Event list controller has been called');

        //METHODS
        $scope.init = init;
        $scope.getEvents = getEvents;
        $scope.changeStatus = changeStatus;
        $scope.filterdata = filterdata;
        
        //VARIABLES
        $scope.common = common;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.events = {all:[],chunked:[]};
        $scope.searchtext;
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getEvents();
        }

        //Get Events
        function getEvents(){
            eventservice.getEvents().then(
                function(results){
                    //All Contractors
                    $scope.events.all = results; 

                    //Chunk The Array
                    $scope.events.chunked = common.chunkdata(results,2);
                }    
            );            
        }

        //Filter Data
        function filterdata(){
            var filtered = $filter('filter')($scope.events.all,$scope.searchtext);
            $scope.events.chunked = common.chunkdata(filtered,2);
        }

        //Change Status
        function changeStatus(event){
            var params = {eventid: event.ID, status: event.ACTIVE};
            console.log(params);
            eventservice.updateEventStatus(params).then(
                function(results){
                    if(results[0].ACTIVE){
                        common.logger.success('The '+ event.TITLE + ' event has been activated.');
                    }else{
                        common.logger.info('The '+ event.TITLE + ' event has been disabled.');
                    }                    
                }    
            );            
        }

    };

})();
