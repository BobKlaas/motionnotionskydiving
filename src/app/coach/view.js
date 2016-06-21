(function(){

    'use strict';

    angular
        .module('app.coach')
        .controller('coachViewController',coachViewController);

    coachViewController.$inject = ['$scope','common','contractorservice'];

    function coachViewController($scope,common,contractorservice) {       
    	console.log('Coach List Controller has been called');

    	//METHODS
    	$scope.init = init;
        $scope.getContractorByID = getContractorByID;

		//VARIABLES
		$scope.common = common;        
        $scope.coachId = common.$routeParams.id;
        $scope.coach = {details: [],ratings: [],skills: []};

    	//Init Function
    	$scope.init();
    	function init(){
    		$scope.getContractorByID();
    	}

    	//Get Coach by ID
        function getContractorByID(){
            var params = {id: $scope.coachId}
            contractorservice.getContractorByID(params).then(
                function(results){
                    $scope.coach.details = results.DETAILS[0];
                    $scope.coach.ratings = results.RATINGS;
                    $scope.coach.skills = results.SKILLS;
                    console.log($scope.coach);
                }    
            );            
        }


    };

})();
