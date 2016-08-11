(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventListController',eventListController);

    eventListController.$inject = ['$scope','common','eventservice'];

    function eventListController($scope,common,eventservice){       
        console.log('Event list controller has been called');

        //METHODS
        $scope.init = init;
        $scope.getEvents = getEvents;
        $scope.showToastFull = showToastFull;
        $scope.changeStatus = changeStatus;
        
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

        //Show Camp is full
        function showToastFull(title){
            common.logger.warn('The '+title+' is currently full. However, you can still register for a reserve slot.','','Event Full');
        };

        

    };

})();
