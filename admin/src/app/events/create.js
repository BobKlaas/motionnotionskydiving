(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventCreateController',eventCreateController)
        .config(function($compileProvider){
            $compileProvider.preAssignBindingsEnabled(true);
        });

    eventCreateController.$inject = ['$scope','common','eventservice','dropzoneservice'];

    function eventCreateController($scope,common,eventservice,dropzoneservice){       
        //METHODS
        $scope.init = init;
        $scope.getDropzones = getDropzones;
        $scope.readFile = readFile;
        $scope.saveEvent = saveEvent;
        $scope.getEventByID = getEventByID;
        
        //VARIABLES
        $scope.common = common;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.etitle = 'Step 1: Create Event';
        $scope.eventid = common.$routeParams.eventid;
        $scope.btnSubmitTitle = 'SAVE';
        $scope.minDate = new Date();
        $scope.maxDate = new Date($scope.minDate.getFullYear()+1,$scope.minDate.getMonth(),$scope.minDate.getDate());
        $scope.dropzones = [];
        $scope.pricinglocked = 0;
        $scope.minslots = 1;

        //Image Variables
        var image = document.getElementById('previewimage');
        var cropper = new Cropper(image, {
            aspectRatio: 4 / 2,
            center: true,
            restore: true,
            autoCropArea: 1,
            scalable: false,
            movable: false,
            crop: function(e) {}
        });

        //Event Model
        $scope.event = {
             title: ''
            ,description: ''
            ,startdatetime: new Date (new Date().toDateString() + ' ' + '8:00')
            ,enddatetime: new Date (new Date().toDateString() + ' ' + '18:00')
            ,slots: 10
            ,jumpsperday: 1
            ,reserveslots: 10
            ,suggestedregistrationfee: 0
            ,registrationfee: 0
            ,dropzoneid: ''
            ,image: ''
            ,active: 0
        }
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getDropzones();

            if($scope.eventid != undefined){
                $scope.getEventByID();
                $scope.etitle = 'Edit Event';
            }
        }

        //Get Event By ID
        function getEventByID(){
            var params = {id: $scope.eventid}
            eventservice.getEventByID(params).then(
                function(results){
                    $scope.event = setEvent(results.DETAILS[0]);
                    $scope.minslots = $scope.event.slots;

                    //Set Image in Cropper
                    if(results.DETAILS[0].IMAGENAME.length){
                        if(cropper) cropper.replace('/assets/images/events/'+results.DETAILS[0].IMAGENAME);                         
                        $scope.hasImage = true;
                    }
                }    
            );
        }

        //Set Event Object
        function setEvent(event){   
            var newevent = {
                 id: event.ID         
                ,title: event.TITLE
                ,description: event.DESCRIPTION
                ,startdatetime: new Date(event.STARTDATE)
                ,enddatetime: new Date(event.ENDDATE)
                ,slots: event.SLOTS
                ,jumpsperday: event.JUMPSPERDAY
                ,reserveslots: event.RESERVESLOTS
                ,suggestedregistrationfee: event.SUGGESTEDREGISTRATIONFEE
                ,registrationfee: event.REGISTRATIONFEE
                ,dropzoneid: event.DROPZONEID
                ,image: event.IMAGE
                ,active: event.ACTIVE
                ,slotsleft: event.SLOTSLEFT
                ,reservelistcount: event.RESERVELISTCOUNT
                ,pricinglocked: event.PRICINGLOCKED
            }
            return newevent;
        }


        //Get Dropzones
        function getDropzones(){
            dropzoneservice.getDropzones().then(
                function(results){
                    $scope.dropzones = results;
                }    
            );            
        }

        //Save Event
        function saveEvent(){
            // console.log($scope.event);

            // console.log($scope.event.startdatetime);

            var readyForSave = 0;
            try{
                var image = cropper.getCroppedCanvas({width:750,height:300}).toDataURL();
                $scope.event.image = image;
                readyForSave = 1;
            }
            catch(err){
                common.logger.error('Image Required','','Please select an image')
            }

            if(readyForSave){
                //Set Params
                var params = $scope.event;
                    params.startdate = $scope.event.startdatetime.toString();
                    params.enddate = $scope.event.enddatetime.toString();
                
                if($scope.eventid){
                    //Update Event
                    eventservice.updateEvent(params).then(
                        function(results){
                            //Show Success
                            common.logger.success('Success','',results[0].TITLE +' was updated successfully.');

                            //Navigate to Step 2
                            common.routeTo('/events/team/'+results[0].ID);                  
                        }    
                    );
                }else{
                    //Save Event
                    eventservice.createEvent(params).then(
                        function(results){
                            //Show Success
                            common.logger.success('Success','',results[0].TITLE +' was saved successfully.');

                            //Navigate to Step 2
                            common.routeTo('/events/team/'+results[0].ID);                  
                        }    
                    );
                }                
            }
        }

        //Read File
        function readFile(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e){
                    $('#previewimage').attr('src',e.target.result);
                    if(cropper) cropper.replace(e.target.result);                    
                    $scope.hasImage = true;
                }                
                reader.readAsDataURL(input.files[0]);
            }else {
                $scope.hasImage = false;
                alert("Sorry - you're browser doesn't support the FileReader API");
            }
        }
        $('#upload').on('change', function () { readFile(this); });

    };

})();
