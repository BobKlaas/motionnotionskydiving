(function(){

    'use strict';

    angular
        .module('app.home')
        .controller('contactController', contactController);

    contactController.$inject = ['$scope','common'];

    function contactController($scope,common) {       
    	console.log('Contract controller has been called');
    };

})();
