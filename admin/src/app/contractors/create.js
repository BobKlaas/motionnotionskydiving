(function(){

    'use strict';

    angular
        .module('app.contractors')
        .controller('contractorCreateController', contractorCreateController);

    contractorCreateController.$inject = ['$scope','common','contractorservice','commonservice','$filter'];

    function contractorCreateController($scope,common,contractorservice,commonservice,$filter) {       
        //METHODS
        $scope.init = init;
        $scope.getContractorByUniqueName = getContractorByUniqueName;
        $scope.saveContractor = saveContractor;
        $scope.setContractor = setContractor;
        $scope.getStates = getStates;
        $scope.getRatings = getRatings;
        $scope.dropzoneSearch = dropzoneSearch;

        //VARIABLES
        $scope.common = common;
        $scope.peopleImagePath = '/assets/images/people/';
        $scope.searchtext;
        $scope.uniquename = common.$routeParams.uniquename;
        $scope.contractor = {details: [], ratings: [], skills: []};
        $scope.contractormodel = {};
        $scope.states = [];
        $scope.ratings = [];
        $scope.init();
        $scope.title = 'Add Contractor';

        //Init Function        
        function init(){
            $scope.getStates();
            $scope.getRatings();
            if($scope.uniquename != undefined){
                $scope.getContractorByUniqueName();
                $scope.title = 'Edit Contractor';
            }
        }

        //Get Contractor by ID
        function getContractorByUniqueName(){
            var params = {uniquename: $scope.uniquename}
            contractorservice.getContractorByUniqueName(params).then(
                function(results){
                    //Set Coach Info
                    console.log(results);
                    $scope.contractor.details = results.DETAILS[0];
                    $scope.contractor.ratings = results.RATINGS;
                    $scope.contractor.skills = results.SKILLS;
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

        //Get Ratings
        function getRatings(){
            var params = {ratingid: '', agencyid: ''};
            commonservice.getRatings(params).then(
                function(results){
                    $scope.ratings = results;
                    console.log($scope.ratings);
                }    
            );            
        }

        //Get Dropzone by Name
        function dropzoneSearch(searchText){
            var dropzonenames = [];
            var params = {name: searchText};
            $scope.customer.homedropzonename = searchText;
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

     

        //Save Contractor
        function saveContractor(){

        }

        //Set Contractor Model
        function setContractor(){

        }

        
    };

})();

