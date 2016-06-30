(function(){

    'use strict';

    angular
        .module('app.event')
        .controller('eventRegisterStep2Controller',eventRegisterStep2Controller);

    eventRegisterStep2Controller.$inject = ['$scope','common','eventservice','dropzoneservice','commonservice'];

    function eventRegisterStep2Controller($scope,common,eventservice,dropzoneservice,commonservice) {       
    	console.log('Register controller has been called');

    	//METHODS
    	$scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.proceedToPayment = proceedToPayment;
        $scope.getStates = getStates;
        $scope.getDisciplines = getDisciplines;
            	
		//VARIABLES
		$scope.common = common;
        $scope.states = [];
        $scope.disciplines = [];
        $scope.uspaLicenses = [{id: 1, name: 'A'},{id: 2, name: 'B'},{id: 3, name: 'C'},{id: 3, name: 'D'}];
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[]};
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.registration = {
             firstname: ''
            ,lastname: ''
            ,email: ''
            ,phone: ''
            ,address: ''
            ,zipcode: ''
            ,city: ''
            ,state: ''            
            ,uspalicense: ''
            ,jumpnumber: ''
            ,homedropzone: ''
            ,homedropzoneid: ''
            ,primarydiscipline: ''
        };
		
    	//Init Function
    	$scope.init();
    	function init(){
            $scope.getStates();
            $scope.getDisciplines();
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

        //Get States
        function getStates(){
            commonservice.getStates().then(
                function(results){
                    $scope.states = results;
                }    
            );            
        }

        //Get States
        function getDisciplines(){
            commonservice.getDisciplines().then(
                function(results){
                    $scope.disciplines = results;
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
            $scope.registration.homedropzoneid = $scope.registration.homedropzone.id;
            $scope.registration.homedropzone = $scope.registration.homedropzone.name;            

            console.log($scope.registration);
        }

    };

})();
