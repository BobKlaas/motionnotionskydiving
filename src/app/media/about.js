(function(){

    'use strict';

    angular
        .module('app.home')
        .controller('aboutController', aboutController);

    aboutController.$inject = ['$scope','common'];

    function aboutController($scope,common) {       
    	console.log('About controller has been called');
    };

})();
