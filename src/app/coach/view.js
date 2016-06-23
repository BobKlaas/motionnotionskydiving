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
        $scope.getContractorByUniqueName = getContractorByUniqueName;

		//VARIABLES
		$scope.common = common;        
        $scope.uniquename = common.$routeParams.uniquename;
        $scope.coach = {details: [],ratings: [],skills: []};

    	//Init Function
    	$scope.init();
    	function init(){
    		$scope.getContractorByUniqueName();
    	}

    	//Get Coach by ID
        function getContractorByUniqueName(){
            var params = {uniquename: $scope.uniquename}
            contractorservice.getContractorByUniqueName(params).then(
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
