(function(){

    'use strict';

    angular
        .module('app.coach')
        .controller('coachViewController',coachViewController);

    coachViewController.$inject = ['$scope','common','contractorservice','$sce'];

    function coachViewController($scope,common,contractorservice,$sce){       
    	console.log('Coach List Controller has been called');

        //--Directive Documentation Video Players
        //--https://github.com/brandly/angular-youtube-embed
        //--https://github.com/vincenzomerolla/angular-vimeo-embed

    	//METHODS
    	$scope.init = init;
        $scope.getContractorByUniqueName = getContractorByUniqueName;
        $scope.getContractorMedia = getContractorMedia;

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
                    //Set Coach Info
                    $scope.coach.details = results.DETAILS[0];
                    $scope.coach.ratings = results.RATINGS;
                    $scope.coach.skills = results.SKILLS;

                    //Get Coach Media
                    $scope.getContractorMedia();                    
                }    
            );            
        }

        //Get Coach by ID
        function getContractorMedia(){
            var params = {contractorid: $scope.coach.details.ID}
            contractorservice.getContractorMedia(params).then(
                function(results){
                    $scope.contractorMedia = results;
                    console.log($scope.contractorMedia);
                }    
            );            
        }


    };

})();

