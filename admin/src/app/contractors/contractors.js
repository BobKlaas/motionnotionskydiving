(function(){

    'use strict';

    angular
        .module('app.contractors')
        .controller('contractorsController', contractorsController);

    contractorsController.$inject = ['$scope','common','contractorservice','$filter'];

    function contractorsController($scope,common,contractorservice,$filter) {       
        //METHODS
        $scope.init = init;
        $scope.getContractors = getContractors;
        $scope.changeStatus = changeStatus;
        $scope.filterdata = filterdata;

        //VARIABLES
        $scope.common = common;
        $scope.contractors = {all:[],chunked:[]};
        $scope.peopleImagePath = '/assets/images/contractors/';
        $scope.searchtext;

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

                    //Chunk The Array
                    $scope.contractors.chunked = common.chunkdata(results,3);
                }    
            );            
        }

        //Filter Data
        function filterdata(){
            var filtered = $filter('filter')($scope.contractors.all,$scope.searchtext);
            $scope.contractors.chunked = common.chunkdata(filtered,3);
        }

        //Change Contractor Status
        function changeStatus(contractor){
            var params = {contractorid: contractor.ID, status: contractor.ACTIVE};
            contractorservice.updateContractorStatus(params).then(
                function(results){
                    console.log(results);
                    if(results[0].ACTIVE){
                        common.logger.success(contractor.FIRSTNAME + ' has been activated.');
                    }else{
                        common.logger.info(contractor.LASTNAME + ' has been disabled.');
                    }                    
                }    
            );            
        }
    };

})();

