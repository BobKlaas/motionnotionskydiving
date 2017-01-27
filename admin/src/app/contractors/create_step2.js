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

        //VARIABLES
        $scope.common = common;
        $scope.uniquename = common.$routeParams.uniquename;
        $scope.title = 'Step 2: Edit Contractor';
        $scope.contractor = {
             profileid: undefined
            ,contractorid: undefined
            ,blurb: "I started skydiving in 2012 and it has been a really fulfilling part of my life. I am truly grateful for the friendships I’ve made and the experiences I get to be a part of in this sport. As far as motion goes, I try and express myself without applying limitations of orientation. I believe a true master has a good understanding of all variations of his/her craft. I still have a lot to learn but I enjoy sharing my knowledge of dynamic motion. I also enjoy capturing the unbelievable moments that happen in the sky. I’m really new to the craft of videography, but I’m really passionate about creating and sharing these experiences. See you in the sky."
            ,facebookurl: 'https://www.facebook.com/bob.klaas.3'
            ,instagramurl: 'https://www.instagram.com/klaasic/'
            ,videourl: 'https://www.youtube.com/user/sk8erboob/videos'
            ,linkedinurl: 'https://www.linkedin.com/in/robertklaas'
            ,dayrate: 0
        };
        

        //Init Function        
        $scope.init();
        function init(){
            $scope.getContractorByUniqueName();
        }

        //Get Contractor by ID
        function getContractorByUniqueName(){
            var params = {uniquename: $scope.uniquename}
            contractorservice.getContractorByUniqueName(params).then(
                function(results){
                    $scope.contractor = setContractor(results.DETAILS[0]);
                }    
            );            
        }

        //Save Contractor
        function saveContractor(){
            var params = $scope.contractor;
            contractorservice.updateContractorProfile(params).then(
                function(results){
                   //Show Success
                    common.logger.success('Profile updated successfully.','','Success');

                    //Navigate to Step 2
                    common.routeTo('/contractors/');
                }    
            ); 
        }

        //Set Contractor Model
        function setContractor(contractor){
            var newContractor = {
                 profileid: contractor.PROFILEID
                ,contractorid: contractor.ID
                ,blurb: contractor.BLURB
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

