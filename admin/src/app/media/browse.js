(function(){

    'use strict';

    angular
        .module('app.media')
        .controller('mediaBrowseController', mediaBrowseController);
        
    mediaBrowseController.$inject = ['$scope','common','contractorservice','eventservice','mediaservice','$sce'];

    function mediaBrowseController($scope,common,contractorservice,eventservice,mediaservice,$sce) {       
        //METHODS
        $scope.init = init;
        $scope.common = common;
        $scope.getContractors = getContractors;
        $scope.getEvents = getEvents;
        $scope.searchMedia = searchMedia;
        $scope.trustSrc = trustSrc;

        $scope.init();

        //VARIABLES
        $scope.etitle = 'Browse Media';
        $scope.contractors = [];
        $scope.events = [];
        $scope.search = {};
        $scope.media = {all:[],chunked:[]};
        $scope.searchExecuted = 0;

        //Init        
        function init(){
            $scope.getContractors();
            $scope.getEvents();
        }

        //Get All Active Contractors
        function getContractors(){
            contractorservice.getContractors().then(
                function(results){
                    $scope.contractors = results;              
                }    
            );            
        }

        //Get Events
        function getEvents(){
            eventservice.getEvents().then(
                function(results){
                    //All Contractors
                    $scope.events = results; 
                }    
            );            
        }

        //Trust SRC URL
        function trustSrc(src){
            return $sce.trustAsResourceUrl(src);
        }

        //Search for Media
        function searchMedia(){
            var params = $scope.search;
            console.log(params);
            mediaservice.searchMedia(params).then(
                function(results){
                    $scope.searchExecuted = 1;
                    
                    if(results.length)
                        common.logger.success(results.length + ' items found.','','Search Results');
                    else
                        common.logger.warn(results.length + ' items found.','','Search Results');

                    //All Media
                    $scope.media.all = results; 

                    //Chunk The Array
                    $scope.media.chunked = common.chunkdata(results,3);
                }    
            ); 
        }

    };

})();

