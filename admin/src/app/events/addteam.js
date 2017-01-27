(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventTeamController',eventTeamController);

    eventTeamController.$inject = ['$scope','common','$filter','$mdDialog','eventservice','contractorservice'];
    

    function eventTeamController($scope,common,$filter,$mdDialog,eventservice,contractorservice){       
        //METHODS
        $scope.common = common;
        $scope.init = init;
        $scope.getEventByID = getEventByID;
        $scope.saveContractors = saveContractors;
        $scope.getContractors = getContractors;
        $scope.getContractorRoles = getContractorRoles;
        $scope.setDailyRate = setDailyRate;
        $scope.newEventContractor = newEventContractor;
        $scope.addContractorToArray = addContractorToArray;
        $scope.resetForm = resetForm;
        $scope.removeContractor = removeContractor;
        $scope.getRole = getRole;
        $scope.getPricing = getPricing;
        $scope.loadContractors = loadContractors;
        
        //VARIABLES        
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.peopleImagePath = '/assets/images/contractors/';
        $scope.etitle = 'Add Team';
        $scope.eventid = common.$routeParams.eventid;
        $scope.event = {details:[], contractors:[], customers:[]};   
        $scope.contractors = [];
        $scope.allcontractors = [];
        $scope.contractorlist = [];
        $scope.roles = [];

        //Event Contractor
        $scope.eventcontractor = $scope.newEventContractor();
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getContractors();
            $scope.getEventByID();
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
            contractorservice.getActiveContractors().then(
                function(results){
                    $scope.contractors = results;
                    $scope.allcontractors = angular.copy(results);

                    //Get Pricing
                    $scope.getPricing();
                }    
            );            
        }

        //Get Contractor Costs
        function getPricing(){
            var params = {id: $scope.eventid}
            eventservice.getEventPricing(params).then(
                function(results){
                    $scope.event.ticketcosts = results.TICKETRATES;
                    $scope.event.contractorcosts = results.DAYRATES;
                    $scope.event.pricing = results.PRICING[0];
                    
                    //Set Contractors List
                    $scope.loadContractors(results.TICKETRATES);

                    //Notify of Net Loss
                    if(results.PRICING[0].MARGINAMOUNT <= 0)
                        common.logger.error('This event is operating at a loss. Event expenses exceed event profit.','','Net Loss Expected');
                }    
            );
        }

        //Populate Contractors List from Array
        function loadContractors(aryContractors){
            for(var i=0; i < aryContractors.length; i++){
                //Create contracor object
                var econtractor = $scope.newEventContractor(
                     ''
                    ,aryContractors[i].ID
                    ,$scope.eventid
                    ,aryContractors[i].FULLNAME
                    ,aryContractors[i].IMAGENAME
                    ,aryContractors[i].ROLEID
                    ,aryContractors[i].ROLETITLE
                    ,aryContractors[i].DAYRATE
                    ,aryContractors[i].SLOTCOMPENSATION
                );

                //Remove Contractor from dropdown
                for(var j=0; j < $scope.contractors.length; j++){
                    if($scope.contractors[j].ID == aryContractors[i].ID){
                        //Remove Item From Dropdown Selection
                        $scope.contractors.splice(j,1); 
                    }
                }

                //Add Event Contractor to List
                $scope.contractorlist.push(econtractor);
            }                   
        
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
                if($scope.contractors[i].ID == $scope.eventcontractor.id){
                    var rate = $scope.contractors[i].DAYRATE;
                    $scope.eventcontractor.dayrate =  rate.toFixed(2);
                }
            }           
        }

        //Add Contractor To Array
        function addContractorToArray(){
            for(var i=0; i < $scope.contractors.length; i++){
                if($scope.contractors[i].ID == $scope.eventcontractor.id){

                    //Create Event Contractor
                    var contractor = $scope.contractors[i]; 
                    var role = getRole($scope.eventcontractor.roleid);
                    var econtractor = newEventContractor(
                         ''
                        ,contractor.ID
                        ,$scope.eventid
                        ,contractor.FULLNAME
                        ,contractor.IMAGENAME
                        ,role.ID
                        ,role.TITLE
                        ,$scope.eventcontractor.dayrate
                        ,$scope.eventcontractor.slotcompensation
                    );
                    
                    //Add Event Contractor to List
                    $scope.contractorlist.push(econtractor);

                    //Remove Item From Dropdown Selection
                    $scope.contractors.splice(i,1);                 

                    //Reset Form
                    $scope.resetForm();
                }
            }            
        }

        //Returns a Populated Event Contractor Object
        function newEventContractor(eventcontractorid,contractorid,eventid,fullname,imagename,roleid,roletitle,dayrate,slotcompensation){
            var eventcontractor = {
                 eventcontractorid: eventcontractorid
                ,eventid: eventid
                ,contractorid:contractorid
                ,fullname: fullname
                ,imagename: imagename
                ,roleid: roleid
                ,roletitle: roletitle
                ,dayrate: dayrate
                ,slotcompensation: (slotcompensation!==undefined)?slotcompensation:1                
            }
            return eventcontractor;
        }

        //Reset Contractor Add Form
        function resetForm(){
            $scope.eventcontractor = $scope.newEventContractor();
            $scope.addForm.$setPristine();
            $scope.addForm.$setUntouched();            
        }

        //Remove Contractor from List
        function removeContractor(contractor){
            //Remove Contractor From List
            for(var i=0; i < $scope.contractorlist.length; i++){
                if($scope.contractorlist[i].contractorid == contractor.contractorid){
                    $scope.contractorlist.splice(i,1);
                }
            }

            //Readd Contract Back to Dropdown
            for(var j=0; j < $scope.allcontractors.length; j++){
                if($scope.allcontractors[j].ID == contractor.contractorid){
                    $scope.contractors.push($scope.allcontractors[j]);
                }
            }
        }

        //Get Role
        function getRole(roleid){
            var role = {}
            for(var i=0; i < $scope.roles.length; i++){
                if($scope.roles[i].ID == roleid){
                    role = $scope.roles[i];
                }
            }
            return role;
        }

        //Save event Contractors
        function saveContractors(){           
            var params = $scope.contractorlist;
            console.log(params);
            eventservice.updateEventContractors(params).then(
                function(results){
                    //Show Success
                    common.logger.success('Success','','Event contractors have been saved successfully.');

                    //Navigate to Step 2
                    common.routeTo('/events/pricing/'+$scope.eventid);
                }    
            );
        }

    };

})();
