(function(){

    'use strict';

    angular
        .module('app.media')
        .controller('mediaController', mediaController);

    mediaController.$inject = ['$scope','common'];

    function mediaController($scope,common) {       
    	console.log('Media Controller has been called');
    };

})();
