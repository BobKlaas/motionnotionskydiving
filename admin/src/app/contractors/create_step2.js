(function(){

    'use strict';

    angular
        .module('app.contractors')
        .controller('contractorCreateStep2Controller', contractorCreateStep2Controller);

    contractorCreateStep2Controller.$inject = ['$scope','common','contractorservice','commonservice','dropzoneservice','$filter'];

    function contractorCreateStep2Controller($scope,common,contractorservice,commonservice,dropzoneservice,$filter) {       
        //METHODS
        $scope.init = init;
        $scope.getContractorByUniqueName = getContractorByUniqueName;
        $scope.saveContractor = saveContractor;
        $scope.setContractor = setContractor;
        $scope.getRatings = getRatings;
        $scope.toggleRating = toggleRating;
        $scope.exists = exists;
        $scope.populateRatings = populateRatings;

        //VARIABLES
        $scope.common = common;
        $scope.uniquename = common.$routeParams.uniquename;
        $scope.title = 'Step 2: Profile, Rates, and Ratings';
        $scope.usparatings = [];
        $scope.selectedratings = [];
        $scope.contractor = {
             profileid: undefined
            ,contractorid: undefined
            ,blurb: ""
            ,facebookurl: ''
            ,instagramurl: ''
            ,videourl: ''
            ,linkedinurl: ''
            ,dayrate: 0
        };
        

        //Init Function        
        $scope.init();
        function init(){
            $scope.getContractorByUniqueName();
            $scope.getRatings();
        }

        //Get Contractor by ID
        function getContractorByUniqueName(){
            var params = {uniquename: $scope.uniquename}
            contractorservice.getContractorByUniqueName(params).then(
                function(results){
                    console.log(results);
                    $scope.contractor = setContractor(results.DETAILS[0]);

                    $scope.populateRatings(results.RATINGS);

                }    
            );            
        }

        //Populate Ratings
        function populateRatings(ratings){
            for(var i = 0; i < ratings.length; i++){
                $scope.selectedratings.push(ratings[i].ID);
            }

            for(var j = 0; j < $scope.selectedratings.length; j++){
//                console.log($scope.selectedratings[j]);
            }
        }

        //Get Ratings
        function getRatings(){
            var params = {agencyid: 1};
            commonservice.getRatings(params).then(
                function(results){
                    //console.log(results);
                    $scope.usparatings = results;
                }    
            );            
        }

        //Find index of Rating
        function exists(rating,selected){
            return selected.indexOf(rating.ID) > -1;
        };

        //Toggle Rating        
        function toggleRating(rating){            
            var idx = $scope.selectedratings.indexOf(rating.ID);
            if (idx > -1) {
              $scope.selectedratings.splice(idx,1);
            }
            else {
              $scope.selectedratings.push(rating.ID);
            }
        };           
        

        //Save Contractor
        function saveContractor(){
            var params = $scope.contractor;
                params.ratings = $scope.selectedratings.join(",");
                console.log(params);

            //Update Profile
            contractorservice.updateContractorProfile(params).then(
                function(results){
                    console.log('Profile Updated');
                }    
            ); 

            //Update Ratings
            contractorservice.updateContractorRatings(params).then(
                function(results){
                   //Show Success
                   common.logger.success('Profile and ratings updated successfully.','','Success');

                   //Navigate to Step 2
                   common.routeTo('/contractors/edit/step3/'+$scope.uniquename);
                }    
            );
        }

        //Set Contractor Model
        function setContractor(contractor){
            var newContractor = {
                 profileid: contractor.PROFILEID
                ,contractorid: contractor.ID
                ,blurb: contractor.BLURB
                ,fullname: contractor.FULLNAME
                ,facebookurl: contractor.FACEBOOKURL
                ,instagramurl: contractor.INSTAGRAMURL
                ,videourl: contractor.VIDEOURL
                ,linkedinurl: contractor.LINKEDINURL
                ,dayrate: contractor.DAYRATE
            };
            return newContractor;
        }

        
    };

})();

