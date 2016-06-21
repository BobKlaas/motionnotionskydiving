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

    	//Init Function
    	$scope.init();
    	function init(){
    		$scope.getContractors();
    	}

    	//Get Contractors
        function getContractors(){
            contractorservice.getContractors().then(
                function(results){
                    $scope.contractors.all = results; 

                    //Chunk Out Array
                    for(var i=0; i<results.length; i+=3) {
                        $scope.contractors.chunked.push(results.slice(i,i+3));
                    }

                    console.log($scope.contractors);
                }    
            );            
        }

        function buildImagePath(path,name){
        	return path+name;
        }

    };

})();
