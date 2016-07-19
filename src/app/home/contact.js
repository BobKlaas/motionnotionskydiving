(function(){

    'use strict';

    angular
        .module('app.home')
        .controller('contactController',contactController);

    contactController.$inject = ['$scope','common','vcRecaptchaService','notifyservice'];

    function contactController($scope,common,vcRecaptchaService,notifyservice) {       
    	var common = common;
    	
    	//METHODS
    	$scope.init = init;
    	$scope.sendMail = sendMail;
    	$scope.clearMailModel = clearMailModel;
    	$scope.resetForm = resetForm;

    	//VARIABLES
    	$scope.socialurls = {};
    	$scope.model = {key: '6Lc37iQTAAAAAAMf6Qgu3sBdhZ2hCMt118ea0evz'};
    	$scope.adminemail = _AdminEmail;
    	$scope.teammail = _TeamEmail;
    	$scope.response = null;
    	$scope.widgetId = null;
    	$scope.mailStatus = 0;
		$scope.contact = {
			 fullname: ''
			,emailaddress: ''
			,subject: ''
			,message: ''
			,grecaptcharesponse: ''
		}

    	$scope.init();
    	function init(){
			$scope.socialurls = common.getSocialUrls();
    	}

    	//Set Recaptcha Response to Model
	    $scope.setResponse = function(response){
	        console.log('Response Returned');
	        $scope.contact.grecaptcharesponse = response;
	    };

	    //Set Widgit ID in scope
	    $scope.setWidgetId = function(widgetId){
	        console.info('Created widget ID: %s', widgetId);
	        $scope.widgetId = widgetId;
	    };

	    //Send Email
	    function sendMail(){
	    	var params = $scope.contact;
	    			
	    	notifyservice.sendMail(params).then(
	    		function(results){
	    			$scope.mailStatus = 1;
	    			$scope.resetForm();
	    			common.logger.success('Your email was sent successfully.','','Message Delivery Success');
	    		},function(error){
	    			var errorMessage = 'There was an issue sending your message. Please try again later or contact directly at '+_TeamEmail+'.';
                    common.logger.error(errorMessage,'','Message Delivery Failure');
                }  
	    	);
	    }

	    //Resets Form Model and State
	    function resetForm(){
	    	$scope.contactForm.$setUntouched();
	    	$scope.contactForm.$setPristine();
			$scope.clearMailModel();
	    }

	    //Clear mail model
	    function clearMailModel(){
	    	$scope.contact = {
				 fullname: ''
				,emailaddress: ''
				,subject: ''
				,message: ''
				,grecaptcharesponse: ''
			}
	    }

    };

})();
