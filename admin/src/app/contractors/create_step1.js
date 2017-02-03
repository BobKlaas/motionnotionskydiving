(function(){

    'use strict';

    angular
        .module('app.contractors')
        .controller('contractorCreateStep1Controller', contractorCreateStep1Controller);

    contractorCreateStep1Controller.$inject = ['$scope','common','contractorservice','commonservice','dropzoneservice','$filter'];

    function contractorCreateStep1Controller($scope,common,contractorservice,commonservice,dropzoneservice,$filter) {       
        //METHODS
        $scope.init = init;
        $scope.getContractorByUniqueName = getContractorByUniqueName;
        $scope.saveContractor = saveContractor;
        $scope.setContractor = setContractor;
        $scope.getStates = getStates;
        $scope.dropzoneSearch = dropzoneSearch;
        $scope.setContractor = setContractor;
        $scope.readFile = readFile;

        //VARIABLES
        $scope.common = common;
        $scope.peopleImagePath = '/assets/images/contractors/';
        $scope.searchtext;
        $scope.uniquename = common.$routeParams.uniquename;
        $scope.states = [];
        $scope.ratings = [];
        $scope.title = 'Step 1: Contractor Details';
        $scope.btnSubmitTitle = 'SAVE';
        $scope.contractor = {
             id: undefined
            ,firstname: ''
            ,lastname: ''
            ,emailaddress: ''
            ,phonenumber: ''
            ,uspalicenseno: ''
            ,uspamemberno: ''
            ,imagename: ''
            ,homedropzoneid: ''
            ,homedropzonename: ''
            ,homedropzone: {id:'',name:' '}
            ,address1: ''
            ,address2: ''
            ,city: ''
            ,stateid: ''
            ,zipcode: ''
            ,active: ''
        }
        
        //Image Variables
        var image = document.getElementById('previewimage');
        var cropper = new Cropper(image, {
            aspectRatio: 5 / 3,
            center: true,
            restore: true,
            autoCropArea: 1,
            scalable: false,
            movable: false,
            crop: function(e) {}
        });

        //Init Function 
        $scope.init();       
        function init(){
            $scope.getStates();
            if($scope.uniquename != undefined){
                $scope.getContractorByUniqueName();
                $scope.title = 'Step 1: Contractor Details';
            }
        }

        //Get Contractor by ID
        function getContractorByUniqueName(){
            var params = {uniquename: $scope.uniquename};
            console.log(params);

            contractorservice.getContractorByUniqueName(params).then(
                function(results){
                    console.log(results);
                    //Set Coach Info                    
                    $scope.contractor = setContractor(results.DETAILS[0]);                   

                    //Set Image in Cropper
                    if(results.DETAILS[0].IMAGENAME.length){
                        if(cropper) cropper.replace('/assets/images/contractors/'+results.DETAILS[0].IMAGENAME);                         
                        $scope.hasImage = true;
                    }
                }    
            );            
        }

        //Get States
        function getStates(){
            commonservice.getStates().then(
                function(results){
                    $scope.states = results;
                }    
            );            
        }

        //Get Dropzone by Name
        function dropzoneSearch(searchText){
            var dropzonenames = [];
            var params = {name: searchText};
            $scope.contractor.homedropzonename = searchText;
            return dropzoneservice.getDropzoneByName(params).then(
                function(response){                    
                    angular.forEach(response, function(value, key) {
                        var dropzone = {};
                        dropzone.id = value['ID'];
                        dropzone.name = value['NAME'];
                        dropzonenames.push(dropzone);
                    },dropzonenames);
                    return dropzonenames;
                },
                function(error){
                    $log.log(error);
                    return [];
                }
            );
        };

        //Set Contractor Object
        function setContractor(contractor){   
            console.log(contractor);
            var newcontractor = {
                 id: contractor.ID
                ,firstname: contractor.FIRSTNAME
                ,lastname: contractor.LASTNAME
                ,emailaddress: contractor.EMAILADDRESS
                ,phonenumber: contractor.PHONENUMBER
                ,uspalicenseno: contractor.USPALICENSENO
                ,uspamemberno: contractor.USPAMEMBERNO
                ,imagename: contractor.IMAGENAME
                ,homedropzoneid: contractor.HOMEDROPZONEID
                ,homedropzonename: contractor.HOMEDROPZONENAME
                ,homedropzone: {id:contractor.HOMEDROPZONEID,name:contractor.HOMEDROPZONENAME}
                ,address1: contractor.ADDRESS1
                ,address2: contractor.ADDRESS2
                ,city: contractor.CITY
                ,stateid: contractor.STATEID
                ,zipcode: contractor.ZIPCODE
                ,active: contractor.ACTIVE
            }
            return newcontractor;
        }

        //Save Contractor
        function saveContractor(){
            
            //Set Dropzone ID and Name
            if($scope.contractor.homedropzone !== null){
                $scope.contractor.homedropzoneid = $scope.contractor.homedropzone.id;
                $scope.contractor.homedropzonename = $scope.contractor.homedropzone.name;
            }
            
            //Check For Image
            var readyForSave = 0;
            try{
                var image = cropper.getCroppedCanvas({width:750,height:450}).toDataURL();
                $scope.contractor.imagename = image;
                readyForSave = 1;
            }
            catch(err){
                common.logger.error('Image Required','','Please select an image')
            }

            //Save
            if(readyForSave){
                //Set Params
                var params = $scope.contractor;

                if($scope.uniquename){
                    //Update Contractor
                    contractorservice.updateContractor(params).then(
                        function(results){
                            //Show Success
                            common.logger.success(results[0].FULLNAME +' has been updated.','','Success');

                            //Navigate to Step 2
                            common.routeTo('/contractors/edit/step2/'+results[0].UNIQUENAME);       
                        }    
                    );
                }else{
                    //Save Contractor
                    contractorservice.createContractor(params).then(
                        function(results){
                            //Show Success
                            common.logger.success(results[0].FULLNAME +' has been added.','','Success');

                            //Navigate to Step 2
                            common.routeTo('/contractors/edit/step2/'+results[0].UNIQUENAME);
                        }    
                    );
                }                
            }


            
            console.log(params);

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

