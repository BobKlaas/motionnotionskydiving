(function(){

    'use strict';

    angular
        .module('app.home')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','common'];

    function homeController($scope,common) {       
    	console.log('Home Controller has been called');
    };

})();
