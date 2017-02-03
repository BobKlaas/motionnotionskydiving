(function(){

    'use strict';

    angular
        .module('app.contractors')
        .controller('contractorCreateStep3Controller', contractorCreateStep3Controller);

    contractorCreateStep3Controller.$inject = ['$scope','common','contractorservice','commonservice','dropzoneservice','$filter'];

    function contractorCreateStep3Controller($scope,common,contractorservice,commonservice,dropzoneservice,$filter) {       
        //METHODS
        $scope.init = init;
        $scope.getContractorByUniqueName = getContractorByUniqueName;
        $scope.saveContractorSkills = saveContractorSkills;
        $scope.setContractor = setContractor;
        $scope.getSkills = getSkills;
        $scope.getSkillLevels = getSkillLevels;
        $scope.addSkillToArray = addSkillToArray;
        $scope.getSkillObjById = getSkillObjById;
        $scope.getLevelObjById = getLevelObjById;
        $scope.resetSkillForm = resetSkillForm;
        $scope.removeSkillByID = removeSkillByID;
        $scope.deleteContractorSkill = deleteContractorSkill;
        $scope.getSkillsByContractor = getSkillsByContractor;

        //VARIABLES
        $scope.common = common;
        $scope.uniquename = common.$routeParams.uniquename;
        $scope.title = 'Step 3: Add Skills';
        $scope.ratings = [];
        $scope.skills = [];
        $scope.levels = [];
        $scope.dskills = [];
        $scope.dlevels = [];
        $scope.contractor = [];
        $scope.contractorskills = [];
        $scope.contractorratings = [];
        $scope.skill = {skillid: '',skilllevelid:'',active:1};
        $scope.rating = {};
        $scope.selectedSkill;
        $scope.selectedLevel;

        //Init Function        
        $scope.init();
        function init(){
            $scope.getContractorByUniqueName();
            $scope.getSkills();
            $scope.getSkillLevels();
        }

        //Get Contractor by ID
        function getContractorByUniqueName(){
            var params = {uniquename: $scope.uniquename}
            contractorservice.getContractorByUniqueName(params).then(
                function(results){
                    $scope.contractor = setContractor(results.DETAILS[0]);
                    $scope.getSkillsByContractor();
                }    
            );            
        }

        //Get Contractor by ID
        function getSkillsByContractor(){
            var params = {contractorid: $scope.contractor.contractorid};
            contractorservice.getSkillsByContractor(params).then(
                function(results){
                    console.log(results);

                    for(var i=0; i < results.length; i++){
                        var newSkill = {
                             contractorid: results[i].CONTRACTORID
                            ,skillid: results[i].SKILLID
                            ,skillname: results[i].SKILLNAME
                            ,levelid: results[i].LEVELID
                            ,levelname: results[i].LEVELNAME
                            ,active: results[i].ACTIVE
                        };
                        
                        //Populate Skills Array
                        $scope.contractorskills.push(newSkill);

                        //Remove skill from skills array
                        $scope.removeSkillByID(newSkill.skillid);
                    };
                }    
            );            
        }


        //Get Skills
        function getSkills(){
            var params = {skillcategoryid: undefined, active: 1};
            commonservice.getSkills(params).then(
                function(results){
                    $scope.skills = results;
                    //console.log($scope.skills);
                }    
            );            
        }


        //Get Skill Levels
        function getSkillLevels(){
            var params = {skillcategoryid: undefined, active: 1};
            commonservice.getSkillLevels(params).then(
                function(results){
                    $scope.levels = results;
                    //console.log($scope.levels);
                }    
            );            
        }

        //Save Contractor
        function saveContractorSkills(){
            var params = $scope.contractorskills;
            

            if(!params.length)
                params.push({contractorid: $scope.contractor.contractorid});
            
            console.log(params);

            contractorservice.updateContractorSkills(params).then(
                function(results){
                   //Show Success
                    common.logger.success('Contractor skills updated successfully.','','Success');

                    //Navigate to Contractors Home
                    common.routeTo('/contractors/');
                }    
            ); 
        }

        //Add Skill to Array
        function addSkillToArray(){
            //Get Skill and Level Info
            var skill = $scope.getSkillObjById($scope.selectedSkill);
            var level = $scope.getLevelObjById($scope.selectedLevel);

            //Build New Skill Object from Skill and Level
            var newSkill = {
                 contractorid: $scope.contractor.contractorid
                ,skillid: skill.ID
                ,skillname: skill.TITLE
                ,levelid: level.ID
                ,levelname: level.TITLE
                ,active:1};

            
            //Add skill into contractor skills array
            $scope.contractorskills.push(newSkill);

            //Remove skill from skills array
            $scope.removeSkillByID(newSkill.skillid);
            
            //Clear Form
            $scope.resetSkillForm();
        }

        //Reset Skill Form
        function resetSkillForm(){
            $scope.selectedSkill = {};
            $scope.selectedLevel = {};
            $scope.skillForm.$setPristine();
            $scope.skillForm.$setUntouched();
        }

        //Delete skill from contractorskills array
        function deleteContractorSkill(id){
            //Remove skills from contactor skills
            for(var i=0; i < $scope.contractorskills.length; i++){
                if($scope.contractorskills[i].skillid == id){
                    $scope.contractorskills.splice(i,1);
                }
            }

            //Re-add Skill into skills dropdown
            for(var i=0; i < $scope.dskills.length; i++){
                if($scope.dskills[i].ID == id){
                    $scope.skills.push($scope.dskills[i]);
                }
            }
        }

        //Removes Skill from Skills Array
        function removeSkillByID(id){
            for(var i=0; i < $scope.skills.length; i++){
                if($scope.skills[i].ID == id){
                    $scope.dskills.push($scope.skills[i]);
                    $scope.skills.splice(i,1);
                }
            }
        }

        //Get Skill by ID
        function getSkillObjById(id){
            var s = {};
            for(var i=0; i < $scope.skills.length; i++){
                if($scope.skills[i].ID == id){
                    s = $scope.skills[i];
                }
            }
            return s;
        }


        //Get Level by ID
        function getLevelObjById(id){
            var s = {};
            for(var i=0; i < $scope.levels.length; i++){
                if($scope.levels[i].ID == id){
                    s = $scope.levels[i];
                }
            }
            return s;
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

