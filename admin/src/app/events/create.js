(function(){

    'use strict';

    angular
        .module('app.events')
        .controller('eventCreateController',eventCreateController);

    eventCreateController.$inject = ['$scope','common','eventservice','dropzoneservice'];

    function eventCreateController($scope,common,eventservice,dropzoneservice){       
        //METHODS
        $scope.init = init;
        $scope.createEvent = createEvent;
        $scope.getDropzones = getDropzones;
        $scope.readFile = readFile;
        $scope.saveEvent = saveEvent;
        
        //VARIABLES
        $scope.common = common;
        $scope.eventsImagePath = '/assets/images/events/';
        $scope.etitle = 'Step 1: Create Event';
        $scope.btnSubmitTitle = 'SAVE';
        $scope.minDate = new Date();
        $scope.maxDate = new Date($scope.minDate.getFullYear()+1,$scope.minDate.getMonth(),$scope.minDate.getDate());
        $scope.dropzones = [];

        //Image Variables
        var image = document.getElementById('previewimage');
        var cropper = new Cropper(image, {
            aspectRatio: 5 / 2,
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
            ,startdate: ''
            ,enddate: ''
            ,slots: ''
            ,jumpsperday: ''
            ,reserveslots: 10
            ,suggestedregistrationfee: 50.00
            ,registrationfee: 0
            ,dropzoneid: 1
            ,image: ''
            ,active: 0
        }
        
        //Init Function
        $scope.init();
        function init(){
            $scope.getDropzones();
        }

        //Create New Event
        function createEvent(){
            console.log(event);
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
                    params.startdate = $scope.event.startdate.toISOString();
                    params.enddate = $scope.event.enddate.toISOString();
                
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
