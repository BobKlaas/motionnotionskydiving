(function(){

    'use strict';

    angular
        .module('app.contractors')
        .controller('contractorsController', contractorsController);

    contractorsController.$inject = ['$scope','common','contractorservice'];

    function contractorsController($scope,common,contractorservice) {       
        //METHODS
        $scope.init = init;
        $scope.getContractors = getContractors;
        $scope.changeStatus = changeStatus;

        //VARIABLES
        $scope.contractors = {all:[],chunked:[]};
        $scope.peopleImagePath = '/assets/images/people/';

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

        //Change Contractor Status
        function changeStatus(contractor){
            var params = {contractorid: contractor.ID, status: contractor.ACTIVE};
            contractorservice.updateEventStatus(params).then(
                function(results){
                    if(results[0].ACTIVE){
                        common.logger.success(contractor.FIRSTNAME + ' event has been activated.');
                    }else{
                        common.logger.info(contractor.LASTNAME + ' event has been disabled.');
                    }                    
                }    
            );            
        }
    };

})();

