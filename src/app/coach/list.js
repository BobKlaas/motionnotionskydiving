(function(){

    'use strict';

    angular
        .module('app.coach')
        .controller('coachListController',coachListController);

    coachListController.$inject = ['$scope','common','coachservice'];

    function coachListController($scope,common,coachservice) {       
    	console.log('Coach List Controller has been called');

    	//METHODS
    	$scope.init = init;
    	$scope.getCoaches = getCoaches;
    	$scope.buildImagePath = buildImagePath;

		//VARIABLES
		$scope.common = common;
		$scope.peopleImagePath = '/assets/images/people/';
		$scope.coaches = {all:[],chunked:[]};

    	//Init Function
    	$scope.init();
    	function init(){
    		$scope.getCoaches();
    	}

    	//Get Coaches
        function getCoaches(){
            coachservice.getCoaches().then(
                function(results){
                    $scope.coaches.all = results; 

                    //Chunk Out Array
                    for(var i=0; i<results.length; i+=3) {
                        $scope.coaches.chunked.push(results.slice(i,i+3));
                    }

                    console.log($scope.coaches);
                }    
            );            
        }

        function buildImagePath(path,name){
        	return path+name;
        }

    };

})();
