(function(){

    'use strict';

    angular
        .module('app.coach')
        .controller('coachListController',coachListController);

    coachListController.$inject = ['$scope','common','contractorservice'];

    function coachListController($scope,common,contractorservice) {       
    	console.log('Coach List Controller has been called');

    	//METHODS
    	$scope.init = init;
    	$scope.getContractors = getContractors;
    	$scope.buildImagePath = buildImagePath;

		//VARIABLES
		$scope.common = common;
		$scope.peopleImagePath = '/assets/images/people/';
		$scope.contractors = {all:[],chunked:[]};
        $scope.message = "";

    	//Init Function
    	$scope.init();
    	function init(){
    		$scope.getContractors();
    	}

        //Get Contractors
        function getContractors(){
            contractorservice.getContractors().then(
                function(results){
                    //All Contractors
                    $scope.contractors.all = results; 

                    //Chunked
                    $scope.contractors.chunked = common.chunkdata(results,3);
                },function(error){
                    $scope.message = "Error loading team members. Please reload the page.";
                }       
            );            
        }


        function buildImagePath(path,name){
        	return path+name;
        }

    };

})();
