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

    	//VARIABLES
    	$scope.socialurls = {};
    	$scope.model = {key: '6Lc37iQTAAAAAAMf6Qgu3sBdhZ2hCMt118ea0evz'};
    	$scope.adminemail = _AdminEmail;
    	$scope.response = null;
    	$scope.widgetId = null;
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
	    			console.log(results);
	    		}
	    	);
	    }

    };

})();
