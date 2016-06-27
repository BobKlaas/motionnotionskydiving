(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventRegisterController',eventRegisterController);

    eventRegisterController.$inject = ['$scope','common','eventservice','dropzoneservice'];

    function eventRegisterController($scope,common,eventservice,dropzoneservice) {       
    	console.log('Register controller has been called');

    	//METHODS
    	$scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.proceedToPayment = proceedToPayment;
        
    	
		//VARIABLES
		$scope.common = common;
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[]};
        $scope.registration = {
             firstname: ''
            ,lastname: ''
            ,email: ''
            ,phone: ''
            ,jumpnumber: ''
            ,homedropzone: ''
            ,canopy: ''
            ,primarydiscipline: ''
        };
		
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
                }    
            );            
        }

        //Get Dropzone by Name
        $scope.dropzoneSearch = function(searchText){
                var dropzonenames = [];
                var params = {name: searchText}
                return dropzoneservice.getDropzoneByName(params).then(
                    function(response){                    
                        angular.forEach(response, function(value, key) {
                            var dropzone = {};
                            dropzone.id = value['ID'];
                            dropzone.name = value['NAME'];
                            dropzonenames.push(dropzone);
                        },dropzonenames);
                        return dropzonenames;
                    },
                    function(error){
                        $log.log(error);
                        return [];
                    }
                );
            };


        //Save Registration and Proceed to Payment
        function proceedToPayment(){

        }

    };

})();
