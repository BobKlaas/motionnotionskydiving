(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventTeamController',eventTeamController);

    eventTeamController.$inject = ['$scope','common','$filter','eventservice','contractorservice'];

    function eventTeamController($scope,common,$filter,eventservice,contractorservice){       
        //METHODS
        $scope.common = common;
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        //$scope.saveEvent = saveEvent;
        $scope.getContractors = getContractors;
        $scope.getContractorRoles = getContractorRoles;
        $scope.setDailyRate = setDailyRate;
        $scope.newContractor = newContractor;
        $scope.addContractorToArray = addContractorToArray;
        $scope.resetForm = resetForm;
        
        //VARIABLES        
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.peopleImagePath = '/assets/images/people/';
        $scope.etitle = 'Add Team';
        $scope.eventid = common.$routeParams.eventid;
        $scope.contractor = $scope.newContractor();
        $scope.event = {details:[], contractors:[], customers:[]};   
        $scope.contractors = [];
        $scope.contractorlist = [];
        $scope.roles = [];
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getEventByID();
            $scope.getContractors();
            $scope.getContractorRoles();
        }

        //Get Event by ID
        function getEventByID(){
            var params = {id: $scope.eventid}
            eventservice.getEventByID(params).then(
                function(results){
                    $scope.event.details = results.DETAILS[0];
                }    
            );            
        }

        //Get All Active Contractors
        function getContractors(){
            contractorservice.getContractors().then(
                function(results){
                    $scope.contractors = results;
                }    
            );            
        }

        //Get Contractor Roles
        function getContractorRoles(){
            contractorservice.getContractorRoles().then(
                function(results){
                    $scope.roles = results;
                }    
            );            
        }

        //Get Daily Rate
        function setDailyRate(){
            for(var i=0; i < $scope.contractors.length; i++){
                if($scope.contractors[i].ID == $scope.contractor.contractorid){
                    var rate = $scope.contractors[i].DAYRATE;
                    $scope.contractor.dayrate =  rate.toFixed(2);
                }
            }           
        }

        //Add Contractor To Array
        function addContractorToArray(){
            for(var i=0; i < $scope.contractors.length; i++){
                if($scope.contractors[i].ID == $scope.contractor.contractorid){

                    //Add Contractor to List
                    var contractor = $scope.contractors[i];
                    $scope.contractors[i].DAYRATE = $scope.contractor.dayrate;
                    $scope.contractorlist.push($scope.contractors[i]);

                    //Remove Item From Contractors
                    $scope.contractors.splice(i,1);                 

                    $scope.resetForm();
                    console.log($scope.contractorlist);
                }
            }            
        }

        //Reset Contractor Add Form
        function resetForm(){
            $scope.addForm.$setPristine();
            $scope.addForm.$setUntouched();
            $scope.contractor = $scope.newContractor();
        }

        //Return Contractor Object
        function newContractor(){
            var ncontractor = {
                 contractorid: ''
                ,roleid: ''
                ,dayrate: 0
            }
            return ncontractor;
        }


    };

})();
