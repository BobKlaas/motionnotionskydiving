(function(){

    'use strict';

    angular
        .module('app.media')
        .controller('mediaBrowseController', mediaBrowseController);
        
    mediaBrowseController.$inject = ['$scope','common','contractorservice','mediaservice','$sce'];

    function mediaBrowseController($scope,common,contractorservice,mediaservice,$sce) {       
        //METHODS
        $scope.init = init;
        $scope.getContractors = getContractors;
        $scope.getMediaByContractor = getMediaByContractor;
        $scope.trustSrc = trustSrc;

        $scope.init();

        //VARIABLES
        $scope.etitle = 'Browse Media';
        $scope.contractor = {};
        $scope.media = {all:[],chunked:[]};

        //Init        
        function init(){
            $scope.getContractors();
        }

        //Get All Active Contractors
        function getContractors(){
            contractorservice.getContractors().then(
                function(results){
                    $scope.contractors = results;              
                    $scope.contractor.id = results[0].ID;
                    $scope.getMediaByContractor();
                }    
            );            
        }

        //Trust SRC URL
        function trustSrc(src){
            return $sce.trustAsResourceUrl(src);
        }

        //Get Media by Contractor
        function getMediaByContractor(){
            var params = {contractorid: $scope.contractor.id};
            mediaservice.getMediaByContractor(params).then(
                function(results){
                    //All Contractors
                    $scope.media.all = results; 

                    //Chunk The Array
                    $scope.media.chunked = common.chunkdata(results,3);
                }    
            );   
        }

    };

})();

